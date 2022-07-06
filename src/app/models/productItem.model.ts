export class ProductItem {
    name: string;
    description: string;
    created_by: string;
    modified_by: string;
    status: string;
    price: number;
    product_subcategory_id: string;
    cloud_provider: string;
    ui_layout: {}={};
    htc_marketplace: string;
    cloud_marketplace: string;
    logo_base64: string;
    constructor(){
        this.name = '';
        this.description = '';
        this.created_by ='';
        this.modified_by =  '';
        this.status = '';
        this.price =  0;
        this.product_subcategory_id =  '';
        this.cloud_provider = '';
        this.ui_layout =  {
            "data": {},
            "layout": [],
            "schema": {}
          };
        this.htc_marketplace =  '';
        this.cloud_marketplace = '';
        this.logo_base64 =  '';
    }
  }
  
  

    
