import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faSave, faTrash, faDownload } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-action-buttons',
  templateUrl: './action-buttons.component.html',
  styleUrls: ['./action-buttons.component.scss']
})
export class ActionButtonsComponent implements OnInit {
  @Output() onDelete = new EventEmitter();
  @Output() onDownload = new EventEmitter();
  @Output() onSave = new EventEmitter();

  deleteEnabled = false;
  downloadEnabled = false;
  saveEnabled = false;

  saveIcon = faSave;
  downloadIcon = faDownload;
  deleteIcon = faTrash;

  constructor() {

  }

  ngOnInit(): void {
    this.deleteEnabled = this.onDelete.observed;
    this.downloadEnabled = this.onDownload.observed;
    this.saveEnabled = this.onSave.observed;
  }

  onClickHandler($event: MouseEvent,action: |'download' | 'delete' | 'save') {
    $event.stopPropagation();
    switch(action) {
      case "delete": {
        this.onDelete.emit();
        break;
      }
      case "download": {
        this.onDownload.emit();
        break;
      }
      case "save": {
        this.onSave.emit();
        break;
      }
    }
  }
}
