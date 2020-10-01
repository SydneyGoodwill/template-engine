const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");


const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)



// Initial Prompt
const mainQuestion = [
    {
        type: "list",
        name: "role",
        message: "What role does the team member play?",
        choices: [
            "Manager",
            "Engineer",
            "Intern"]
    },
];

// Prompt for Intern
const internQuestions = [
    {
        type: "input",
        message: "What is the Intern's name?",
        name: "name"
    },
    {
        type: "input",
        message: "What is the team member's ID?",
        name: "id"
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
    {
        type: "confirm",
        name: "addnewmember",
        message: "Do you want to add another team member?",
        default: true,
    },
];

// Prompt for Manager
const managerQuestions = [
    {
        type: "input",
        message: "What is the Manager's name?",
        name: "name"
    },
    {
        type: "input",
        message: "What is the Manager's ID?",
        name: "id"
    },
    {
        type: "input",
        message: "What is the Manager's email?",
        name: "email"
    },
    {
       type: "input",
       message: "What is the Manager's office number?",
       name: "officeNumber"
    },
    {
        type: "confirm",
        name: "addnewmember",
        message: "Do you want to add another team member?",
        default: true,
    },
];

// Prompt for Engineer
const engineerQuestions = [
    {
        type: "input",
        message: "What is the Engineer's name?",
        name: "name"
    },
    {
        type: "input",
        message: "What is the Engineer's ID?",
        name: "id"
    },
    {
        type: "input",
        message: "What is the Engineer's email?",
        name: "email"
    },
    {
       type: "input",
       message: "What is the Engineer's GitHub name?",
       name: "github"
    },
    {
        type: "confirm",
        name: "addnewmember",
        message: "Do you want to add another team member?",
        default: true,
    },
];


function init() {
   return inquirer
   .prompt(mainQuestion).then(response => {
    // If the user answered 'Intern' for the initial prompt
   if (response.role === "Intern") {
       inquirer.prompt(internQuestions).then(data => {
           // A new intern will be created from the input from Intern Prompts
           const intern = new Intern (data.name, data.id, data.email, data.school);
           employees.push(intern);
           if (data.addnewmember) {
               // If the user wants to add a new user, it will start again w/the Initial Prompt
               init();
           }else {
               // If the user does not want to add a new team member, it will render and generate an HTML file from the employees array
               fs.writeFile(outputPath, render(employees), () => {})
               console.log("Generated HTML complete.")
           }
    })
    }
    if (response.role === "Manager") {
        inquirer.prompt(managerQuestions).then(data => {
            const manager = new Manager (data.name, data.id, data.email,data.officeNumber);
            employees.push(manager);
            if (data.addnewmember) {
                init();
            }else {
                fs.writeFile(outputPath, render(employees), () => {})
                console.log("Generated HTML complete.")
            }
    })
    }
    if (response.role === "Engineer") {
        inquirer.prompt(engineerQuestions).then(data => {
            const engineer = new Engineer (data.name, data.id, data.email, data.github);
            employees.push(engineer);
            if (data.addnewmember) {
                init();
            }else {
                fs.writeFile(outputPath, render(employees), () => {})
                console.log("Generated HTML complete.")
            }

    })
    }
})
}


init();