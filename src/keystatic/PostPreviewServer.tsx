import { ReactNode } from 'react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { FormattedDate } from '@/components/FormattedDate/FormattedDate';
import { CenteredImage } from '@/components/CenteredImage/CenteredImage';
import { YouTube } from '@/components/Youtube/Youtube';

interface PostPreviewServerProps {
  title: string;
  date: string;
  author: string;
  tags?: string[];
  content: string;
}

interface CustomComponentProps {
  children?: ReactNode;
  className?: string;
}

export async function PostPreviewServer({ 
  title, 
  date, 
  author, 
  tags = [],
  content 
}: PostPreviewServerProps) {
  if (!content) {
    return (
      <div style={{
        padding: '2rem',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        border: '1px solid #e0e0e0',
        textAlign: 'center',
        color: '#999'
      }}>
        <p>Nenhum conteúdo para visualizar ainda</p>
      </div>
    );
  }

  return (
    <div style={{
      padding: '2rem',
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      border: '1px solid #e0e0e0',
      fontSize: '14px',
      lineHeight: '1.6'
    }}>
      <article>
        <h1 style={{
          fontSize: '28px',
          fontWeight: 'bold',
          marginBottom: '0.5rem',
          marginTop: 0
        }}>
          {title}
        </h1>
        <div style={{
          fontSize: '12px',
          color: '#666',
          marginBottom: '1rem'
        }}>
          Publicado em <FormattedDate dateString={date} /> por {author}
        </div>

        {tags && tags.length > 0 && (
          <div style={{
            marginBottom: '1.5rem',
            display: 'flex',
            gap: '0.5rem',
            flexWrap: 'wrap'
          }}>
            <strong style={{ color: '#333', marginRight: '0.5rem' }}>Tags:</strong>
            {tags.map((tag: string) => (
              <span 
                key={tag} 
                style={{
                  display: 'inline-block',
                  backgroundColor: '#f0f0f0',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '4px',
                  fontSize: '12px',
                  color: '#333'
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div style={{
          marginTop: '2rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid #e0e0e0'
        }}>
          <MDXRemote 
            source={content}
            components={{ 
              CenteredImage, 
              YouTube,
              h1: ({ children }: CustomComponentProps) => (
                <h1 style={{ marginTop: '1.5rem', marginBottom: '1rem', fontSize: '24px', fontWeight: 'bold' }}>
                  {children}
                </h1>
              ),
              h2: ({ children }: CustomComponentProps) => (
                <h2 style={{ marginTop: '1.5rem', marginBottom: '1rem', fontSize: '20px', fontWeight: 'bold' }}>
                  {children}
                </h2>
              ),
              h3: ({ children }: CustomComponentProps) => (
                <h3 style={{ marginTop: '1.5rem', marginBottom: '1rem', fontSize: '16px', fontWeight: 'bold' }}>
                  {children}
                </h3>
              ),
              p: ({ children }: CustomComponentProps) => (
                <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
                  {children}
                </p>
              ),
              ul: ({ children }: CustomComponentProps) => (
                <ul style={{ marginBottom: '1rem', paddingLeft: '2rem', listStyle: 'disc' }}>
                  {children}
                </ul>
              ),
              ol: ({ children }: CustomComponentProps) => (
                <ol style={{ marginBottom: '1rem', paddingLeft: '2rem', listStyle: 'decimal' }}>
                  {children}
                </ol>
              ),
              li: ({ children }: CustomComponentProps) => (
                <li style={{ marginBottom: '0.5rem' }}>
                  {children}
                </li>
              ),
              blockquote: ({ children }: CustomComponentProps) => (
                <blockquote style={{ 
                  borderLeft: '4px solid #999', 
                  paddingLeft: '1rem', 
                  marginLeft: 0, 
                  marginBottom: '1rem',
                  fontStyle: 'italic',
                  color: '#666'
                }}>
                  {children}
                </blockquote>
              ),
              code: ({ children }: CustomComponentProps) => (
                <code style={{
                  backgroundColor: '#f5f5f5',
                  padding: '0.2rem 0.4rem',
                  borderRadius: '3px',
                  fontFamily: 'monospace',
                  fontSize: '0.9em',
                  color: '#e83e8c'
                }}>
                  {children}
                </code>
              ),
              pre: ({ children }: CustomComponentProps) => (
                <pre style={{
                  backgroundColor: '#f5f5f5',
                  padding: '1rem',
                  borderRadius: '4px',
                  overflow: 'auto',
                  marginBottom: '1rem',
                  fontFamily: 'monospace',
                  fontSize: '0.85em'
                }}>
                  {children}
                </pre>
              ),
            }}
          />
        </div>
      </article>
    </div>
  );
}
