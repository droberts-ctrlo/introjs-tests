import {Highlighter} from "./lib/highlighter";
import {Stepper} from "./lib/stepper";
import {Tooltip} from "./lib/tooltip";

const heading_steps = () => [{
  title: "Welcome",
  intro: "Welcome to Dave's awesome demo!!",
},
  {
    title: "Header",
    element: $("header"),
    intro: "This is the header, isn't it pretty?",
  },
  {
    title: "Navigation",
    element: $("nav"),
    intro: "This is the navigation, it's where you can go to other pages.",
  },
  {
    title: "Dropdown",
    element: $("#dropdown"),
    intro: "But, this is a dropdown, it's where you can select things to navigate to.",
  },
  {
    title: "Search",
    element: $("#nav-search"),
    intro: "This is the search bar, you can search for things here.",
  }];

const input_steps = () => $(".form-group").map((index, element) => {
  return {
    title: "Input",
    element: $(element),
    intro: `This is input ${index + 1} field, you can type things here.`,
  }
}).toArray();

$(() => {
  $("#inputDemo").on("click", () => {
    const highlighter = new Highlighter();
    const stepper = new Stepper(...heading_steps(), ...input_steps());
    const tooltip = new Tooltip("", "")
    let timeout: NodeJS.Timeout;
    stepper.on('step', (step) => {
      if (step.element) {
        highlighter.highlight(step.element);
        if (!tooltip.shown)
          tooltip.show(step.element.offset().left, step.element.offset().top + step.element.height());
        tooltip.update(step.element.offset().left+50, (step.element.offset().top + step.element.height()) + 50, step.title, step.intro);
      } else {
        highlighter.show();
        highlighter.resetPosition()
        if (!tooltip.shown)
          tooltip.show(window.innerWidth / 2, window.innerHeight / 2);
        const x = window.innerWidth / 2 - tooltip.tooltip.width() / 2;
        const y = window.innerHeight / 2 - tooltip.tooltip.height() / 2;
        tooltip.update(x, y, step.title, step.intro);
      }
    });
    stepper.on('complete', () => {
      if (timeout) clearTimeout(timeout);
      highlighter.clearHighlight();
      tooltip.hide();
    });
    tooltip.on('next', () => {
      stepper.next();
    });
    tooltip.on('prev', () => {
      stepper.back();
    });
    stepper.next();
  });
});
