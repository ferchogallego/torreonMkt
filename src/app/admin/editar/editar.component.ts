import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductosService } from 'src/app/services/productos.service';
import { ProductI } from '../../shared/product.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss']
})
export class EditarComponent implements OnInit {

  producto: ProductI;
  image: any;
  imageOriginal: any;
  imageSrc: any;
  categorias = [];
  categ: string;
  beneficio: string;
  beneficios = [];
  imgLoad = false;

  constructor(private productoSvc: ProductosService,
              private route: ActivatedRoute,
              private router: Router) { }

  editProductForm = new FormGroup({
    id: new FormControl('', Validators.required),
    nombre: new FormControl('', Validators.required),
    cantidad: new FormControl('', Validators.required),
    precio: new FormControl('', Validators.required),
    descuento: new FormControl(0),
    imagen: new FormControl('', Validators.required),
    fechaCreacion: new FormControl(new Date().getTime()),
    solucion: new FormControl('', Validators.required),
    uso: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    presentacion: new FormControl('', Validators.required),
    estado: new FormControl('Activado')
  });

  private initValuesForm(){
    this.editProductForm.patchValue({
      id: this.producto.id,
      nombre: this.producto.nombre,
      cantidad: this.producto.cantidad,
      precio: this.producto.precio,
      descuento: this.producto.descuento,
      fechaCreacion: this.producto.fechaCreacion,
      solucion: this.producto.solucion,
      uso: this.producto.uso,
      descripcion: this.producto.descripcion,
      presentacion: this.producto.presentacion,
    });
  }

  get nombreNoValido() {
    return this.editProductForm.get('nombre').invalid && this.editProductForm.get('nombre').touched;
  }
  get cantNoValido() {
    return this.editProductForm.get('cantidad').invalid && this.editProductForm.get('cantidad').touched;
  }
  get precioNoValido() {
    return this.editProductForm.get('precio').invalid && this.editProductForm.get('precio').touched;
  }
  get solucionNoValido() {
    return this.editProductForm.get('solucion').invalid && this.editProductForm.get('solucion').touched;
  }
  get descripcionNoValido() {
    return this.editProductForm.get('descripcion').invalid && this.editProductForm.get('descripcion').touched;
  }
  get usoNoValido() {
    return this.editProductForm.get('uso').invalid && this.editProductForm.get('uso').touched;
  }
  get presentacionNoValido() {
    return this.editProductForm.get('presentacion').invalid && this.editProductForm.get('presentacion').touched;
  }


  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.productoSvc.getProductById(id)
                    .subscribe((resp: ProductI) => {
                      this.producto = resp;
                      this.producto.id = id;
                      this.image = this.producto.imagen;
                      this.imageOriginal = this.producto.imagen;
                      this.categorias = this.producto.categoria;
                      this.beneficios = this.producto.beneficios;
                      console.log('Producto: ', this.producto);
                      this.initValuesForm();
                    });
  }

  editProduct(prd: ProductI){
    prd.categoria = this.categorias;
    prd.beneficios = this.beneficios;
    Swal.fire({
      title: 'Actualización de producto',
      text: `Actualizando datos del producto`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, actualizar'
    }).then(result => {
      if (result.value) {
        if (this.image === this.imageOriginal) {
          prd.imagen = this.imageOriginal;
          this.productoSvc.updateProductById(prd).then(() => {
            Swal.fire('Actualizado!', 'El producto ha sido editado.', 'success');
            this.router.navigate(['/administrador']);
          }).catch((error) => {
            Swal.fire('Error!', 'Error al editar el producto', 'error');
          });
        } else {
          this.productoSvc.updateProductById(prd, this.image).then(() => {
            Swal.fire('Actualizado!', 'El producto ha sido editado.', 'success');
            this.router.navigate(['/administrador']);
          }).catch((error) => {
            Swal.fire('Error!', 'Error al editar el producto', 'error');
          });
        }
      }
    });
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

  handleImage(event: any){
    this.imgLoad = true;
    this.image = event.target.files[0];
    const reader = new FileReader();
    reader.onload = e => {
      this.imageSrc = reader.result;
    };
    reader.readAsDataURL(this.image);
  }

}
