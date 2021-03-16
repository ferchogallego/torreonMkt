import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.component.html',
  styleUrls: ['./ayuda.component.scss']
})
export class AyudaComponent implements OnInit {
  pasos = false;
  formas = false;
  envios = false;
  cuenta = false;
  pago = false;
  preguntas = false;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id === 'pasos') {
      this.pasos = true;
      this.formas = false;
      this.envios = false;
      this.cuenta = false;
      this.pago = false;
      this.preguntas = false;
    }
    if (id === 'formas') {
      this.pasos = false;
      this.formas = true;
      this.envios = false;
      this.cuenta = false;
      this.pago = false;
      this.preguntas = false;
    }
    if (id === 'envios') {
      this.pasos = false;
      this.formas = false;
      this.envios = true;
      this.cuenta = false;
      this.pago = false;
      this.preguntas = false;
    }
    if (id === 'cuenta') {
      this.pasos = false;
      this.formas = false;
      this.envios = false;
      this.cuenta = true;
      this.pago = false;
      this.preguntas = false;
    }
    if (id === 'pago') {
      this.pasos = false;
      this.formas = false;
      this.envios = false;
      this.cuenta = false;
      this.pago = true;
      this.preguntas = false;
    }
    if (id === 'preguntas') {
      this.pasos = false;
      this.formas = false;
      this.envios = false;
      this.cuenta = false;
      this.pago = false;
      this.preguntas = true;
    }
  }

}
