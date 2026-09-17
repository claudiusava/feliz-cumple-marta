import { Component, ElementRef, ViewChild, signal } from '@angular/core';
import { LoadingComponent } from './components/loading/loading.component';
import { HeroComponent } from './components/hero/hero.component';
import { LetterComponent } from './components/letter/letter.component';

type Stage = 'loading' | 'hero' | 'letter';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LoadingComponent, HeroComponent, LetterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  readonly stage = signal<Stage>('loading');

  @ViewChild('letterAnchor') letterAnchor?: ElementRef<HTMLElement>;

  onLoadingFinished(): void {
    this.stage.set('hero');
  }

  onReveal(): void {
    this.stage.set('letter');
    setTimeout(() => {
      this.letterAnchor?.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 60);
  }
}
