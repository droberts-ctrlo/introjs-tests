/**
 * Highlighter class
 * @property {{x: number, y:number}} defaultPlacement - Default position of the highlighter
 * @property {JQuery<HTMLElement> | null} currentHighlight - Current highlighted element
 */
export class Highlighter {
  defaultPlacement = {x: 0, y: 0};
  currentHighlight: JQuery<HTMLElement> | null = null;
  private $helperLayer: JQuery<HTMLElement>;

  /**
   * Get the x position of the highlighter
   * @returns {number} - The x position of the highlighter
   */
  get x(): number {
    return Number.parseInt(this.$helperLayer.css("left"));
  }

  /**
   * Get the y position of the highlighter
   * @returns {number} - The y position of the highlighter
   */
  get y(): number {
    return Number.parseInt(this.$helperLayer.css("top"));
  }

  /**
   * Get the height of the highlighter
   * @returns {number} - The height of the highlighter
   */
  get height(): number {
    return Number.parseInt(this.$helperLayer.css("height"));
  }

  /**
   * Get the width of the highlighter
   * @returns {number} - The width of the highlighter
   */
  get width(): number {
    return Number.parseInt(this.$helperLayer.css("width"))
  }

  /**
   * Check if the highlighter is in the default position
   * @returns {boolean} - True if the highlighter is in the default position, false otherwise
   */
  get isDefaultPosition() {
    return this.x === this.defaultPlacement.x &&
      this.y === this.defaultPlacement.y &&
      this.width === 1 &&
      this.height === 1;
  }

  /**
   * Create a new Highlighter
   */
  constructor() {
    this.defaultPlacement = {x: window.innerWidth / 2, y: window.innerHeight / 2};
    this.$helperLayer = $(".helperLayer");
    this.$helperLayer.css({
      top: this.defaultPlacement.y,
      left: this.defaultPlacement.x,
      width: "1px",
      height: "1px"
    });
    $(".background-fade").hide();
    this.$helperLayer.hide();
  }

  /**
   * Reset the position of the highlighter to the default position
   */
  resetPosition() {
    if (!this.isDefaultPosition) {
      this.$helperLayer.css({
        top: this.defaultPlacement.y,
        left: this.defaultPlacement.x,
        width: 1,
        height: 1
      });
    }
  }

  /**
   * Show the highlighter
   */
  show() {
    const fade = $(".background-fade");
    fade.show();
    this.$helperLayer.show();
  }

  /**
   * Highlight an element
   * @template {HTMLElement} T - The type of the element to highlight (default: HTMLElement)
   * @param {JQuery<T>} element - The element to highlight
   */
  highlight<T extends HTMLElement = HTMLElement>(element: JQuery<T>) {
    if (this.currentHighlight) {
      this.currentHighlight.removeClass("highlighted");
      this.currentHighlight.removeClass("relativePosition");
    }
    this.currentHighlight = element;
    if (!element.hasClass("highlighted")) {
      element.addClass("highlighted");
    }
    if (!element.hasClass("relativePosition")) {
      element.addClass("relativePosition");
    }
    const fade = $(".background-fade");
    const rect = $(element).get(0).getBoundingClientRect();
    fade.show();
    this.$helperLayer.show();
    this.$helperLayer.css({
      top: rect.top - 10,
      left: rect.left - 10,
      width: rect.width + 20,
      height: rect.height + 20
    });
  }

  /**
   * Clear the highlight
   */
  clearHighlight() {
    this.resetPosition()
    setTimeout(() => {
      this.$helperLayer.css({}).hide();
      $(".background-fade").hide();
      $("header").css({});
    }, 300);
  }
}
