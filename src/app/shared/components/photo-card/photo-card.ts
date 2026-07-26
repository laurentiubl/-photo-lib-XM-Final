import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Photo } from '../../models/photo';

@Component({
  selector: 'app-photo-card',
  imports: [MatCardModule],
  templateUrl: './photo-card.html',
  styleUrl: './photo-card.scss',
  standalone: true,

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoCard {
  readonly photo = input.required<Photo>();
  readonly selected = output<Photo>();

  selectPhoto(): void {
    this.selected.emit(this.photo());
  }
}
