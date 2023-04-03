import { State } from './../../app.reducer';

import { Observable, Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UiService } from 'src/app/shared/ui.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isLoading$!:Observable<boolean>;
  loginForm: FormGroup;
  onSubmit() {
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    });
  }
  error: string | null = null;
  uiSubs!: Subscription;
  constructor(private authService: AuthService,private store:Store<fromRoot.State>) {
    this.loginForm = new FormGroup({
      email: new FormControl('', { validators: [Validators.email] }),
      password: new FormControl('', { validators: [Validators.required] }),
    });
  }

  authSub!: Subscription;
  ngOnInit(): void {
    this.isLoading$=this.store.select(fromRoot.getIsLoading);
    // this.store.subscribe(data=>console.log(data));
    // this.uiSubs = this.uiService.loadingStateChanged.subscribe(
    //   (isLoading) => (this.isLoading = isLoading)
    // );
  }
  // ngOnDestroy(): void {
  //   this.authSub?.unsubscribe();
  //   this.uiSubs?.unsubscribe();
  // }
}
