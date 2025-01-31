/**
 * Wrapper for a basic function definition
 */
type basicFunction = (...args: any[]) => void;

/**
 * Interface for the step object
 * @template {HTMLElement} T - The type of the element to be used in the step
 * @property {string} title - The title of the step
 * @property {string} intro - The introduction of the step
 * @property {JQuery<T>} element - The element to be used in the step
 */
interface Step<T extends HTMLElement = HTMLElement> {
  title: string;
  intro: string;
  element?: JQuery<T>
}

/**
 * Class to handle the stepper
 * @class Stepper
 */
export class Stepper {
  private readonly steps: Step[];
  private currentStep: number;
  private callbacks = new Map<string, basicFunction[]>();
  private done: boolean;
  private started: boolean = false;

  /**
   * Add an event listener to the stepper when it has completed
   * @param action - The action to listen to (in this case 'complete')
   * @param callback - The callback to be executed
   */
  on(action: 'complete', callback: () => void): void;
  /**
   * Add an event listener to the stepper for when a step is performed
   * @param action - The action to listen to (in this case 'step')
   * @param callback - The callback
   */
  on(action: 'step', callback: (step: Step) => void): void;
  /**
   * Add an event listener to the stepper
   * @param action - The action to listen to (in this case 'step' or 'complete')
   * @param callback - The callback to be executed
   */
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

  /**
   * Constructor for the stepper
   * @param steps - The steps to be used in the stepper
   */
  constructor(...steps: Step[]) {
    this.steps = steps;
    this.currentStep = 0;
    this.done = false;
  }

  /**
   * Add a step to the stepper
   * @param step - The step to be added
   */
  addStep(step: Step) {
    this.steps.push(step);
    if (this.done) this.done = false;
  }

  /**
   * Move to the next step or complete the stepper if it is the last step
   */
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

  /**
   * Complete the stepper
   */
  complete() {
    this.done = true;
    this.raise('complete');
  }

  /**
   * Move to the previous step in the stepper (if possible)
   */
  back() {
    if (this.currentStep > 0)
      this.currentStep--;
    this.raise('step', this.step);
    if (this.done) this.done = false;
  }

  /**
   * Reset the stepper to the first step
   */
  reset() {
    this.currentStep = 0;
  }

  /**
   * Get if this is the last step in the stepper
   */
  get isLast() {
    return this.steps.length == this.currentStep + 1;
  }

  /**
   * Get the current step in the stepper
   */
  get step() {
    return this.steps[this.currentStep];
  }

  /**
   * Set the current step number
   * @param stepNumber - The step number to set - this will be clamped to the number of steps
   */
  set stepNumber(stepNumber: number) {
    if (stepNumber >= 0 && stepNumber < this.steps.length)
      this.currentStep = stepNumber;
    if (stepNumber < 0)
      this.currentStep = 0;
    if (stepNumber >= this.steps.length)
      this.currentStep = this.steps.length - 1;
  }
}
