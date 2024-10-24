import introJs from "intro.js";

const heading_steps = () => [{
    title: "Welcome",
    intro: "Welcome to Dave's awesome demo!!",
},
{
    title: "Header",
    element: $("header")[0],
    intro: "This is the header, isn't it pretty?",
},
{
    title: "Navigation",
    element: $("nav")[0],
    intro: "This is the navigation, it's where you can go to other pages.",
},
{
    title: "Dropdown",
    element: $("#dropdown")[0],
    intro: "But, this is a dropdown, it's where you can select things to navigate to.",
},
{
    title: "Search",
    element: $("#nav-search")[0],
    intro: "This is the search bar, you can search for things here.",
}];

const input_steps = () => $(".form-group").map((index, element) => {
    return {
        title: "Input",
        element: element,
        intro: `This is input ${index+1} field, you can type things here.`,
    }
}).toArray();

$(() => {
    $("#inputDemo").on("click", ()=>{
        introJs().setOptions(
            {
                steps: input_steps()
            }
        ).start();
    });
    const steps = [...heading_steps(), ...input_steps()];
    introJs().setOptions(
        {
            steps
        }
    ).start();
});
