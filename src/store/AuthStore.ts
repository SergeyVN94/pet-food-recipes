import { QueryClient } from '@tanstack/react-query';
import { deleteCookie, getCookie, setCookie } from 'cookies-next/client';
import { makeAutoObservable } from 'mobx';

import { RootStore } from '.';

class AuthStore {
  private _authToken = '';
  private _refreshToken = '';
  private _isAuthenticated = false;

  constructor(
    private readonly rootStore: RootStore,
    private readonly queryClient: QueryClient,
  ) {
    makeAutoObservable(this);

    this._authToken = getCookie('authToken') ?? '';
    this._refreshToken = getCookie('refreshToken') ?? '';
    this._isAuthenticated = !!this._authToken;
  }

  public get isAuthenticated() {
    return this._isAuthenticated;
  }

  public get authToken() {
    return this._authToken;
  }

  public get refreshToken() {
    return this._refreshToken;
  }

  public login(authToken: string, refreshToken: string) {
    this._authToken = authToken;
    this._refreshToken = refreshToken;
    this._isAuthenticated = true;

    setCookie('authToken', authToken);
    setCookie('refreshToken', refreshToken);
  }

  public logout() {
    this._authToken = '';
    this._refreshToken = '';
    this._isAuthenticated = false;

    deleteCookie('authToken');
    deleteCookie('refreshToken');

    this.queryClient.resetQueries({
      queryKey: ['user'],
      exact: true,
    });
  }
}

export default AuthStore;
