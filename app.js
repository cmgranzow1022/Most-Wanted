function app(people){
  var searchType = prompt("Enter the number of how you would like to search for your person:" + "\n" + "1. Name" + "\n" + "2. Single Trait" + "\n" + "3. Multiple Traits");
  switch(searchType){
    case '1':
    let arrayOfPeople = searchByName(people);
    let verifiedName = mostWantedVerification(arrayOfPeople);
    mainMenu(verifiedName, people);
    break;
    case '2':
    searchByTraits(people);
    break;
    case '3':
    searchByMultiTraits(people);
    break;
    default:
    alert("You didn't select a number in between 1 and 3, please try again!");
    app(people); // restart app
    break;
  }
}

function mostWantedVerification(name){
  if(name.length >= 2){
  let newArray = displayPeople(name);
  return newArray;
  }
  else if(name.length == 1){
  	return name[0];
  }
  else if(name.length === 0){
    alert("This person is not in the Most Wanted Database.");
    location.reload(true);
      } 
  else if(name[0].firstName){
    let newArray = name;
    return newArray;
  }
}

function searchByMultiTraits(people){
	let userSearchChoice = prompt("List the traits that you would like to search by:" + "\n" + "'height', 'weight', 'eye color', 'gender', 'age', 'occupation'" + "\n" + "Please seperate your traits with only a comma and no spaces.");
	let traitsArray = userSearchChoice.split(",");
	let filteredPeople = people;
  	let verifiedName;
	for (let i = 0; i < traitsArray.length; i++){
		switch(traitsArray[i]) {
	    case "height":
	      filteredPeople = searchByHeight(filteredPeople);
	      break;
	    case "weight":
	      filteredPeople = searchByWeight(filteredPeople);
	      break;
	    case "eye color":
	      filteredPeople = searchByEyeColor(filteredPeople);
	      break;
	    case "gender":
	       filteredPeople = searchByGender(filteredPeople);
	       break;
	   	case "age":
	   		filteredPeople = searchByAge(filteredPeople);
	   		break;
	   	case "occupation":
	   		filteredPeople = searchByOccupation(filteredPeople);
	   		break;	
	    default:
	      alert("You entered an invalid search type! Please try again.");
	      searchByMultiTraits(people);
	      break;	
		}
	}
	let foundPerson = mostWantedVerification(filteredPeople);
	mainMenu(foundPerson, people);
}

function searchByTraits(people) {
  let userSearchChoice = prompt("What would you like to search by? 'height', 'weight', 'eye color', 'gender', 'age', 'occupation'.");
  let filteredPeople;
  let verifiedName;
  switch(userSearchChoice) {
    case "height":
      filteredPeople = searchByHeight(people);
      verifiedName = mostWantedVerification(filteredPeople);
      break;
    case "weight":
      filteredPeople = searchByWeight(people);
      verifiedName = mostWantedVerification(filteredPeople);
      break;
    case "eye color":
      filteredPeople = searchByEyeColor(people);
      verifiedName = mostWantedVerification(filteredPeople);
      break;
    case "gender":
       filteredPeople = searchByGender(people);
       verifiedName = mostWantedVerification(filteredPeople);
       break;
   	case "age":
   		filteredPeople = searchByAge(people);
   		verifiedName = mostWantedVerification(filteredPeople);
   		break;
   	case "occupation":
   		filteredPeople = searchByOccupation(people);
   		verifiedName = mostWantedVerification(filteredPeople);
   		break;	
    default:
      alert("You entered an invalid search type! Please try again.");
      searchByTraits(people);
      break;
  }  
  let foundPerson = verifiedName;
  mainMenu(foundPerson, people);
}

function searchByWeight(people) {
  let userInputWeight = prompt("How much does the person weigh (in pounds)?");
  let newArray = people.filter(function (el) {
    if(el.weight == userInputWeight) {
      return true;
    }
  });
  return newArray;
}

function searchByHeight(people){
	let userInputHeight = prompt("How tall is the person (in inches)?");
	let newArray = people.filter(function(el) {
		if(el.height == userInputHeight){
			return true;
		}
	});
	return newArray;
}

function searchByEyeColor(people){
	let userInputEyeColor = prompt("What color are the person's eyes");
	let newArray = people.filter(function(el) {
		if(el.eyeColor == userInputEyeColor){
			return true;
		}
	});
	return newArray;
}

function searchByGender(people){
	let userInputGender = prompt("What is your person's gender (male or female)?");
	let newArray = people.filter(function(el) {
		if(el.gender == userInputGender){
			return true;
		}
	});
	return newArray;
}

function searchByAge(people){
	let userInputAge = prompt("How old is the person (in years)?");
	let newArray = people.filter(function(el) {
		let age = convertDOBToAge(el);
		if(age == userInputAge){
			return true;
		}
	});
	return newArray;
}

function searchByOccupation(people){
	let userInputOccupation = prompt("What is your person's occupation?");
	let newArray = people.filter(function(el) {
		if(el.occupation == userInputOccupation){
			return true;
		}
	});
	return newArray;
}

function mainMenu(person, people){
  var displayOption = prompt("Found " + person.firstName + " " + person.lastName + ". Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
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
 	let allDescendants = getDescendants(person, people);
 	let descendantPrint = displayFamily(allDescendants);
 	alert("Descendant(s): " + "\n" + descendantPrint);
    break;
    case "restart":
    app(people); 
    break;
    case "quit":
    return; 
    default:
    return mainMenu(person, people); 
  }
}
function getDescendants(person, people){
	let child = []
	child = calculateChildren(person, people);
			for (let j = 0; j<child.length; j++){
			child = child.concat(getDescendants(child[j], people))
			}
		return child
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
