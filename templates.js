var templates = {};

templates.todo = [
  "<div class='todoItem' data-listItemIdx='<%= idx %>'>",
    "<span class='fa fa-circle checkbox'></span>",
    "<span class='todoText'><%= content %></span>",
  "</div>"
].join("");

templates.listTitle = [
  "<div class='listTitle' data-listTitle='<%= listTitle %>'> data-listIdx='<%= idx %>'",
    "<span class='fa fa-chevron-down'></span>",
    "<%= listTitle %>",
  "</div>"
].join("");

templates.todoInput = [
  "<div class='todoInput'>",
    "<input name='todoInput'>",
  "</div>"
].join("");
