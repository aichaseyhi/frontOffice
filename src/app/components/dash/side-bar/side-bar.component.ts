import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthAdminService } from 'src/app/services/auth-admin.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthAdminService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
  }

  logout() {
    
    this.authService.logout()
      .subscribe((resultData: any) => {
       
        this.tokenService.clearToken();
        this.router.navigate(['/login']);
      
      } );
  }

}
