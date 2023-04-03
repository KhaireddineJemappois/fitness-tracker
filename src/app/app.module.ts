import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { environment } from './../environments/environment';
import { AuthService } from './auth/auth.service';
import { MaterialModule } from './material/material.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import AppComponent from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { UiService } from './shared/ui.service';
import { AuthModule } from './auth/auth.module';
//is now lazily loaded => remove from imports import { TrainingModule } from './training/training.module';
import { StoreModule } from '@ngrx/store';
import { reducers } from './app.reducer';
@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent,
  ],
  imports: [
    StoreModule.forRoot(reducers),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,//auth needs it to instantiate training service that is lazily loaded
    AuthModule
  ],
  providers: [AuthService, UiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
