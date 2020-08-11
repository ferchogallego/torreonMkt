import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductI } from '../../shared/product.interface';
import { ProductosService } from '../../services/productos.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.scss']
})
export class NuevoComponent implements OnInit {

  image: any;
  imageSrc: any;
  categorias = [];
  categ: string;
  beneficio: string;
  beneficios = [];

  constructor(private productoSvc: ProductosService,
              private router: Router) { }

  newProductForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    cantidad: new FormControl('', Validators.required),
    precio: new FormControl('', Validators.required),
    imagen: new FormControl('', Validators.required),
    fechaCreacion: new FormControl(new Date().getTime()),
    solucion: new FormControl('', Validators.required),
    uso: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    presentacion: new FormControl('', Validators.required)
  });
  get nombreNoValido() {
    return this.newProductForm.get('nombre').invalid && this.newProductForm.get('nombre').touched;
  }
  get cantNoValido() {
    return this.newProductForm.get('cantidad').invalid && this.newProductForm.get('cantidad').touched;
  }
  get precioNoValido() {
    return this.newProductForm.get('precio').invalid && this.newProductForm.get('precio').touched;
  }
  get solucionNoValido() {
    return this.newProductForm.get('solucion').invalid && this.newProductForm.get('solucion').touched;
  }
  get descripcionNoValido() {
    return this.newProductForm.get('descripcion').invalid && this.newProductForm.get('descripcion').touched;
  }
  get usoNoValido() {
    return this.newProductForm.get('uso').invalid && this.newProductForm.get('uso').touched;
  }
  get presentacionNoValido() {
    return this.newProductForm.get('presentacion').invalid && this.newProductForm.get('presentacion').touched;
  }

  ngOnInit(): void {}

  addNewProduct(product: ProductI){
    product.categoria = this.categorias;
    product.beneficios = this.beneficios;
    if ( this.newProductForm.invalid ) {
      Swal.fire({
        title: 'Error...',
        text: 'Debe ingresar la información requerida',
        icon: 'error',
        allowOutsideClick: false,
        showCloseButton: true
      });
      return Object.values( this.newProductForm.controls ).forEach( control => {
        if ( control instanceof FormGroup ) {
          // tslint:disable-next-line: no-shadowed-variable
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();
        }
      });
    }
    this.productoSvc.filterProd(product, this.image);
    Swal.fire({
      title: product.nombre,
      text: 'Creado satisfactoriamente',
      icon: 'success',
      showCloseButton: true
    }).then(res => {
      this.router.navigate(['/administrador']);
    });
  }

  handleImage(event: any){
    this.image = event.target.files[0];
    const reader = new FileReader();
    reader.onload = e => {
      this.imageSrc = reader.result;
    };
    reader.readAsDataURL(this.image);
  }

  handleBenefits(bnf: string){
    this.beneficio = bnf;
  }

  addBenefits(){
    this.beneficios.push(this.beneficio);
    console.log(this.categorias);
  }

  handleCategory(cate: string){
    this.categ = cate;
  }

  addCategoria(){
    this.categorias.push(this.categ);
    console.log(this.categorias);
  }

  deleteCategories(){
    this.categorias = [];
  }
  deleteBenefits(){
    this.beneficios = [];
  }
}
