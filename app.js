$(document).ready(function(){
  addToDoListToDom(todos, "List title");
  var list = $('.listTitle').data('listtitle');
  $('input[name="todoInput"]').on("keypress", function(event){
    var name = event.target.name;
    if (event.keyCode === 13) {
      addToDo(getToDoFromDom(name));
      addToDoListToDom(todos, "List title");
    }
  })

});

//CRUD Functions

function addToDo(newToDo, list){
  return todos[0].todoItems.push(newToDo);
}

function getToDo(todoIdx){
  return todos[0].todoItems;
}

function deleteToDo(todoIdx) {
  return todos[0].todoItems.splice(todoIdx, 1);
}

function editToDo(todoIdx) {
  return todos[0].todoItems[todoIdx];
}

//DOM Functions

function addItemToDom(item, templateStr, $target){
  var tmpl = _.template(templateStr);
  $target.append(tmpl(item));
}

function addToDoListToDom(arr, listTitle){
  var $container = $('.todos');
  var listIdx = 3;
  var list = arr.forEach(function(el, idx){
    if (el.listTitle === listTitle) {
      listIdx = idx;
      return el;
    }
  });
  var input = _.template(templates.todoInput);
  $container.html('');
  addItemToDom(list[0], templates.listTitle, $container);
  list[0].todoItems.forEach(function(el, idx, arr){
    el.idx = idx;
    addItemToDom(el, templates.todo, $container);
  });
  $container.append(input());
}

function getToDoFromDom(name){
  var selector = "input[name='" + name + "']";
  var content = $(selector).val();
  return {
    content: content,
    complete: false
  }
}
