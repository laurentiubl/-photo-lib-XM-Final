import { ComponentFixture, TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { LoadMoreTrigger } from './load-more-trigger';

describe('LoadMoreTrigger', () => {
  let component: LoadMoreTrigger;
  let fixture: ComponentFixture<LoadMoreTrigger>;

  beforeEach(async () => {
    class IntersectionObserverMock {
      observe = vi.fn();
      unobserve = vi.fn();
      disconnect = vi.fn();
    }

    vi.stubGlobal('IntersectionObserver', IntersectionObserverMock);

    await TestBed.configureTestingModule({
      imports: [LoadMoreTrigger],
    }).compileComponents();

    fixture = TestBed.createComponent(LoadMoreTrigger);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
