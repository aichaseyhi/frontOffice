import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthAdminService } from 'src/app/services/auth-admin.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;

  name: string ="";
  phone: string ="";
  email: string ="";
  password: string ="";
  sexe: string="";
  birthday: string="";
  status: string="";
  role: string="";

  constructor(
    private http: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthAdminService
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      sexe: ['', Validators.required],
      status: ['', Validators.required],
      birthday: ['', Validators.required],
      role: ['', Validators.required]



    });
  }

  register()
  {
    if(this.registerForm.valid){
      this.authService.register(this.registerForm.value).subscribe((res:any)=>{
        
          
        console.log(res);
        alert("Registered Successfully")
        this.router.navigate(['/login']);
        
         
       } )
    } 
   
  }

}
