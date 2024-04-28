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
  user: any = {};
  selectedProviders: any[] = []
  userDialog: boolean = false;
  submitted: boolean = false;
  provider: any = {
    name: '',
    email: '',
    phone: '',
    password: '',
    status: '',
    role: '',
    matriculeFiscale: '',
  };

  roles: string[] = ['Fournisseur', 'Instagrammeur'];


  providerDialog: boolean = false;


  constructor(private router: Router) { }

  openNew() {
    this.router.navigate(['/new-page']);
    console.log('Button clicked!');
  }

  deleteSelectedUsers() {
    this.providers = this.providers.filter(provider => !this.selectedProviders.includes(provider));
    this.selectedProviders = [];  }

  editUser(provider: any) {
    this.user = { ...provider };
    this.userDialog = true;  }

  deleteUser(provider: any) {
    const index = this.providers.findIndex(p => p.id === provider.id);
    if (index !== -1) {
      this.providers.splice(index, 1);
    }  }

  hideDialog() {
    this.userDialog = false;
    this.submitted = false;
    this.user = {};  }

  saveUser() {
    this.submitted = true;
    this.userDialog = false;
    this.user = {};
    this.submitted = false; }

  ngOnInit(): void {
    this.providers = [
      { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123456789', status: 'ACTIVE', role: 'Admin' },
      { id: 2, name: 'Jane Doe', email: 'jane@example.com', phone: '987654321', status: 'INACTIVE', role: 'User' }
    ];
  }
}
