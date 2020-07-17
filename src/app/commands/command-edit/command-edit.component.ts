import { Component, OnInit } from '@angular/core';
import { Command } from '../command.model';
import { CommandService } from '../command.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-command-edit',
  templateUrl: './command-edit.component.html',
  styleUrls: ['./command-edit.component.css']
})
export class CommandEditComponent implements OnInit {
  originalCommand: Command;
  command: Command;
  editMode: boolean = false;

  constructor(
    private commandService: CommandService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.editMode = false;
      let id = params['id'];
      if (id === null || id === undefined) {
        return;
      }

      let command = this.commandService.getCommand(id);
      if (!command) {
        return;
      }

      this.originalCommand = command;
      this.editMode = true;
      this.command = JSON.parse(JSON.stringify(command));
    });
  }

  onSubmit(form: NgForm) {
    let command = new Command('', form.value.name, form.value.description);
    if (this.editMode === true) {
      this.commandService.updateCommand(this.originalCommand, command);
    } else {
      this.commandService.addCommand(command);
    }

    this.router.navigate(['/commands']);
  }

  onCancel() {
    this.router.navigate(['/commands']);
  }
}
