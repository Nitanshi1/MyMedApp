export interface Product{
  id: string;
SellingPrice: any;
reviews: any;
    _id?: string,
    name: string,
     shortDescription : string,
    description : string,
     price : number,
     discount : number,
     images : string[],
    
     categoryId :string;
     isFeatured:boolean;
     isNewProduct:boolean;
}