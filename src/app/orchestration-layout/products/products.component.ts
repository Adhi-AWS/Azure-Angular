import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ViewJsonDialogComponent } from 'src/app/shared/view-json-dialog/view-json-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  cloud_provider: string = '';
  cloud_provider_name: any = '';
  task_name: string = '';
  task_id:string='';
  categoryName:string='';
  defaultIcon:string='assets/images/icons/system.png';
  productCategory:any=[];
  productSubcategory:any=[];
  filterArray:any=[];
  selectedIndex :any=0;
  searchWord:any='';
  productConfigData:any;
  configureNowMode:any=false;
  currentProduct: any;
  adminFlag:boolean=false;
  currentIndex:any;
  items:any =[];
  loadMoreDisable: any = false;
  defaultItemCount: number = 8;
  constructor( private route: ActivatedRoute,private adminService:AdminService ,private dialog: MatDialog,private router: Router,private productService: ProductService,private domSanitizer: DomSanitizer) {
   }

  ngOnInit(): void {
    this.route.params.subscribe(routeParams => {
      this.cloud_provider = routeParams.cloud_provider;
      this.task_name = routeParams.task_name;
      this.task_id = routeParams.item_id;
      this.filterArray = [];
      this.loadProductData();
    });
    this.adminService.isAdmin().subscribe((response)=>{
      this.adminFlag = response.is_admin;
   })

  }
  yourOnSubmitFn(data: any): void {
    console.log(data);
  }
  showFormSchemaFn(data: any): void {
    console.log(data);
  }
  loadProductData(): void {
    this.productCategory = [];
    this.productService.getProductCategory(this.task_id, this.cloud_provider).subscribe((response) => {
      this.productCategory = response.data;
      this.selectCategory(this.productCategory[0], 0);
    })
  }
  selectCategory(data: any, index: any): void {
    this.selectedIndex = index;
    this.configureNowMode = false;
    this.currentProduct = false;
    this.categoryName = data.name;
    this.productService.getProductSubcategory(data.id,this.cloud_provider).subscribe((response)=>{
      this.productSubcategory = [];
      this.filterArray = [];
      if (response) {
        response.forEach((item: any) => {
          item.url = this.defaultIcon;
          if(item.logo_base64 != null && item.logo_base64.length > 20){
          item.url = item.logo_base64;
          }
         this.productSubcategory.push(item);
         this.filterArray.push(item);
        });
        this.resetLoadMore();
      }
    })
  }
  resetLoadMore():void{
    if(this.productSubcategory.length > this.defaultItemCount){
      this.loadMoreDisable = false;  
      }else{
        this.loadMoreDisable = true;
      }
    this.currentIndex = this.defaultItemCount; 
    this.filterArray =  [...this.productSubcategory.slice(0,this.defaultItemCount)];

  }
  loadMore():void{
    this.currentIndex += this.defaultItemCount;
    this.filterArray = [...this.productSubcategory.slice(0,this.currentIndex)];
    if(this.currentIndex > this.productSubcategory.length){
      this.loadMoreDisable = true;  
      }
  }
  searchThis(): void {
    if (this.searchWord) {
      this.filterArray = this.productSubcategory.filter((ele: any) => {
        let arrayelement = ele.name.toLowerCase();
        return arrayelement.includes(this.searchWord)
      })
      this.loadMoreDisable = true;
    }
    else {
      this.loadMoreDisable = false;
      this.filterArray = [...this.productSubcategory.slice(0,this.currentIndex)];
    }
  }
  configureNow(data: any): void {
    this.configureNowMode = true;
    this.productConfigData = data;
    this.currentProduct = data.name;
  }
  cancelForm(data: any) {
    this.configureNowMode = false;
    this.currentProduct = false;
  }
  openViewJsonDialog(name: string, value: any): void {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    this.dialog.open(ViewJsonDialogComponent, {
      minWidth: '50%',
      data: {
        title: name,
        data: value,
      },
    });
  }

}
