import { Component, Input } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interface';

@Component({
  selector: 'gifs-gif-card',
  templateUrl: './card.component.html',
})
export class CardComponent {

  @Input()
  gif!: Gif

}
