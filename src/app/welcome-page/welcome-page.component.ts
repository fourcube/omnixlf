import { Observable } from 'rxjs/Rx';
import { LoadingService } from '../loading.service';
import { TranslationEditorService } from '../translation-editor.service';
import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { LastFilesService } from '../last-files.service';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent {

  constructor(
    private lastFilesService: LastFilesService,
    private translationEditorService: TranslationEditorService,
    private loadingService: LoadingService,
    private zone: NgZone,
    private router: Router,
  ) { }

  showOpenDialog() {
    this.translationEditorService
      .showOpenDialog()
      .catch((err) => {
        console.log(err);
        this.loadingService.done();
        return Observable.throw(err);
      })
      .subscribe((path) => {
        this.router
          .navigate(['translation-editor', btoa(path)])
          .then(() => {
            this.loadingService.done();
          });
      });
  }
}
