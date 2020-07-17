import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CommandComponent } from './commands/command.component';
import { CommandEditComponent } from './commands/command-edit/command-edit.component';
import { CommandDetailComponent } from './commands/command-detail/command-detail.component';

const appRoutes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/commands'},
  {path: 'commands', component: CommandComponent, children: [
    {path: 'new', component: CommandEditComponent},
    {path: ':id', component: CommandDetailComponent},
    {path: ':id/edit', component: CommandEditComponent},
  ]}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
