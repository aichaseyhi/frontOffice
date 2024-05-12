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
    image:'',
    name: '',
    email: '',
    acountLink:'',
    phone: '',
    password: '',
    status: '',
    role: '',
    companyName: '',
    companyUnderConstruction: '',
    TAXNumber: '',
    CIN: '',
    city:'',
    street:'',
    post_code:'',





  };

  roles: string[] = ['Fournisseur', 'Instagrammeur'];


  providerDialog: boolean = false;
  fournisseur: any;


  constructor(private router: Router) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  openNew() {
    this.user = {};
    this.submitted = false;
    this.userDialog = true;
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

      const Data = {
        name: this.fournisseur.name,
        phone: this.fournisseur.phone,
        email: this.fournisseur.email,
        password: this.fournisseur.password,
        status: this.fournisseur.status,
        role: this.fournisseur.role,
        image: this.fournisseur.image,
        acountLink: this.fournisseur.acountLink,
        street: this.fournisseur.street,
        city: this.fournisseur.city,
        post_code: this.fournisseur.post_code,
        CIN: this.fournisseur.CIN,
        TAXNumber: this.fournisseur.TAXNumber,
        companyName: this.fournisseur.companyName,
        companyUnderConstruction: this.fournisseur.companyUnderConstruction,
      };



function ngOnInit() {
  throw new Error('Function not implemented.');
}
}
}
