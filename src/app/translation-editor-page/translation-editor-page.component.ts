import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OmnixlfFileWithData, TranslationUnit } from '../model';
import { TranslationEditorService } from '../translation-editor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, OnInit } from '@angular/core';
const { ipcRenderer } = (window as any).require('electron');

import Split from 'split.js';
import vex from 'vex-js';
import vexDialog from 'vex-dialog';

vex.registerPlugin(vexDialog);
vex.defaultOptions.className = 'vex-theme-os';

@Component({
  selector: 'app-translation-editor-page',
  templateUrl: './translation-editor-page.component.html',
  styleUrls: ['./translation-editor-page.component.scss']
})
export class TranslationEditorPageComponent implements OnInit, AfterViewInit, OnDestroy {
  file: OmnixlfFileWithData;
  translationForm: FormGroup;
  translationUnit: TranslationUnit;

  _saveListener: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private translationEditorService: TranslationEditorService,
    private formBuilder: FormBuilder,
    private el: ElementRef,
    private zone: NgZone
  ) {

    activatedRoute.data.subscribe(params => {
      this.file = params['file'];
    });

    this.createForm();
  }

  ngOnInit() {
    this._saveListener = () => this.zone.run(() => this.saveFile());
    ipcRenderer.on('save', this._saveListener);
  }

  saveFile() {
    this.translationEditorService.save();
  }

  ngOnDestroy() {
    ipcRenderer.removeListener('save', this._saveListener);
  }

  ngAfterViewInit() {
    const sidePanelEl = this.el.nativeElement.querySelector('#side-panel');
    const mainEl = this.el.nativeElement.querySelector('#main');

    console.log(sidePanelEl);

    const split = new Split([sidePanelEl, mainEl], {
      sizes: [25, 75],
      minSize: [100, 300],
      snapOffset: 0,
      gutterSize: 10,
      direction: 'horizontal'
    });
  }

  public onSubmit() {
    if (!this.translationForm.valid) {
      return;
    }

    this.translationUnit.target._ = this.translationForm.value.target;
    this.translationEditorService.update(this.translationUnit.id, this.translationUnit.target);
  }

  public onUseSource() {
    const props = {
      target: this.translationUnit.source.trim()
    };

    this.translationForm.setValue(props);
  }

  public editTranslationUnit(translationUnit: TranslationUnit) {
    this.translationUnit = translationUnit;

    const props = {
      target: translationUnit.target._.trim()
    };

    this.translationForm.setValue(props);
  }

  get translationUnits() {
    return this.file.getTranslationUnits();
  }

  public get hasUnsavedChanges() {
    return this.translationEditorService.hasUnsavedChanges;
  }

  back() {
    if (this.translationEditorService.hasUnsavedChanges) {
      vex.dialog.confirm({
        message: 'You have unsaved changes. Do you want to go back?',
        callback: (value) => {
          if (value) {
            this.router.navigate(['../']);
          } else {
          }
        }
      });
    } else {
      this.router.navigate(['../']);
    }
  }

  private createForm() {
    this.translationForm = this.formBuilder.group({
      target: ['', Validators.required]
    });
  }

}
