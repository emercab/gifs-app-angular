import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css'
})
export class SearchBoxComponent {

  @ViewChild('txtSearchInput') // Tomar referencia de un elemento del HTML
  public searchInput!: ElementRef<HTMLInputElement>

  private _gifsService = inject(GifsService)

  searchTag(): void {
    const tag: string = this.searchInput.nativeElement.value
    this._gifsService.searchTag(tag)
    this.searchInput.nativeElement.value = ''
  }

}
