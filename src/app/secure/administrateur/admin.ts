import { RadioButton } from "primeng/radiobutton";

export interface User {
  id?:string;
  name?:string;
  email?:string;
  phone?:string;
  password?:string;
  status?:string;
  role?:string;
  poste?:RadioButton;
}
