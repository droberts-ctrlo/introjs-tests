export class Highlighter {
  defaultPlacement = {x: 0, y: 0};
  currentHighlight: JQuery<HTMLElement> | null = null;
  private $helperLayer: JQuery<HTMLElement>;

  get x() {
    return Number.parseInt(this.$helperLayer.css("left"));
  }

  get y() {
    return Number.parseInt(this.$helperLayer.css("top"));
  }

  get height() {
    return Number.parseInt(this.$helperLayer.css("height"));
  }

  get width() {
    return Number.parseInt(this.$helperLayer.css("width"))
  };

  get isDefaultPosition() {
    return this.x === this.defaultPlacement.x &&
      this.y === this.defaultPlacement.y &&
      this.width === 1 &&
      this.height === 1;
  }

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

  show() {
    const fade = $(".background-fade");
    fade.show();
    this.$helperLayer.show();
  }

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

  clearHighlight() {
    this.resetPosition()
    setTimeout(() => {
      this.$helperLayer.css({}).hide();
      $(".background-fade").hide();
      $("header").css({});
    }, 300);
  }
}
