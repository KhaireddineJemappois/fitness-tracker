import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit ,OnDestroy{

  @Output() sidenavClose = new EventEmitter<void>();
  isAuth: boolean = false;
  authSub: Subscription | undefined;

  constructor(private authService: AuthService) { }
  ngOnDestroy(): void {
    this.authSub?.unsubscribe();
  }

  ngOnInit() {
    this.authSub = this.authService.authChange.subscribe((status:boolean) => {
      debugger;
      this.isAuth = status;
    });
  }
  onSidenavClose(){
    this.sidenavClose.emit();
  }
  onLogout(){
    this.authService.logOut();
    this.onSidenavClose();
  }
  }

