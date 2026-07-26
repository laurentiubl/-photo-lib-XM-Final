import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PhotoCard } from './photo-card';
import { Photo } from '../../models/photo';

describe('PhotoCard', () => {
  let component: PhotoCard;
  let fixture: ComponentFixture<PhotoCard>;

  const photo: Photo = {
    id: '10',
    url: 'https://picsum.photos/id/10/600/600',
    width: 600,
    height: 600,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoCard],
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoCard);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('photo', photo);
    fixture.detectChanges();
  });

  it('should display the photo', () => {
    const image: HTMLImageElement =
      fixture.nativeElement.querySelector('img');

    expect(image.src).toContain(photo.url);
  });

  it('should emit the selected photo when clicked', () => {
    const selected = vi.fn();

    component.selected.subscribe(selected);

    const card: HTMLElement =
      fixture.nativeElement.querySelector('mat-card');

    card.click();

    expect(selected).toHaveBeenCalledWith(photo);
  });
});
