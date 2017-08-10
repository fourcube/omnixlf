import { LastFilesService } from './last-files.service';
import { LoadingService } from './loading.service';
import { OmnixlfFileWithData } from './model';
import { BehaviorSubject, Observable, Subject } from 'rxjs/Rx';
import { Injectable, NgZone } from '@angular/core';

const fs = (window as any).require('fs');
const path = (window as any).require('path');
import humane from 'humane-js';


@Injectable()
export class TranslationEditorService {
  private _file: BehaviorSubject<OmnixlfFileWithData> = new BehaviorSubject(null);
  private unsavedChanges = false;

  public get file$() {
    return this._file.asObservable().filter(f => !!f);
  }

  constructor(
    private loadingService: LoadingService,
    private lastFilesService: LastFilesService,
    private zone: NgZone
  ) { }

  public get hasUnsavedChanges() {
    return this.unsavedChanges;
  }

  showOpenDialog() {
    const result = new Subject<string>();
    this.loadingService.setLoading();
    const { dialog } = (window as any).require('electron').remote;

    dialog.showOpenDialog({
      filters: [
        { name: 'XLF', extensions: ['xlf', 'xliff'] }
      ]
    }, (paths) => {
      this.zone.run(() => {
        if (paths) {
          const _path = paths[0];
          this.lastFilesService.putLastUsedFile(_path);

          result.next(_path);
        } else {
          result.error('no path selected');
          this.loadingService.done();
        }
      });
    });

    return result;
  }

  /**
   * Synchronously load file from filePath.
   * @param filePath filepath to load
   */
  load(filePath: string) {
    let data;

    try {
      data = fs.readFileSync(filePath);
    } catch (e) {
      humane.log('Failed to open file.', {addnCls: 'humane-error'});
      this.loadingService.done();
      return Observable.throw('failed to open file');
    }

    const file = new OmnixlfFileWithData();

    file.path = filePath;
    file.filename = path.basename(filePath);
    file.xml = data;

    return Observable.fromPromise(file.parse())
      .catch((error) => {
        humane.log('Failed to parse XLF file.', {addnCls: 'humane-error'});
        this.loadingService.done();
        return Observable.throw('failed to parse file');
      })
      .flatMap(() => {
        this._file.next(file);
        this.unsavedChanges = false;
        return this.file$;
      });
  }

  update(translationUnitId: string, translation: string) {
    const file = this._file.getValue();

    file.updateTranslation(translationUnitId, translation);
    this.unsavedChanges = true;

    this._file.next(file);
  }

  save() {
    this.loadingService.setLoading();
    const file = this._file.getValue();

    const data = file.toXML();

    try {
      fs.writeFileSync(file.path, data);
      humane.log('File saved.');
      this.unsavedChanges = false;
    } catch (e) {
      humane.error('Failed to save changes.', {addnCls: 'humane-error'});
    } finally {
      this.loadingService.done();
    }


  }

}
