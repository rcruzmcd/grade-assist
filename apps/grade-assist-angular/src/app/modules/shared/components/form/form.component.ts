import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @Input() formConfigs: any;
  @Output() onFormSubmitted = new EventEmitter<any>();

  formGroup!: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.formGroup = this.toFormGroup();
  }

  toFormGroup() {
    const group: any = {};
    this.formConfigs.inputs.forEach((input: any) => {
      group[input.key] = new FormControl('', input?.validators);
    });
    return new FormGroup(group);
  }

  onFormSubmit() {
    if (this.formGroup.valid) {
      this.onFormSubmitted.emit(this.formGroup.value);
    }
  }
}
