import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UiService } from 'src/app/shared/ui.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  loginForm: FormGroup;
  onSubmit() {
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    });
  }
  error: string | null = null;
  uiSubs!:Subscription;
  constructor(private authService: AuthService, private uiService: UiService) {


    this.loginForm = new FormGroup({
      email: new FormControl('', { validators: [Validators.email] }),
      password: new FormControl('', { validators: [Validators.required] }),
    });
  }

  authSub!: Subscription;
  ngOnInit(): void {
    this.uiSubs=this.uiService.loadingStateChanged.subscribe(
      (isLoading) => (this.isLoading = isLoading)
    );
  }
  ngOnDestroy(): void {
    this.authSub.unsubscribe();
    this.uiSubs.unsubscribe();
  }
}
