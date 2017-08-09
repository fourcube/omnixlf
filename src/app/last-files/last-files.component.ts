import { LoadingService } from '../loading.service';
import { Router } from '@angular/router';
import { OmnixlfFile } from '../model';
import { Observable } from 'rxjs/Rx';
import { LastFilesService } from '../last-files.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-last-files',
  templateUrl: './last-files.component.html',
  styleUrls: ['./last-files.component.scss']
})
export class LastFilesComponent implements OnInit {
  public files$: Observable<OmnixlfFile[]>;

  constructor (
    private lastFilesService: LastFilesService,
    private loadingService: LoadingService,
    private router: Router
  ) {
    this.files$ = lastFilesService.lastFiles$;
  }

  clearList() {
    this.lastFilesService.clear();
  }

  ngOnInit() {
  }

  editFile(file: OmnixlfFile) {
    this.loadingService.setLoading();
    this.router
      .navigate(['translation-editor', btoa(file.path)])
      .then(() => {
        this.loadingService.done();
      });
  }

  get hasLastFiles() {
    return this.files$.map((fs) => fs.length > 0);
  }
}
