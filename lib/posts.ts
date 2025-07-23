import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.mdx$/, '');

    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const matterResult = matter(fileContents);

    return {
      id,
      ...(matterResult.data as { title: string; date: string; author: string; excerpt: string, tags: string[] }),
    };
  });

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }

  }); 
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.mdx$/, ''),
      },
    };
  });
}

export async function getPostData(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const matterResult = matter(fileContents);

  return {
    slug,
    content: matterResult.content,
    ...(matterResult.data as { title: string; date: string; author: string }),
  };
}

export function getAllTags() {
  const allPosts = getSortedPostsData();
  const allTags = allPosts.flatMap(post => post.tags || []);
  const uniqueTags = [...new Set(allTags)];
  return uniqueTags;
}

export function getPostsByTag(tag: string) {
  const allPosts = getSortedPostsData();
  return allPosts.filter(post => post.tags?.includes(tag));
}


export function getGroupedPostsData() {
  const allPosts = getSortedPostsData();
  
  const groupedPosts: { [year: string]: { [month: string]: typeof allPosts } } = {};

  allPosts.forEach(post => {
    const postDate = new Date(post.date);
    const year = postDate.getFullYear().toString();
    const month = (postDate.getMonth() + 1).toString().padStart(2, '0'); 

    if (!groupedPosts[year]) {
      groupedPosts[year] = {};
    }

    if (!groupedPosts[year][month]) {
      groupedPosts[year][month] = [];
    }
    
    groupedPosts[year][month].push(post);
  });

  return groupedPosts;
}