const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const intern = new Intern();


const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const mainQuestion = [
    {
        type: "list",
        message: "What role does the team member play?",
        name: "role",
        choices: ["Manager", "Engineer", "Intern", "Complete Team"]
    }
];

const internQuestions = [
    {
        type: "input",
        message: "What is the Intern's name?",
        name: "name"
    },
    {
        type: "input",
        message: "What is the team member's ID?",
        name: "ID"
    },
    {
        type: "input",
        message: "What is the team member's email?",
        name: "email"
    },
    {
       type: "input",
       message: "What school does the intern attend?",
       name: "school"
    },
];


function init() {
    inquirer.prompt(mainQuestion)
    .then(function(data){
        if (this.mainQuestion.choices["Intern"]) {
            const internResult = new Intern (data);
            fs.appendFile("./templates/intern.html", internResult, (err) => {
                if (err) throw err;
                console.log("intern.html updated successfully");
            });
        } else if (mainQuestion.choices["Manager"]) {
            const managerResult = new Manager (data);
            fs.appendFile("./templates/manager.html", managerResult, (err) => {
                if (err) throw err;
                console.log("manager.html updated successfully");
            });
        } else if (mainQuestion.choices["Engineer"]) {
            const engineerResult = new Engineer (data);
            fs.appendFile("./templates/engineer.html", engineerResult, (err) => {
                if (err) throw err;
                console.log("engineer.html updated successfully");
            });
        } else if (mainQuestion.choices["Complete Team"]) {
            const teamComplete = new OUTPUT_DIR (data);
            fs.appendFile("./templates/main.html", teamComplete, (err) => {
                if (err) throw err;
                console.log("main.html updated successfully");
            });
        }
        
        
        



    })
}

init();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
