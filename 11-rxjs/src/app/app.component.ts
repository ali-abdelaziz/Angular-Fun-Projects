import { Component, DestroyRef, OnInit, computed, effect, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

import { interval, map, Observable, take } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  clickCount = signal(0);
  clickCount$ = toObservable(this.clickCount);
  interval$ = interval(1000);
  intervalSignal = toSignal(this.interval$, { initialValue: 0 });
  // interval = signal(0);
  // doubleInterval = computed(() => this.interval() * 2);
  customInterval$ = new Observable((subscriber) => {
    let timesExecuted = 0;
    const interval = setInterval(() => {
      // subscriber.error();
      if(timesExecuted > 3) {
        clearInterval(interval);
        subscriber.complete();
        return;
      }
      console.log('Emiting new value...');
      subscriber.next({ message: `New Value ${timesExecuted}` });
      timesExecuted++;
    }, 2000);
  })
  private destroyRef = inject(DestroyRef);

  constructor() {
    // effect(() => {
    //   console.log(`Clicked button ${this.clickCount()} times.`);
    // })
  }

  ngOnInit(): void {
    // setInterval(() => {
    //   this.interval.update(prevIntervalNumber => prevIntervalNumber + 1);
    //   // update the signal value
    // }, 1000);
    // const subscription = interval(1000)
    // .pipe(
    //   map(val => val * 2),
    //   take(5)
    // )
    // .subscribe({
    //   next: (val) => console.log('Next: ',val)
    // });

    // this.destroyRef.onDestroy(() => {
    //   subscription.unsubscribe();
    // });

    this.customInterval$.subscribe({
      next: (val) => console.log('Next: ',val),
      complete: () => console.log('Completed!!'),
      error: (err) => console.log('Error: ',err)
    });

    const subscription = this.clickCount$.subscribe({
      next: (val) => console.log(`Clicked button ${this.clickCount()} times.`)
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  onClick() {
    this.clickCount.update(val => val + 1);
  }
}
