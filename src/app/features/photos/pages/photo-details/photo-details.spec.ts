import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { PhotoDetails } from './photo-details';
import { FavoritesService } from '../../../favorites/services/favorites.service';

describe('PhotoDetails', () => {
  let component: PhotoDetails;
  let fixture: ComponentFixture<PhotoDetails>;

  const favoritesMock = {
    getById: vi.fn().mockReturnValue(undefined),
    remove: vi.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoDetails],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: vi.fn().mockReturnValue('10'),
              },
            },
          },
        },
        {
          provide: FavoritesService,
          useValue: favoritesMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
