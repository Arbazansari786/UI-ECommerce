import { FileHandle } from "./file-handle";

export interface Product {

    productId?: null,
    productName:string,
    productDescription:string,
    productActualPrice:number,
    productDiscountedPrice:number,
    productImages:FileHandle[]
}
