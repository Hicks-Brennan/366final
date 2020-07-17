import { Component, OnInit, Input } from '@angular/core';
import { Command } from '../command.model';

@Component({
  selector: 'app-command-item',
  templateUrl: './command-item.component.html',
  styleUrls: ['./command-item.component.css']
})
export class CommandItemComponent implements OnInit {
  @Input() command: Command;

  constructor() { }

  ngOnInit() {
  }

}
