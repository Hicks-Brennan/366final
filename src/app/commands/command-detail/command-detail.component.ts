import { Component, OnInit } from '@angular/core';
import { Command } from '../command.model';
import { CommandService } from '../command.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { WindRefService } from 'src/app/wind-ref.service';

@Component({
  selector: 'app-command-detail',
  templateUrl: './command-detail.component.html',
  styleUrls: ['./command-detail.component.css']
})
export class CommandDetailComponent implements OnInit {
  nativeWindow: any;
  command: Command;

  constructor(
    private commandService: CommandService,
    private router: Router,
    private route: ActivatedRoute,
    private windRefService: WindRefService
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.command = this.commandService.getCommand(params['id']);
    });
    this.nativeWindow = this.windRefService.getNativeWindow();
  }

  onView() {
    // if (this.command.difficulty) {
    //   this.nativeWindow.open(this.command.difficulty);
    // }
    console.log('test');
  }

  onDelete() {
    this.commandService.deleteCommand(this.command);
    this.router.navigate(['/commands']);
  }
}
