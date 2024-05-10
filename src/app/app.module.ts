import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IvyCarouselModule } from 'carousel-angular';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MenuModule } from 'primeng/menu';
import { MultiSelectModule } from 'primeng/multiselect';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ProgressBarModule } from 'primeng/progressbar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { SliderModule } from 'primeng/slider';
import { StyleClassModule } from 'primeng/styleclass';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChangePasswordRequestComponent } from './auth/change-password-request/change-password-request.component';
import { ChangePasswordComponent } from './auth/change-password/change-password.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { CheckboxGroupComponent } from './components/dash/checkbox-group/checkbox-group.component';
import { CheckboxComponent } from './components/dash/checkbox/checkbox.component';
import { DashboardComponent } from './components/dash/dashboard/dashboard.component'; // Corrected import statement
import { HomeComponent } from './components/dash/home/home.component';
import { NavbarComponent } from './components/dash/navbar/navbar.component';
import { SideBarComponent } from './components/dash/side-bar/side-bar.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { ProduitsComponent } from './secure/produits/produits.component';
import { SecureModule } from './secure/secure.module';
import { SubcategoryService } from './services/subcategory.service';







@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    SideBarComponent,
    HomeComponent,
    ProduitsComponent,
    ChangePasswordRequestComponent,
    ChangePasswordComponent,
    HomeComponent,
    CheckboxComponent,
    CheckboxGroupComponent

  ],
  imports: [

    BrowserModule,
    FormsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ButtonModule,
    TableModule,
    ToastModule,
    CalendarModule,
		SliderModule,
		DialogModule,
		MultiSelectModule,
		ContextMenuModule,
		DropdownModule,
		ButtonModule,
		ToastModule,
    InputTextModule,
    ProgressBarModule,
    FileUploadModule,
    ToolbarModule,
    RatingModule,
    RadioButtonModule,
    InputNumberModule,
    ConfirmDialogModule,
    InputTextareaModule,
    InputTextModule,
    SecureModule,
    StyleClassModule,
    PanelMenuModule,
    MenuModule,
    MultiSelectModule,
    NgApexchartsModule,
    BrowserAnimationsModule,
    IvyCarouselModule,
    TagModule,
    MatButtonToggleModule
  ],

  providers: [MessageService,SubcategoryService,ConfirmationService,
    {
      provide : HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi   : true,
    },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
