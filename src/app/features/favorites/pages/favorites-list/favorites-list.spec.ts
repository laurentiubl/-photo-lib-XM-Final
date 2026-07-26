import { TestBed } from '@angular/core/testing';
import {Photo} from '../../../../shared/models/photo';
import {FavoritesService} from '../../services/favorites.service';


describe('Favorites', () => {
  let service: FavoritesService;
  let storage: {
    get: ReturnType<typeof vi.fn>;
    set: ReturnType<typeof vi.fn>;
  };

  const photo: Photo = {
    id: '10',
    url: 'https://picsum.photos/id/10/600/600',
    width: 600,
    height: 600,
  };

  beforeEach(() => {
    storage = {
      get: vi.fn().mockReturnValue([]),
      set: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        FavoritesService,
        {
          provide: Storage,
          useValue: storage,
        },
      ],
    });

    service = TestBed.inject(FavoritesService);
  });

  it('should add a photo to favorites', () => {
    service.add(photo);

    expect(service.photos()).toEqual([photo]);
  });

  it('should not add the same photo twice', () => {
    service.add(photo);
    service.add(photo);

    expect(service.photos()).toHaveLength(1);
  });

  it('should remove a photo from favorites', () => {
    service.add(photo);

    service.remove(photo.id);

    expect(service.photos()).toEqual([]);
  });


});
