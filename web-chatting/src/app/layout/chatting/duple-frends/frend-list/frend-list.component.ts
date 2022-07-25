import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../user/user-http.service';

@Component({
  selector: 'app-frend-list',
  templateUrl: './frend-list.component.html',
  styleUrls: ['./frend-list.component.css']
})
export class FrendListComponent implements OnInit {
  @Input()
  userObj: User;

  constructor() { }

  ngOnInit(): void {
  }

  deleteFrend() {

  }
}
