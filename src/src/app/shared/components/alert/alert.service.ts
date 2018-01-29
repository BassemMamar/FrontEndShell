import { Injectable } from '@angular/core';

@Injectable()
export class AlertService {
  private counter = 0;
  constructor() { }

  printCounter() {
    console.log(`Current Counter Value is: ${this.counter++}`);

  }
}
