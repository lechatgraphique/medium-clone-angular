import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {combineLatest} from "rxjs";
import {selectIsSubmitting, selectValidationErrors} from "../../store/reducers";
import {Store} from "@ngrx/store";
import {authActions} from "../../store/actions";
import {
  BackendErrorsMessagesComponent
} from "../../../shared/components/backend-errors-messages/backend-errors-messages.component";
import {RouterLink} from "@angular/router";
import {LoginRequestInterface} from "../../types/loginRequest.interface";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, BackendErrorsMessagesComponent, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form = this.fb.nonNullable.group({
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
    const request: LoginRequestInterface = {
      user: this.form.getRawValue()
    }
    this.store.dispatch(authActions.login({request}));
  }
}
