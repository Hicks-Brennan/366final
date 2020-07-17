import { Component, OnInit } from '@angular/core';
import { Command } from './command.model';
import { CommandService } from './command.service';

@Component({
  selector: 'app-commands',
  templateUrl: './command.component.html',
  styleUrls: ['./command.component.css']
})
export class CommandComponent implements OnInit {
  selectedCommand: Command;

  constructor(private commandService: CommandService) { }

  ngOnInit() {
    this.commandService.commandSelectedEvent.subscribe((command) => {
      this.selectedCommand = command;
    });
  }

}
