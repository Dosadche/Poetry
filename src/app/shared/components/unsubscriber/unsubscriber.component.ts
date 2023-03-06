import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-unsubscriber',
  template: '',
})
export class UnsubscriberComponent implements OnDestroy{
  $destroy = new Subject<void>

  ngOnDestroy(): void {
    this.$destroy.next()
    this.$destroy.complete()
  }
}
