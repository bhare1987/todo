$(document).ready(function(){
addToDoListToDom(getList(todos, "List title"));


});

//CRUD Functions

function addToDo(newToDo, listIdx){
  return todos[listIdx].push(newToDo);
}

function getToDo(listIdx, todoIdx){
  return todos[listIdx].todoItems;
}

function deleteToDo(listIdx, todoIdx) {
  return todos[listIdx].todoItems.splice(todoIdx, 1);
}

function editToDo(listIdx, todoIdx) {
  return todos[listIdx].todoItems[todoIdx];
}

//DOM Functions

function addToDoItemToDom(todoItem, templateStr, $target){
  var tmpl = _.template(templateStr);
  $target.append(tmpl(todoItem));
}

function addListTitleToDom(listTitle, templateStr, $target){
  var tmpl = _.template(templateStr);
  $target.append(tmpl(listTitle));

}

function addToDoListToDom(arr){
  var $container = $('.todos');
  var listTitle = arr[0];
  console.log(listTitle);
  $container.html('');
  addListTitleToDom(listTitle, templates.listTitle, $container);
  arr[0].todoItems.forEach(function(el, idx, arr){
    el.idx = idx;
    addToDoItemToDom(el, templates.todo, $container);
  })
}

function getToDoFromDom(){

}

function getList(arr, listTitle) {
  var list = arr.filter(function(el, idx){
    return el.listTitle === listTitle;
  });
  return list;
}
