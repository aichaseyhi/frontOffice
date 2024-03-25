import { Component, OnInit } from '@angular/core';
import { Client } from './client';
import { UserService } from 'src/app/services/user.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  clientDialog: boolean = false;

  clients: any[] = [];

  client: any ={};

  selectedUsers: Client[] = [];

  submitted: boolean = false;

  constructor(private userService: UserService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
      this.getUsersByRole();
  }

  openNew() {
      this.client = {};
      this.submitted = false;
      this.clientDialog = true;
  }

  getAllUser()
  { 
    
    this.userService.getAllUser()
  
    .subscribe((resultData: any)=>
    {
        // this.isResultLoaded = true;
        // console.log("this is ",resultData);
        this.clients = resultData;
         console.log(this.clients);
    });
  }
  getUsersByRole(){
    this.userService.getUsersByRole('client').subscribe((resultData: any) => {this.clients = resultData;
    console.log(this.clients);}
    );
  }
  editUser(client: Client) {
      this.client = {...client};
      console.log(client)
      this.clientDialog = true;
  }
  saveUser() {
    this.submitted = true;

    const Data = {
          name: this.client.name, 
          phone: this.client.phone,
          email: this.client.email,
          password:this.client.password,
          sexe:this.client.sexe,
          status:this.client.status,
          role:this.client.role
        };
  
    console.log("client", this.client);
  
    if (this.client && this.client.name && this.client.name.trim()) {
      if (this.client.id) {
        
        this.userService.updateUser(Data, this.client.id).subscribe((res) => {
              this.messageService.add({severity: 'success',summary: 'Successful',
                detail: 'provider Updated',
                life: 3000,
              });
              this.getUsersByRole();
              this.clientDialog = false;
            },
            
          );
      }
      else {
        this.userService.saveUser(Data).subscribe((res) => {
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'User Created', life: 3000});
           this.getUsersByRole();
      this.clientDialog = false;
        });
       
    }
    
    this.clients = [...this.clients];
    this.clientDialog = false;
   this.client = {};

    }
  }


  
  deleteUser(client: Client) {

    this.confirmationService.confirm({
        message: 'Are you sure you want to delete  ' + client.name +'?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.userService.deleteUser(client.id).subscribe((res:any) =>{
              console.log(res);
              this.getAllUser();
          })
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Client Deleted', life: 3000});
            
        }
    });
}

  deleteSelectedUsers() {
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete the selected users?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.clients = this.clients.filter(val => !this.selectedUsers.includes(val));
              //this.selectedProducts = null;
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Clients Deleted', life: 3000});
          }
      });
  }
  hideDialog() {
      this.clientDialog = false;
      this.submitted = false;
  }

}
