import { Component, OnInit, ViewChild } from '@angular/core';
import { UserGifsComponent } from './components/user-gifs/user-gifs.component';
import Gif from './interfaces/gif.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'gif-collector';

  userGifs: Gif[] = [];
  @ViewChild(UserGifsComponent) public userGifComponent!: UserGifsComponent;

  ngOnInit() {

  }

  onSave(gif: any) {
    this.userGifComponent.addGif(gif.title, gif.images.downsized.url)
  }
}
