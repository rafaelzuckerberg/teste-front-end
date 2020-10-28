import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-create-edit-product',
  templateUrl: './create-edit-product.component.html',
  styleUrls: ['./create-edit-product.component.scss']
})
export class CreateEditProductComponent implements OnInit {

  form: FormGroup;
  clicked: boolean = false;

  constructor(private fb: FormBuilder, public service: ProductService, private snackBar: MatSnackBar, public dialogRef: MatDialogRef<CreateEditProductComponent>) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      name: [this.service.product.name, Validators.required],
      brand: [this.service.product.brand, Validators.required],
      model: [this.service.product.model, Validators.required],
      price: [this.service.product.price, Validators.required],
      link: [this.service.product.link, Validators.required],
      label: [this.service.product.label, Validators.required],
    });
  }


  submit() {
    if(this.service.product.id != undefined) {
      this.edit();
    } else {
      this.save();
    }
  }


  save() {
    console.log(this.form.value)
    this.service.add(this.form.value)
        .subscribe(res => {
          console.log(res);
          setTimeout(() => {
            this.closeModal(true);
            this.message('Produto cadastrado com sucesso', 3000);
          }, 3000);
        }, er => {
          console.log(er);
          setTimeout(() => {
            this.clicked = false;
          }, 2000);
        });
  }


  edit() {
    this.form.value.id = this.service.product.id;
    console.log(this.form.value)
    this.service.update(this.form.value)
    .subscribe(res => {
      console.log(res);
      setTimeout(() => {
        this.closeModal(true);
        this.message('Produto atualizado com sucesso', 3000);
      }, 3000);
    }, er => {
      console.log(er);
      setTimeout(() => {
        this.clicked = false;
      }, 2000);
    });
  }


  message(message: string, duration) {
    this.snackBar.open(message, 'Fechar', {
        duration: duration,
      });
  }


  closeModal(even) {
    this.dialogRef.close(even);
  }

}
