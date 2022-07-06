import { Component } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-user-guide',
  templateUrl: './user-guide.component.html',
  styleUrls: ['./user-guide.component.scss'],
})
export class UserGuideComponent  {
  constructor(private loaderService: LoaderService) {
    this.loaderService.isLoading.next(true);
  }

  

  pagesInitialized(e: CustomEvent): void {
    this.loaderService.isLoading.next(false);
  }
}
