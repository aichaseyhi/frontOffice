import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  name = "Angular";
  currentStep = 1;
  numSteps = 4;

  nextStep() {
    this.currentStep++;
    if (this.currentStep > this.numSteps) {
      this.currentStep = 1;
    }
    const stepper = document.getElementById("stepper1");
    const steps = stepper?.getElementsByClassName("step");

    if (steps) {
      Array.from(steps as HTMLCollectionOf<HTMLElement>).forEach((step: HTMLElement, index: number) => {
        let stepNum = index + 1;
        if (stepNum === this.currentStep) {
          this.addClass(step, "editing");
        } else {
          this.removeClass(step, "editing");
        }
        if (stepNum < this.currentStep) {
          this.addClass(step, "done");
        } else {
          this.removeClass(step, "done");
        }
      });
    }
  }

  hasClass(elem: HTMLElement, className: string): boolean {
    return elem.classList.contains(className);
  }

  addClass(elem: HTMLElement, className: string): void {
    if (!this.hasClass(elem, className)) {
      elem.classList.add(className);
    }
  }

  removeClass(elem: HTMLElement, className: string): void {
    elem.classList.remove(className);
  }
}
