import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SideNavStateModel } from '../models/sidenav-state.model';

@Injectable({
  providedIn: 'root',
})
export class SideNavStateService {
  private sideNavStateSubject$ = new BehaviorSubject<SideNavStateModel>({
    stage: 2,
    direction: 'closing',
  });
  sideNavState$ = this.sideNavStateSubject$.asObservable();

  constructor() {
    try {
      const sideNavState = localStorage.getItem('sideNavState');
      if (sideNavState) {
        this.sideNavStateSubject$.next(JSON.parse(sideNavState));
      }
    } catch (err) {}
  }

  get currentState() {
    return this.sideNavStateSubject$.value;
  }

  setCurrentSideNavState(val: SideNavStateModel): void {
    this.sideNavStateSubject$.next(val);
  }
}
