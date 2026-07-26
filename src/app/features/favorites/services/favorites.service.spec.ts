import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Storage } from '../../../core/storage/storage';
import { Photo } from '../../../shared/models/photo';
import { FavoritesService } from './favorites.service';

const STORAGE_KEY = 'favorite-photos';

describe('FavoritesService', () => {
  let service: FavoritesService;

  const storageMock = {
    get: vi.fn(),
    set: vi.fn(),
    remove: vi.fn(),
  };

  const photo1 = {
    id: '1',
    author: 'Author 1',
    width: 1200,
    height: 800,
    url: 'https://example.com/photo/1',
    download_url: 'https://example.com/photo/1/download',
  } as Photo;

  const photo2 = {
    id: '2',
    author: 'Author 2',
    width: 1000,
    height: 700,
    url: 'https://example.com/photo/2',
    download_url: 'https://example.com/photo/2/download',
  } as Photo;

  beforeEach(() => {
    vi.clearAllMocks();
    storageMock.get.mockReturnValue(null);

    TestBed.configureTestingModule({
      providers: [
        FavoritesService,
        {
          provide: Storage,
          useValue: storageMock,
        },
      ],
    });

    service = TestBed.inject(FavoritesService);
  });

  it('should initialize with an empty list when storage is empty', () => {
    expect(storageMock.get).toHaveBeenCalledWith(STORAGE_KEY);
    expect(service.photos()).toEqual([]);
  });

  it('should initialize photos from storage', () => {
    storageMock.get.mockReturnValue([photo1, photo2]);

    // Este necesară o instanță nouă deoarece signal-ul este inițializat
    // în momentul construirii serviciului.
    TestBed.resetTestingModule();

    TestBed.configureTestingModule({
      providers: [
        FavoritesService,
        {
          provide: Storage,
          useValue: storageMock,
        },
      ],
    });

    service = TestBed.inject(FavoritesService);

    expect(service.photos()).toEqual([photo1, photo2]);
  });

  it('should add a photo and save the updated list', () => {
    service.add(photo1);

    expect(service.photos()).toEqual([photo1]);
    expect(storageMock.set).toHaveBeenCalledWith(STORAGE_KEY, [photo1]);
  });

  it('should not add the same photo twice', () => {
    service.add(photo1);
    storageMock.set.mockClear();

    service.add(photo1);

    expect(service.photos()).toEqual([photo1]);
    expect(storageMock.set).not.toHaveBeenCalled();
  });

  it('should add different photos', () => {
    service.add(photo1);
    service.add(photo2);

    expect(service.photos()).toEqual([photo1, photo2]);

    expect(storageMock.set).toHaveBeenLastCalledWith(
      STORAGE_KEY,
      [photo1, photo2],
    );
  });

  it('should remove a photo and save the updated list', () => {
    service.add(photo1);
    service.add(photo2);
    storageMock.set.mockClear();

    service.remove(photo1.id);

    expect(service.photos()).toEqual([photo2]);
    expect(storageMock.set).toHaveBeenCalledWith(STORAGE_KEY, [photo2]);
  });

  it('should save even when the removed photo does not exist', () => {
    service.add(photo1);
    storageMock.set.mockClear();

    service.remove('unknown-id');

    expect(service.photos()).toEqual([photo1]);
    expect(storageMock.set).toHaveBeenCalledWith(STORAGE_KEY, [photo1]);
  });

  it('should return a photo by id', () => {
    service.add(photo1);
    service.add(photo2);

    expect(service.getById(photo2.id)).toEqual(photo2);
  });

  it('should return undefined when the photo does not exist', () => {
    expect(service.getById('unknown-id')).toBeUndefined();
  });

  it('should return true when the photo is a favorite', () => {
    service.add(photo1);

    expect(service.isFavorite(photo1.id)).toBe(true);
  });

  it('should return false when the photo is not a favorite', () => {
    expect(service.isFavorite('unknown-id')).toBe(false);
  });
});
