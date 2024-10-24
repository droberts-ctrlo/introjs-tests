type basicFunction = (...args: any[]) => void;

interface Step<T extends HTMLElement = HTMLElement> {
  title: string;
  intro: string;
  element?: JQuery<T>
}

export class Stepper {
  private currentStep: number;
  private callbacks = new Map<string, basicFunction[]>();
  private steps: Step[];
  private done: boolean;
  private started: boolean = false;

  on(action: 'complete', callback: () => void): void;
  on(action: 'step', callback: (step: Step) => void): void;
  on(action: 'step' | 'complete', callback: basicFunction): void {
    if (!this.callbacks.has(action))
      this.callbacks.set(action, []);
    this.callbacks.get(action).push(callback);
  }

  private raise(action: 'complete'): void;
  private raise(action: 'step', step: Step): void;
  private raise(action: string, ...args: any[]) {
    if (this.callbacks.has(action))
      this.callbacks.get(action).forEach(callback => callback(...args));
  }

  constructor(...steps: Step[]) {
    this.steps = steps;
    this.currentStep = 0;
    this.done = false;
  }

  addStep(step: Step) {
    this.steps.push(step);
    if (this.done) this.done = false;
  }

  next() {
    if (!this.started) {
      this.raise('step', this.step);
      this.started = true;
    } else {
      if (this.isLast) {
        if (!this.done) this.complete();
      } else {
        this.currentStep++;
        this.raise('step', this.step);
      }
    }
  }

  complete() {
    this.done = true;
    this.raise('complete');
  }

  back() {
    if (this.currentStep > 0)
      this.currentStep--;
    this.raise('step', this.step);
    if (this.done) this.done = false;
  }

  reset() {
    this.currentStep = 0;
  }

  get isLast() {
    return this.steps.length == this.currentStep + 1;
  }

  get step() {
    return this.steps[this.currentStep];
  }

  set stepNumber(stepNumber: number) {
    if (stepNumber >= 0 && stepNumber < this.steps.length)
      this.currentStep = stepNumber;
    if (stepNumber < 0)
      this.currentStep = 0;
    if (stepNumber >= this.steps.length)
      this.currentStep = this.steps.length - 1;
  }
}