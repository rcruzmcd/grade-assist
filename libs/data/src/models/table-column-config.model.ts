export interface ColumnConfigs {
  id: string;
  label: string;
  display: boolean;
}

export interface TableConfig {
  pagination?: boolean;
  sort?: boolean;
  updateRow?: boolean;
  deleteRow?: boolean;
  deleteConfirmKey?: string[];
  columns: ColumnConfigs[];
}
