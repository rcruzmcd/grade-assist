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
}
