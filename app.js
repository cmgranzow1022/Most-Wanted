/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){
  var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  switch(searchType){
    case 'yes':
    let arrayOfPeople = searchByName(people);
    let verifiedName = mostWantedVerification(arrayOfPeople);
    mainMenu(verifiedName);
    break;
    case 'no':
    searchByTraits(people);
    break;
    default:
    alert("Wrong! Please try again, following the instructions dummy. :)");
    app(people); // restart app
    break;
  }
}



function mostWantedVerification(name){
      if(name.length > 2){
      let newArray = displayPeople(name);
      return newArray;
      }
      else if(name.length === 0){
        alert("This person is not in the Most Wanted Database.");
      } 
      else if(name[0].firstName){
        let newArray = name;
        console.log(newArray);
        return newArray;

      }
    
}

function searchByTraits(people) {
  let userSearchChoice = prompt("What would you like to search by? 'height', 'weight', 'eye color', 'gender', 'age', 'occupation'.");
  let filteredPeople;

  switch(userSearchChoice) {
    case "height":
      filteredPeople = searchByHeight(people);
      break;
    case "weight":
      filteredPeople = searchByWeight(people);
      break;
    // so on and so forth
    default:
      alert("You entered an invalid search type! Please try again.");
      searchByTraits(people);
      break;
  }  

  let foundPerson = filteredPeople[0];

  mainMenu(foundPerson, people);

}

function searchByWeight(people) {
  let userInputWeight = prompt("How much does the person weigh?");

  let newArray = people.filter(function (el) {
    if(el.weight == userInputWeight) {
      return true;
    }
    // return true if el.height matches userInputHeight
  });

  return newArray;
}


// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  // if(!person){
  //   alert("Could not find that individual.");
  //   return app(people); // restart
  // }

  var displayOption = prompt("Found " + person.firstName + " " + person.lastName + ". Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
    // TODO: get person's info
    displayPerson(person);

    break;
    case "family":
    // TODO: get person's family
    break;
    case "descendants":
    // TODO: get person's descendants
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

function searchByName(people){
  
  var firstName = promptFor("What is the person's first name?" + "\n" + "If unknown, type in n/a.", chars);
  var lastName = promptFor("What is the person's last name?" + "\n" + "If unknown, type in n/a.", chars);
  if ( firstName == "n/a" || lastName == "n/a"){
      let answer = people.filter(function(el){
        if (firstName == el.firstName || lastName == el.lastName){
          return true;
        }
        else{
          return false;
        }
      })
      return answer;
    }
  else{
      let answer = people.filter(function(el){
       if (firstName == el.firstName && lastName == el.lastName){
          return true;
       }
      else{
         return false;
      }
      })
    return answer;  
  }
  
}

  
// alerts a list of people
function displayPeople(people){
  let i = 0;
  let personChosen = prompt("Enter the number of the person who you would like to view more information on:" + "\n\r" + people.map(function(person){
    i++;
    return i + ". " + person.firstName + " " + person.lastName;
    
  }
  ).join("\n")
  );
  personChosen = people[personChosen - 1];
return personChosen;
}

function displayPerson(person){
  var personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "Age: " + convertDOBToAge(person) + "\n";




  // TODO: finish getting the rest of the information to display
  alert(personInfo);
}

function convertDOBToAge(person) {
  let birthday = person.dob;
  let birthdaySplit = birthday.split("/");
  let newFormat = birthdaySplit[2] + "," + birthdaySplit[0] + "," + birthdaySplit[1];
  let age = calculate_age(new Date(newFormat));
  console.log(age);
  return age;
}

function calculate_age(dob) {
   var diff_ms = Date.now() - dob.getTime();
   var age_dt = new Date(diff_ms);
   return Math.abs(age_dt.getUTCFullYear() - 1970);
}


// function that prompts and validates user input
function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}
