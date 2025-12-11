import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');

  if (!slug) {
    return NextResponse.json(
      { error: 'Slug é obrigatório' },
      { status: 400 }
    );
  }

  try {
    // Se está em localhost, lê do arquivo local
    if (process.env.NODE_ENV === 'development') {
      const postsDirectory = path.join(process.cwd(), 'posts');
      const fullPath = path.join(postsDirectory, `${slug}.mdx`);
      
      if (!fs.existsSync(fullPath)) {
        return NextResponse.json(
          { error: 'Post não encontrado' },
          { status: 404 }
        );
      }

      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);

      return NextResponse.json({
        slug,
        content: matterResult.content,
        title: matterResult.data.title || 'Untitled',
        date: matterResult.data.date || new Date().toISOString().split('T')[0],
        author: matterResult.data.author || 'Unknown',
        tags: matterResult.data.tags || [],
        hidden: matterResult.data.hidden || false,
      });
    }

    // Em produção, busca do GitHub
    const owner = 'BrunoYDev';
    const repo = 'My-Blog';
    const branch = 'main';
    const url = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/posts/${slug}.mdx`;

    const response = await fetch(url);
    if (!response.ok) {
      return NextResponse.json(
        { error: 'Post não encontrado no GitHub' },
        { status: 404 }
      );
    }

    const fileContents = await response.text();
    const matterResult = matter(fileContents);

    return NextResponse.json({
      slug,
      content: matterResult.content,
      title: matterResult.data.title || 'Untitled',
      date: matterResult.data.date || new Date().toISOString().split('T')[0],
      author: matterResult.data.author || 'Unknown',
      tags: matterResult.data.tags || [],
      hidden: matterResult.data.hidden || false,
    });
  } catch (error) {
    console.error('Erro ao carregar preview:', error);
    return NextResponse.json(
      { error: 'Erro ao carregar preview' },
      { status: 500 }
    );
  }
}

