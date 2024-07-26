import AsyncStorage from '@react-native-async-storage/async-storage';

const BOOKMARKS_KEY = '@bookmarks';

export const saveBookmark = async (id) => {
  try {
    const existingBookmarks = await AsyncStorage.getItem(BOOKMARKS_KEY);
    const bookmarks = existingBookmarks ? JSON.parse(existingBookmarks) : [];
    if (!bookmarks.includes(id)) {
      bookmarks.push(id);
      await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
    }
  } catch (error) {
    console.error('Error saving bookmark:', error);
  }
};

export const removeBookmark = async (id) => {
  try {
    const existingBookmarks = await AsyncStorage.getItem(BOOKMARKS_KEY);
    const bookmarks = existingBookmarks ? JSON.parse(existingBookmarks) : [];
    const newBookmarks = bookmarks.filter(bookmarkId => bookmarkId !== id);
    await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(newBookmarks));
  } catch (error) {
    console.error('Error removing bookmark:', error);
  }
};

export const getBookmarks = async () => {
  try {
    const bookmarks = await AsyncStorage.getItem(BOOKMARKS_KEY);
    return bookmarks ? JSON.parse(bookmarks) : [];
  } catch (error) {
    console.error('Error getting bookmarks:', error);
    return [];
  }
};
