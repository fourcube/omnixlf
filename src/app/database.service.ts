import { Injectable } from '@angular/core';
import Dexie from 'dexie';

@Injectable()
export class DatabaseService {
  db: any;

  constructor() {
    this.db = new Dexie('omnixlf');

    this.db.version(1).stores({
      lastFiles: '&path'
    });
  }

  public get lastFiles() {
    return this.db.lastFiles;
  }

}
