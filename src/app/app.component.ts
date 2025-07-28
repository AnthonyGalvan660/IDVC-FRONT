import { Component } from '@angular/core';
import { ValidacionService } from './servicios/validacion.service';
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  codigo: string = '';
  mensaje: string = '';
  tipoMensaje: 'success' | 'danger' | 'warning' = 'success';
  datosCertificacion: any = null;
  mostrarModal: boolean = false;

  constructor(private validacionService: ValidacionService) {}

  validar() {
    const codigoTrim = this.codigo.trim();
    if (!codigoTrim) {
      this.tipoMensaje = 'warning';
      this.mensaje = 'Ingresa el código';
      this.resetMensaje();
      return;
    }

    this.validacionService.validarCodigo(codigoTrim).subscribe(
      (res) => {
        if (res.valido) {
          this.tipoMensaje = 'success';
          this.mensaje = 'Certificación validada';
          this.datosCertificacion = res.datosCertificacion;
          this.mostrarModal = true;

          setTimeout(() => {
                            this.cerrarModal();
                          }, 10000); // Oculta el panel después de 10 segundos

          const canvas = document.getElementById('confetti-canvas') as HTMLCanvasElement;
          if (canvas) {
            const myConfetti = confetti.create(canvas, { resize: true, useWorker: true });
            myConfetti({
              particleCount: 80,
              spread: 100,
              origin: { y: 0.6 }
            });
          }
        } else {
          this.tipoMensaje = 'danger';
          this.mensaje = 'Código no encontrado';
          this.datosCertificacion = null;
        }
        this.resetMensaje();
      },
      (error) => {
        this.tipoMensaje = 'danger';
        this.mensaje = 'No se encuentra servidor';
        console.error(error);
        this.resetMensaje();
      }
    );
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  private resetMensaje() {
    setTimeout(() => {
      this.mensaje = '';
    }, 5000);
  }
}