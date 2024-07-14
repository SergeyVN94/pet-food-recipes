import { makeAutoObservable } from 'mobx';

class AuthStore {
  private _authToken = '';
  private _refreshToken = '';

  constructor() {
    makeAutoObservable(this);
  }

  public get authToken(): string {
    return this._authToken;
  }

  public set authToken(v: string) {
    this._authToken = v;
  }

  public get refreshToken(): string {
    return this._refreshToken;
  }

  public set refreshToken(v: string) {
    this._refreshToken = v;
  }
}

export default AuthStore;
