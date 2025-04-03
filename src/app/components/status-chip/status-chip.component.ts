import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-project-status-chip',
  standalone: true,
  imports: [CommonModule, MatChipsModule],
  templateUrl: './status-chip.component.html',
})
export class StatusChipComponent {
  @Input() status!:
    | 'Em andamento'
    | 'Concluído'
    | 'Planejado'
    | 'Pendente'
    | 'Em Progresso'
    | 'Finalizado'
    | 'Baixa'
    | 'Média'
    | 'Alta';
  @Input() completedAt?: string | null;

  get chipColor(): 'primary' | 'accent' | 'warn' {
    switch (this.status) {
      case 'Em andamento':
        return 'primary';
      case 'Concluído':
        return 'accent';
      case 'Planejado':
        return 'warn';
      default:
        return 'primary';
    }
  }
}
