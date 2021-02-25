import { BehaviorSubject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { User } from './model/user.model';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;

  user$: Observable<User>;

  constructor(private auth: AuthService) {


  }
  ngOnInit(): void {
    this.isLoggedIn$ = this.auth.isLoggedIn$;
    this.isLoggedOut$ = this.auth.isLoggedOut$;

  }









}
