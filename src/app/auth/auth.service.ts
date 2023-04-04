import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthData } from './auth-data.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { TrainingService } from '../training/training.service';
import { UiService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer'
import * as UI from '../shared/ui.actions'
import * as Auth from '../auth/auth.actions'
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private router: Router,
    private trainingService: TrainingService,
    private afAuth: AngularFireAuth,
    private uiService: UiService,
    private store:Store<{ui:fromRoot.State}>
  ) {}
  registerUser(authData: AuthData) {
    // this.uiService.loadingStateChanged.next(true);
    this.store.dispatch(new UI.StartLoading());
    this.afAuth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then((success) => {})
      .catch((error) =>
        this.uiService.showSnackBar(error.message, undefined, 3000)
      )
      .finally(() =>
      //  this.uiService.loadingStateChanged.next(false)
      this.store.dispatch(new UI.StopLoading())
       );
  }
  initAuthListener() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        // this.authChange.next(true);
        // this.isAuthenticated = true;
        this.store.dispatch(new Auth.SetAuthenticated())
        this.router.navigate(['/training']);
      } else {
        this.trainingService.cancelSubs();
        this.store.dispatch(new Auth.SetUnauthenticated())

        this.router.navigate(['/login']);
      }
    });
  }

  login(authData: AuthData) {
    // this.uiService.loadingStateChanged.next(true);
    this.store.dispatch(new UI.StartLoading());
    this.afAuth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then((success) => {})
      .catch((error) => {
        ;
        this.uiService.showSnackBar(error.message, undefined,  3000);
      })
      .finally(() =>
      //  this.uiService.loadingStateChanged.next(false)
       this.store.dispatch(new UI.StopLoading())
       );
  }
  logOut() {
    this.afAuth.signOut();
  }
}
