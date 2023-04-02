import { AuthService } from './../../auth/auth.service';
import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth: boolean = false;
  authSub: Subscription | undefined;

  constructor(private authService: AuthService) {}
  ngOnDestroy(): void {
    this.authSub?.unsubscribe();
  }

  ngOnInit() {
    this.authSub = this.authService.authChange.subscribe((status) => {
      debugger;
      this.isAuth = status;
    });
  }
  onToggleSidenav() {
    this.sidenavToggle.emit();
  }
  onLogout(){
    this.authService.logOut();
  }
}
