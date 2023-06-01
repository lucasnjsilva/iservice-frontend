type LocalStorageValue = string | number | boolean | object;

interface LocalStorage {
  set(key: string, value: LocalStorageValue): void;
  get<T extends LocalStorageValue>(key: string): T | null;
  remove(key: string): void;
}

const useLocalStorage: LocalStorage = {
  set(key: string, value: LocalStorageValue) {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error(`Error setting localStorage item: ${error}`);
    }
  },

  get<T extends LocalStorageValue>(key: string) {
    try {
      const serializedValue = localStorage.getItem(key);

      if (serializedValue === null) {
        return null;
      }

      return JSON.parse(serializedValue) as T;
    } catch (error) {
      console.error(`Error getting localStorage item: ${error}`);
      return null;
    }
  },

  remove(key: string) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing localStorage item: ${error}`);
    }
  },
};

export default useLocalStorage;
