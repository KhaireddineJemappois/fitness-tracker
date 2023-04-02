import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthData } from './auth-data.model';
import { User } from './user.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { TrainingService } from '../training/training.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router,
    private trainingService:TrainingService
    , private afAuth: AngularFireAuth) {}
  authChange = new Subject<boolean>();
  authError = new Subject<string>()
  private user: User | null = null;
  private isAuthenticated = false;
  registerUser(authData: AuthData) {
    this.afAuth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then((success) => {
        this.authSuccessfully();
      })
      .catch((err) => console.error(err));
  }

  login(authData: AuthData) {
    debugger;
    this.afAuth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then((success) => {
        debugger;
        this.authSuccessfully();
      })
      .catch((err) => this.authFailed(err));

  }
  logOut() {
    this.trainingService.cancelSubs();
    this.afAuth.signOut();
    this.isAuthenticated=false;
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }
  isAuth=()=>this.isAuthenticated;
  private authSuccessfully() {
    this.authChange.next(true);
    this.isAuthenticated=true;
    this.router.navigate(['/training']);
  }
  private authFailed(error:string) {
    this.authError.next(error);
    this.isAuthenticated=false;
  }
}
