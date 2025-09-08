'use client';

import React, { useEffect, useState } from 'react';

// Disable TypeScript checking untuk CKEditor imports
// @ts-ignore
import { CKEditor } from '@ckeditor/ckeditor5-react';
// @ts-ignore
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

interface CKEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

// Set license key untuk development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  // @ts-ignore
  window.CKEDITOR_LICENSE_KEY = 'GPL';
}

const CKEditorClient: React.FC<CKEditorProps> = ({
  value,
  onChange,
  placeholder = 'Tulis sesuatu yang menarik...',
  className = '',
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Jangan render di server side
  if (!isMounted) {
    return (
      <div className={`${className} border rounded p-4 bg-gray-50 min-h-[300px] flex items-center justify-center`}>
        <div className="text-gray-500">Loading editor...</div>
      </div>
    );
  }

  const uploadAdapter = (loader: any) => {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          loader.file.then((file: File) => {
            const formData = new FormData();
            formData.append('file', file);

            fetch('/api/admin/media', {
              method: 'POST',
              body: formData,
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error('Upload failed');
                }
                return response.json();
              })
              .then((data: { url: string }) => {
                resolve({
                  default: data.url,
                });
              })
              .catch((error: Error) => {
                reject(error);
              });
          });
        });
      },
    };
  };

  function uploadPlugin(editor: any) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
      return uploadAdapter(loader);
    };
  }

  const editorConfiguration = {
    placeholder,
    extraPlugins: [uploadPlugin],
    toolbar: {
      items: [
        'heading',
        '|',
        'bold',
        'italic',
        'link',
        'bulletedList',
        'numberedList',
        '|',
        'outdent',
        'indent',
        '|',
        'imageUpload',
        'blockQuote',
        'insertTable',
        'mediaEmbed',
        'undo',
        'redo',
      ],
    },
  };

  return (
    <div className={className}>
      <CKEditor
        editor={ClassicEditor}
        data={value}
        config={editorConfiguration}
        onReady={(editor: any) => {
          console.log('Editor is ready to use!', editor);
        }}
        onChange={(event: any, editor: any) => {
          const data = editor.getData();
          onChange(data);
        }}
      />
    </div>
  );
};

export default CKEditorClient;