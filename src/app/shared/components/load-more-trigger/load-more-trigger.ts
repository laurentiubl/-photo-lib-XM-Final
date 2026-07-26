import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  PLATFORM_ID,
  inject,
  output,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'app-load-more-trigger',
  standalone: true,
  templateUrl: './load-more-trigger.html',
  styleUrl: './load-more-trigger.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadMoreTrigger implements AfterViewInit, OnDestroy {
  readonly loadMore = output<void>();

  private readonly platformId = inject(PLATFORM_ID);

  private readonly trigger =
    viewChild.required<ElementRef<HTMLElement>>('trigger');

  private observer?: IntersectionObserver;

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.loadMore.emit();
        }
      },
      {
        rootMargin: '300px',
      },
    );

    this.observer.observe(this.trigger().nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
