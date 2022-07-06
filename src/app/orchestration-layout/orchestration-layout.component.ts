import { Component, OnInit } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../services/app.service';
import { SideNavStateService } from '../services/sidenav-state.service';

@Component({
  selector: 'app-orchestration-layout',
  templateUrl: './orchestration-layout.component.html',
  styleUrls: ['./orchestration-layout.component.scss'],
})
export class OrchestrationLayoutComponent implements OnInit {
  title: string = '';
  stage: number;
  direction: string;
  opened: boolean;
  width: string | undefined;
  drawerContentMarginLeft: string | undefined;

  constructor(private sideNavStateService: SideNavStateService,private route: ActivatedRoute,private appService:AppService) {
    const sideNavState = sideNavStateService.currentState;
    this.stage = sideNavState.stage;
    this.direction = sideNavState.direction;

    if (this.stage !== 0) {
      this.opened = true;
      if (this.stage === 1) {
        this.title = 'CO';
        this.width = '64px';
        this.drawerContentMarginLeft = '64px';
      } else {
        this.title = 'Cloud Orchestrator';
        this.width = '230px';
        this.drawerContentMarginLeft = '230px';
      }
    } else {
      this.opened = false;
    }
  }

  ngOnInit(): void {
    var data = this.route.snapshot.data.menuData[0];
    this.appService.setproductCategoryList(data);
  }

  toggleDrawer(drawer: MatDrawer): void {
    if (this.stage === 0) {
      this.direction = 'opening';
    } else if (this.stage === 2) {
      this.direction = 'closing';
    }

    if (this.direction === 'opening') {
      this.stage += 1;
    } else {
      this.stage -= 1;
    }

    if (this.stage === 0) {
      drawer.close();
    } else if (this.stage === 1) {
      drawer.open();
      this.title = 'CO';
      drawer['_elementRef'].nativeElement.style.width = '64px';
      this.drawerContentMarginLeft = '64px';
    } else {
      drawer.open();
      this.title = 'Cloud Orchestrator';
      drawer['_elementRef'].nativeElement.style.width = '230px';
      this.drawerContentMarginLeft = '230px';
    }

    const currentState = { stage: this.stage, direction: this.direction };
    //save in local storage
    localStorage.setItem('sideNavState', JSON.stringify(currentState));
    //save in subject
    this.sideNavStateService.setCurrentSideNavState(currentState);
    // drawer.toggle();
  }
}
