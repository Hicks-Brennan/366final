import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Command } from './command.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommandService {
  commands: Command[] = [];
  commandSelectedEvent: EventEmitter<Command> = new EventEmitter<Command>();
  commandChangedEvent: EventEmitter<Command[]> = new EventEmitter<Command[]>();
  commandListChangedEvent: Subject<Command[]> = new Subject<Command[]>();
  maxCommandID: number;

  constructor(private http: HttpClient) {
    this.getCommands();
  }

  getCommands(): void {
    this
    .http
    .get<{message: string, commands: Command[]}>('http://localhost:3000/commands')
    .subscribe((response: any) => {
      this.commands = response.commands;
      this.maxCommandID = this.getMaxID();
      this.commands.sort(compareCommandsByID);
      this.commandListChangedEvent.next(this.commands.slice());
    }, (err: any) => {
      console.error(err);
    });
  }

  getCommand(id: string): Command {
    if (!this.commands) {
      return null;
    }

    for (let command of this.commands) {
      if (command.id === id) {
        return command;
      }
    }

    return null;
  }

  getMaxID(): number {
    let maxID = 0;
    for (let command of this.commands) {
      let currentID = +command.id;
      if (currentID > maxID) {
        maxID = currentID;
      }
    }

    return maxID;
  }

  addCommand(command: Command): void {
    if (!command) {
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    command.id = '';

    this.http
    .post<{message: string, command: Command}>('http://localhost:3000/commands', command, {headers: headers})
    .subscribe((response: any) => {
      this.commands.push(response.command);
      this.commands.sort(compareCommandsByID);
      this.commandChangedEvent.next(this.commands.slice());
    });
  }

  updateCommand(originalCommand: Command, newCommand: Command): void {
    if (!originalCommand || !newCommand) {
      return;
    }

    let index = this.commands.indexOf(originalCommand);
    if (index < 0) {
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const strCommand = JSON.stringify(newCommand);

    this.http
    .put<{message: string}>(`http://localhost:3000/commands/${originalCommand.id}`, strCommand, {headers: headers})
    .subscribe((response: any) => {
      this.getCommands();
    });
  }

  deleteCommand(command: Command): void {
    if (!command) {
      return;
    }

    const index = this.commands.indexOf(command);
    if (index < 0) {
      return;
    }

    this.http.delete<{message: String}>(`http://localhost:3000/commands/${command.id}`)
    .subscribe((response: any) => {
      this.getCommands();
    })
  }

  storeCommands(): void {
    let json = JSON.stringify(this.commands);
    let header = new HttpHeaders();
    header.set('Content-Type', 'application/json');
    this
    .http
    .put<{message: string}>('http://localhost:3000/commands', json, {
      headers: header
    }).subscribe(() => {
      this.commandChangedEvent.next(this.commands.slice());
    });
  }
}

function compareCommandsByID(lhs: Command, rhs: Command): number {
  if (lhs.id < rhs.id) {
    return -1;
  } else if (lhs.id === rhs.id) {
    return 0;
  } else {
    return 1;
  }
}