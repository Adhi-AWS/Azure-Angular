import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';

/**
 * @description Application's Loader Component
 */
@Component({
  selector: 'app-shared-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
  loading: boolean = false;

  /**
   * @description Creates an instance of loader component.
   * @param loaderService - an instance of LoaderService
   */
  constructor(
    private loaderService: LoaderService,
    private change: ChangeDetectorRef
  ) {}

  /**
   * @description on init
   */
  ngOnInit(): void {
    this.loaderService.isLoading.subscribe((v) => {
      this.loading = v;
      this.change.detectChanges();
      if (this.loading) {
        document
          .getElementsByTagName('html')[0]
          .setAttribute('style', 'overflow: hidden;');
      } else {
        document
          .getElementsByTagName('html')[0]
          .setAttribute('style', 'overflow: auto;');
      }
    });
  }
}
