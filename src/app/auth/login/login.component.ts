import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthAdminService } from 'src/app/services/auth-admin.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  email: string ="";
  password: string ="";

  constructor(
    private http: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthAdminService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(){
    if(this.loginForm.valid){
      this.authService.login(this.loginForm.value).subscribe((res:any)=>{
        if(res.status===200 && res.body.success===true){
          this.tokenService.storeToken(res.body.token)
          this.router.navigate(["/dashbord"])
        }
        console.log(res);
      },(error:any)=>{
        alert("Information incorrect!!!")
        console.error(error)
      })
    }  

}
}
