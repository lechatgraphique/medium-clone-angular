import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {authActions} from "../../../store/actions";
import {RegisterRequestInterface} from "../../../types/registerRequest.interface";
import {selectIsSubmitting, selectValidationErrors} from "../../../store/reducers";
import {combineLatest} from "rxjs";
import {
  BackendErrorsMessagesComponent
} from "../../../../shared/components/backend-errors-messages/backend-errors-messages.component";

@Component({
  selector: 'mc-register',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, BackendErrorsMessagesComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors)
  })
  constructor(
    private fb: FormBuilder,
    private store: Store,
  ) { }
  onSubmit(): void {
    console.log('form:', this.form.getRawValue());
    const request: RegisterRequestInterface = {
      user: this.form.getRawValue()
    }
    this.store.dispatch(authActions.register({request}));
  }
}
