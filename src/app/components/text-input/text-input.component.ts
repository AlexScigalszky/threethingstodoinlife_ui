import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  template: `
    <div [formGroup]="formGroup" *ngIf="formGroup" class="input-group mb-3">
      <span class="input-group-text bg-success text-light" id="{{ controlName + '_span' }}">
      {{placeholder}}
      </span>
      <input
        [attr.data-cy]="'text-input-' + controlName"
        id="{{ controlName }}"
        type="text"
        class="form-control"
        formControlName="{{ controlName }}"
        (change)="onValueChange()"
        [class.is-invalid]="f?.invalid && f?.dirty"
        [attr.aria-describedby]="controlName + '_span'"
      />
    </div>
  `,
  styles: [],
})
export class TextInputComponent {
  @Output() changed = new EventEmitter<string>();
  @Input() set form(value: FormGroup) {
    this.formGroup = value;
  }
  @Input() controlName: string = '';
  @Input() position: number = 0;
  @Input() initialDisabled = false;
  @Input() placeholder = 'Type here';
  formGroup?: FormGroup;

  get f() {
    return this.formGroup?.get(this.controlName);
  }

  onValueChange() {
    this.changed.emit(this.f?.value);
  }
}
