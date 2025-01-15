import {
  Component,
  DestroyRef,
  OnInit,
  computed,
  inject,
  input,
} from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';

import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent implements OnInit {
  // use input() instead of @Input() to display user name in the template
  // userId = input.required<string>();
  userName = '';

  // use @Input() instead of input() to display user name in the template
  // @Input({required: true}) userId!: string;
  // get userName() {
  //   return this.usersService.users.find((u) => u.id === this.userId)?.name;
  // }
  private usersService = inject(UsersService);
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  // userName = computed(
  //   () => this.usersService.users.find((u) => u.id === this.userId())?.name
  // );

  ngOnInit() {
    // use paramMap observable to display user name in the template
    console.log(this.activatedRoute);
    const subscription = this.activatedRoute.paramMap.subscribe((params) => {
      this.userName = this.usersService.users.find((u) => u.id === params.get('userId'))?.name || '';
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
