import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/shared/interfaces/product';
import { ProductService } from 'src/app/shared/services/product.service';
import { CreateEditProductComponent } from './create-edit-product/create-edit-product.component';
import { DeleteProductComponent } from './delete-product/delete-product.component';
import { DetailsProductComponent } from './details-product/details-product.component';

export interface PeriodicElement {
    name: string;
    position: number;
    weight: number;
    symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' }
];

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    displayedColumns = ['id', 'name', 'brand', 'model', 'price', 'link', 'icon'];
    dataSource: MatTableDataSource<Product>;

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

    constructor(public dialog: MatDialog, private service: ProductService) {
    }

    ngOnInit() {
        this.getProducts();
    }


    getProducts() {
        this.service.getProducts()
                .subscribe(res => {
                    console.log(res);
                    this.dataSource = new MatTableDataSource(res);
                });
    }


    modalCreate(product: Product) {
      console.log(product)
      this.service.product = Object.assign({}, product);
      let dialogRef = this.dialog.open(CreateEditProductComponent, {
          height: '560px',
          width: '600px',
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result) {
          this.getProducts();
        }
      });
    }


    modalDetails(product: Product) {
      this.service.product = Object.assign({}, product);
        let dialogRef = this.dialog.open(DetailsProductComponent, {
          height: '500px',
          width: '560px',
          disableClose: true
        });
      }
    
    
    
      modalDelete(product: Product) {
        this.service.product = Object.assign({}, product);
        let dialogRef = this.dialog.open(DeleteProductComponent, {
          height: '150',
          width: '425px',
          disableClose: true
        });
        dialogRef.afterClosed().subscribe(result => {
          if(result) {
            this.getProducts();
          }
        });
      }


    //   applyFilter(event: Event) {
    //     const filterValue = (event.target as HTMLInputElement).value;
    //     this.dataSource.filter = filterValue.trim().toLowerCase();
    //     if (this.dataSource.paginator) {
    //       this.dataSource.paginator.firstPage();
    //     }
    //   }
}
