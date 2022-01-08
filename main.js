function createList() {
  const links = [
    {
      label: "Week1 notes",
      url: "week1/index.html"
    }
  ]

  var newList = "<ol>";
  for (i = 0; i < links.length; i++) {
    let label = links[i].label;
    let url = links[i].url;

    let n = "<li><a href=\'" + url + "\'>" + label + "</a></li>";
    newList += n;
  }
  newList += "</ol>";

  document.getElementById('table_contents').innerHTML = newList;
}