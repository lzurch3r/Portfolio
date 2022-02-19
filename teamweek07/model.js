import Comment from './Comment.js';
import * as utilities from './utils.js';


console.log("model loaded");
// get comments data
//!! test array
const comments = [];
const c1 = new Comment("Bechler Falls", "this is a comment 1");
const c2 = new Comment("Bechler Falls", "this is a comment 2");
const c3 = new Comment("Bechler Falls", "this is a comment 3");
const c4 = new Comment("Teton Canyon", "this is a comment 4");
const c5 = new Comment("Denanda Falls", "this is a comment 5");

comments.push(c1, c2, c3, c4, c5);

utilities.writeToLS('comments', comments)


export function getAllComments(name) {
    let commentsList = ''
    comments.forEach((c) => {
        console.log(`pass name: ${name} obj name: ${c.name}`)
        if(name === c.name) {
            commentsList += `<p>${c.content}</p>`
        }
    })
  return commentsList
}
