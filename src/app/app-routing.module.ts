import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PortadaComponent } from './pages/portada/portada.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { RequestComponent } from './pages/request/request.component';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';
import { BlogComponent } from './pages/blog/blog.component';
import { PostComponent } from './pages/post/post.component';
import { InventarioComponent } from './admin/inventario/inventario.component';
import { NuevoComponent } from './admin/nuevo/nuevo.component';
import { EditarComponent } from './admin/editar/editar.component';
import { ListaComponent } from './admin/blog/lista/lista.component';
import { NewComponent } from './admin/blog/new/new.component';
import { ResponsePayuComponent } from './pages/response-payu/response-payu.component';
import { PedidosComponent } from './admin/pedidos/pedidos.component';
import { ClientesComponent } from './admin/clientes/clientes.component';
import { SuscriptoresComponent } from './admin/suscriptores/suscriptores.component';
import { MensajesComponent } from './admin/mensajes/mensajes.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { AdminGuard } from './shared/guards/admin.guard';
import { RegisterComponent } from './pages/register/register.component';
import { AccessComponent } from './admin/access/access.component';
import { PurchasesComponent } from './pages/purchases/purchases.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { AyudaComponent } from './pages/ayuda/ayuda.component';
import { ContrasenaComponent } from './pages/contrasena/contrasena.component';
import { AdmincategComponent } from './admin/admincateg/admincateg.component';




const routes: Routes = [
  { path: 'home', component: PortadaComponent},
  { path: 'categorias', component: CategoriasComponent},
  { path: 'productos/:id', component: ProductsComponent},
  { path: 'producto/:id', component: ProductoComponent},
  { path: 'solicitudes', component: RequestComponent, canActivate: [AuthGuard]},
  { path: 'categ', component: AdmincategComponent, canActivate: [AuthGuard]},
  { path: 'info', component: PurchasesComponent, canActivate: [AuthGuard]},
  { path: 'catalogo', component: CatalogoComponent},
  { path: 'blog', component: BlogComponent},
  { path: 'post/:id', component: PostComponent},
  { path: 'admin', component: AccessComponent},
  { path: 'administrador', component: InventarioComponent, canActivate: [AdminGuard]},
  { path: 'nuevo', component: NuevoComponent, canActivate: [AdminGuard]},
  { path: 'editar/:id', component: EditarComponent, canActivate: [AdminGuard]},
  { path: 'listaPost', component: ListaComponent, canActivate: [AdminGuard]},
  { path: 'newPost', component: NewComponent, canActivate: [AdminGuard]},
  { path: 'confirmacion', component: ResponsePayuComponent},
  { path: 'pedidos', component: PedidosComponent, canActivate: [AdminGuard]},
  { path: 'clientes', component: ClientesComponent, canActivate: [AdminGuard]},
  { path: 'suscriptores', component: SuscriptoresComponent, canActivate: [AdminGuard]},
  { path: 'mensajes', component: MensajesComponent, canActivate: [AdminGuard]},
  { path: 'registro', component: RegisterComponent},
  { path: 'nosotros', component: NosotrosComponent},
  { path: 'contrasena', component: ContrasenaComponent},
  { path: 'ayuda/:id', component: AyudaComponent},
  { path: '**', pathMatch: 'full', redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
