import { Component, OnInit } from '@angular/core';
import { SubcategoryService } from 'src/app/services/subcategory.service';
@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.css']
})
export class SubcategoryComponent implements OnInit {

  subcategories: any[] = [];

  constructor(private subcategoryService: SubcategoryService) { }

  ngOnInit(): void {
    this.getSubcategories();
  }

  getSubcategories(): void {
    this.subcategoryService.getSubcategories().subscribe(
      (response: any[]) => { // Corrected the syntax for arrow function
        this.subcategories = response;
      },
      (error: any) => {
        console.error('Error fetching subcategories:', error);
      }
    );
  }

  saveSubcategory(subcategoryData: any): void {
    this.subcategoryService.saveSubcategory(subcategoryData).subscribe(
      (response: any) => {
        console.log('Subcategory saved successfully:', response);
        // After saving successfully, you might want to refresh the subcategories list
        this.getSubcategories();
      },
      (error: any) => {
        console.error('Error saving subcategory:', error);
      }
    );
  }
}
