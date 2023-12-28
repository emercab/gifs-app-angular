import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _gifsList: Gif[] = []
  private _tagsHistory: string[] = []
  private _tagsLimit: number = 10

  private _http = inject(HttpClient)
  private _apiKey: string = 'k6WPMRK0zuaDeVTiETpYxTGRI1ZypnHy'
  private _apiUrl: string = 'https://api.giphy.com/v1/gifs'
  private _resultsLimit: number = 12
  
  constructor() {
    this.loadLocalStorage()
  }

  get tagsHistory(): string[] {
    return [...this._tagsHistory]
  }


  get gifsList(): Gif[] {
    return [...this._gifsList]
  }


  private organizeTagsHistory(tag: string): void {
    tag = tag.trim().toLowerCase()

    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter( currentTag => currentTag !== tag)
    }

    this._tagsHistory.unshift(tag)
    this._tagsHistory = this._tagsHistory.splice(0, this._tagsLimit)
    this.saveLocalStorage()
  }


  private saveLocalStorage(): void {
    localStorage.setItem('tagsHistory', JSON.stringify(this._tagsHistory))
  }


  private loadLocalStorage(): void {
    if (localStorage.getItem('tagsHistory')) {
      this._tagsHistory = JSON.parse(localStorage.getItem('tagsHistory')!)

      // Search the first tag in the history
      this.searchTag(this._tagsHistory[0])
    }
  }


  searchTag(tag: string): void {
    // Check if tag is empty or is the same as the last one
    if (tag.trim().length === 0) return

    this.organizeTagsHistory(tag)

    const url: string = `
      ${this._apiUrl}/search?api_key=${this._apiKey}&q=${tag}&limit=${this._resultsLimit}
    `
    this._http.get<SearchResponse>(url).subscribe( (resp: SearchResponse) => {
      this._gifsList = resp.data
      console.log('gifsList: ', this._gifsList);
      
    })
  }

}
