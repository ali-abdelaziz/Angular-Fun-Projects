import { Routes } from '@angular/router';

import { routes as userRoutes } from './users/users.routes';
import { NoTaskComponent } from './tasks/no-task/no-task.component';
import { resolveUserName, UserTasksComponent } from './users/user-tasks/user-tasks.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  {
    path: '', // <your-domain>/
    component: NoTaskComponent,

    // redirectTo: '/users/u1',
    // pathMatch: 'prefix' // detects an error as every path is starting with ''
    // pathMatch: 'full'
  },
  {
    path: 'users/:userId', // <your-domain>/users/<uid>
    component: UserTasksComponent,
    children: userRoutes,
    data: {
      message: 'Hello from the route',
    },
    resolve: {
      userName: resolveUserName,
    }
  },
  {
    path: '**', // <your-domain>/<any-other-path>
    component: NotFoundComponent,
  },
];
