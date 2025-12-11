'use client';

import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import { FormattedDate } from '@/components/FormattedDate/FormattedDate';
import { ReactNode, useMemo } from 'react';

interface PostData {
  title: string;
  date: string;
  author: string;
  tags?: string[];
  content: string;
}

interface CenteredImageProps {
  src: string;
  alt: string;
  width: string | number;
  height: string | number;
}

interface YouTubeProps {
  videoId: string;
}

// Componente para renderizar imagens centralizadas
function CenteredImageComponent({ src, alt, width, height }: CenteredImageProps) {
  const widthNum = typeof width === 'string' ? parseInt(width) : width;
  const heightNum = typeof height === 'string' ? parseInt(height) : height;
  
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      marginTop: '1.5rem',
      marginBottom: '1.5rem',
    }}>
      <Image 
        src={src}
        alt={alt}
        width={widthNum}
        height={heightNum}
        style={{
          maxWidth: '100%',
          height: 'auto',
          borderRadius: '6px',
          border: '1px solid #e0e0e0'
        }}
      />
    </div>
  );
}

// Componente para renderizar vídeos do YouTube
function YouTubeComponent({ videoId }: YouTubeProps) {
  // Extrai apenas o ID se uma URL completa for passada
  let finalVideoId = videoId;
  if (videoId?.includes('youtube.com') || videoId?.includes('youtu.be')) {
    // Tenta extrair de https://www.youtube.com/watch?v=ID
    const match = videoId.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^\&\?]+)/);
    if (match && match[1]) {
      finalVideoId = match[1];
    }
  }

  return (
    <div style={{
      position: 'relative',
      paddingBottom: '56.25%',
      height: 0,
      overflow: 'hidden',
      borderRadius: '6px',
      marginTop: '1.5rem',
      marginBottom: '1.5rem',
    }}>
      <iframe
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          border: 'none',
          borderRadius: '6px'
        }}
        src={`https://www.youtube.com/embed/${finalVideoId}`}
        title="YouTube video"
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      />
    </div>
  );
}

// Processa o conteúdo MDX e substitui componentes customizados
function processContent(content: string): ReactNode[] {
  const components: ReactNode[] = [];
  let lastIndex = 0;
  
  // Regex para detectar tags customizadas (com ou sem escape HTML)
  const centeredImageRegex = /(&lt;|<)CenteredImage\s+src=["']([^"']+)["']\s+alt=["']([^"']+)["']\s+width=\{?(\d+)\}?\s+height=\{?(\d+)\}?\s*\/(&gt;|>)/g;
  const youtubeRegex = /(&lt;|<)YouTube\s+videoId=["']([^"']+)["']\s*\/(&gt;|>)/g;
  
  // Processa CenteredImage
  let match;
  const matches: Array<{ type: 'image' | 'youtube'; start: number; end: number; data: CenteredImageProps | YouTubeProps }> = [];
  
  while ((match = centeredImageRegex.exec(content)) !== null) {
    matches.push({
      type: 'image',
      start: match.index,
      end: match.index + match[0].length,
      data: { src: match[2], alt: match[3], width: match[4], height: match[5] }
    });
  }
  
  // Processa YouTube
  while ((match = youtubeRegex.exec(content)) !== null) {
    matches.push({
      type: 'youtube',
      start: match.index,
      end: match.index + match[0].length,
      data: { videoId: match[2] }
    });
  }
  
  // Ordena matches por posição
  matches.sort((a, b) => a.start - b.start);
  
  // Processa matches e monta componentes
  matches.forEach((m, i) => {
    // Adiciona o markdown entre o último match e este
    if (m.start > lastIndex) {
      const mdText = content.slice(lastIndex, m.start);
      if (mdText.trim()) {
        components.push(
          <ReactMarkdown key={`md-${i}`} components={getMarkdownComponents()}>
            {mdText}
          </ReactMarkdown>
        );
      }
    }
    
    // Adiciona o componente customizado
    if (m.type === 'image') {
      components.push(
        <CenteredImageComponent 
          key={`img-${i}`}
          src={(m.data as CenteredImageProps).src}
          alt={(m.data as CenteredImageProps).alt}
          width={(m.data as CenteredImageProps).width}
          height={(m.data as CenteredImageProps).height}
        />
      );
    } else if (m.type === 'youtube') {
      components.push(
        <YouTubeComponent 
          key={`yt-${i}`}
          videoId={(m.data as YouTubeProps).videoId}
        />
      );
    }
    
    lastIndex = m.end;
  });
  
  // Adiciona o restante do conteúdo
  if (lastIndex < content.length) {
    const mdText = content.slice(lastIndex);
    if (mdText.trim()) {
      components.push(
        <ReactMarkdown key="md-end" components={getMarkdownComponents()}>
          {mdText}
        </ReactMarkdown>
      );
    }
  }
  
  return components.length > 0 ? components : [
    <ReactMarkdown key="full" components={getMarkdownComponents()}>
      {content}
    </ReactMarkdown>
  ];
}

function getMarkdownComponents(): Record<string, React.ElementType> {
  return {
    h1: ({ children }: { children: ReactNode }) => (
      <h1 style={{ marginTop: '2rem', marginBottom: '1rem', fontSize: '28px', fontWeight: 'bold', color: '#000' }}>
        {children}
      </h1>
    ),
    h2: ({ children }: { children: ReactNode }) => (
      <h2 style={{ marginTop: '2rem', marginBottom: '1rem', fontSize: '24px', fontWeight: '600', color: '#000' }}>
        {children}
      </h2>
    ),
    h3: ({ children }: { children: ReactNode }) => (
      <h3 style={{ marginTop: '1.5rem', marginBottom: '0.8rem', fontSize: '20px', fontWeight: '600', color: '#111' }}>
        {children}
      </h3>
    ),
    p: ({ children }: { children: ReactNode }) => (
      <p style={{ marginBottom: '1.2rem', lineHeight: '1.8', color: '#333' }}>
        {children}
      </p>
    ),
    ul: ({ children }: { children: ReactNode }) => (
      <ul style={{ marginBottom: '1.5rem', paddingLeft: '2rem', listStyle: 'disc', color: '#333' }}>
        {children}
      </ul>
    ),
    ol: ({ children }: { children: ReactNode }) => (
      <ol style={{ marginBottom: '1.5rem', paddingLeft: '2rem', listStyle: 'decimal', color: '#333' }}>
        {children}
      </ol>
    ),
    li: ({ children }: { children: ReactNode }) => (
      <li style={{ marginBottom: '0.6rem', color: '#333' }}>
        {children}
      </li>
    ),
    blockquote: ({ children }: { children: ReactNode }) => (
      <blockquote style={{ 
        borderLeft: '4px solid #0070f3', 
        paddingLeft: '1.2rem', 
        marginLeft: 0,
        marginRight: 0,
        marginTop: '1.5rem',
        marginBottom: '1.5rem',
        fontStyle: 'italic',
        color: '#555',
        backgroundColor: '#f9f9f9',
        padding: '1rem 0 1rem 1.2rem'
      }}>
        {children}
      </blockquote>
    ),
    code: ({ children, className }: { children: ReactNode; className?: string }) => {
      const isInline = !className;
      if (isInline) {
        return (
          <code style={{
            backgroundColor: '#f5f5f5',
            padding: '0.2rem 0.5rem',
            borderRadius: '3px',
            fontFamily: 'Consolas, Monaco, Courier New, monospace',
            fontSize: '0.9em',
            color: '#d73a49',
            border: '1px solid #eaeaea'
          }}>
            {children}
          </code>
        );
      }
      return (
        <code style={{
          backgroundColor: '#f5f5f5',
          padding: '0.2rem 0.5rem',
          borderRadius: '3px',
          fontFamily: 'Consolas, Monaco, Courier New, monospace',
          fontSize: '0.9em',
          color: '#d73a49',
          border: '1px solid #eaeaea'
        }}>
          {children}
        </code>
      );
    },
    pre: ({ children }: { children: ReactNode }) => (
      <pre style={{
        backgroundColor: '#f5f5f5',
        padding: '1.2rem',
        borderRadius: '6px',
        overflow: 'auto',
        marginTop: '1rem',
        marginBottom: '1.5rem',
        fontFamily: 'Consolas, Monaco, Courier New, monospace',
        fontSize: '14px',
        border: '1px solid #eaeaea'
      }}>
        {children}
      </pre>
    ),
    img: ({ src, alt }: { src?: string; alt?: string }) => {
      let imageSrc = src || '';
      if (imageSrc && !imageSrc.startsWith('http')) {
        imageSrc = imageSrc;
      }
      return (
        <div style={{
          marginTop: '1.5rem',
          marginBottom: '1.5rem',
          display: 'flex',
          justifyContent: 'center'
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={imageSrc}
            alt={alt || 'Image'}
            style={{
              maxWidth: '100%',
              height: 'auto',
              borderRadius: '6px',
              border: '1px solid #e0e0e0'
            }}
          />
        </div>
      );
    },
    a: ({ href, children }: { href?: string; children: ReactNode }) => (
      <a 
        href={href}
        style={{
          color: '#0070f3',
          textDecoration: 'none',
          borderBottom: '1px solid transparent',
          transition: 'border-color 0.2s'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderBottomColor = '#0070f3';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderBottomColor = 'transparent';
        }}
      >
        {children}
      </a>
    ),
    strong: ({ children }: { children: ReactNode }) => (
      <strong style={{ fontWeight: '600', color: '#000' }}>
        {children}
      </strong>
    ),
    em: ({ children }: { children: ReactNode }) => (
      <em style={{ fontStyle: 'italic', color: '#555' }}>
        {children}
      </em>
    ),
  };
}

export function PostPreviewClient({ data }: { data: PostData }) {
  const processedContent = useMemo(() => {
    return processContent(data.content || '');
  }, [data.content]);

  if (!data.content || data.content === 'No content yet...') {
    return (
      <div style={{
        padding: '2rem',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        border: '1px solid #e0e0e0',
        textAlign: 'center',
        color: '#666'
      }}>
        <p>Nenhum conteúdo para visualizar ainda</p>
      </div>
    );
  }

  return (
    <div style={{
      padding: '0',
      backgroundColor: '#ffffff',
      borderRadius: '0px',
      border: 'none',
      fontSize: '16px',
      lineHeight: '1.6',
      color: '#222',
    }}>
      <article style={{ maxWidth: '100%' }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: 'bold',
          marginBottom: '0.5rem',
          marginTop: '0',
          color: '#1a1a1a',
        }}>
          {data.title || 'Untitled'}
        </h1>
        <div style={{
          fontSize: '14px',
          color: '#555',
          marginBottom: '1.5rem',
        }}>
          Published in <FormattedDate dateString={data.date} /> by <strong style={{ color: '#333' }}>{data.author}</strong>
        </div>

        {data.tags && data.tags.length > 0 && (
          <div style={{
            marginBottom: '2rem',
            display: 'flex',
            gap: '0.5rem',
            flexWrap: 'wrap'
          }}>
            <strong style={{ color: '#333', marginRight: '0.5rem', display: 'block', width: '100%' }}>Tags:</strong>
            {data.tags.map((tag: string) => (
              <span 
                key={tag} 
                style={{
                  display: 'inline-block',
                  backgroundColor: '#f0f0f0',
                  padding: '0.35rem 0.85rem',
                  borderRadius: '4px',
                  fontSize: '13px',
                  color: '#333',
                  border: '1px solid #ddd'
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        <hr style={{
          marginTop: '2rem',
          marginBottom: '2rem',
          border: 'none',
          borderTop: '1px solid #e0e0e0'
        }} />

        <div style={{
          marginTop: '2rem',
        }}>
          {processedContent}
        </div>
      </article>
    </div>
  );
}
