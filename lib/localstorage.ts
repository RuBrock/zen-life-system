/**
 * Wrappers on window.localStorage.
 */

/**
 * Silence errors for the function that gets passed in.
 */
const silence =
  <A extends unknown[], R>(func: (...args: A) => R) =>
  (...args: A) => {
    try {
      return func(...args);
    } catch (e) {
      return null;
    }
  };

/**
 * Attempts to retrieve window.localStorage.
 */
const getStorage = () => {
  if (window && window.localStorage) {
    return window.localStorage;
  }
  return null;
};

/**
 * Wrapper on localStorage remove. Errors are silent.
 */
export const remove = (key: string) => {
  try {
    const storage = getStorage();
    if (storage) {
      storage.removeItem(key);
    }
  } catch (e) {}
};

/**
 * Wrapper on localStorage get. Errors are silent.
 */
export const get = (key: string) => {
  try {
    const storage = getStorage();
    if (!storage) {
      return null;
    }

    const item = JSON.parse(storage.getItem(key) || '0');
    if (!item) {
      return null;
    }
    if (item?.ttl && item.ttl + item.now < new Date().getTime()) {
      remove(key);
      return null;
    }
    if (!item?.value) {
      remove(key);
      return null;
    }

    return item.value;
  } catch (e) {
    return null;
  }
};

/**
 * Wrapper on localStorage set. Errors are silent.
 */
export const set = (key: string, value: unknown, ttl?: number | null, now?: number | null) => {
  try {
    const storage = getStorage();
    if (!storage) {
      return;
    }

    storage.setItem(
      key,
      JSON.stringify({
        ttl: ttl || 0,
        now: now || new Date().getTime(),
        value,
      }),
    );
  } catch (e) {
    console.error(e);
  }
};

/**
 * Wrapper on localStorage has.
 */
export const has = (key: string) => !!get(key);
