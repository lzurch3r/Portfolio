function createList() {
  const links = [
    {
      label: "Week 1 notes",
      url: "week1/index.html"
    },

    {
      label: "Week 2 Notes",
      url: "week2/index.html"
    },

    {
      label: "Week 3 Notes",
      url: "week3/index.html"
    },

    {
      label: "Week 5 Notes",
      url: "week5/index.html"
    },

    {
      label: "Week 7",
      url: "week7/index.html"
    },

    {
      label: "Week 8",
      url: "week8/week8Examples.html"
    },

    {
      label: "Challenge One - ToDo",
      url: "challengeOne-ToDo/challengeOne-Modular/todo.html" 
    },

    {
      label: "Challenge Two - Adventure",
      url: "challengeTwo-Adventure/adventure.html"
    }
  ]

  var newList = "<ol id=\"table_contents\">";
  for (i = 0; i < links.length; i++) {
    let label = links[i].label;
    let url = links[i].url;

    let n = "<li><a href=\'" + url + "\'>" + label + "</a></li>";
    newList += n;
  }
  newList += "</ol>";

  document.getElementById('table_contents').innerHTML = newList;
}