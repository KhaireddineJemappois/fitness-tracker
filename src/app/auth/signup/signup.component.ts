import { AuthService } from './../auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/shared/ui.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit,OnDestroy {
  maxDate:any;
  uiSubs!:Subscription;
  isLoading: boolean = false;
  constructor(private authService:AuthService, private uiService: UiService) {}
  ngOnDestroy(): void {
    this.uiSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear()-18);
    this.uiSubs=this.uiService.loadingStateChanged.subscribe(
      (isLoading) => (this.isLoading = isLoading)
    );
  }
  onSubmit(form: NgForm) {
    this.authService.registerUser({
      email:form.value.email,
      password:form.value.password
    })
  }
}
