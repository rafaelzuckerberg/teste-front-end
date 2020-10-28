import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.scss']
})
export class DeleteProductComponent implements OnInit {

  constructor(private service: ProductService, private snackBar: MatSnackBar, public dialogRef: MatDialogRef<DeleteProductComponent>) { 
  }

  ngOnInit(): void {
  }


  eventModal() {
    this.service.delete(this.service.product.id)
      .subscribe(res => {
        this.message(res['message'], 3000);
        this.closeModal(true);
      })
  }


  closeModal(even) {
    this.dialogRef.close(even);
  }


  message(message: string, duration) {
    this.snackBar.open(message, 'Fechar', {
        duration: duration,
      });
  }

}
