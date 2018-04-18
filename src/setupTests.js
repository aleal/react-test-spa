let storage = {}
const localStorageMock = {
    getItem: (key) => {
      return storage[key];
    },
    setItem: (key,value) => {
      storage[key] = value;
    },
    clear: () => {
        storage = {};
    }
};
global.localStorage = localStorageMock