import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-details-product',
  templateUrl: './details-product.component.html',
  styleUrls: ['./details-product.component.scss']
})
export class DetailsProductComponent implements OnInit {

  constructor(public service: ProductService, public dialogRef: MatDialogRef<DetailsProductComponent>) { }

  ngOnInit(): void {
    console.log(this.service.product)
  }


  closeModal(even) {
    this.dialogRef.close(even);
  }

}
