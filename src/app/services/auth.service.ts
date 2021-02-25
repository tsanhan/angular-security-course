import { map, shareReplay, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../model/user.model';
import { of } from 'rxjs';

export const ANONYMUS_USER: User = {
  id: undefined,
  email: ''
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private subject = new BehaviorSubject<User>(ANONYMUS_USER);
  user$: Observable<User> = this.subject.asObservable();
  isLoggedIn$: Observable<boolean> = this.user$.pipe(map(user => !!user.id));
  isLoggedOut$: Observable<boolean> = this.isLoggedIn$.pipe(map(isLoggedIn => !isLoggedIn));

  constructor(private http: HttpClient) { }

  signup(email: string, password: string) {
    return this.http.post<User>('/api/signup', { email, password }).pipe(
      shareReplay(),
      tap(user => this.subject.next(user)));

  }
}


