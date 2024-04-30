import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UserService } from 'src/app/services/user.service';
import { User } from './admin';

@Component({
  selector: 'app-administrateur',
  templateUrl: './administrateur.component.html',
  styleUrls: ['./administrateur.component.css']
})
export class AdministrateurComponent implements OnInit {

  userDialog: boolean = false;
  users: any[] = [];
  user: any = {};
  selectedUsers: User[] = [];
  submitted: boolean = false;
  registerForm!: FormGroup;

  constructor(private userService: UserService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.getUsersByRole();
  }

  openNew() {
    this.user = {};
    this.submitted = false;
    this.userDialog = true;
  }

  getAllUser() {
    this.userService.getAllUser()
      .subscribe((resultData: any) => {
        this.users = resultData;
        console.log(this.users);
      });
  }

  getUsersByRole(){
    this.userService.getUsersByRole('admin').subscribe((resultData: any) => {this.users = resultData;
    console.log(this.users);}
    );
  }

  editUser(user: User) {
    this.user = {...user};
    console.log(user)
    this.userDialog = true;
}
  saveUser() {
    this.submitted = true;

    const userData: User = {
      id: this.user.id,
      name: this.user.name,
      email: this.user.email,
      phone: this.user.phone,
      password: this.user.password,
      status: this.user.status,
      role: this.user.role,
      poste: this.user.poste,

    };

    console.log("User Data", userData);

    if (userData.name && userData.email && userData.phone && userData.password && userData.status && userData.role) {
      if (userData.id) {
        this.userService.updateUser(userData, userData.id).subscribe(
          (res) => {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Updated', life: 3000 });
            this.getUsersByRole();
            this.userDialog = false;
          },
          (error) => {
            console.error('Error updating user:', error);
          }
        );
      } else {
        this.userService.saveUser(userData).subscribe(
          (res) => {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Created', life: 3000 });
            this.getUsersByRole();
            this.userDialog = false;
          },
          (error) => {
            console.error('Error creating user:', error);
          }
        );
      }
    } else {
      console.error('Missing user data.');
    }
  }

  deleteUser(user: User) {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete ${user.name}?`,
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.userService.deleteUser(user.id).subscribe(
          (res: any) => {
            console.log(res);
            this.getUsersByRole();
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000 });
          },
          (error) => {
            console.error('Error deleting user:', error);
          }
        );
      }
    });
  }

  deleteSelectedUsers() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected users?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (this.selectedUsers && this.selectedUsers.length) {
          this.selectedUsers.forEach((user) => {
            this.userService.deleteUser(user.id).subscribe(
              (res: any) => {
                console.log(res);
                this.getUsersByRole();
              },
              (error) => {
                console.error('Error deleting user:', error);
              }
            );
          });
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Users Deleted', life: 3000 });
        } else {
          console.error('No users selected for deletion.');
        }
      }
    });
  }

  hideDialog() {
    this.userDialog = false;
    this.submitted = false;
  }

}
