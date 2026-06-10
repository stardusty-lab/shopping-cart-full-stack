const STORAGE_KEY = "cart-selection";

export const cartSelectionStorage = {
  load: () => {
    const value = localStorage.getItem(STORAGE_KEY);
    if (!value) return [];
    try {
      return JSON.parse(value);
    } catch {
      return [];
    }
  },
  save: (selectedId: number[]) => {
    const value = JSON.stringify(selectedId);
    localStorage.setItem(STORAGE_KEY, value);
  },
  remove: () => {
    localStorage.removeItem(STORAGE_KEY);
  },
};
