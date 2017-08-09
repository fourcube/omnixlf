import { BehaviorSubject } from 'rxjs/Rx';
import { Injectable } from '@angular/core';

@Injectable()
export class LoadingService {
  private _loading = new BehaviorSubject(false);

  public get loading$() {
    return this._loading.asObservable();
  }

  constructor() { }

  public setLoading() {
    this._loading.next(true);
  }

  public done() {
    this._loading.next(false);
  }

}
