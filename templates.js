var templates = {};

templates.todo = [
  "<div class='todoItem' data-listItemIdx='<%= idx %>'>",
    "<span class='fa fa-circle checkbox'></span>",
    "<span class='todoText'><%= content %></span>",
  "</div>"
].join("");

templates.listTitle = [
  "<div class='listTitle' data-listTitle='<%= listTitle %>'>",
    "<%= listTitle %>",
  "</div>"
].join("");

templates.editToDo = [
  "<div class='toDoInput'>",
    "<input name='toDoInput'>",
  "</div>"
].join("");
