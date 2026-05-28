import { Injectable } from '@angular/core';
import { provideTransloco, TranslocoLoader } from '@jsverse/transloco';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TestingLoader implements TranslocoLoader {
  getTranslation(lang: string) {
    return of({});
  }
}

export function provideTranslocoTesting() {
  return provideTransloco({
    config: {
      availableLangs: ['en', 'ja', 'id'],
      defaultLang: 'en',
    },
    loader: TestingLoader
  });
}
