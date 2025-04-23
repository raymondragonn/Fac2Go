import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userTypeSubject = new BehaviorSubject<string>(localStorage.getItem('userType') || 'guest');
  userType$ = this.userTypeSubject.asObservable();

  setUserType(userType: string): void {
    this.userTypeSubject.next(userType);
    localStorage.setItem('userType', userType);
  }

  getUserType(): string {
    return this.userTypeSubject.getValue();
  }
}