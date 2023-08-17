interface Window {
  Clerk: {
    session: {
      getToken: () => Promise<string>;
    };
    load: () => Promise<void>;
  };
}
