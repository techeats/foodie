export let clearLocalStorage = (key) => localStorage.removeItem(key);

export let getLocalStorage = (key) => {
    const data = localStorage.getItem(key);
    try {
        return JSON.parse(data); // converts a JSON string into a Javascript Object
    } catch (err) {
        console.error(`Error getting item ${key} from localStoragee`, err);
    }
};

export let setLocalStorage = (key, value) => {
    if (value && typeof (value) === 'string') {
        localStorage.setItem(key, value);
    } else {
        localStorage.setItem(key, JSON.stringify(value)); // convert arrays or objects into strings
    }
};
