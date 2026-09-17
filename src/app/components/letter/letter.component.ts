import { Component, signal } from '@angular/core';
import { APP_CONFIG } from '../../config';

interface FloatingHeart {
  id: number;
  left: number;
  delay: number;
}

@Component({
  selector: 'app-letter',
  standalone: true,
  imports: [],
  templateUrl: './letter.component.html',
  styleUrl: './letter.component.css',
})
export class LetterComponent {
  readonly nombre = APP_CONFIG.nombre;
  readonly guardado = signal(false);
  readonly hearts = signal<FloatingHeart[]>([]);

  private heartId = 0;

  guardarMomento(): void {
    this.guardado.set(true);

    const nuevos: FloatingHeart[] = Array.from({ length: 10 }, () => ({
      id: this.heartId++,
      left: 10 + Math.random() * 80,
      delay: Math.random() * 0.4,
    }));
    this.hearts.update((current) => [...current, ...nuevos]);

    setTimeout(() => {
      const idsToRemove = new Set(nuevos.map((h) => h.id));
      this.hearts.update((current) => current.filter((h) => !idsToRemove.has(h.id)));
    }, 1800);

    setTimeout(() => this.guardado.set(false), 2600);
  }
}
