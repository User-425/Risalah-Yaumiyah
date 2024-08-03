import content from '../assets/data/content.json';

export interface Content {
  type: string;
  id: number;
  title: string;
  text: string;
}

export const getContents = (): Content[] => {
  return content.map(item => ({ ...item, type: 'other' }));
};

export const getContentById = (id: number): Content | undefined => {
  return content.find(item => item.id === id) as Content | undefined;
};
