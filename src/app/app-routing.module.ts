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
