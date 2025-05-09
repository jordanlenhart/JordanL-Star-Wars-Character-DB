const dialog = document.getElementById("popup-dialog");
const characterTitle = document.getElementById("character-title");
const dialogContent = document.getElementById("dialog-content");
const closeDialogButton = document.getElementById("close-dialog");





// Getting the search input
const searchInput = document.getElementById("search-input");

// Adding an event listener that listens to whenever the user types something into the search bar
searchInput.addEventListener("input", function (e) {
  // Get the value of the input
  const input = e.target.value;
  console.log(input);
})

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





document.addEventListener("DOMContentLoaded", function(){
  fetch(`https://swapi.py4e.com/api/people`).then(resp => resp.json()).then(data => {
console.log(data)
const listOfCharacterNames = data.results.map(character => {
   return `<li>${character.name}</li>`
});
results.innerHTML = `<ul class="characters">${listOfCharacterNames.join("")}</ul>`;
  }).catch(e => {
console.log(e);
  })
})



async function searchForCharacter(query) {
	const characterData = await fetch(`https://swapi.py4e.com/api/people?search=${query}`).then(resp => resp.json());

	console.log(characterData);
}

function displayCharacters(characters){
  const listOfNames = characters.map(character => {
    return `<li><a data-url="${character.url}">${character.name}</a></li>`
  }).join(" ");

  results.innerHTML = `<ul class="characters">${listOfNames}</ul>`;

  const links = document.querySelectorAll('.characters a');
  links.forEach(link => {
    link.addEventListener('click', () => {
      const characterUrl = link.getAttribute('data-url');
      openCharacterDialog(characterUrl);
    });
  });
}  

document.addEventListener("DOMContentLoaded", function () {
  fetch(`https://swapi.py4e.com/api/people`).then(resp => resp.json()).then(data => {
    console.log(data)
    displayCharacters(data.results);
  }).catch(e => {
    console.log(e);
    results.innerText = "The characters you seek are not here";
  })
})


async function searchForCharacter(query) {
	const characterData = await fetch(`https://swapi.py4e.com/api/people?search=${query}`).then(resp => resp.json());

	console.log(characterData);
	displayCharacters(characterData.results)
}

const debouncedCharacterSearch = debounce(searchForCharacter, 500)

searchInput.addEventListener("input", function (e) {
  const input = e.target.value;
  console.log(input);

  debouncedCharacterSearch(input);
})

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


// Close the dialog when clicking outside of it
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) {
    dialog.close();
  }
});

//When the dialog closes, we reset it back to it's original state
dialog.addEventListener("close", () => {
  characterTitle.innerText = "";
  dialogContent.innerHTML = "Loading...";
})

// Close the dialog when the close button is clicked within the dialog element
closeDialogButton.addEventListener('click', () => {
  dialog.close();
});


