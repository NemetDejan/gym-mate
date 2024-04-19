import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatListItem, MatListItemIcon, MatListItemTitle, MatNavList} from "@angular/material/list";
import {RouterLink} from "@angular/router";
import { Observable } from "rxjs";
import {AuthService} from "../../auth/auth.service";

import * as fromAppReducer from '../../app.reducer';
import { Store } from "@ngrx/store";
import { AsyncPipe } from "@angular/common";

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
    RouterLink,
    AsyncPipe
  ],
  templateUrl: './sidenav-list.component.html',
  styleUrl: './sidenav-list.component.scss'
})
export class SidenavListComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter<void>();
  isAuth$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private store: Store<fromAppReducer.State>
  ) {
  }


  ngOnInit() {
    this.isAuth$ = this.store.select(fromAppReducer.getIsAuth);
  }

  onSidenavClose() {
    this.sidenavClose.emit();
  }

  onLogout() {
    this.authService.logoutUser();
  }
}
