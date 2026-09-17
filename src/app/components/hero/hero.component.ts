import { Component, EventEmitter, OnDestroy, OnInit, Output, signal } from '@angular/core';
import { APP_CONFIG } from '../../config';

interface ConfettiPiece {
  id: number;
  left: number;
  delay: number;
  color: string;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
})
export class HeroComponent implements OnInit, OnDestroy {
  @Output() reveal = new EventEmitter<void>();

  readonly frase = APP_CONFIG.fraseHeroe;
  readonly fecha = APP_CONFIG.fechaCumpleanos;

  readonly fotos = [
    'assets/images/foto-1.svg',
    'assets/images/foto-2.svg',
    'assets/images/foto-3.svg',
  ];
  readonly activeIndex = signal(0);
  readonly confetti = signal<ConfettiPiece[]>([]);

  private readonly colores = ['#b5533f', '#d98058', '#e4b892', '#9c8a72', '#fffdf8'];
  private intervalId?: ReturnType<typeof setInterval>;
  private confettiId = 0;

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.activeIndex.set((this.activeIndex() + 1) % this.fotos.length);
    }, 3500);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  onDescubrir(): void {
    const nuevas: ConfettiPiece[] = Array.from({ length: 20 }, () => ({
      id: this.confettiId++,
      left: Math.random() * 100,
      delay: Math.random() * 0.35,
      color: this.colores[Math.floor(Math.random() * this.colores.length)],
    }));
    this.confetti.update((c) => [...c, ...nuevas]);

    setTimeout(() => {
      const ids = new Set(nuevas.map((n) => n.id));
      this.confetti.update((c) => c.filter((x) => !ids.has(x.id)));
    }, 1600);

    this.reveal.emit();
  }
}
