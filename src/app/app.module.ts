import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UserGifsComponent } from './components/user-gifs/user-gifs.component';
import { GifExplorerComponent } from './components/gif-explorer/gif-explorer.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FilterPipe } from './pipes/filter.pipe';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ActionButtonsComponent } from './components/action-buttons/action-buttons.component';
import { OrderModule, OrderPipe } from 'ngx-order-pipe';


@NgModule({
  declarations: [
    AppComponent,
    UserGifsComponent,
    GifExplorerComponent,
    FilterPipe,
    ActionButtonsComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    DragDropModule,
    OrderModule
  ],
  providers: [FilterPipe, OrderPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
