import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UserService } from 'src/app/services/user.service';
import { ProviderExterne } from './fournisseur';

@Component({
  selector: 'app-fournisseur',
  templateUrl: './fournisseur.component.html',
  styleUrls: ['./fournisseur.component.css']
})
export class FournisseurComponent implements OnInit {

  providerDialog: boolean = false;

  providers: any[] = [];

  provider: any ={};

  selectedUsers: ProviderExterne[] = [];

  submitted: boolean = false;

  constructor(private userService: UserService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
      this.getUsersByRole();
  }

  openNew() {
      this.provider = {};
      this.submitted = false;
      this.providerDialog = true;
  }

  getAllUser()
  {

    this.userService.getAllUser()

    .subscribe((resultData: any)=>
    {
        // this.isResultLoaded = true;
        // console.log("this is ",resultData);
        this.providers = resultData;
         console.log(this.providers);
    });
  }
  getUsersByRole(){
    this.userService.getUsersByRole('provider-extern').subscribe((resultData: any) => {this.providers = resultData;
       console.log(this.providers);}
    );
  }
  editUser(provider: ProviderExterne) {
      this.provider = {...provider};
      console.log(provider)
      this.providerDialog = true;
  }
  saveUser() {
    this.submitted = true;

    const Data = {
          name: this.provider.name,
          phone: this.provider.phone,
          email: this.provider.email,
          password:this.provider.password,
          status: this.provider.status,
          role:this.provider.role,
        };

    console.log("provider", this.provider);

    if (this.provider && this.provider.name && this.provider.name.trim()) {
      if (this.provider.id) {

        this.userService.updateUser(Data, this.provider.id).subscribe((res) => {
              this.messageService.add({severity: 'success',summary: 'Successful',
                detail: 'provider Updated',
                life: 3000,
              });
              this.getUsersByRole();
              this.providerDialog = false;
            },

          );
      }
     else {
        this.userService.saveUser(Data).subscribe((res) => {
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Provider Created', life: 3000});
          this.getUsersByRole();
          this.providerDialog = false;
        });

    }

    this.providers = [...this.providers];
    this.providerDialog = false;
   this.provider = {};

    }
  }



  deleteUser(provider: ProviderExterne) {

    this.confirmationService.confirm({
        message: 'Are you sure you want to delete  ' + provider.name +'?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.userService.deleteUser(provider.id).subscribe((res:any) =>{
              console.log(res);
              this.getAllUser();
          })
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Provider Deleted', life: 3000});

        }
    });
}

  deleteSelectedUsers() {
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete the selected users?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.providers = this.providers.filter(val => !this.selectedUsers.includes(val));
              //this.selectedProducts = null;
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Providers Deleted', life: 3000});
          }
      });
  }
  hideDialog() {
      this.providerDialog = false;
      this.submitted = false;
  }

}
