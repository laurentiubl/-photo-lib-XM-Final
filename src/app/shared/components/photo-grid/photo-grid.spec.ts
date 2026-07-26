import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { PhotoGrid } from './photo-grid';
import { Photo } from '../../models/photo';

describe('PhotoGrid', () => {
  let component: PhotoGrid;
  let fixture: ComponentFixture<PhotoGrid>;

  const photos: Photo[] = [
    {
      id: '10',
      url: 'https://picsum.photos/id/10/600/600',
      width: 600,
      height: 600,
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoGrid],
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoGrid);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('photos', photos);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render photos', () => {
    const cards = fixture.nativeElement.querySelectorAll('app-photo-card');

    expect(cards.length).toBe(1);
  });
});
