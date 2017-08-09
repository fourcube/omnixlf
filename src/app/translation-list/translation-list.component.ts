import { CurrencyPipe } from '@angular/common/src/pipes/number_pipe';
import { TranslationUnit } from '../model';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

interface GroupedTranslationUnit {
  context: string;
  translationUnits: TranslationUnit[];
}

@Component({
  selector: 'app-translation-list',
  templateUrl: './translation-list.component.html',
  styleUrls: ['./translation-list.component.scss']
})
export class TranslationListComponent implements OnInit {
  @Input() translationUnits: TranslationUnit[];

  @Output() translationUnitSelected = new EventEmitter<TranslationUnit>();

  currentUnit: TranslationUnit;

  constructor() { }

  ngOnInit() {

  }

  public isSelected(tu: TranslationUnit) {
    if (!this.currentUnit) {
      return false;
    }

    return tu.id === this.currentUnit.id;
  }

  public selectTranslationUnit(translationUnit: TranslationUnit) {
    this.currentUnit = translationUnit;
    this.translationUnitSelected.emit(translationUnit);
  }

  public get groupedTranslationUnits(): GroupedTranslationUnit[] {
    const grouped = this.translationUnits.reduce((acc, tu) => {
      const group = acc[tu.context] || {context: tu.context, translationUnits: []};

      group.translationUnits.push(tu);
      acc[tu.context] = group;

      return acc;
    }, {} as GroupedTranslationUnit);

    return Object.keys(grouped).map((key) => {
      return grouped[key];
    })
    .sort((a: GroupedTranslationUnit, b: GroupedTranslationUnit) => {
      if (a.context > b.context) { return 1; }
      if (a.context < b.context) { return -1; }
      return 0;
    });
  }

}
