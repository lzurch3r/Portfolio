//recreated directly from instructor's example, to understand functions better

export function qs(selectorName) {
  return document.querySelector(selectorName);  //returns selected HTML element
}

export function qsAll(selectorName) {
  return document.querySelectorAll(selectorName); //returns all HTML elements with selectorName
}

export function readFromLS(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function writeToLS(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

//as instructor example states, uses a touchend for mobile devices and falls back to a click for desktop
///THIS IS IMPORTANT: Remember mobile-first development
export function bindTouch(selector, callback) {
    const element = qs(selector);               //defines element with a real HTML element taken from qs()
    element.addEventListener("touchend", e => {
      e.preventDefault();
      callback();
    });
    element.addEventListener("click", callback);
}

export async function parseJSON(filePath) {
  const data = await fetch(filePath)
    .then(response => {
    if (!response.ok) {
      throw new Error("Could not fetch data from " + filePath);  //throw error if cannot fetch 'objects.json'
    }
    return response.json();
    })
    .then(json => {
      console.log(json);
      return json;
  });

  return data;
}

export function createArray(arrayData){
  let array = [];

  arrayData.forEach(element => {
    array.push(element);
  })

  return array;
}