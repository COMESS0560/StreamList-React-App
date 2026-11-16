
export function readStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);

    if (raw === null) {
      return fallback;
    }

    const savedData = JSON.parse(raw);

    // Make sure saved data matches the expected type.
    if (Array.isArray(fallback)) {
      return Array.isArray(savedData) ? savedData : fallback;
    }

    if (typeof savedData !== typeof fallback || savedData === null) {
      return fallback;
    }

    return savedData;
  } catch (error) {
    console.warn('Unable to read saved data:', error);
    return fallback;
  }
}

export function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn('Local storage is unavailable:', error);
  }
}
