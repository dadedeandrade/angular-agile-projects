import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private openTaskDialogSubject = new Subject<void>();
  openProjectDialog$ = this.openTaskDialogSubject.asObservable();

  triggerOpenTasktDialog() {
    this.openTaskDialogSubject.next();
  }
}
