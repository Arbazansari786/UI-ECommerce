import { FileHandle } from "./file-handle";

export interface Product {

    productId?: null,
    productName:string,
    productDescription:string,
    productActualPrice:number,
    availableStock:number,
    productDiscountedPrice:number,
    productImages:FileHandle[]
}
