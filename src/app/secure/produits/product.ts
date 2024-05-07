export interface Product {
  id?: number;
  name?: string;
  description?: string;
  quantity?: number;
  priceSale?: number;
  priceFav?: number;
  priceMax?: number;
  category?: string;
  image?: ImageData[];
  status?: string;
  reference?: string;
  echantillon?: string;
  brand?: string;
  colors?:string[];
  sizes?: string[];
  subcategory?: string;
  //provider_id?: string;


}
