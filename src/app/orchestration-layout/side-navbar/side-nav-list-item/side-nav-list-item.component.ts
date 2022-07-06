import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { NavService } from 'src/app/services/nav.service';

@Component({
  selector: 'app-side-nav-list-item',
  templateUrl: './side-nav-list-item.component.html',
  styleUrls: ['./side-nav-list-item.component.scss'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({ transform: 'rotate(180deg)' })),
      state('expanded', style({ transform: 'rotate(0deg)' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ]),
  ],
})
export class SideNavListItemComponent implements OnInit, OnChanges {
  expanded = false;
  hidden = false;
  @Input() item: any;
  @Input() depth = 0;
  @Input() stage: number | undefined;

  constructor(public router: Router, private navService: NavService) {
    if (this.depth === undefined) {
      this.depth = 0;
    }
    if (this.stage === undefined) {
      this.stage = 2;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      if (this.stage === 2) {
        this.hidden = false;
      } else {
        this.hidden = true;
      }
    }
  }

  ngOnInit(): void {
    this.navService.currentUrl.subscribe(
      (url: any) => {
        if (this.item.mfUrlLink && url) {
          url = url.split('?')[0];
          this.expanded = url.indexOf(`${this.item.mfUrlLink}`) === 0;
        }
      },
      (err: any) => {}
    );
  }

  onItemSelected(item: any): void {
    if (!item?.children?.length && !this.hidden) {
      this.router.navigate([item.mfUrlLink]);
    }
    if (item.children && item.children.length && !this.hidden) {
      this.expanded = !this.expanded;
    }
  }

  toolTipMenuClicked(item: any): void {
    // if (!item?.children?.length) {
    this.router.navigate([item.mfUrlLink]);
    // }
  }
}
