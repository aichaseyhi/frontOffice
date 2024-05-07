import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProduitService } from 'src/app/services/produit.service';
import { Product } from './product';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {
  @ViewChild('#inputEle') myDOMEle: ElementRef | undefined;

    getInputValue(){
       let val = this.myDOMEle!.nativeElement.value;
    }
    setInputValue(){
       this.myDOMEle!.nativeElement.value = "selectedColors";
    }

  productDialog: boolean = false;
  products: Product[] = [];
  product: Product = {};
  selectedProducts: Product[] = [];
  submitted: boolean = false;

  colorOptionExtra = [{ name: "Red" }, { name: "Blue" }, { name: "Green" }, { name: 'Yellow' }, { name: 'Purple' }]
  sizeOptionExtra = [{ name: "XS" }, { name: "S" }, { name: "M" }, { name: 'L' }, { name: 'XL' },{ name: 'XXL' },{ name: 'XXXL' },]

  myForm: FormGroup | undefined;
  colorOptions: string[] = ['Red', 'Blue', 'Green', 'Yellow', 'Purple'];
  selectedColors: string[] = [];
  isCheckedColors: { [key: string]: boolean } = {};

  checkIfSelectedColors(): void {
    this.selectedColors = Object.keys(this.isCheckedColors).filter(key => this.isCheckedColors[key]);
  }

  sizeOptions: string[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
  selectedSizes: string[] = [];
  isCheckedSizes: { [key: string]: boolean } = {};

  checkIfSelectedSizes(): void {
    this.selectedSizes = Object.keys(this.isCheckedSizes).filter(key => this.isCheckedSizes[key]);
  }

  selectedEchantillon: string = '';
  echantillonOptions: string[] = ['FREE', 'PAID', 'REFUNDED'];
  selectedSubcategory: string = '';
  subcategoryOptions: string[] = ['HOMME', 'FEMME', 'KIDS', 'UNISEX'];

  constructor(private productService: ProduitService, private messageService: MessageService, private confirmationService: ConfirmationService,private fb: FormBuilder) { }

  ngOnInit() {
    this.getAllProduct();
    this.myForm = this.fb.group({
      colorList: this.fb.array([])
    });
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
    console.log("get",this.getInputValue);
    console.log("this product",this.product);
    console.log("this.product.name",this.product.name);
    console.log("this.product.category",this.product.category);
    console.log("this.product.subcategory",this.product.subcategory);
    console.log("this.selectedSizes.length",this.selectedSizes.length);

     if (this.product && this.product.name  && this.product.colors!.length > 0 && this.product.sizes!.length > 0) {
      console.log('je passe');
      const Data = { ...this.product, colors: this.product.colors, size: this.selectedSizes };
      console.log(Data);

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
    console.log()
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
