import { makeAutoObservable } from 'mobx';

class AuthStore {
  private _authToken = '';
  private _refreshToken = '';
  private _userName = '';
  private _email = '';

  constructor() {
    makeAutoObservable(this);
  }

  public get authToken() {
    return this._authToken;
  }

  public set authToken(v: string) {
    this._authToken = v;
  }

  public get refreshToken() {
    return this._refreshToken;
  }

  public set refreshToken(v: string) {
    this._refreshToken = v;
  }

  public get userName() {
    return this._userName;
  }

  public set userName(v: string) {
    this._userName = v;
  }

  public get email() {
    return this._email;
  }

  public set email(v: string) {
    this._email = v;
  }
}

export default AuthStore;
