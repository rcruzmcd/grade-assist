import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'grade-assist-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @Input() formConfigs: any;
  @Output() formSubmitted = new EventEmitter<any>();

  formGroup!: FormGroup;

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
    console.log(this.formGroup.valid);
    if (this.formGroup.valid) {
      this.formSubmitted.emit(this.formGroup.value);
      this.formGroup.reset();
    }
  }
}
