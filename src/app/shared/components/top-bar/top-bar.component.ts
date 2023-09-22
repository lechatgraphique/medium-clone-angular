import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";
import {Store} from "@ngrx/store";

import {selectCurrentUser} from "../../../auth/store/reducers";
import {combineLatest} from "rxjs";

@Component({
  selector: 'mc-top-bar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent {

  data$ = combineLatest({
    currentUser: this.store.select(selectCurrentUser),
  })
  constructor(private store: Store) { }

}
