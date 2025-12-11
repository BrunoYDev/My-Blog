'use client';

import { useState } from 'react';
import { Keystatic } from '@keystatic/core/ui';
import config from '../../../keystatic.config';
import { Config } from '@keystatic/core';
import { PostPreviewClient } from '@/keystatic/PostPreviewClient';

interface PostData {
  title: string;
  date: string;
  author: string;
  tags?: string[];
  content: string;
}

export default function KeystaticPage() {
  const [showPreview, setShowPreview] = useState(false);
  const [postData, setPostData] = useState<PostData | null>(null);
  const [loading, setLoading] = useState(false);
  const [slug, setSlug] = useState('');

  const handlePreview = async () => {
    const inputSlug = prompt('Digite o slug do post (nome do arquivo sem .mdx):');
    
    if (!inputSlug) {
      return;
    }

    setLoading(true);
    setSlug(inputSlug);

    try {
      const response = await fetch(`/api/preview?slug=${encodeURIComponent(inputSlug)}`);
      
      if (!response.ok) {
        alert('Post não encontrado');
        setLoading(false);
        return;
      }

      const data = await response.json();
      setPostData(data);
      setShowPreview(true);
    } catch (error) {
      console.error('Erro ao carregar preview:', error);
      alert('Erro ao carregar preview');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <Keystatic config={config as Config} />

      {/* Botão Flutuante de Preview */}
      <button
        onClick={handlePreview}
        disabled={loading}
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: loading ? '#cccccc' : '#0070f3',
          color: 'white',
          border: 'none',
          fontSize: '28px',
          cursor: loading ? 'not-allowed' : 'pointer',
          boxShadow: '0 4px 12px rgba(0, 112, 243, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999,
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={(e) => {
          if (!loading) {
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 112, 243, 0.6)';
          }
        }}
        onMouseLeave={(e) => {
          if (!loading) {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 112, 243, 0.4)';
          }
        }}
        title={loading ? 'Carregando...' : 'Preview do Post'}
      >
        {loading ? '⏳' : '👁️'}
      </button>

      {/* Modal de Preview */}
      {showPreview && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '2rem',
          }}
          onClick={() => setShowPreview(false)}
        >
          {/* Janela Flutuante */}
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
              maxWidth: '900px',
              width: '100%',
              maxHeight: '90vh',
              overflow: 'auto',
              position: 'relative',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header do Modal */}
            <div
              style={{
                position: 'sticky',
                top: 0,
                backgroundColor: '#f8f9fa',
                padding: '1rem 2rem',
                borderBottom: '1px solid #e0e0e0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                zIndex: 1001,
              }}
            >
              <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: '#1a1a1a' }}>
                Preview do Post: {slug}
              </h2>
              <button
                onClick={() => setShowPreview(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: '#666',
                }}
              >
                ✕
              </button>
            </div>

            {/* Conteúdo do Preview */}
            <div style={{ padding: '2rem' }}>
              {postData ? (
                <PostPreviewClient data={postData} />
              ) : (
                <div style={{
                  textAlign: 'center',
                  padding: '2rem',
                  color: '#999'
                }}>
                  <p>Carregando preview...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}