import { Injectable } from '@angular/core';
import { TranslationEditorService } from './translation-editor.service';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { OmnixlfFileWithData } from './model';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class TranslationFileResolver implements Resolve<OmnixlfFileWithData> {
  constructor(private translationEditorService: TranslationEditorService, private router: Router) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    OmnixlfFileWithData |
    Observable<OmnixlfFileWithData> |
    Promise<OmnixlfFileWithData> {
      const path = atob(route.params['path']);

      return this.translationEditorService
        .load(path)
        .catch((e) => {
          return this.router.navigateByUrl('/');
        })
        .first();
  }
}
