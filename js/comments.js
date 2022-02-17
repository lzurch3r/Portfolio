import { qs, readFromLS, writeToLS, bindTouch } from "./utils.js";
//Create a place to put comments in
let liveComments = null;

function addComment(comment, hikeName) {
  if (value !== "") {
    const newComment = {
      name: hikeName,
      date: new Date(),
      content: comment
    };
  }
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
    //renderList(getAllComments(this.type), this.listElement, this, hidden);
    document.getElementById(this.listElement).innerHTML = `<ul id="comments" class="commentStyles">Hello World!</ul>`;
  }
};