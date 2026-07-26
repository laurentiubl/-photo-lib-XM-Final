import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, map, Observable } from 'rxjs';
import { Photo } from '../../../shared/models/photo';

interface PicsumPhoto {
  id: string;
  width: number;
  height: number;
  download_url: string;
}

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  private readonly http = inject(HttpClient);

  getPhotos(page: number, limit = 24): Observable<Photo[]> {
    const delayMs = this.getRandomDelay();

    return this.http
      .get<PicsumPhoto[]>(
        `https://picsum.photos/v2/list?page=${page}&limit=${limit}`,
      )
      .pipe(
        delay(delayMs),
        map((photos) =>
          photos.map((photo) => ({
            id: photo.id,
            url: `https://picsum.photos/id/${photo.id}/600/600`,
            width: photo.width,
            height: photo.height,
          })),
        ),
      );
  }

  private getRandomDelay(): number {
    return Math.floor(Math.random() * 101) + 200;
  }
}
