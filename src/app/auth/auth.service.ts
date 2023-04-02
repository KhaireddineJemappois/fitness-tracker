import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthData } from './auth-data.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { TrainingService } from '../training/training.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private router: Router,
    private trainingService: TrainingService,
    private afAuth: AngularFireAuth
  ) {}
  authChange = new Subject<boolean>();
  authError = new Subject<string>();
  private isAuthenticated = false;
  registerUser(authData: AuthData) {
    this.afAuth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then((success) => {})
      .catch((err) => console.error(err));
  }
  initAuthListener() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.authChange.next(true);
        this.isAuthenticated = true;
        this.router.navigate(['/training']);
      } else {
        this.trainingService.cancelSubs();
        this.isAuthenticated = false;
        this.authChange.next(false);
        this.router.navigate(['/login']);
      }
    });
  }

  login(authData: AuthData) {
    debugger;
    this.afAuth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then((success) => {})
      .catch((err) => this.authFailed(err));
  }
  logOut() {
    this.afAuth.signOut();
  }
  isAuth = () => this.isAuthenticated;

  private authFailed(error: string) {
    this.authError.next(error);
    this.isAuthenticated = false;
  }
}
