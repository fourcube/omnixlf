import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { LoadingService } from './loading.service';
import { TranslationEditorService } from './translation-editor.service';
import { LastFilesService } from './last-files.service';
import { Component, NgZone, OnDestroy, OnInit, EventEmitter } from '@angular/core';
const { ipcRenderer } = (window as any).require('electron');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  _onOpenListener: any;
  _onAboutListener: any;

  constructor(
    private loadingService: LoadingService,
    private translationEditorService: TranslationEditorService,
    private router: Router,
    private zone: NgZone
  ) {

  }

  ngOnInit() {
    this._onOpenListener = () => {this.zone.run(() => this.openFile()); };
    ipcRenderer.on('open', this._onOpenListener);

    this._onAboutListener = () => {this.zone.run(() => this.showAbout()); };
    ipcRenderer.on('about', this._onAboutListener);
  }

  ngOnDestroy() {
    ipcRenderer.removeListener('open', this._onOpenListener);
    ipcRenderer.removeListener('about', this._onAboutListener);
  }

  openFile() {
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

  showAbout() {
    this.router.navigate(['about']);
  }

  get isLoading() {
    return this.loadingService.loading$;
  }
}
