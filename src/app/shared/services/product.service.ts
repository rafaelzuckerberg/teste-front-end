import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';

@Injectable({
    providedIn: 'root'
})

export class ProductService {

    api = 'http://localhost:3306/';
    product: Product;

    constructor(private http: HttpClient) { }


    getProducts() {
        return this.http.get<Product[]>(this.api + 'products');
    }
    
    
    add(product: Product) {
        return this.http.post<Product>(this.api + 'products', product);
    }
    
    
    update(product: Product) {
        return this.http.patch<Product>(this.api + 'products/' + product.id, product);
    }
    
    
    delete(id: number) {
        return this.http.delete<Product>(this.api + 'products/' + id);
    }
    
}