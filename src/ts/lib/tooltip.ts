export class Tooltip {
  tooltip: JQuery<HTMLElement>;
  shown: boolean = false;

  on(event:'next', callback: ()=>void): void;
  on(event:'prev', callback: ()=>void): void;
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

  constructor(heading: string, text: string) {
    this.createTooltip(heading, text);
  }

  update(x:number, y:number, heading:string, text:string) {
    this.moveTo(x, y);
    this.tooltip.find("#tip-header").text(heading);
    this.tooltip.find("#tip-body").text(text);
  }

  show(x: number, y: number) {
    this.moveTo(x, y);
    this.tooltip.show();
    this.shown=true;
  }

  hide() {
    this.tooltip.hide();
    this.shown=false;
  }
}