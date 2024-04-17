import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UserService } from 'src/app/services/user.service';
import { Client } from './client';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  clientDialog: boolean = false;
  clients: any[] = [];
  client: any = {};
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

  getUsersByRole() {
    this.userService.getUsersByRole('client').subscribe((resultData: any) => {
      this.clients = resultData;
    });
  }

  editUser(client: Client) {
    this.client = { ...client };
    this.clientDialog = true;
  }

  saveUser() {
    this.submitted = true;

    const Data = {
      name: this.client.name,
      phone: this.client.phone,
      email: this.client.email,
      password: this.client.password,
      status: this.client.status,
      role: this.client.role
    };

    if (this.client && this.client.name && this.client.name.trim()) {
      if (this.client.id) {
        this.userService.updateUser(Data, this.client.id).subscribe((res) => {
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Client Updated', life: 3000 });
          this.getUsersByRole();
          this.clientDialog = false;
        });
      } else {
        this.userService.saveUser(Data).subscribe((res) => {
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Created', life: 3000 });
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
      message: 'Are you sure you want to delete ' + client.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.userService.deleteUser(client.id).subscribe((res: any) => {
          this.getUsersByRole();
        });
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Client Deleted', life: 3000 });
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
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Clients Deleted', life: 3000 });
      }
    });
  }

  hideDialog() {
    this.clientDialog = false;
    this.submitted = false;
  }

}
