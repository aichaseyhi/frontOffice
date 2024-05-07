import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-instagrammers',
  templateUrl: './instagrammers.component.html',
  styleUrls: ['./instagrammers.component.css']
})
export class InstagrammersComponent implements OnInit {
  instagrammerDialog: any;
  selectedUsers: any[] = [];
  instagrammers: any[] = [];
  user: any = {};
  selectedInstagrammers: any[] = [];
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

  roles: string[] = ['Provider', 'Instagrammer'];
  providerDialog: boolean = false;
  instagrammer: any;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  openNew() {
    this.user = {};
    this.submitted = false;
    this.userDialog = true;
  }

  deleteSelectedUsers() {
    this.instagrammers = this.instagrammers.filter(instagrammer => !this.selectedInstagrammers.includes(instagrammer));
    this.selectedInstagrammers = [];
  }

  editUser(instagrammer: any) {
    this.user = { ...instagrammer };
    this.userDialog = true;
  }

  deleteUser(instagrammer: any) {
    const index = this.instagrammers.findIndex((p: { id: any; }) => p.id === instagrammer.id);
    if (index !== -1) {
      this.instagrammers.splice(index, 1);
    }
  }

  hideDialog() {
    this.userDialog = false;
    this.submitted = false;
    this.user = {};
  }

  saveUser() {
    this.submitted = true;

    const Data = {
      name: this.instagrammer.name,
      phone: this.instagrammer.phone,
      email: this.instagrammer.email,
      password: this.instagrammer.password,
      status: this.instagrammer.status,
      role: this.instagrammer.role,
      image: this.instagrammer.image,
      acountLink: this.instagrammer.acountLink,
      street: this.instagrammer.street,
      city: this.instagrammer.city,
      post_code: this.instagrammer.post_code,
      CIN: this.instagrammer.CIN,
      TAXNumber: this.instagrammer.TAXNumber,
      companyName: this.instagrammer.companyName,
      companyUnderConstruction: this.instagrammer.companyUnderConstruction,
    };
  }
}
