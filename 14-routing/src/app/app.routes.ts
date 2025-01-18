import { Routes } from '@angular/router';

import { routes as userRoutes } from './users/users.routes';
import { NoTaskComponent } from './tasks/no-task/no-task.component';
import { resolveTitle, resolveUserName, UserTasksComponent } from './users/user-tasks/user-tasks.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { Title } from '@angular/platform-browser';

export const routes: Routes = [
  {
    path: '', // <your-domain>/
    component: NoTaskComponent,
    title: 'No Task Selected',
    // redirectTo: '/users/u1',
    // pathMatch: 'prefix' // detects an error as every path is starting with ''
    // pathMatch: 'full'
  },
  {
    path: 'users/:userId', // <your-domain>/users/<uid>
    component: UserTasksComponent,
    children: userRoutes,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange', // control when the guards and resolvers are run
    data: {
      message: 'Hello from the route',
    },
    resolve: {
      userName: resolveUserName,
    },
    title: resolveTitle,
  },
  {
    path: '**', // <your-domain>/<any-other-path>
    component: NotFoundComponent,
  },
];
