import { Component, OnInit } from '@angular/core';
import {ChattingHttpService, ChattingStep, User} from '../../chatting-http.service';
const PhraseGen = require('korean-random-words');
import * as uuid from "uuid";
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user?: User;

  constructor(
    private chattingHttpService: ChattingHttpService,
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
    debugger;
    // 아이디가 없다면 새로 만들기
    if (value === "") {
      const user = {
        id: uuid.v4(),
        nickName: new PhraseGen().generatePhrase()
      };
      this.chattingHttpService.postUser(user).then(p => {
        this.user = p;
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
        this.loginAlert();
        alert('로그인되었습니다');
        this.moveChatting();
      });
    }
  }

}
