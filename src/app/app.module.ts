import { ReactiveFormsModule } from '@angular/forms';
import { TranslationFileResolver } from './translation-file-resolver';
import { LoadingService } from './loading.service';
import { TranslationEditorService } from './translation-editor.service';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { RouterModule } from '@angular/router';
import { DatabaseService } from './database.service';
import { LastFilesService } from './last-files.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LastFilesComponent } from './last-files/last-files.component';
import { TranslationEditorPageComponent } from './translation-editor-page/translation-editor-page.component';
import { TranslationListComponent } from './translation-list/translation-list.component';
import { AboutPageComponent } from './about-page/about-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LastFilesComponent,
    WelcomePageComponent,
    TranslationEditorPageComponent,
    TranslationListComponent,
    AboutPageComponent
  ],
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        component: WelcomePageComponent
      },
      {
        path: 'about',
        component: AboutPageComponent
      },
      {
        path: 'translation-editor/:path',
        component: TranslationEditorPageComponent,
        resolve: {
          file: TranslationFileResolver
        }
      }
    ]),
    ReactiveFormsModule,
    BrowserModule
  ],
  providers: [
    DatabaseService,
    LastFilesService,
    LoadingService,
    TranslationEditorService,
    TranslationFileResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
