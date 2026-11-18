/**
 * Local Monaco Editor & Worker Configuration for Safe Exam Browser (SEB) & Offline Environments
 * 
 * Configures @monaco-editor/react to use locally bundled monaco-editor assets
 * and Vite web workers, preventing any external CDN requests to jsdelivr or unpkg.
 */

import { loader } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';

// Ensure MonacoEnvironment is configured before Monaco is instantiated
self.MonacoEnvironment = {
  getWorker(_: string, label: string): Worker {
    if (label === 'json') {
      return new jsonWorker();
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      return new cssWorker();
    }
    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      return new htmlWorker();
    }
    if (label === 'typescript' || label === 'javascript') {
      return new tsWorker();
    }
    return new editorWorker();
  },
};

// Configure @monaco-editor/react loader to use local monaco instance
loader.config({ monaco });

export { monaco };
