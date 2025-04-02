import { Task } from "./Task";

export interface Project {
  id: number;
  name: string;
  description: string;
  status: 'Planejado' | 'Em andamento' | 'Concluído';
  createdAt: string;
  completedAt: string | null;
  tasks: Task[];
}
