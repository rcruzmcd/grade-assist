export interface FormConfig {
  inputs: InputConfig[];
}

export interface InputConfig {
  appearance?: string;
  label: string;
  placeholder?: string;
  key: string;
  validators?: any[];
  type?: string;
  selectValues?: selectValue[] | Promise<selectValue[]>;
  hide?: boolean;
}

interface selectValue {
  viewValue: string;
  value: string;
}
