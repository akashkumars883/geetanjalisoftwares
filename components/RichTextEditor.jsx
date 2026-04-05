'use client';

import React, { useEffect, useRef } from 'react';
import 'quill/dist/quill.snow.css';

export default function RichTextEditor({ value, onChange }) {
  const containerRef = useRef(null);
  const quillRef = useRef(null);
  const isUpdatingRef = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current || quillRef.current) return;

    // Dynamically import Quill only on the client
    const initQuill = async () => {
      const { default: Quill } = await import('quill');
      
      if (!containerRef.current) return;

      const quill = new Quill(containerRef.current, {
        theme: 'snow',
        modules: {
          toolbar: {
            container: [
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              [{ font: [] }],
              ['bold', 'italic', 'underline', 'strike'],
              [{ color: [] }, { background: [] }],
              [{ script: 'sub' }, { script: 'super' }],
              ['blockquote', 'code-block'],
              [{ list: 'ordered' }, { list: 'bullet' }],
              [{ indent: '-1' }, { indent: '+1' }, { align: [] }],
              ['link', 'image', 'video'],
              ['clean'],
            ],
            handlers: {
              image: () => {
                const input = document.createElement('input');
                input.setAttribute('type', 'file');
                input.setAttribute('accept', 'image/*');
                input.click();

                input.onchange = async () => {
                  const file = input.files[0];
                  if (!file) return;

                  const formData = new FormData();
                  formData.append('file', file);

                  try {
                    const res = await fetch('/api/upload', {
                      method: 'POST',
                      body: formData
                    });

                    if (!res.ok) throw new Error('Upload failed');

                    const { url } = await res.json();
                    
                    const range = quill.getSelection(true);
                    quill.insertEmbed(range.index, 'image', url);
                    quill.setSelection(range.index + 1);
                  } catch (error) {
                    console.error('Quill image upload error:', error);
                    alert('Failed to upload image. Please try again.');
                  }
                };
              }
            }
          },
        },
      });

      quillRef.current = quill;

      // Set initial content
      if (value) {
        quill.root.innerHTML = value;
      }

      // Listen for text changes
      quill.on('text-change', () => {
        if (!isUpdatingRef.current) {
          const html = quill.root.innerHTML;
          if (onChange) {
            onChange(html === '<p><br></p>' ? '' : html);
          }
        }
      });
    };

    initQuill();

    return () => {
      if (quillRef.current) {
        // Quill doesn't have a formal destroy method in v2, but we can clear the container
        const toolbar = containerRef.current?.previousSibling;
        if (toolbar && toolbar.nodeType === 1 && toolbar.classList.contains('ql-toolbar')) {
          toolbar.remove();
        }
        quillRef.current = null;
      }
    };
  }, []); // Only run once on mount

  // Update content from props if changed externally
  useEffect(() => {
    if (quillRef.current && value !== quillRef.current.root.innerHTML) {
      isUpdatingRef.current = true;
      quillRef.current.root.innerHTML = value || '';
      isUpdatingRef.current = false;
    }
  }, [value]);

  return (
    <div className="rich-text-editor-container">
      <style>{`
        .ql-toolbar.ql-snow {
          position: sticky;
          top: 0;
          z-index: 50;
          border-radius: 20px 20px 0 0;
          border: 1px solid rgba(0,0,0,0.05) !important;
          background: #fbfbfb;
          padding: 12px !important;
          border-top-width: 1px !important;
        }
        .ql-container.ql-snow {
          border-radius: 0 0 20px 20px;
          border: 1px solid rgba(0,0,0,0.05) !important;
          min-height: 350px;
          font-family: inherit;
          font-size: 15px;
        }
        .ql-editor {
          min-height: 350px;
          padding: 24px !important;
          line-height: 1.6;
        }
        .ql-editor img {
          max-width: 100%;
          height: auto;
          display: block;
          margin: 10px auto;
          border-radius: 12px;
          cursor: pointer;
        }
        .ql-editor.ql-blank::before {
          font-style: normal;
          color: rgba(0,0,0,0.2);
          left: 24px !important;
        }
        .ql-snow.ql-toolbar button:hover,
        .ql-snow .ql-toolbar button:hover,
        .ql-snow.ql-toolbar button:focus,
        .ql-snow .ql-toolbar button:focus,
        .ql-snow.ql-toolbar button.ql-active,
        .ql-snow .ql-toolbar button.ql-active,
        .ql-snow.ql-toolbar .ql-picker-label:hover,
        .ql-snow .ql-toolbar .ql-picker-label:hover,
        .ql-snow.ql-toolbar .ql-picker-label.ql-active,
        .ql-snow .ql-toolbar .ql-picker-label.ql-active,
        .ql-snow.ql-toolbar .ql-picker-item:hover,
        .ql-snow .ql-toolbar .ql-picker-item:hover,
        .ql-snow.ql-toolbar .ql-picker-item.ql-selected,
        .ql-snow .ql-toolbar .ql-picker-item.ql-selected {
          color: #f97316 !important;
        }
        .ql-snow.ql-toolbar button:hover .ql-stroke,
        .ql-snow .ql-toolbar button:hover .ql-stroke,
        .ql-snow.ql-toolbar button:focus .ql-stroke,
        .ql-snow .ql-toolbar button:focus .ql-stroke,
        .ql-snow.ql-toolbar button.ql-active .ql-stroke,
        .ql-snow .ql-toolbar button.ql-active .ql-stroke,
        .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke,
        .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke,
        .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke,
        .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke,
        .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke,
        .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke,
        .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke,
        .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke {
          stroke: #f97316 !important;
        }
        .ql-snow.ql-toolbar button:hover .ql-fill,
        .ql-snow .ql-toolbar button:hover .ql-fill,
        .ql-snow.ql-toolbar button:focus .ql-fill,
        .ql-snow .ql-toolbar button:focus .ql-fill,
        .ql-snow.ql-toolbar button.ql-active .ql-fill,
        .ql-snow .ql-toolbar button.ql-active .ql-fill,
        .ql-snow.ql-toolbar .ql-picker-label:hover .ql-fill,
        .ql-snow .ql-toolbar .ql-picker-label:hover .ql-fill,
        .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-fill,
        .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-fill,
        .ql-snow.ql-toolbar .ql-picker-item:hover .ql-fill,
        .ql-snow .ql-toolbar .ql-picker-item:hover .ql-fill,
        .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-fill,
        .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-fill {
          fill: #f97316 !important;
        }
      `}</style>
      <div ref={containerRef} />
    </div>
  );
}
