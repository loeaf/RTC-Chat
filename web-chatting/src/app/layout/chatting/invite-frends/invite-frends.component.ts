import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {InviteFrendsService} from './invite-frends.service';
import {User} from '../user/user-http.service';

@Component({
  selector: 'app-invite-frends',
  templateUrl: './invite-frends.component.html',
  styleUrls: ['./invite-frends.component.css']
})
export class InviteFrendsComponent implements OnInit, AfterViewInit {
  @Input()
  user: User;

  constructor(public inviteFrendsService: InviteFrendsService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.inviteFrendsService.initFrendsByHttp(this.user)
  }

}
