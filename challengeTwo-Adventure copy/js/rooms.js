//Read from "./objects.json" into arrays of room objects
const url = './js/objects.json';

//export an array of rooms from 'objects.json'
export const roomArray = await fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error("Could not fetch \"roomArray\"");  //throw error if cannot fetch 'objects.json'
    }
    return response.json();
    })
  .then(json => {
    console.log(json);
    return getRoomArray(json);
  });

// insert all room data into an array and return the array
function getRoomArray(data) {
  let array = new Array();

  data.rooms.forEach(element => {
    array.push(element);
  });

  return array;
}