import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from './app.component';


import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { AttendanceComponent } from './pages/attendance/attendance.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { PupilsManagementComponent } from './pages/pupils-management/pupils-management.component';

import { AngularFireModule } from 'angularfire2';


import { AF } from "./providers/af";
import { RegistrationComponent } from './pages/registration/registration.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { UsersConfirmComponent } from './pages/users-confirm/users-confirm.component';
import { LoadingComponent } from './pages/loading/loading.component';
import { InsertComponent } from './helping/insert/insert.component';

// ======================================================
// Initialize Firebase 

  export const firebaseConfig = 
  {
    apiKey: "AIzaSyALUkgtATRDcoX5c3AeLvLX_JLkrTXJS4c",
    authDomain: "application-d2061.firebaseapp.com",
    databaseURL: "https://application-d2061.firebaseio.com",
    projectId: "application-d2061",
    storageBucket: "application-d2061.appspot.com",
    messagingSenderId: "1005060683377"
  };

// ======================================================

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'attendance', component: AttendanceComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'messages', component: MessagesComponent },
  { path: 'pupils-management', component: PupilsManagementComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'users-confirm', component: UsersConfirmComponent },
  { path: 'loading', component: LoadingComponent }
];

// ======================================================

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MessagesComponent,
    AttendanceComponent,
    ReportsComponent,
    PupilsManagementComponent,
    RegistrationComponent,
    PageHeaderComponent,
    UsersConfirmComponent,
    LoadingComponent,
    InsertComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [ AF ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
