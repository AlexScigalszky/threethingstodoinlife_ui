import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { skip, tap } from 'rxjs';
import { NewItem } from 'src/app/models/new-item';

@Component({
  selector: 'app-todo-form',
  template: `
    <h1>The three thing everybody have to do in life</h1>
    <p>In your opinion, what are the three this everybody have to do it in life</p>
    <form [formGroup]="form">
      <app-text-input
        [controlName]="'first'"
        [form]="form"
        class="form-group"
        [position]="1"
        [placeholder]="'1st'"
      ></app-text-input>
      <app-text-input
        [controlName]="'second'"
        [form]="form"
        class="form-group"
        [position]="2"
        [placeholder]="'2nd'"
      ></app-text-input>
      <app-text-input
        [controlName]="'third'"
        [form]="form"
        class="form-group"
        [position]="3"
        [placeholder]="'3rd'"
      ></app-text-input>
    </form>
    <button
      (click)="submit()"
      *ngIf="!this.form.invalid"
      type="submit"
      class="btn btn-primary"
    >
      Submit
    </button>
  `,
})
export class TodoFormComponent {
  @Output() onSubmited = new EventEmitter<NewItem>();
  @Output() onChanged = new EventEmitter<NewItem>();
  @Input() set values(value: NewItem | null) {
    if (value) {
      this.form.patchValue(value, { emitEvent: false });
    } else {
      this.form.reset({ emitEvent: false });
    }
  }
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      first: this.fb.control('', [Validators.required]),
      second: this.fb.control('', [Validators.required]),
      third: this.fb.control('', [Validators.required]),
    });
    this.form.valueChanges
      .pipe(
        skip(1),
        tap((values) => this.onChanged.emit(values))
      )
      .subscribe();
  }

  submit() {
    this.onSubmited.emit(this.form.value);
  }
}
