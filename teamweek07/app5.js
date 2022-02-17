import Comments from './comments.js';
import Hikes from './hikes.js';
//on load grab the array and insert it into the page
const myHikes = new Hikes('hikes');
window.addEventListener('load', () => {
  myHikes.showHikeList();
});
const list = document.getElementById('comments');
const myComments = new Comments(list,'hike');
