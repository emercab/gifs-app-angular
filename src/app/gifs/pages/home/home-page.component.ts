import { Component, inject } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interface';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {

  private _gifsList: Gif[] = []
  private _gifService = inject(GifsService)

  get gifsList(): Gif[] {
    return this._gifService.gifsList
  }

}
