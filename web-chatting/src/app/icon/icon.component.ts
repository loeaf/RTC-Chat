import { Component, Input, OnInit } from "@angular/core";
import { Icon } from "stream-chat-angular";

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.css']
})
export class IconComponent {
  @Input() icon: Icon | undefined;
  @Input() size: number | undefined;
  defaultSize = 18;

  constructor() {}

  mapToMaterialIcon() {
    const map: any = {
      'action-icon': 'more_horiz',
      'arrow-left': 'keyboard_arrow_left',
      'arrow-right': 'keyboard_arrow_right',
      close: 'close',
      'close-no-outline': 'close',
      'connection-error': 'error',
      'delivered-icon': 'check',
      file: 'folder',
      'file-upload': 'file_upload',
      menu: 'menu',
      'reaction-icon': 'face',
      reply: 'swap_horiz',
      'reply-in-thread': 'reply',
      retry: 'replay',
      send: 'send',
    };

    // tslint:disable-next-line:no-non-null-assertion
    return map[this.icon!];
  }
}
