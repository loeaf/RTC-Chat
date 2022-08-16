import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ChattingHttpService} from '../chatting/chatting/chatting-http.service';
const PhraseGen = require('korean-random-words');
import * as uuid from "uuid";
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../chatting/user/user-http.service';
import {AuthService} from '../../auth/auth.service';
import {Live2dService} from '../../../live2d/live2d.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {
  user?: User;
  @ViewChild('characterCanvasEle') characterCanvasEle?: ElementRef;
  test: any;

  constructor(
    private chattingHttpService: ChattingHttpService,
    private authSvc: AuthService,
    private live2DSvc: Live2dService,
    private router: Router) { }

  ngOnInit(): void {
  }
  moveChatting() {
    if(this.user === undefined) {
      return;
    }
    this.router.navigate(['chatting'], {
      queryParams: {user: JSON.stringify(this.user)}
    });
  }
  loginAlert() {
    if(this.user === undefined) {
      return;
    }
    alert(`당신의 JWT 값은 ${this.user.id} 입니다. 닉네임은 : ${this.user.nickName}`);
  }

  login(value: string) {
    // 아이디가 없다면 새로 만들기
    if (value === "") {
      const user = {
        id: uuid.v4(),
        nickName: new PhraseGen().generatePhrase()
      };
      this.chattingHttpService.postUser(user).then(p => {
        this.user = p;
        this.authSvc.setLocalStorageAuth(p);
        this.loginAlert();
        this.moveChatting();
      });
    } else {
      // 아이디가 있다면 가져와 셋팅
      this.chattingHttpService.getUser({
        id: value
      }).then(p => {
        if (p === undefined) {
          return;
        }
        if (p.length === 0) {
          alert('아이디가 틀렸습니다. 공백으로 넣으주시면 아이디가 생성됩니다');
          return;
        }
        this.user = p[0];
        this.authSvc.setLocalStorageAuth(p[0]);
        this.loginAlert();
        alert('로그인되었습니다');
        this.moveChatting();
      });
    }
  }

  ngAfterViewInit(): void {
    this.live2DSvc.initLive2D(this.characterCanvasEle);
  }

  click() {
    alert('click');
    const window: any = self.window;
    window.api.test(1)
    console.info(window.api);

    // require('electron').ipcRenderer.send('gpu', document.body.innerHTML);
  }
}
