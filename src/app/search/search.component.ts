import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent, takeUntil } from 'rxjs';
import { User } from '../models/user.model';
import { UnsubscriberComponent } from '../shared/components/unsubscriber/unsubscriber.component';
import { UsersService } from '../shared/services/crud/users.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent extends UnsubscriberComponent implements OnInit {
  user = JSON.parse(localStorage.getItem('user'))
  constructor(private usersService: UsersService) {
    super();
  }

  ngOnInit(): void {
  }

  updateSearch(searchEvent: any): void {
    this.usersService.getBySearchString(searchEvent.target.value)
    .pipe( takeUntil(this.$destroy))
    .subscribe(res => console.log(res))
  }
}
