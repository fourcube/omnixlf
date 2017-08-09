import { OmnixlfFile } from './model';
import { BehaviorSubject, Observable, Subject } from 'rxjs/Rx';
import { DatabaseService } from './database.service';
import { Injectable } from '@angular/core';

@Injectable()
export class LastFilesService {
  private _lastFiles: BehaviorSubject<OmnixlfFile[]> = new BehaviorSubject([]);

  public get lastFiles$() {
    return this._lastFiles.asObservable();
  }

  constructor(private db: DatabaseService) {
    this.db.lastFiles.toCollection().toArray((files) => {
      this._lastFiles.next(files);
    });
  }

  putLastUsedFile(path: string) {
    this.db.lastFiles.add({path})
      .then(() => {
        const fileList = this._lastFiles.getValue().slice();

        fileList.push({path});

        this._lastFiles.next(fileList);
      })
      .catch((err) => {
        if (err.message !== 'Key already exists in the object store.') {
          console.error(err);
        }
      });
  }

  clear() {
    this.db.lastFiles.clear()
      .then(() => {
        this._lastFiles.next([]);
      });
  }
}
