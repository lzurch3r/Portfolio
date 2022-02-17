import { qs, readFromLS, writeToLS, bindTouch } from "./utils.js";
//Create a place to put comments in
let liveComments = null;

function renderList(list, element, comments, hidden) {
  element.innerHTML = "";

  if (list) {
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
}
function addComment(comment, hikeName) {
  if (comment !== "") {
    const newComment = {
      name: hikeName,
      date: new Date(),
      content: comment
    };

    try {
      liveComments.push(newComment);
  
      if (!liveComments)
        throw (`ERROR: Cannot find array 'liveComments'`)
    }
    catch (e) {
      console.log(e);
    }
  }
}

function getAllComments(type) {
  if (liveComments === null)
    //liveComments = readFromLS(type);
    liveComments = [];

  return liveComments;
}

export default class Comments {
  constructor(listElement, type) {
    this.listElement = listElement;
    this.type = type;
    
    bindTouch(("#add_comment"), this.newComment.bind(this));
    this.showCommentsList();
  }

  newComment() {
    const comment = document.getElementById('input_comment');
    addComment(comment.value, this.type);
    comment.value = "";
    this.showCommentsList();
  }

  findComment(date) {
    let comment = liveComments.find( element => {
      return element.date === date;
    })

    return comment;
  }

  showCommentsList(hidden = true) {
    renderList(getAllComments(this.type), this.listElement, this, hidden);
  }
};