import { Component, computed, inject, Input, input } from '@angular/core';

import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent {
  userId = input.required<string>();
  // use @Input() instead of input()
  // @Input({required: true}) userId!: string;
  // get userName() {
  //   return this.usersService.users.find((u) => u.id === this.userId)?.name;
  // }

  private usersService = inject(UsersService);

  userName = computed(
    () => this.usersService.users.find((u) => u.id === this.userId())?.name
  );
}
