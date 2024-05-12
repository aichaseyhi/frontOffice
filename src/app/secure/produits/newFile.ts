import { FormArray, FormControl } from '@angular/forms';

(email: string, isChecked: boolean) => {
  const emailFormArray = <FormArray>this.myForm!.controls.colorList;
  console.log("hello", emailFormArray);
  if (isChecked) {
    emailFormArray.push(new FormControl(email));
  } else {
    let index = emailFormArray.controls.findIndex(x => x.value == email);
    emailFormArray.removeAt(index);
  }
};
