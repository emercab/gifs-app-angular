import { Component, inject } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  private _gifsService = inject(GifsService)
  
  get tagsHistory(): string[] {
    return this._gifsService.tagsHistory
  }
  
  
  searchTag(tag: string): void {
    this._gifsService.searchTag(tag)
  }

}
