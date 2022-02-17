import { qs, readFromLS, writeToLS, bindTouch } from "./utils.js";
//Create a place to put comments in
let liveComments = null;

function renderList(list, element, comments, hidden) {
  element.innerHTML = "";

  list.forEach(Comment => {
    const item = document.createElement('li');
    const att = document.createAttribute('class');
    const formattedDate = new Date(Comment.id).toLocaleDateString("en-US");

    att.value = "commentClass";
    item.setAttributeNode(att);
    if (hidden) {
      item.innerHTML = `<label>${Comment.content}</label>`;
    }

    element.appendChild(item);
  });
}
function addComment(comment, hikeName) {
  if (value !== "") {
    const newComment = {
      name: hikeName,
      date: new Date(),
      content: comment
    };
  }
}

function getAllComments(type) {
  if (liveComments === null) {
    const newComment = {
      name: "Denada Falls",
      date: new Date(),
      content: "A test for Denada Falls!"
    }
    liveComments = [newComment];
  }

  return liveComments;
}

export default class Comments {
  constructor(listElement, type) {
    this.listElement = listElement;
    this.type = type;
    
    this.showCommentsList();
  }

  newComment() {
    const comment = document.getElementById('input_comment');
    addComment(comment.value, this.type);
    comment.value = "";
    this.showCommentsList();
  }

  showCommentsList(hidden = true) {
    renderList(getAllComments(this.type), this.listElement, this, hidden);
  }
};