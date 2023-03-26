import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, finalize, Observable, switchMap, takeUntil, tap } from 'rxjs';
import { User } from '../models/user.model';
import { UnsubscriberComponent } from '../shared/components/unsubscriber/unsubscriber.component';
import { UsersService } from '../shared/services/crud/users.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent extends UnsubscriberComponent implements OnInit {
  usersList: Observable<User[]>
  myInput = new FormControl('')
  loading: boolean = false;
  constructor(private usersService: UsersService) {
    super();
  }

  ngOnInit(): void {
    this.myInput.valueChanges
    .pipe(
      takeUntil(this.$destroy),
      debounceTime(1000),
    )
    .subscribe((searchString: string) => {
      this.loading = true
      this.updateUsers(searchString)
    })
  }

  updateUsers(searchString: string): void {
    this.usersList = this.usersService.getBySearchString(searchString)
    .pipe(tap(() => this.loading = false))
  }
}
