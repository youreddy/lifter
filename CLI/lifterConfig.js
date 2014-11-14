var prompt = require('../node_modules/prompt');
var fs = require('fs');
var util = require('util');
var yaml = require('../node_modules/js-yaml');
var lifterPrompts = require('./lifterPrompts.js');
var readline = require('readline');

/**
* Function that returns a string of the question and options (if any) for each prompt by the command line tool
* @function
* @param {string} text Question to be displayed by command line too
* @param {array} options Array of selections availale to the user for a given question
*/
var makeDescription = function(text, options) {
  util.puts(text);

  if(options !== undefined) {
    for(var i=0;i<options.length;i++) {
      util.puts((i+1) + '. ' + options[i]);
    }
  }
};

/**
* Function that returns boolean relating to whether user made a valid choice from options provided in command line
* @function
* @param {array} obj Array of available prompt options
* @param {text} choice String of selection made by user
*/
var validChoice = function(obj, choice) {
  return ((!obj.promptOptions) || obj.promptOptions.indexOf(choice) > -1) ? true : false;
};

/**
* Object containing all user input from prompt and an entry with the current working directory
* @object
*/
var containerProperties = {
  currentWorkingDir: process.cwd()
};

/**
* Function that creates instance of readline.createInterface, which makes asking questions slightly easier and handles certain keystrokes properly
* @function
* @param {object} obj Object initializing input and output
*/
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


/**
* Function that prompts questions on command line, writes answers to containerProperties objects, and builds YML file when complete
* THIS NEEDS TO BE MORE MODULAR
* @function
* @param {object} obj Object containing all attributes of prompted question
*/
exports.picker = function(obj) {

// uses util.puts to render question and options for each question
  makeDescription(obj.promptText, obj.promptOptions);

  rl.question('', function(text) {

    var value = (!obj.promptOptions) ? text : obj.promptOptions[parseInt(text) - 1];

      if(validChoice(obj,value)) {
        containerProperties[obj.promptClass] = value;

        // nextEvent handles decision trees
        var nextEvent = typeof obj.nextClass === 'function' ? obj.nextClass(value) : obj.nextClass;

        if(nextEvent !== null) {
          exports.picker(lifterPrompts.promptList[nextEvent]);
        } else {
            console.log('Good work.  Run lifter config to build a container.');
            console.log(containerProperties);

            rl.close();

            var ymlDump = yaml.safeDump(containerProperties);

            fs.writeFile('lifter.yml',ymlDump,function(err) {
              if(err) {console.log(err);}
            });
        }
      } else {
          console.log('Please make a choice.  Otherwise, we will put',obj.promptOptions[0],'in your container.');
          exports.picker(obj);
      }
  });
};