import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppService } from 'src/app/app.service';
import { logout } from 'src/app/store/actions/auth.actions';
import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-admin-index',
  templateUrl: './admin-index.component.html',
  styleUrls: [
    // '../../../../vendor/styles/pages/authentication.scss',
    '../../../../vendor/styles/pages/contacts.scss',
    './admin-index.component.css'
  ]
})
export class AdminIndexComponent implements OnInit, OnDestroy {

  isExpanded = false;
  isRTL: boolean;
  public search = '';

  constructor(
    private appService: AppService,
    private store: Store<AppState>,
  ) {
    this.appService.pageTitle = 'Home';
    this.isRTL = appService.isRTL;
  }

  ngOnDestroy() {
  }


  ngOnInit(): void {
  }

  logout() {
    this.store.dispatch(logout());
  }

  buscar(search: string) {
    this.search = search;
  }






}
