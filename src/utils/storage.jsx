export const saveData = (key, value) => {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };
  
  export const getData = (key) => {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  };