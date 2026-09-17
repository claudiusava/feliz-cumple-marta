import { Component, EventEmitter, OnDestroy, OnInit, Output, signal } from '@angular/core';
import { APP_CONFIG } from '../../config';

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

  private intervalId?: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.activeIndex.set((this.activeIndex() + 1) % this.fotos.length);
    }, 3500);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  onDescubrir(): void {
    this.reveal.emit();
  }
}
