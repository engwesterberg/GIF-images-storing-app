import { Component, Input, OnInit, Renderer2, Output, EventEmitter } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { saveAs } from 'file-saver';
import Gif from "../../interfaces/gif.interface"
import { OrderPipe } from 'ngx-order-pipe';
import { FilterPipe } from 'src/app/pipes/filter.pipe';




@Component({
  selector: 'app-user-gifs',
  templateUrl: './user-gifs.component.html',
  styleUrls: ['./user-gifs.component.scss']
})
export class UserGifsComponent implements OnInit {
  @Input() gifs: Gif[] = []
  @Output() gifsChange = new EventEmitter();
  search = "";
  orderBy: string = 'name';
  reverseOrder = false;

  constructor(private _orderPipe: OrderPipe, private _filterPipe: FilterPipe) {

  }

  ngOnInit(): void {
    this.readGifsFromLocalStorage();
  }

  onDelete(gif: Gif) {
    const idx = this.gifs.findIndex(x => x.url === gif.url);
    if (idx > -1) {
      this.gifs.splice(idx, 1);
      this.gifsChange.emit(this.gifs);
    }
    this.saveGifsToLocalStorage();
  }

  onDownload(gif: Gif) {
    saveAs(gif.url, gif.name)
  }

  drop(event: any) {
    moveItemInArray(this.gifs, event.previousIndex, event.currentIndex);
    this.gifsChange.emit(this.gifs);
    this.saveGifsToLocalStorage();
  }

  getGifs() {
    let gifs = this._filterPipe.transform(this.gifs, this.search, ['name']);
    if (this.orderBy === 'custom') {
      return gifs;
    } else {
      gifs = this._orderPipe.transform(gifs, this.orderBy, this.reverseOrder);
      return gifs;
    }
  }

  public addGif(name: string, url: string) {
    this.gifs.push({ name: name, url: url, added: new Date(), index: this.getNextIndex() })
    this.gifsChange.emit(this.gifs);
    this.saveGifsToLocalStorage();
  }

  private getNextIndex() {
    if (!this.gifs.length) return 0;
    const idx = Math.max(...this.gifs.map(x => x.index)) + 1;
    return idx;
  }

  private saveGifsToLocalStorage() {
    try {
      localStorage.setItem('gifs', JSON.stringify(this.gifs));
    } catch (err) {
      console.error("Failed to write to localstorage ", err);
    }
  }

  private readGifsFromLocalStorage() {
    try {
      const gifs = localStorage.getItem('gifs') as any;
      this.gifs = gifs ? JSON.parse(gifs) : [];
    } catch (err) {
      console.error("Failed to read localstorage ", err);
    }
  }
}
