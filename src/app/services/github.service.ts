import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../models/user.model';
import { Repo } from '../models/repo.model';

@Injectable()
export class GithubService {

  _user: any;
  _repo: any;
  _repos: Array<Repo>;

  // Подключаем модуль для работы с http
  constructor(private http: HttpClient) {}

  // Метод для запроса пользователя
  getUser(name: string): Observable<User> {
    const url = `https://api.github.com/users/${name}`;
    this._user = this.http.get<User>(url);
    return this._user;
  }

  getRepo(repo: string): Observable<Repo> {
    const url = this._user.repos_url;
    this._repo = this.http.get<Repo>(url);
    return this._repo;
  }
}
