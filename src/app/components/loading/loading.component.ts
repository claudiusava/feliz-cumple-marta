import { Component, EventEmitter, Output, computed, signal } from '@angular/core';
import { APP_CONFIG } from '../../config';

const MENSAJES = [
  'Toca el corazón',
  'Otra vez',
  'Algo se está encendiendo...',
  'Sigue, que esto se calienta',
  'Un poquito más',
  'No pares ahora',
  '¡La última vez!',
];

const TOQUES_NECESARIOS = MENSAJES.length - 1;

interface Ripple {
  id: number;
}

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css',
})
export class LoadingComponent {
  @Output() finished = new EventEmitter<void>();

  readonly nombre = APP_CONFIG.nombre;
  readonly toques = signal(0);
  readonly leaving = signal(false);
  readonly ripples = signal<Ripple[]>([]);

  readonly progress = computed(() => Math.round((this.toques() / TOQUES_NECESARIOS) * 100));
  readonly mensaje = computed(() => MENSAJES[this.toques()]);

  private rippleId = 0;

  onTap(): void {
    if (this.leaving() || this.toques() >= TOQUES_NECESARIOS) {
      return;
    }

    this.toques.update((t) => t + 1);

    const id = this.rippleId++;
    this.ripples.update((r) => [...r, { id }]);
    setTimeout(() => {
      this.ripples.update((r) => r.filter((x) => x.id !== id));
    }, 700);

    if (this.toques() === TOQUES_NECESARIOS) {
      this.leaving.set(true);
      setTimeout(() => this.finished.emit(), 700);
    }
  }
}
