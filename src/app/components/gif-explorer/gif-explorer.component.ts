import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GifService } from '../../services/gif.service';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import Gif from 'src/app/interfaces/gif.interface';
import { filter, map } from 'rxjs';
import { UserGifsComponent } from '../user-gifs/user-gifs.component';



@Component({
  selector: 'app-gif-explorer',
  templateUrl: './gif-explorer.component.html',
  styleUrls: ['./gif-explorer.component.scss']
})
export class GifExplorerComponent implements OnInit {
  search = "";
  gifs: any[] = [];
  saveIcon = faSave;
  @Input() userGifs : Gif[] = [];
  @Output() onSaveGif = new EventEmitter();

  constructor(private _gifService: GifService) {
  }

  ngOnInit(): void {
    // this._gifService.getGifs('cat').subscribe(res => this.gifs = res)
  }

  onSearch($event: Event) {
    this._gifService.getGifs(this.search)
      .pipe(
        map(
          res => res.filter((x: any) => !this.gifAlreadyAdded(x))))
      .subscribe(res => this.gifs = res)
  }

  onSave(gif: any) {
    const name = prompt("Enter image name", gif.title)
    if (name) {
      this.onSaveGif.emit({ ...gif, title: name });
      const idx = this.gifs.findIndex(x => x.images.downsized.url === gif.images.downsized.url)
      if (idx > -1) this.gifs.splice(idx, 1);
    }
  }

  private gifAlreadyAdded(gif: any) {
    return this.userGifs.map(x => x.url).includes(gif.images.downsized.url);
  }

}
