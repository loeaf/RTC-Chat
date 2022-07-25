import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {MetaRoomUsersService} from './meta-room-users.service';
import {InviteFrendsService} from '../../invite-frends/invite-frends.service';
import {User} from '../../user/user-http.service';

@Component({
  selector: 'app-meta-room-users',
  templateUrl: './meta-room-users.component.html',
  styleUrls: ['./meta-room-users.component.css']
})
export class MetaRoomUsersComponent implements OnInit, AfterViewInit {
  @Input()
  userObj: User;

  constructor(public metaRoomUsersService: MetaRoomUsersService,
              private inviteFrendsSvc: InviteFrendsService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initMetaRoom();
  }
  async initMetaRoom() {
    await this.metaRoomUsersService.initUserByMetaRoom(1);
  }


  addFrend(user: string) {

  }
}
