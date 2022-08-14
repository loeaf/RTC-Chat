import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild, ViewChildren} from '@angular/core';
import {InviteFrendsService} from './invite-frends.service';
import {User} from '../user/user-http.service';
import {ChannelManagerService} from '../channel/channel-manager.service';

declare const $: any;
@Component({
  selector: 'app-invite-frends',
  templateUrl: './invite-frends.component.html',
  styleUrls: ['./invite-frends.component.css']
})
export class InviteFrendsComponent implements OnInit, AfterViewInit {
  @ViewChild('frendListEle') frendListEle?: ElementRef;
  @ViewChildren('chattingtabEle') chattingtabEle?: ElementRef[];
  @ViewChildren('checkBoxEle') checkBoxEle?: ElementRef[];
  @Input()
  user: User;

  constructor(public inviteFrendsService: InviteFrendsService,
              private channelManSvc: ChannelManagerService) { }

  ngOnInit(): void {
  }

  async ngAfterViewInit() {
    await this.initInviteFrend();
  }
  async initInviteFrend() {
    const tab_id = $(this.frendListEle.nativeElement).attr("data-tab");
    this.chattingtabEle.forEach(p => $(p.nativeElement).removeClass("active"));
    $(this.frendListEle.nativeElement).parent().addClass("active");
    $("#"+tab_id).addClass("active");
  }

  onClose() {
    $('#chating_wrap').removeClass('chating_invite_open')
    $('#chating_wrap').addClass('chating_room_open')
  }

  async onInvite() {
    const selected = [];
    for (const selectedElement of this.checkBoxEle) {
      if($(selectedElement.nativeElement).is(":checked")) {
        selected.push($(selectedElement.nativeElement).attr('value'));
      }
    }
    debugger;
    await this.channelManSvc.inviteUserByChannel(selected);
  }
}
