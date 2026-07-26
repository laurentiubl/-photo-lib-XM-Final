import { inject, Injectable, signal } from '@angular/core';
import { Storage } from '../../../core/storage/storage';
import { Photo } from '../../../shared/models/photo';

const STORAGE_KEY = 'favorite-photos';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private readonly storage = inject(Storage);

  readonly photos = signal<Photo[]>(
    this.storage.get<Photo[]>(STORAGE_KEY) ?? [],
  );

  add(photo: Photo): void {
    const alreadyExists = this.photos().some(
      (favorite) => favorite.id === photo.id,
    );

    if (alreadyExists) {
      return;
    }

    this.photos.update((photos) => [...photos, photo]);
    this.save();
  }

  remove(photoId: string): void {
    this.photos.update((photos) =>
      photos.filter((photo) => photo.id !== photoId),
    );

    this.save();
  }

  getById(photoId: string): Photo | undefined {
    return this.photos().find((photo) => photo.id === photoId);
  }

  isFavorite(photoId: string): boolean {
    return this.photos().some((photo) => photo.id === photoId);
  }

  private save(): void {
    this.storage.set(STORAGE_KEY, this.photos());
  }
}
