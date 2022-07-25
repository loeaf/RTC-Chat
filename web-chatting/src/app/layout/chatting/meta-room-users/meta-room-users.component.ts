import {AfterViewInit, Component, OnInit} from '@angular/core';
import {MetaRoomUsersService} from './meta-room-users.service';

@Component({
  selector: 'app-meta-room-users',
  templateUrl: './meta-room-users.component.html',
  styleUrls: ['./meta-room-users.component.css']
})
export class MetaRoomUsersComponent implements OnInit, AfterViewInit {

  constructor(public metaRoomUsersService: MetaRoomUsersService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.metaRoomUsersService.initUserByMetaRoom(1);
  }

}
