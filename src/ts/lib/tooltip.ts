/**
 * Tooltip class
 * @property {JQuery<HTMLElement>} tooltip - The tooltip element
 * @property {boolean} shown - Whether the tooltip is currently shown
 */
export class Tooltip {
  tooltip: JQuery<HTMLElement>;
  shown: boolean = false;

  /**
   * Add an event listener to the tooltip
   * @param event - The event to listen for (in this case 'next')
   * @param callback - The callback function to run when the event is triggered
   */
  on(event:'next', callback: ()=>void): void;
  /**
   * Add an event listener to the tooltip
   * @param event - The event to listen for (in this case 'prev')
   * @param callback - The callback function to run when the event is triggered
   */
  on(event:'prev', callback: ()=>void): void;
  /**
   * Add an event listener to the tooltip
   * @param event - The event to listen for (in this case 'next' or 'prev')
   * @param callback - The callback function to run when the event is triggered
   */
  on(event:'next' | 'prev', callback: ()=>void): void {
    this.tooltip.find(`#tip-${event}`).on("click", callback);
  }

  private createTooltip(heading:string, text:string) {
    this.tooltip=$(`
      <div id="tooltip">
        <div id="tip-header">${heading}</div>
        <div id="tip-body">${text}</div>
        <div id="tip-footer">
            <button class="btn btn-xs" id="tip-prev">Previous</button>
            <button class="btn btn-xs btn-info" id="tip-next">Next</button>
        </div>
      </div>
    `);
    $(document.body).append(this.tooltip)
    this.tooltip.hide();
  }

  private moveTo(x: number, y:number) {
    this.tooltip.css({
      top: y,
      left: x,
    });
  }

  /**
   * Create a new tooltip
   * @param heading - The heading of the tooltip
   * @param text - The text of the tooltip
   */
  constructor(heading: string, text: string) {
    this.createTooltip(heading, text);
  }

  /**
   * Update the tooltip's position and text
   * @param x - The x-coordinate of the tooltip
   * @param y - The y-coordinate of the tooltip
   * @param heading - The heading of the tooltip
   * @param text - The text of the tooltip
   */
  update(x:number, y:number, heading:string, text:string) {
    this.moveTo(x, y);
    this.tooltip.find("#tip-header").text(heading);
    this.tooltip.find("#tip-body").text(text);
  }

  /**
   * Show the tooltip at the given coordinates
   * @param x - The x-coordinate of the tooltip
   * @param y - The y-coordinate of the tooltip
   */
  show(x: number, y: number) {
    this.moveTo(x, y);
    this.tooltip.show();
    this.shown=true;
  }

  /**
   * Hide the tooltip
   */
  hide() {
    this.tooltip.hide();
    this.shown=false;
  }
}