import AsyncStorage from '@react-native-async-storage/async-storage';

const RECENTLY_OPENED_KEY = '@recentlyOpened';

export type ContentType = 'alquran' | 'other';

interface RecentlyOpened {
  id: number;
  type: ContentType;
  title?: string;
}

export const saveRecentlyOpened = async (item: RecentlyOpened) => {
  try {
    const existingData = await AsyncStorage.getItem(RECENTLY_OPENED_KEY);
    const recentlyOpened: RecentlyOpened[] = existingData ? JSON.parse(existingData) : [];

    const updatedData = recentlyOpened.filter(existingItem => !(existingItem.id === item.id && existingItem.type === item.type));
    
    updatedData.unshift(item);
    
    if (updatedData.length > 10) {
      updatedData.pop();
    }

    await AsyncStorage.setItem(RECENTLY_OPENED_KEY, JSON.stringify(updatedData));
  } catch (error) {
    console.error('Error saving recently opened item:', error);
  }
};

export const removeRecentlyOpened = async (id: number, type: ContentType) => {
  try {
    const existingData = await AsyncStorage.getItem(RECENTLY_OPENED_KEY);
    const recentlyOpened: RecentlyOpened[] = existingData ? JSON.parse(existingData) : [];

    const updatedData = recentlyOpened.filter(item => !(item.id === id && item.type === type));
    await AsyncStorage.setItem(RECENTLY_OPENED_KEY, JSON.stringify(updatedData));
  } catch (error) {
    console.error('Error removing recently opened item:', error);
  }
};

export const getRecentlyOpened = async (): Promise<RecentlyOpened[]> => {
  try {
    const recentlyOpened = await AsyncStorage.getItem(RECENTLY_OPENED_KEY);
    return recentlyOpened ? JSON.parse(recentlyOpened) : [];
  } catch (error) {
    console.error('Error getting recently opened items:', error);
    return [];
  }
};

export const removeAllRecentlyOpened = async () => {
  try {
    await AsyncStorage.removeItem(RECENTLY_OPENED_KEY);
  } catch (error) {
    console.error('Error removing all recently opened items:', error);
  }
};
