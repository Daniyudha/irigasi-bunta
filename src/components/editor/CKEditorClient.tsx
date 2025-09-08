'use client';

import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// Define proper types
interface UploadLoader {
  file: Promise<File>;
}

interface UploadAdapter {
  upload: () => Promise<{ default: string }>;
}

interface EditorInstance {
  getData: () => string;
  plugins: {
    get: (pluginName: string) => {
      createUploadAdapter: (loader: UploadLoader) => UploadAdapter;
    };
  };
}

interface CKEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const CKEditorClient: React.FC<CKEditorProps> = ({
  value,
  onChange,
  placeholder = 'Tulis sesuatu yang menarik...',
  className = '',
}) => {
  const uploadAdapter = (loader: UploadLoader): UploadAdapter => {
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

  function uploadPlugin(editor: EditorInstance) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader: UploadLoader) => {
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

  // Type assertion untuk menghandle compatibility issues
  const EditorComponent = CKEditor as any;

  return (
    <div className={className}>
      <EditorComponent
        editor={ClassicEditor}
        data={value}
        config={editorConfiguration}
        onReady={(editor: EditorInstance) => {
          console.log('Editor is ready to use!', editor);
        }}
        onChange={(event: unknown, editor: EditorInstance) => {
          const data = editor.getData();
          onChange(data);
        }}
        onBlur={(event: unknown, editor: EditorInstance) => {
          console.log('Blur.', editor);
        }}
        onFocus={(event: unknown, editor: EditorInstance) => {
          console.log('Focus.', editor);
        }}
      />
    </div>
  );
};

export default CKEditorClient;