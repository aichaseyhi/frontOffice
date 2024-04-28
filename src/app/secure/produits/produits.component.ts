import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProduitService } from 'src/app/services/produit.service';
import { Product } from './product';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {

  productDialog: boolean = false;
  products: Product[] = [];
  product: Product = {};
  selectedProducts: Product[] = [];
  submitted: boolean = false;
  selectedColor: string = '';
  colorOptions: string[] = ['Red', 'Blue', 'Green', 'Yellow', 'Purple'];
  sizeOptions: string[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
  selectedSize: string = '';
  selectedEchantillon: string = '';
  echantillonOptions: string[] = ['FREE', 'PAID', 'REFUNDED'];

  constructor(private productService: ProduitService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.getAllProduct();
  }

  openNew() {
    this.product = {};
    this.submitted = false;
    this.productDialog = true;
  }

  getAllProduct() {
    this.productService.getAllProduct()
      .subscribe((res) => {
        this.products = res.data;
      });
  }

  editProduct(product: Product) {
    this.product = { ...product };
    this.productDialog = true;
  }

  saveProduct() {
    this.submitted = true;

    if (this.product && this.product.name && this.product.name.trim() && this.selectedColor && this.selectedSize) {
      const Data = { ...this.product, color: this.selectedColor, size: this.selectedSize };

      if (this.product.id) {
        this.productService.updateProduct(Data, this.product.id).subscribe((res) => {
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
          this.getAllProduct();
          this.productDialog = false;
        });
      } else {
        this.productService.saveProduct(Data).subscribe((res) => {
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
          this.getAllProduct();
          this.productDialog = false;
        });
      }
    }
  }

  deleteProduct(product: Product) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productService.deleteProduct(product.id).subscribe(() => {
          this.getAllProduct();
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
        });
      }
    });
  }

  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.selectedProducts.forEach(product => {
          this.productService.deleteProduct(product.id).subscribe(() => {
            this.getAllProduct();
          });
        });
        this.selectedProducts = [];
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
      }
    });
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }
}
