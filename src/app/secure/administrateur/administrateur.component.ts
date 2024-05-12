import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UserService } from 'src/app/services/user.service';
import { User } from './admin';

@Component({
  selector: 'app-administrateur',
  templateUrl: './administrateur.component.html',
  styleUrls: ['./administrateur.component.css']
})
export class AdministrateurComponent implements OnInit {
  displayUpdateStatusDialog: boolean = false;
  userDialog: boolean = false;
  users: User[] = [];
  user: User = {};
  selectedUsers: User[] = [];
  submitted: boolean = false;
  filter: { name: string, email: string } = { name: '', email: '' };
  selectedUser: User | undefined;
  selectedStatus: string | undefined;
  filteredUsers: User[] = [];

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.getUsersByRole();
  }

  updateStatusDialog(user: User): void {
    this.selectedUser = user;
    this.displayUpdateStatusDialog = true;
  }
  filterUsers(value: string): void {
    this.filteredUsers = this.users.filter(user =>
      (user.name && user.name.toLowerCase().includes(value.toLowerCase())) ||
      (user.email && user.email.toLowerCase().includes(value.toLowerCase()))
    );
  }
  openNew(): void {
    this.user = {};
    this.submitted = false;
    this.userDialog = true;
  }

  getUsersByRole(): void {
    this.userService.getUsersByRole('admin').subscribe(
      (resultData: User[]) => {
        this.users = resultData;
      },
      (error) => {
        console.error('Error fetching users by role:', error);
      }
    );
  }

  editUser(user: User): void {
    this.user = { ...user };
    this.userDialog = true;
  }

  updateUserStatus(status: string): void {
    if (this.selectedUser && status) {
      this.userService.updateUserStatus(this.selectedUser.id, status).subscribe(
        () => {
          console.log('User status updated successfully');
          this.hideStatusDialog();
        },
        (error) => {
          console.error('Error updating user status:', error);
          this.hideStatusDialog();
        }
      );
    } else {
      console.error('Selected user or status is missing.');
    }
  }

  hideStatusDialog(): void {
    this.displayUpdateStatusDialog = false;
  }

  saveUser(): void {
    this.submitted = true;

    if (this.user.name && this.user.email && this.user.phone && this.user.password && this.user.status && this.user.role) {
      const userData: User = { ...this.user };

      if (userData.id) {
        this.userService.updateUser(userData, userData.id).subscribe(
          () => {
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
          () => {
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

  deleteUser(user: User): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete ${user.name}?`,
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.userService.deleteUser(user.id).subscribe(
          () => {
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

  deleteSelectedUsers(): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected users?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (this.selectedUsers && this.selectedUsers.length) {
          this.selectedUsers.forEach((user) => {
            this.userService.deleteUser(user.id).subscribe(
              () => {
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

  hideDialog(): void {
    this.userDialog = false;
    this.submitted = false;
  }
}
