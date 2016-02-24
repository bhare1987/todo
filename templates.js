var templates = {};

templates.todo = [
  "<div class='todoItem' data-listItemIdx='<%= idx %>'>",
    "<% if (complete === false) { %>",
      "<span class='fa fa-circle-o checkbox'></span>",
      "<span class='todoText'><%= content %></span>",
    "<% } else { %>",
      "<span class='fa fa-check-circle-o checkbox'></span>",
      "<span class='todoText completedItem'><%= content %></span>",
    "<% } %>",
    "<span class='deleteToDo'>X</span>",
  "</div>"
].join("");

templates.listTitle = [
  "<div class='listTitle'>",
    "<span class='fa fa-chevron-down'></span>",
    "To Do List",
  "</div>"
].join("");

templates.todoAdd = [
  "<div class='todoInput'>",
    "<input id='addToDo' name='todoInput'>",
  "</div>"
].join("");

templates.todoEdit = [
  "<div class='todoInput'>",
    "<input id='editToDo' name='todoInput' data-listItemIdx='<%= idx %>'>",
  "</div>"
].join("");
