import content from '../assets/data/merged_data.json';

export interface Content {
  id: number;
  title: string;
  arabicTitle?: string;
  content: ContentItem[];
  footer?: string;
}

export interface ContentItem {
  type: string;
  variables?: { name: string; value: string }[];
  content: string[];
  dir: string;
  columns?: number;
}

export const getContents = (): Content[] => {
  return content;
};

export const getContentById = (id: number): Content | undefined => {
  return content.find(item => item.id === id);
};
