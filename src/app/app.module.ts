// =================
// ===  Angular  ===
// =================
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

// import { FormControl } from '@angular/forms';

// ======================
// ===  NG Translate  ===
// ======================
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


// ===============
// ===  Wijmo  ===
// ===============
import { WjGridModule } from 'wijmo/wijmo.angular2.grid';
import { WjChartModule } from 'wijmo/wijmo.angular2.chart';


// ===============
// ===  OTHER  ===
// ===============
import 'reflect-metadata';
import '../polyfills';


// =======================
// ===  Local Modules  ===
// =======================
import { GoogleMaterialDesignModule } from './modules/google-material-design.module';
import { AppRoutingModule } from './app-routing.module';


// ========================
// ===  Local Services  ===
// ========================
import { ElectronService } from './providers/electron.service';
import { GithubService } from './services/github.service';


// ==========================
// ===  Local Directives  ===
// ==========================
import { WebviewDirective } from './directives/webview.directive';


// =========================
// ===  Local Components ===
// =========================
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { UserComponent } from './components/user/user.component';
import { ErrorComponent } from './components/error/error.component';


// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WebviewDirective,
    MainNavComponent,
    UserComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    GoogleMaterialDesignModule,
    ReactiveFormsModule,

    WjGridModule, WjChartModule,  // Wijmo Modules

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    })
  ],
  providers: [ElectronService, GithubService],
  bootstrap: [AppComponent]
})
export class AppModule { }
