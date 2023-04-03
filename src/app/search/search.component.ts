import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, finalize, Observable, switchMap, takeUntil, tap } from 'rxjs';
import { User } from '../models/user.model';
import { UnsubscriberComponent } from '../shared/components/unsubscriber/unsubscriber.component';
import { UsersService } from '../shared/services/crud/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent extends UnsubscriberComponent implements OnInit {
  usersList: Observable<User[]>
  myInput = new FormControl('')
  loading: boolean = false
  currentUser: User
  constructor(private usersService: UsersService,
              private snackBar: MatSnackBar) {
    super();
  }

  ngOnInit(): void {
    this.currentUser = this.usersService.currentUser
    this.subscribeOnSearchField()
  }

  updateUsers(searchString: string): void {
    this.usersList = this.usersService.getBySearchString(searchString)
    .pipe(tap(() => this.loading = false))
  }

  handleSubscription(userId: string, unsubscribe = false): void {
    this.usersService.handleSubscription(userId, unsubscribe).pipe(takeUntil(this.$destroy))
    .subscribe(() => {
      this.currentUser = this.usersService.currentUser
      this.snackBar.open('Subscription confirmed', 'Dismiss', 
      { 
        panelClass: 'poetry-snackbar',
        duration: 2500,
        horizontalPosition: 'start',
        verticalPosition: 'top'
      })
    })
  }

  private subscribeOnSearchField(): void {
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
}
