import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatToolbarModule, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular-agile-projects';
  constructor(private dialog: MatDialog) {}

  openAddDialogProject() {
    this.openDialog(DialogComponent);
  }

  openDialog(component: any) {
    let dialog = this.dialog.open(component);
    dialog.afterClosed().subscribe((item) => {
      console.log('Dados afterclose', item);
    });
  }
}
