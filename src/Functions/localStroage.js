const LocalStore = (key, data = null, need = "GET") => {
  switch (need) {
    case "GET":
      const item = localStorage.getItem(key);
      try {
        return JSON.parse(item);
      } catch {
        return item;
      }

    case "SET":
      if (data !== null) {
        const value = typeof data === "string" ? data : JSON.stringify(data);
        localStorage.setItem(key, value);
      }
      break;

    default:
      console.warn("Invalid action provided to LocalStore");
  }
};

export default LocalStore;
