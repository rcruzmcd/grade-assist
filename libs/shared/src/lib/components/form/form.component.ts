import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'grade-assist-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, OnChanges {
  @Input() formConfigs: any;
  @Input() formModel?: any;
  @Output() formSubmitted = new EventEmitter<any>();

  formGroup!: FormGroup;

  ngOnInit(): void {
    this.formGroup = this.toFormGroup();
    if (this.formModel) this.formGroup.setValue(this.formModel);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['formConfigs']) {
      // TODO: any changes
      // how to load async select
    }
  }

  toFormGroup() {
    const group: any = {};
    this.formConfigs.inputs.forEach((input: any) => {
      group[input.key] = new FormControl('', input?.validators);
    });
    return new FormGroup(group);
  }

  onFormSubmit() {
    // console.log(this.formGroup.valid);
    if (this.formGroup.valid) {
      this.formSubmitted.emit(this.formGroup.value);
      this.formGroup.reset();
    }
  }
}
