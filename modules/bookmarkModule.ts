import AsyncStorage from '@react-native-async-storage/async-storage';

const BOOKMARKS_KEY = '@bookmarks';

export type ContentType = 'alquran' | 'other';

interface Bookmark {
  id_key: number;
  type: ContentType;
}

export const saveBookmark = async (id_key: number, type: ContentType) => {
  try {
    const existingBookmarks = await AsyncStorage.getItem(BOOKMARKS_KEY);
    const bookmarks: Bookmark[] = existingBookmarks ? JSON.parse(existingBookmarks) : [];

    const bookmarkExists = bookmarks.some(bookmark => bookmark.id_key === id_key && bookmark.type === type);
    if (!bookmarkExists) {
      bookmarks.push({ id_key, type });
      await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
    }
  } catch (error) {
    console.error('Error saving bookmark:', error);
  }
};

export const removeBookmark = async (id_key: number, type: ContentType) => {
  try {
    const existingBookmarks = await AsyncStorage.getItem(BOOKMARKS_KEY);
    const bookmarks: Bookmark[] = existingBookmarks ? JSON.parse(existingBookmarks) : [];

    const newBookmarks = bookmarks.filter(bookmark => !(bookmark.id_key === id_key && bookmark.type === type));
    await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(newBookmarks));
  } catch (error) {
    console.error('Error removing bookmark:', error);
  }
};

export const getBookmarks = async (): Promise<Bookmark[]> => {
  try {
    const bookmarks = await AsyncStorage.getItem(BOOKMARKS_KEY);
    return bookmarks ? JSON.parse(bookmarks) : [];
  } catch (error) {
    console.error('Error getting bookmarks:', error);
    return [];
  }
};

export const removeAllBookmarks = async () => {
  try {
    await AsyncStorage.removeItem(BOOKMARKS_KEY);
  } catch (error) {
    console.error('Error removing all bookmarks:', error);
  }
};
