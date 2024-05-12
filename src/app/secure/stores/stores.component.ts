import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { StoreService } from 'src/app/services/store.service';
import { Store } from './store';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.css']
})
export class StoresComponent implements OnInit {

  storeDialog: boolean = false;

  stores: any[] = [];
  matiere_id: number | undefined;


    store: any ={};

    selectedStores: Store[] = [];

    submitted: boolean = false;

    constructor(private storeService: StoreService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

    ngOnInit() {
        this.getAllStore();
    }

    openNew() {
        this.store = {};
        this.submitted = false;
        this.storeDialog = true;
    }

    getAllStore()
    {

      this.storeService.getAllStore()

      .subscribe((resultData: any)=>
      {
          // this.isResultLoaded = true;
          // console.log("this is ",resultData);
          this.stores = resultData;
           console.log(this.stores);
      });
    }
    editStore(store: Store) {
        this.store = {...store};
        console.log(store)
        this.storeDialog = true;
    }
    saveStore() {
      this.submitted = true;

      const Data = {
        id: this.store.matiere_id,
        name: this.store.name,

          };

      console.log("store", this.store);

      if (this.store && this.store.name && this.store.name.trim()) {
        if (this.store.matiere_id) {

          this.storeService.updateStore(Data, this.store.matiere_id).subscribe((res) => {
                this.messageService.add({severity: 'success',summary: 'Successful',
                  detail: 'store Updated',
                  life: 3000,
                });
                this.getAllStore();
                this.storeDialog = false;
              },

            );
        }
        else {
          this.storeService.saveStore(Data).subscribe((res) => {
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'store Created', life: 3000});
             this.getAllStore();
        this.storeDialog = false;
          });

      }

      this.stores = [...this.stores];
      this.storeDialog = false;
     this.store = {};

      }
    }



    deleteStore(store: Store) {

      this.confirmationService.confirm({
          message: 'Are you sure you want to delete  ' + store.name +'?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this.storeService.deleteStore(store.matiere_id).subscribe((res:any) =>{
                console.log(res);
                this.getAllStore();
            })
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Store Deleted', life: 3000});

          }
      });
  }

    deleteSelectedStores() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected stores?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.stores = this.stores.filter(val => !this.selectedStores.includes(val));
                //this.selectedProducts = null;
                this.messageService.add({severity:'success', summary: 'Successful', detail: 'Stores Deleted', life: 3000});
            }
        });
    }
    hideDialog() {
        this.storeDialog = false;
        this.submitted = false;
    }


}
