import content from '../assets/data/content.json';

export interface Content {
  id: number;
  title: string;
  text: string;
}

export const getContents = (): Content[] => {
  return content;
};

export const getContentById = (id: number): Content | undefined => {
  return content.find(item => item.id === id);
};
