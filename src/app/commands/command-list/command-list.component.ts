import { Component, OnInit, OnDestroy } from '@angular/core';

import { Command } from '../command.model';
import { CommandService } from '../command.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-command-list',
  templateUrl: './command-list.component.html',
  styleUrls: ['./command-list.component.css']
})
export class CommandListComponent implements OnInit, OnDestroy {
  commands: Command[] = [];
  subscription: Subscription;

  constructor(private commandService: CommandService) { }

  ngOnInit() {
    
    this.commandService.commandChangedEvent.subscribe((commands: Command[]) => {
      this.commands = commands.slice();
    });

    this.subscription = this.commandService.commandListChangedEvent.subscribe((commands: Command[]) => {
      this.commands = commands;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
