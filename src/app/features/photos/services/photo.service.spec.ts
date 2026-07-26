import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { PhotoService } from './photo.service';

describe('PhotoApi', () => {
  let service: PhotoService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PhotoService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(PhotoService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should load and map photos', () => {
    const response = [
      {
        id: '10',
        author: 'Test Author',
        width: 2500,
        height: 1667,
        url: 'https://example.com',
        download_url: 'https://picsum.photos/id/10/2500/1667',
      },
    ];

    service.getPhotos(1, 12).subscribe((photos) => {
      expect(photos).toEqual([
        {
          id: '10',
          url: 'https://picsum.photos/id/10/600/600',
          width: 2500,
          height: 1667,
        },
      ]);
    });

    const request = httpTesting.expectOne(
      'https://picsum.photos/v2/list?page=1&limit=12',
    );

    expect(request.request.method).toBe('GET');

    request.flush(response);
  });
});
