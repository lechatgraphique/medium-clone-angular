import {Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {BackendErrorsInterface} from "../../types/backendErrors.interface";

@Component({
  selector: 'mc-backend-errors-messages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './backend-errors-messages.component.html',
  styleUrls: ['./backend-errors-messages.component.scss']
})
export class BackendErrorsMessagesComponent implements OnInit {
  @Input() backendErrors: BackendErrorsInterface = {};
  errorsMessages: string[] = [];

  ngOnInit() {
    this.errorsMessages = Object.keys(this.backendErrors).map((name: string) => {
      const messages = this.backendErrors[name].join(' ');
      return `${name} ${messages}`;
    })
  }
}
