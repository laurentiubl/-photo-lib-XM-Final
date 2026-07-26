import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { PhotoList } from './photo-list';
import { PhotoService } from '../../services/photo.service';
import { FavoritesService } from '../../../favorites/services/favorites.service';

describe('PhotoList', () => {
  let component: PhotoList;
  let fixture: ComponentFixture<PhotoList>;

  const photoApiMock = {
    getPhotos: vi.fn().mockReturnValue(of([])),
  };

  const favoritesMock = {
    add: vi.fn(),
    isFavorite: vi.fn().mockReturnValue(false),
  };

  const snackBarMock = {
    open: vi.fn(),
  };

  beforeEach(async () => {
    class IntersectionObserverMock {
      observe = vi.fn();
      unobserve = vi.fn();
      disconnect = vi.fn();
    }

    vi.stubGlobal('IntersectionObserver', IntersectionObserverMock);

    photoApiMock.getPhotos.mockClear();
    favoritesMock.add.mockClear();
    favoritesMock.isFavorite.mockClear();
    snackBarMock.open.mockClear();

    favoritesMock.isFavorite.mockReturnValue(false);
    photoApiMock.getPhotos.mockReturnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [PhotoList],
      providers: [
        {
          provide: PhotoService,
          useValue: photoApiMock,
        },
        {
          provide: FavoritesService,
          useValue: favoritesMock,
        },
        {
          provide: MatSnackBar,
          useValue: snackBarMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load photos on initialization', () => {
    expect(photoApiMock.getPhotos).toHaveBeenCalled();
  });


});
