// STEP 6 CREATING VARIABLES FOR API DATA TO POPULATE

const dialog = document.getElementById("popup-dialog");
const characterTitle = document.getElementById("character-title");
const dialogContent = document.getElementById("dialog-content");
const closeDialogButton = document.getElementById("close-dialog");


// STEP 2.3 SEARCH FUNCTIONALITY

// Getting the search input
const searchInput = document.getElementById("search-input");

// Adding an event listener that listens to whenever the user types something into the search bar
searchInput.addEventListener("input", function (e) {
  // Get the value of the input
  const input = e.target.value;
  console.log(input);
})


// STEP 3.2 DISPLAYING THE CHARACTERS

document.addEventListener("DOMContentLoaded", function(){
  fetch(`https://swapi.py4e.com/api/people`).then(resp => resp.json()).then(data => {
console.log(data)
const listOfCharacterNames = data.results.map(character => {
   return `<li>${character.name}</li>`
});
results.innerHTML = `<ul>${listOfCharacterNames}</ul>`;
  }).catch(e => {
console.log(e);
results.innerText = "The characters you seek are not here";
  })
})

  
// STEP 5 DEBOUNCING (CONFUSING)

const results = document.getElementById("results");

function debounce(func, wait) {
  let timeout;

  return function (...args) {
    const context = this;

    clearTimeout(timeout);

    timeout = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
}

// STEP 4.2 REFACTORING DISPLAYING THE CHARACTERS
function displayCharacters(characters){
  const listOfNames = characters.map(character => {
	  
    // STEP 6.2 ADDING LINKS FOR EACH CHARACTER
    return `<li><a data-url="${character.url}">${character.name}</a></li>`
  }).join(" ");

  results.innerHTML = `<ul class="characters">${listOfNames}</ul>`;

  // STEP 6.3 ADDING THE EVENT LISTENERS
  const links = document.querySelectorAll('.characters a');
	
  // STEP 6.4 OPENING THE DIALOG W/ OPEN CHARACTER DIALOG
  links.forEach(link => {
    link.addEventListener('click', () => {
      const characterUrl = link.getAttribute('data-url');
      openCharacterDialog(characterUrl);
    });
  });
}  


// STEP 7.1 FIXING FETCHES
document.addEventListener("DOMContentLoaded", function(){
  fetch(`https://swapi.py4e.com/api/people`).then(resp => resp.json()).then(data => {
    if (data.count >= 1) {
      displayCharacters(data.results)
     } else {
      displayError()
     }     
  }).catch(e => {
   console.log(e);
  })
  })
  


// STEP 4.3 SHOWING CHARACTER SEARCH RESULTS
// STEP 7.1 FIXING FETCHES
async function searchForCharacter(query) {
	const characterData = await fetch(`https://swapi.py4e.com/api/people?search=${query}`).then(resp => resp.json());

	console.log(characterData);
	displayCharacters(characterData.results)
  if (characterData.count >= 1) {
    displayCharacters(characterData.results)
   } else {
    displayError()
   }
   
}




// STEP 5 MORE DEBOUNCING 
const debouncedCharacterSearch = debounce(searchForCharacter, 500)

searchInput.addEventListener("input", function (e) {
  const input = e.target.value;
  console.log(input);
// STEP 7.2 CHECKING INPUT LENGTH
  if(input.length >= 1){
  debouncedCharacterSearch(input)
}
})

	
// STEP 6.3 FILLING IN THE DIALOG ELEMENT
function openCharacterDialog(characterApiUrl) {
  // Open the dialog
  dialog.showModal();

  // Fetch and display data
  fetch(characterApiUrl).then(resp => resp.json()).then(data => {
    characterTitle.innerText = data.name;

    // Adding the character data as HTML dynamically
    dialogContent.innerHTML = `
     <p><strong>Height:</strong> ${data.height}</p>
     <p><strong>Mass:</strong> ${data.mass}</p>
     <p><strong>Gender:</strong> ${data.gender}</p>
    `;
  }).catch(err => {
    console.log(err);
    // If the fetch fails overall, then we will display this message
    dialogContent.innerHTML = 'Failed to load data.';
  });
}


// STEP 6.4 CLOSING THE DIALOG CHALLENGE

// CLOSE DIALOG WHEN CLICKING OUTSIDE
dialog.addEventListener('click', (e) => {
  if (e.target !== dialog) return;
  dialog.close();
});

// WHEN DIALOG CLOSES, RESET IT BACK TO OG STATE
dialog.addEventListener('close', () => {
  characterTitle.textContent = "";
  dialogContent.innerHTML = "Loading...";
});

// CLOSE DIALOG WEHN CLOSE BUTTON IS CLICKED
closeDialogButton.addEventListener('click', () => dialog.close());


// STEP 7.1 FIXING FETCHES

// DISPLAY ERROR FUNC
const displayError = () => {
  results.innerHTML = `<ul class="characters"><li>The characters you seek are not here</li></ul>`;
}
