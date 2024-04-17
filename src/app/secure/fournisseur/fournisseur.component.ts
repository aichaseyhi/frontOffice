import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fournisseur',
  templateUrl: './fournisseur.component.html',
  styleUrls: ['./fournisseur.component.css']
})


export class FournisseurComponent implements OnInit {
  selectedUsers: any[] = [];
  providers: any[] = [];
  submitted: boolean = false;
  provider: any = {
    name: '',
    email: '',
    phone: '',
    password: '',
    status: '',
    role: ''
  };

  roles: string[] = ['Fournisseur', 'Instagrammeur'];


  providerDialog: boolean = false;


  constructor(private router: Router) { }

  openNew() {
    this.router.navigate(['/new-page']);
    console.log('Button clicked!');
  }

  deleteSelectedUsers() {
    // Implement delete selected users functionality
  }

  editUser(provider: any) {
    // Implement edit functionality
  }

  deleteUser(provider: any) {
    // Implement delete user functionality
  }

  hideDialog() {
    // Implement hide dialog functionality
  }

  saveUser() {
    // Implement save user functionality
  }

  ngOnInit(): void {
    this.providers = [
      // Sample data
      { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123456789', status: 'ACTIVE', role: 'Admin' },
      { id: 2, name: 'Jane Doe', email: 'jane@example.com', phone: '987654321', status: 'INACTIVE', role: 'User' }
    ];
  }
}
