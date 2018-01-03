function app(people){
  var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  switch(searchType){
    case 'yes':
    let arrayOfPeople = searchByName(people);
    let verifiedName = mostWantedVerification(arrayOfPeople);
    mainMenu(verifiedName, people);
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
  if(name.length >= 2){
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
    let hasChildren = calculateChildren(person, people);
    let spouse = getSpouse(person, people);
    let siblings = getSiblings(person, people);
    let parents = getParent(person, people);
    let children = displayFamily(hasChildren);
    let spouseName = displayFamily(spouse);
    let siblingsNames = displayFamily(siblings);
    let parentsNames = displayFamily(parents);
    alert("Child(ren): " + "\n" + children + "\n" + "Spouse: " + "\n" + spouseName + "\n" + "Sibling(s): " + "\n" + siblingsNames + "\n" + "Parent(s): " + "\n" + parentsNames + "\n");

    break;
    case "descendants":
    // let hasChildren = calculateChildren(person, people);

    // let descendantString = "";

    // for (let i = 0; i < hasChildren.length; i++) {
    // 	let newHasChildren = calculateChildren(hasChildren[i], people)
    // 	descendantString += 
    // 	i++
    // }

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



function displayFamily(people) {
  let aString = "";
  for (let i = 0; i < people.length; i++) {
    aString += people[i].firstName + " " + people[i].lastName + "\n";
  }
    return aString;
}



function searchByName(people){
  var firstName = promptFor("What is the person's first name?" + "\n" + "If unknown, type in n/a.", chars);
  var lastName = promptFor("What is the person's last name?" + "\n" + "If unknown, type in n/a.", chars);
  if (firstName == "n/a" || lastName == "n/a"){
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
  personInfo += "Height: " + person.height + " inches" + "\n";
  personInfo += "Weight: " + person.weight + " pounds" + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  alert(personInfo);
}

function calculateChildren(person, people) {
  let children = [];
  for (let i = 0; i < people.length; i++) {
    for (let j = 0; j < people[i].parents.length; j++){
      if (people[i].parents[j] == person.id){
        children.push(people[i]);
      }
    }
  }
  return children;
}

function getSpouse(person, people) {
  let spouseArray = [];
  for (i = 0; i < people.length; i++) {
    if (person.currentSpouse == people[i].id) {
      spouseArray.push(people[i]);
    }
  }
  return spouseArray;
}

function getSiblings (person, people) {
  let siblingsArray = [];
  for (i = 0; i < people.length; i++) {
    if ((person.parents[0] == people[i].parents[0]) && (person != people[i]) && (people[i].parents.length > 0)) {
      siblingsArray.push(people[i]);
    }
  }
  return siblingsArray;
}

function getParent(person, people) {
  let parentArray = [];
  for (i = 0; i < people.length; i++) {
    for (j = 0; j < person.parents.length; j++) {
    if (person.parents[j] == people[i].id) {
      parentArray.push(people[i]);
    }
  }
}
  return parentArray;
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
