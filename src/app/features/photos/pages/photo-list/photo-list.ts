import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { finalize } from 'rxjs';

import { PhotoGrid } from '../../../../shared/components/photo-grid/photo-grid';
import { LoadMoreTrigger } from '../../../../shared/components/load-more-trigger/load-more-trigger';
import { Photo } from '../../../../shared/models/photo';
import { PhotoService } from '../../services/photo.service';
import { FavoritesService } from '../../../favorites/services/favorites.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-photo-list',
  standalone: true,
  imports: [
    PhotoGrid,
    LoadMoreTrigger,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './photo-list.html',
  styleUrl: './photo-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoList {
  private readonly photoApi = inject(PhotoService);
  private readonly favorites = inject(FavoritesService);
  private readonly snackBar = inject(MatSnackBar);

  readonly photos = signal<Photo[]>([]);
  readonly loading = signal(false);

  private page = 1;

  constructor() {
    this.loadPhotos();
  }

  selectPhoto(photo: Photo): void {
    if (this.favorites.isFavorite(photo.id)) {
      this.snackBar.open('Photo is already in favorites', 'Close', {
        duration: 2000,
      });

      return;
    }

    this.favorites.add(photo);

    this.snackBar.open('Photo added to favorites', 'Close', {
      duration: 2000,
    });
  }

  loadPhotos(): void {
    if (this.loading()) {
      return;
    }

    this.loading.set(true);

    this.photoApi
      .getPhotos(this.page)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe((photos) => {
        this.photos.update((current) => [...current, ...photos]);
        this.page++;
      });
  }
}
