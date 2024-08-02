import listSurah from '../assets/data/alquran/surah_list.json';
import content from '../assets/data/alquran/content.json';

export interface AyaData {
  aya_id: number;
  aya_number: number;
  aya_text: string;
  sura_id: number;
  juz_id: number;
  page_number: number;
  translation_aya_text: string;
}

export interface SurahData {
  surah_name: string;
  surah_text: string;
  translation_surah_text: string;
  aya_count: number;
}

export interface Content {
  [key: string]: AyaData[];
}

export interface ListSurah {
  [key: string]: SurahData;
}

export const getContents = (): Content => {
  return content;
};

export const getContentById = (id: number): Content | undefined => {
  return content[id.toString()];
};  

export const getSurahList = (): ListSurah => {
  return listSurah;
};

export const getSurahById = (id: number): SurahData | undefined => {
  return listSurah[id.toString()];
}