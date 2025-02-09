'use client';

import { QueryClient } from '@tanstack/react-query';
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

    if (typeof window !== 'undefined') {
      this._authToken = localStorage.getItem('authToken') ?? '';
      this._refreshToken = localStorage.getItem('refreshToken') ?? '';
    }

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

    if (typeof window !== 'undefined') {
      localStorage.setItem('authToken', authToken);
      localStorage.setItem('refreshToken', refreshToken);
    }
  }

  public logout() {
    this._authToken = '';
    this._refreshToken = '';
    this._isAuthenticated = false;

    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
    }

    this.queryClient.resetQueries({
      queryKey: ['user'],
      exact: true,
    });
  }
}

export default AuthStore;
