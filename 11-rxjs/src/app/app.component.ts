import { Component, DestroyRef, OnInit, computed, effect, inject, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';

import { interval, map, take } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  clickCount = signal(0);
  clickCount$ = toObservable(this.clickCount);
  // interval = signal(0);
  // doubleInterval = computed(() => this.interval() * 2);
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
