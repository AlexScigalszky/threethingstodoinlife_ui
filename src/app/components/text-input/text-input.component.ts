import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  template: `
    <ng-container [formGroup]="formGroup" *ngIf="formGroup">
      <label for="{{ controlName }}">Everybody have to do:</label>
      <input
        [attr.data-cy]="'text-input-' + controlName"
        id="{{ controlName }}"
        type="text"
        class="form-control"
        formControlName="{{ controlName }}"
        placeholder="{{ placeholder }}"
        (change)="onValueChange()"
        [class.is-invalid]="f?.invalid && f?.dirty"
      />
    </ng-container>
  `,
  styles: [],
})
export class TextInputComponent {
  @Output() changed = new EventEmitter<string>();
  @Input() set form(value: FormGroup) {
    this.formGroup = value;
  }
  @Input() controlName: string = '';
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
