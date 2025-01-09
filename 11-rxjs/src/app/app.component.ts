import { Component, DestroyRef, OnInit, inject } from '@angular/core';

import { interval, take } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    const subscription = interval(1000)
    .pipe(
      take(5)
    )
    .subscribe({
      next: (val) => console.log('Next: ',val)
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
