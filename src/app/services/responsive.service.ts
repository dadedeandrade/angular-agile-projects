import { Injectable, inject } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class ResponsiveService {
  private mediaMatcher = inject(MediaMatcher);
  private mobileQuery: MediaQueryList;
  private isMobileSubject = new BehaviorSubject<boolean>(false);

  isMobile$ = this.isMobileSubject.asObservable();

  constructor() {
    this.mobileQuery = this.mediaMatcher.matchMedia('(max-width: 600px)');
    this.isMobileSubject.next(this.mobileQuery.matches);

    this.mobileQuery.addEventListener('change', () => {
      this.isMobileSubject.next(this.mobileQuery.matches);
    });
  }

  get isMobile(): boolean {
    return this.isMobileSubject.getValue();
  }
}
