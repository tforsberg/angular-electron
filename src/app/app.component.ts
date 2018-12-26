import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { TranslateService } from '@ngx-translate/core';

import { filter, switchMap, debounceTime, catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';


import { ElectronService } from './providers/electron.service';
import { AppConfig } from '../environments/environment';
import { User } from './models/user.model';
import { GithubService } from './services/github.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  findControl = new FormControl();

  error = false;

  user: User = null;


  constructor(
      public electronService: ElectronService,
      private translate: TranslateService,
      private githubService: GithubService) {

    translate.setDefaultLang('en');
    console.log('AppConfig', AppConfig);

    if (electronService.isElectron()) {
      console.log('Mode electron');
      console.log('Electron ipcRenderer', electronService.ipcRenderer);
      console.log('NodeJS childProcess', electronService.childProcess);
    } else {
      console.log('Mode web');
    }
  }

  ngOnInit() {
    this.findControl.valueChanges
      .pipe(
        // Фильтруем если введено меньше двух символов
        filter(value => value.length > 2),
        // Ставим задержку одну секунду
        debounceTime(1000),
        // Запрашиваем данные пользователя
        switchMap(value =>
          this.githubService.getUser(value).pipe(
            // Обработка ошибок
            catchError(err => {
              this.user = null;
              this.error = true;
              return EMPTY;
            })
          )
        )
      )
      // Получение данных
      .subscribe(user => {
        this.user = user;
        this.error = false;
      });
  }

}
