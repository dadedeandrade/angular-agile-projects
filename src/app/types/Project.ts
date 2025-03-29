export interface Task {
  id: number;
  title: string;
  description: string;
  priority: 'Baixa' | 'Média' | 'Alta';
  status: 'Pendente' | 'Em progresso' | 'Concluído';
}
export interface Project {
  id: number;
  name: string;
  description: string;
  status: 'Planejado' | 'Em andamento' | 'Concluído';
  createdAt: string;
  completedAt: string | null;
  tasks: Task[];
}
