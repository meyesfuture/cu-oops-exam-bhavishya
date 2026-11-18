import { SupportedLanguage, VirtualFile } from '../types';

export interface LanguageOption {
  id: SupportedLanguage;
  label: string;
  shortLabel: string;
  badge: string;
  badgeColor: string;
  defaultFileName: string;
  defaultPath: string;
  starterTemplate: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  {
    id: 'java',
    label: 'Java (OpenJDK 17)',
    shortLabel: 'Java',
    badge: 'J',
    badgeColor: '#ef4444',
    defaultFileName: 'Main.java',
    defaultPath: 'src/main/java/com/exam/Main.java',
    starterTemplate: `import java.util.*;
import java.io.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        // Your code goes here
        
    }
}
`,
  },
  {
    id: 'cpp',
    label: 'C++ (G++ 20)',
    shortLabel: 'C++',
    badge: 'C++',
    badgeColor: '#0284c7',
    defaultFileName: 'main.cpp',
    defaultPath: 'src/main.cpp',
    starterTemplate: `#include <bits/stdc++.h>
using namespace std;

int main() {
    // your code goes here
    
    return 0;
}
`,
  },
  {
    id: 'c',
    label: 'C (GCC 11.2)',
    shortLabel: 'C',
    badge: 'C',
    badgeColor: '#0891b2',
    defaultFileName: 'main.c',
    defaultPath: 'src/main.c',
    starterTemplate: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main() {
    // your code goes here
    
    return 0;
}
`,
  },
  {
    id: 'python',
    label: 'Python (Python 3.11)',
    shortLabel: 'Python',
    badge: 'Py',
    badgeColor: '#eab308',
    defaultFileName: 'main.py',
    defaultPath: 'src/main.py',
    starterTemplate: `import sys

def main():
    # your code goes here
    pass

if __name__ == '__main__':
    main()
`,
  },
  {
    id: 'javascript',
    label: 'JavaScript (Node.js 20)',
    shortLabel: 'JavaScript',
    badge: 'JS',
    badgeColor: '#f59e0b',
    defaultFileName: 'index.js',
    defaultPath: 'src/index.js',
    starterTemplate: `const fs = require('fs');

function main() {
    // your code goes here
}

main();
`,
  },
];

export function getLanguageOption(lang: SupportedLanguage): LanguageOption {
  const found = SUPPORTED_LANGUAGES.find((l) => l.id === lang);
  return found ?? SUPPORTED_LANGUAGES[0]!;
}

export function createInitialFileForLanguage(lang: SupportedLanguage): VirtualFile {
  const opt = getLanguageOption(lang);
  return {
    id: `${lang}-${Date.now()}`,
    path: opt.defaultPath,
    name: opt.defaultFileName,
    content: opt.starterTemplate,
    initialContent: opt.starterTemplate,
    language: lang,
    isModified: false,
  };
}

export function inferLanguageFromFileName(fileName: string, fallback: SupportedLanguage = 'java'): SupportedLanguage {
  const ext = fileName.split('.').pop()?.toLowerCase();
  switch (ext) {
    case 'java':
      return 'java';
    case 'cpp':
    case 'cc':
    case 'cxx':
    case 'hpp':
      return 'cpp';
    case 'c':
    case 'h':
      return 'c';
    case 'py':
      return 'python';
    case 'js':
    case 'mjs':
      return 'javascript';
    case 'ts':
      return 'typescript';
    case 'sql':
      return 'sql';
    case 'json':
      return 'json';
    default:
      return fallback;
  }
}

export function getDefaultExtensionForLanguage(lang: SupportedLanguage): string {
  switch (lang) {
    case 'java':
      return '.java';
    case 'cpp':
      return '.cpp';
    case 'c':
      return '.c';
    case 'python':
      return '.py';
    case 'javascript':
      return '.js';
    case 'typescript':
      return '.ts';
    case 'sql':
      return '.sql';
    case 'json':
      return '.json';
  }
}
