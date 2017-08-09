import { Injectable } from '@angular/core';
import { TranslationEditorService } from './translation-editor.service';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { OmnixlfFileWithData } from './model';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class TranslationFileResolver implements Resolve<OmnixlfFileWithData> {
  constructor(private translationEditorService: TranslationEditorService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    OmnixlfFileWithData |
    Observable<OmnixlfFileWithData> |
    Promise<OmnixlfFileWithData> {
      const path = atob(route.params['path']);

      return this.translationEditorService
        .load(path)
        .first();
  }
}
