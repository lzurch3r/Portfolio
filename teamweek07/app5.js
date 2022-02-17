import Comments from './comments.js';
import Hikes from './hikes.js';
//on load grab the array and insert it into the page
const myHikes = new Hikes('hikes');
window.addEventListener('load', () => {
  myHikes.showHikeList();
});
const list = document.getElementById('comments');
const myComments = new Comments(list,'hike');
bindEvents();

//Function to bind events to buttons and HTML elements on page
function bindEvents() {
  const commentInput = document.getElementById('input_comment');
  
  //Adds an event listener so user can press 'Enter' to submit comments
  commentInput.addEventListener("keyup", function(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      document.getElementById('add_comment').click();
    }
  });
}