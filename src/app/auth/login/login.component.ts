import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy {

  loginForm: FormGroup;
  onSubmit() {
    this.authService.login({
      email:this.loginForm.value.email,
      password:this.loginForm.value.password
    })
}
  error:string|null=null
  constructor(private authService:AuthService) {
    this.loginForm = new FormGroup({
      email:new FormControl('',{validators:[Validators.email]}),
      password:new FormControl('',{validators:[Validators.required]})
    });
  }

  authSub!:Subscription;
  ngOnInit(): void {
    this.authSub = this.authService.authError.subscribe((error) => {
      debugger;
      this.error=error;
    });

  }
  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }

}
