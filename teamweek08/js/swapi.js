const requestURL = 'https://swapi.dev/api/people/';

getData(requestURL);

function getData(url) {
    fetch(url)
.then(function (response) {
    return response.json();
})
.then(function (jsonObject) {
    console.table(jsonObject); // checks for a valid response by showing the response data in a console table. (look in Browser Console).
    let previous = jsonObject['previous'];
    let next = jsonObject['next'];

    console.log("this is our next data", next);
    const people = jsonObject['results']; // stores the results of the response in an array named 'people', in this case named 'results' (but it could be named anything, so always check your response table for naming).
    console.table(people); // shows the array in a table in the Browser Console which is handy for finding the index and Key: Value, of things.
    // document.getElementById("cards").innerHTML = people[0].name + ', ' + 'Eye Color - ' + people[0].eye_color; // This line is a simple way to access parts of our array and display them to the DOM using the 'cards' id to output.
    displayPage(people, next, previous);
});
}


function displayPage(people, next, previous) {

    {
      const element = document.getElementById('cards');
      element.innerHTML = "";

      for (let i = 0; i < people.length; i++) { // Loops through the array and assigns each array item to the 'i' variable
          let characterName = document.createElement('p'); // creates a <p> element and assigns it to the variable 'characterName'
          characterName.textContent = ` ${people[i].name}, `; // This is the text content for the 'characterName' <p> element
          document.getElementById("cards").appendChild(characterName); // as the array loops through it appends each 'characterName' <p> element one after the other.
          // document.getElementById("next").innerHTML = `${}`
      }
    }

  {
    const element = document.getElementById('buttons');
    const prevButton = document.createElement('button');
    const nextButton = document.createElement('button');

    let pb = null;
    let nb = null;

    element.innerHTML = ""; // removes buttons from the page we previously rendered.
    prevButton.innerHTML = `<label>Prev</label>`;
    nextButton.innerHTML = `<label>Next</label>`;

    if (previous !== null)  //checks if previous is not the first page
      pb = prevButton.childNodes[0]; // assigns <button><label></label></button> to pb

    if (pb) { // this block listens for a touchend or a click and then runs the 'getData()' function passing the 'previous' variable
      pb.addEventListener("touchend", function () { 
        getData(previous);
      })
      pb.addEventListener("click", function () {
        getData(previous);
      })
    }

    if (next !== null)
      nb = nextButton.childNodes[0];

    if (nb) { // this block listens for a touchend or a click and then runs the 'getPage()' function passing the 'next' variable
      nb.addEventListener("touchend", function () {
        getData(next);
      })
      nb.addEventListener("click", function () {
        getData(next);
      })
    }

    // appends the previous and next buttons to the html page
    element.appendChild(prevButton);
    element.appendChild(nextButton);
  }

  
}