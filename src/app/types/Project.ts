import { FormControl } from '@angular/forms';
import { Task } from './Task';

export interface Project {
  id: number;
  name: string;
  description: string;
  status: 'Planejado' | 'Em andamento' | 'Concluído';
  createdAt: string;
  completedAt: string | null;
  tasks: Task[];
}

export interface ProjectFormGroup {
  id: FormControl<number | null>;
  name: FormControl<string | null>;
  description: FormControl<string | null>;
  status: FormControl<('Planejado' | 'Em andamento' | 'Concluído') | null>;
  createdAt: FormControl<string | null>;
  completedAt: FormControl<string | null | null>;
  tasks: FormControl<Task[] | null>;
}
