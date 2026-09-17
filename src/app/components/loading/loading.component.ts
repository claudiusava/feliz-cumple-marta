import { Component, EventEmitter, OnDestroy, OnInit, Output, signal } from '@angular/core';
import { APP_CONFIG } from '../../config';

const MENSAJES = [
  'Algo especial se está encendiendo...',
  'Un poquito más...',
  'Ya casi está...',
];

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css',
})
export class LoadingComponent implements OnInit, OnDestroy {
  @Output() finished = new EventEmitter<void>();

  readonly nombre = APP_CONFIG.nombre;
  readonly progress = signal(0);
  readonly mensaje = signal(MENSAJES[0]);
  readonly leaving = signal(false);

  private intervalId?: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      const next = Math.min(100, this.progress() + Math.round(2 + Math.random() * 5));
      this.progress.set(next);

      if (next < 40) {
        this.mensaje.set(MENSAJES[0]);
      } else if (next < 80) {
        this.mensaje.set(MENSAJES[1]);
      } else {
        this.mensaje.set(MENSAJES[2]);
      }

      if (next >= 100) {
        clearInterval(this.intervalId);
        this.leaving.set(true);
        setTimeout(() => this.finished.emit(), 500);
      }
    }, 90);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }
}
