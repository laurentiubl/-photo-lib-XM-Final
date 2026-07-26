import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PhotoGrid } from '../../../../shared/components/photo-grid/photo-grid';
import { Photo } from '../../../../shared/models/photo';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-favorites-list',
  standalone: true,
  imports: [PhotoGrid],
  templateUrl: './favorites-list.html',
  styleUrl: './favorites-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritesList {
  private readonly favoritesService = inject(FavoritesService);
  private readonly router = inject(Router);

  readonly favorites = this.favoritesService.photos;

  openPhoto(photo: Photo): void {
    this.router.navigate(['/photos', photo.id]);
  }
}
