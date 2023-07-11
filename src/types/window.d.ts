interface Window {
  Clerk: {
    session: {
      getToken: () => Promise<string>;
    };
  };
}
