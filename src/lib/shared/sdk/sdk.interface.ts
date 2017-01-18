export interface SDK {
  init: Function;
  api: Function;
  getLoginStatus: Function;
  login: Function;
  logout: Function;
  getAuthResponse: Function;
  Event: {
    subscribe: Function;
    unsubscribe: Function;
  };
}
