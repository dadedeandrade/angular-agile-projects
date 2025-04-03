import { FormControl } from '@angular/forms';

export interface Task {
  id: number;
  title: string;
  description: string;
  priority: 'Baixa' | 'Média' | 'Alta';
  status: 'Pendente' | 'Em Progresso' | 'Finalizado';
}

export interface TaskFormGroup {
  id: FormControl<number | null>;
  title: FormControl<string | null>;
  description: FormControl<string | null>;
  priority: FormControl<('Baixa' | 'Média' | 'Alta') | null>;
  status: FormControl<('Pendente' | 'Em Progresso' | 'Finalizado') | null>;
}
