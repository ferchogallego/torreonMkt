import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PortadaComponent } from './pages/portada/portada.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { NavsecComponent } from './components/navsec/navsec.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';
import { FooterComponent } from './components/footer/footer.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RequestComponent } from './pages/request/request.component';
import { FilterPipe } from './pipes/filter.pipe';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';
import { BlogComponent } from './pages/blog/blog.component';
import { PostComponent } from './pages/post/post.component';
import { InventarioComponent } from './admin/inventario/inventario.component';
import { NuevoComponent } from './admin/nuevo/nuevo.component';
import { EditarComponent } from './admin/editar/editar.component';
import { AdminavComponent } from './admin/adminav/adminav.component';
import { ListaComponent } from './admin/blog/lista/lista.component';
import { NewComponent } from './admin/blog/new/new.component';
import { ResponsePayuComponent } from './pages/response-payu/response-payu.component';
import { PedidosComponent } from './admin/pedidos/pedidos.component';
import { ClientesComponent } from './admin/clientes/clientes.component';
import { SuscriptoresComponent } from './admin/suscriptores/suscriptores.component';
import { MensajesComponent } from './admin/mensajes/mensajes.component';
import { RegisterComponent } from './pages/register/register.component';
import { AccessComponent } from './admin/access/access.component';
import { PurchasesComponent } from './pages/purchases/purchases.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PortadaComponent,
    CategoriasComponent,
    NavsecComponent,
    FooterComponent,
    ProductsComponent,
    ProductoComponent,
    RequestComponent,
    FilterPipe,
    CatalogoComponent,
    BlogComponent,
    PostComponent,
    InventarioComponent,
    NuevoComponent,
    EditarComponent,
    AdminavComponent,
    ListaComponent,
    NewComponent,
    ResponsePayuComponent,
    PedidosComponent,
    ClientesComponent,
    SuscriptoresComponent,
    MensajesComponent,
    RegisterComponent,
    AccessComponent,
    PurchasesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
