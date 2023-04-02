import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthData } from './auth-data.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { TrainingService } from '../training/training.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UiService } from '../shared/ui.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private router: Router,
    private trainingService: TrainingService,
    private afAuth: AngularFireAuth,
    private snackBar: MatSnackBar,
    private uiService:UiService
  ) {}
  authChange = new Subject<boolean>();
  private isAuthenticated = false;
  registerUser(authData: AuthData) {
    this.uiService.loadingStateChanged.next(true)
    this.afAuth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then((success) => {})
      .catch((error) =>
        this.snackBar.open(error.message, undefined, { duration: 3000 })
      )
      .finally(()=>
      this.uiService.loadingStateChanged.next(false)
    );;
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
    this.uiService.loadingStateChanged.next(true);
    this.afAuth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then((success) => {})
      .catch((error) => {
        debugger;
        this.snackBar.open(error.message, undefined, { duration: 3000 });
      })
      .finally(()=>
        this.uiService.loadingStateChanged.next(false)
      );
  }
  logOut() {
    this.afAuth.signOut();
  }
  isAuth = () => this.isAuthenticated;
}
