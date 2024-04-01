import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatListItem, MatListItemIcon, MatListItemTitle, MatNavList} from "@angular/material/list";
import {RouterLink} from "@angular/router";
import {Subscription} from "rxjs";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-sidenav-list',
  standalone: true,
    imports: [
        MatIcon,
        MatIconButton,
        MatListItem,
        MatListItemIcon,
        MatListItemTitle,
        MatNavList,
        RouterLink
    ],
  templateUrl: './sidenav-list.component.html',
  styleUrl: './sidenav-list.component.scss'
})
export class SidenavListComponent implements OnInit, OnDestroy {
  @Output() sidenavClose = new EventEmitter<void>();
  isAuth: boolean = false;
  authSubscription!: Subscription;

  constructor(private authService: AuthService) {
  }


  ngOnInit() {
    this.authSubscription = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    });
  }

  onSidenavClose() {
    this.sidenavClose.emit();
  }

  onLogout() {
    this.authService.logoutUser();
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

}
