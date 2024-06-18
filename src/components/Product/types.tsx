export interface Product {
    id: number;
    name: string;
    tags: string[];
    summary: string;
    github?: string;
    download?: string;
    screenshots: string[];
    youtube: string[];
    category: string;
    descriptionPath?: string;
  }
  