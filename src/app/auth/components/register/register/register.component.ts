import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {register} from "../../../store/actions";
import {RegisterRequestInterface} from "../../../types/registerRequest.interface";
import {selectIsSubmitting} from "../../../store/reducers";

@Component({
  selector: 'mc-register',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  isSubmitting$ = this.store.select(selectIsSubmitting);
  constructor(
    private fb: FormBuilder,
    private store: Store,
  ) { }
  onSubmit(): void {
    console.log('form:', this.form.getRawValue());
    const request: RegisterRequestInterface = {
      user: this.form.getRawValue()
    }
    this.store.dispatch(register({request}));
  }
}
