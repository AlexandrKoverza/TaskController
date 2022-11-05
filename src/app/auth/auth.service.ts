import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthResponse, NewUser, UserAuth } from '../models/user';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userName$$: BehaviorSubject<string> = new BehaviorSubject<string>(sessionStorage.getItem('name') || '');

  userName$ = this.userName$$.asObservable();

  constructor(
    private http: HttpClient
  ) {
  }

  get isAuthorized(): boolean {
    return !!sessionStorage.getItem('accessToken');
  }

  registration(data: NewUser): Observable<void> {
    return this.http.post<AuthResponse>('http://localhost:3000/users', data)
      .pipe(
        map(data => this.setData(data))
      )
  }

  login(data: UserAuth) {
    return this.http.post<AuthResponse>('http://localhost:3000/login', data)
      .pipe(
        map(data => this.setData(data))
      )
  }

  logout() {
    sessionStorage.clear();
    this.userName$$.next('');
  }

  private setData({ accessToken, user }: AuthResponse) {
    const { name } = user;

    sessionStorage.setItem('accessToken', accessToken);
    sessionStorage.setItem('name', name);

    this.userName$$.next(name);
  }
}
