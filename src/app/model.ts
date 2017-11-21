import { transition } from '@angular/core/src/animation/dsl';
import { Observable } from 'rxjs/Rx';
import xml2js from 'xml2js';

export class OmnixlfFile {
  public path: string;
}

export interface TranslationUnit {
  id: string;
  hint?: string;
  context?: string;
  source: any;
  target?: any;
}

export class OmnixlfFileWithData extends OmnixlfFile {
  public filename: string;
  public data: any;
  public xml: string;

  parse(): Promise<any> {
    const result = new Promise((resolve, reject) => {
      xml2js.parseString(this.xml, (err, data) => {
        if (err) {
          return reject(err);
        }

        this.data = data;
        resolve();
      });
    });

    return result;
  }

  toXML() {
    const builder = new xml2js.Builder();
    return builder.buildObject(this.data);
  }

  getRawTranslationUnits() {
    if (!this.data) {
      return [];
    }

    const xliff = this.data.xliff;
    const file = xliff.file[0];
    const body = file.body[0];
    const transUnits = body['trans-unit'] || [];

    return transUnits;
  }

  getTranslationUnits() {
    if (!this.data) {
      return [];
    }

    const xliff = this.data.xliff;
    const file = xliff.file[0];
    const body = file.body[0];
    const transUnits = body['trans-unit'] || [];

    return transUnits.map(this._mapXliffTransUnitToTranslationUnit);
  }

  get hasUntranslatedStrings(): boolean {
    const translationUnits = this.getTranslationUnits();

    return translationUnits.some((u) => {
      return (typeof u.target._ !== 'object') && (u.target._.trim() === '');
    });
  }

  updateTranslation (id: string, translation) {
    const units = this.getRawTranslationUnits();

    const unit = units.find((u) => u.$.id === id);

    if (!unit) {
      console.warn('Unknown unit', id);
      return;
    }

    translation.$.state = 'translated';
    unit.target[0] = translation;
  }

  private _mapXliffTransUnitToTranslationUnit(transUnit: any): TranslationUnit {
    const note = transUnit.note || [];
    let hint = note.length > 0 ? note[0] : '';
    let context = note.length > 1 ? note[1] : '';
    let target = (transUnit.target || [])[0];
    let source = transUnit.source[0];

    if (typeof target === 'string') {
      target = {
        $: {},
        _: target
      };
    } else if (target) {
      target.$ = target.$ || '';
      target._ = target._ || '';
    } else {
      target = {
        $: {
          state: 'new'
        },
        _: ''
      };
    }

    // it can happen that the source is actually a nested structure,
    // that contains html elements. We'll try to pick the text and ignore the rest.
    if (typeof source === 'object') {
      console.warn('source of', transUnit, 'is actually an object, trying to use the text');
      source = source._ || '';
    }

    hint = hint ? hint._ : '';
    context = context ? context._ : '';

    return {
      id: transUnit.$.id,
      source,
      context,
      hint,
      target
    };
  }

}

