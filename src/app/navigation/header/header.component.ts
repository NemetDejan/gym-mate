import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { AsyncPipe } from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatToolbar} from "@angular/material/toolbar";
import {RouterLink} from "@angular/router";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";

import {AuthService} from "../../auth/auth.service";
import * as fromAppReducer from '../../app.reducer';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatIcon,
    MatIconButton,
    MatToolbar,
    RouterLink,
    AsyncPipe
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private store: Store<fromAppReducer.State>
  ) {
  }


  ngOnInit() {
    this.isAuth$ = this.store.select(fromAppReducer.getIsAuth)
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onLogout() {
    this.authService.logoutUser();
  }
}
