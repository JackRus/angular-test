import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: '',
          redirectTo: 'tickets',
          pathMatch: 'full'
        },
        {
          path: 'tickets',
          loadChildren: () => import('./features/tickets/tickets.module').then((m) => m.TicketsModule),
        },
      ],
      {
        initialNavigation: 'enabledBlocking',
        enableTracing: false
      }
    ),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
