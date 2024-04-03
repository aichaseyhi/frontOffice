import { Component, OnInit } from '@angular/core';
import { Product } from './product';
import { ProduitService } from 'src/app/services/produit.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {

  productDialog: boolean = false;

    products: any[] = [];

    product: any ={};

    selectedProducts: Product[] = [];

    submitted: boolean = false;

    constructor(private productService: ProduitService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

    ngOnInit() {
        this.getAllProduct();
    }

    openNew() {
        this.product = {};
        this.submitted = false;
        this.productDialog = true;
    }

    getAllProduct()
    { 
      
      this.productService.getAllProduct()
    
      .subscribe((resultData: any)=>
      {
          // this.isResultLoaded = true;
          // console.log("this is ",resultData);
          this.products = resultData;
           console.log(this.products);
      });
    }
    editProduct(product: Product) {
        this.product = {...product};
        console.log(product)
        this.productDialog = true;
    }
    saveProduct() {
      this.submitted = true;
  
      const Data = {
            name: this.product.name, 
            description: this.product.description,
            quantity: this.product.quantity,
            price:this.product.price,
            image:this.product.image,
          };
    
      console.log("product", this.product);
    
      if (this.product && this.product.name && this.product.name.trim()) {
        if (this.product.id) {
          
          this.productService.updateProduct(Data, this.product.id).subscribe((res) => {
                this.messageService.add({severity: 'success',summary: 'Successful',
                  detail: 'user Updated',
                  life: 3000,
                });
                this.getAllProduct();
                this.productDialog = false;
              },
              
            );
        }
        else {
          this.productService.saveProduct(Data).subscribe((res) => {
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
             this.getAllProduct();
        this.productDialog = false;
          });
         
      }
      
      this.products = [...this.products];
      this.productDialog = false;
     this.product = {};
  
      }
    }


    
    deleteProduct(product: Product) {
 
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete  ' + product.name +'?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this.productService.deleteProduct(product.id).subscribe((res:any) =>{
                console.log(res);
                this.getAllProduct();
            })
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
              
          }
      });
  }

    deleteSelectedProducts() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected products?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.products = this.products.filter(val => !this.selectedProducts.includes(val));
                //this.selectedProducts = null;
                this.messageService.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
            }
        });
    }
    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

}
