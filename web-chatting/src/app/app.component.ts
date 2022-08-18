import { AfterViewInit, Component, Input, OnInit, TemplateRef, ViewChild } from "@angular/core";
import {WebSocketService} from './chatting-svc/socket/web-socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{

  constructor(
    private webSocketService: WebSocketService
  ) {
  }

  async ngOnInit() {
    // this.webSocketService.connect();
  }
}
