import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PortadaComponent } from './pages/portada/portada.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductoComponent } from './pages/producto/producto.component';



const routes: Routes = [
  { path: 'home', component: PortadaComponent},
  { path: 'categorias', component: CategoriasComponent},
  { path: 'productos/:id', component: ProductsComponent},
  { path: 'producto/:id', component: ProductoComponent},
  { path: '**', pathMatch: 'full', redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
