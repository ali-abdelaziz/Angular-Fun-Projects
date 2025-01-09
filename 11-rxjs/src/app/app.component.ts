import { Component, DestroyRef, OnInit, effect, inject, signal } from '@angular/core';

import { interval, map, take } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  clickCount = signal(0);
  private destroyRef = inject(DestroyRef);

  constructor() {
    effect(() => {
      console.log(`Clicked button ${this.clickCount()} times.`);
    })
  }

  ngOnInit(): void {
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
  }

  onClick() {
    this.clickCount.update(val => val + 1);
  }
}
