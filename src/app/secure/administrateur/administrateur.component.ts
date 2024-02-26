import { Component, OnInit } from '@angular/core';
import {   User } from './admin';
import { HttpClient } from '@angular/common/http';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-administrateur',
  templateUrl: './administrateur.component.html',
  styleUrls: ['./administrateur.component.css']
})
export class AdministrateurComponent implements OnInit {

  userDialog: boolean = false;

    users: any[] = [];

    user: any ={};

    selectedUsers: User[] = [];

    submitted: boolean = false;

    constructor(private userService: UserService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

    ngOnInit() {
        this.getAllUser();
    }

    openNew() {
        this.user = {};
        this.submitted = false;
        this.userDialog = true;
    }

    getAllUser()
    { 
      
      this.userService.getAllUser()
    
      .subscribe((resultData: any)=>
      {
          // this.isResultLoaded = true;
          // console.log("this is ",resultData);
          this.users = resultData;
           console.log(this.users);
      });
    }
    editUser(user: User) {
        this.user = {...user};
        console.log(user)
        this.userDialog = true;
    }
    saveUser() {
      this.submitted = true;
  
      const Data = {
            name: this.user.name, 
            phone: this.user.phone,
            email: this.user.email,
          };
    
      console.log("user", this.user);
    
      if (this.user && this.user.name && this.user.name.trim()) {
        if (this.user.id) {
          
          this.userService.updateUser(Data, this.user.id).subscribe((res) => {
                this.messageService.add({severity: 'success',summary: 'Successful',
                  detail: 'user Updated',
                  life: 3000,
                });
                this.getAllUser();
                this.userDialog = false;
              },
              
            );
        }
        else {
          this.userService.saveUser(Data).subscribe((res) => {
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'User Created', life: 3000});
             this.getAllUser();
        this.userDialog = false;
          });
         
      }
      
      this.users = [...this.users];
      this.userDialog = false;
     this.user = {};
  
      }
    }


    
    deleteUser(user: User) {
 
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete'   + user.name +'?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this.userService.deleteUser(user.id).subscribe((res:any) =>{
                console.log(res);
                this.getAllUser();
            })
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'User Deleted', life: 3000});
              
          }
      });
  }

    deleteSelectedUsers() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected users?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.users = this.users.filter(val => !this.selectedUsers.includes(val));
                //this.selectedProducts = null;
                this.messageService.add({severity:'success', summary: 'Successful', detail: 'Users Deleted', life: 3000});
            }
        });
    }
    hideDialog() {
        this.userDialog = false;
        this.submitted = false;
    }

}