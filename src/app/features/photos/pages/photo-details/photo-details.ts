import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { FavoritesService } from '../../../favorites/services/favorites.service';

@Component({
  selector: 'app-photo-details',
  standalone: true,
  imports: [MatButtonModule,RouterLink],
  templateUrl: './photo-details.html',
  styleUrl: './photo-details.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoDetails {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly favorites = inject(FavoritesService);

  private readonly photoId = this.route.snapshot.paramMap.get('id');

  readonly photo = computed(() =>
    this.photoId
      ? this.favorites.getById(this.photoId)
      : undefined,
  );

  removeFromFavorites(): void {
    if (!this.photoId) {
      return;
    }

    this.favorites.remove(this.photoId);
    this.router.navigate(['/favorites']);
  }
}
