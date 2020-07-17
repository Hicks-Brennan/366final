import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// import { HttpModule } from '@angular/http';
// import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CommandComponent } from './commands/command.component';
import { CommandListComponent } from './commands/command-list/command-list.component';
import { CommandItemComponent } from './commands/command-item/command-item.component';
import { CommandDetailComponent } from './commands/command-detail/command-detail.component';
import { DropdownDirective } from './dropdown.directive';
import { AppRoutingModule } from './app-routing.module';
import { CommandViewComponent } from './commands/command-view/command-view.component';
import { CommandEditComponent } from './commands/command-edit/command-edit.component';
import { CommandService } from './commands/command.service';
import { WindRefService } from './wind-ref.service';

@NgModule({
  declarations: [
    AppComponent,
    CommandComponent,
    CommandListComponent,
    CommandItemComponent,
    CommandDetailComponent,
    DropdownDirective,
    CommandViewComponent,
    CommandEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [WindRefService, CommandService],
  bootstrap: [AppComponent]
})
export class AppModule { }
