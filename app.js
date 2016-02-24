$(document).ready(function(){
  var $Selector = $('.todos');
  addToDoListToDom(getToDo());
  updateCount($('.todoMenuActive').html());
  $Selector.on("keypress", "input[name='todoInput']", function(event){
    if (event.keyCode === 13) {
      if ($(this).attr('id') ===  'editToDo' ) {
        editToDo($(this).data('listitemidx'), $(this).val());
        addToDoListToDom(todos);
      } else if ($(this).attr('id') === 'addToDo') {
        addToDo(getToDoFromDom($(this)));
        addToDoListToDom(todos);
      }
    }
    updateCount($('.todoMenuActive').html());
  });

  $Selector.on("dblclick", ".todoItem", function(event){
    if ($('#editToDo').length === 0) {
      var input = _.template(templates.todoEdit);
      var content = $(this).find("span.todoText").html();
      var idx = $(this).data('listitemidx');
      $(this).replaceWith(input({idx:idx}));
      $('#editToDo').val(content);
    }
  });

  $Selector.on("click", ".checkbox", function(event){
    var $item = $(this)
    var idx = $item.parent().data("listitemidx");
    if (todos[idx].complete === false) {
      editToDo(idx, true);
      addToDoListToDom(getFilter(getToDo()))
    } else {
      editToDo(idx, false);
      addToDoListToDom(getFilter(getToDo()))
    }
    updateCount($('.todoMenuActive').text());
  });

  $('.todoMenu').on("click", "li", function(event){
    $(this).siblings().removeClass('todoMenuActive');
    $(this).addClass('todoMenuActive');
    if ($(this).html() === "All") {
      addToDoListToDom(getToDo());
      updateCount();
    } else if ($(this).text() === "Active") {
      var active = getFilter(getToDo());
      addToDoListToDom(active);
      updateCount("Active");
    } else if ($(this).text() === "Completed") {
      var completed = getFilter(getToDo());
      addToDoListToDom(completed);
      updateCount("Completed");
    }
  });

  $Selector.on("click", '.deleteToDo', function(event){
    deleteToDo($(this).parent().data("listitemidx"));
    updateIdx();
    addToDoListToDom(getToDo());
    updateCount($('.todoMenuActive').text());
  });

  $('.clear').on("click", function(event){
    var completed = getCompleted();
    completed.forEach(function(el){
      deleteToDo(el.idx);
    });
    updateIdx();
    addToDoListToDom(getFilter(getToDo()));
    updateCount($('.todoMenuActive').text());
  });

});

//CRUD Functions

function addToDo(newToDo){
  return todos.push(newToDo);
}

function getToDo(todoIdx){
  if (todoIdx) {
    return todos[todoIdx];
  } else {
  return todos;
  }
}

function deleteToDo(todoIdx) {
  return todos.splice(todoIdx, 1);
}

function editToDo(todoIdx, content, complete) {
   var args = [].slice.call(arguments);
   var todoItem = todos[todoIdx];
   if (typeof args[1] === "boolean") {
     todoItem.complete = content;
   } else {
     if (content) {
       todoItem.content = content;
     }
     if (complete) {
       todoItem.complete = complete;
     }
   }
}

//DOM Functions

function addItemToDom(item, templateStr, $target){
  var tmpl = _.template(templateStr);
  $target.append(tmpl(item));
}

function addToDoListToDom(arr){
  var $container = $('.todos');
  var input = _.template(templates.todoAdd);
  var title = _.template(templates.listTitle);
  $container.html('');
  $container.append(title());
  arr.forEach(function(el, idx, arr){
    addItemToDom(el, templates.todo, $container);
  });
  $container.append(input());
}

function getToDoFromDom($selector){
  var content = $selector.val();
  var idx = getToDo().length;
  return {
    content: content,
    complete: false,
    idx: idx
  }
}

function updateCount(flag) {
  var numItems = 0;
  if (flag === "Active") {
    numItems = todos.filter(function(el){
      return el.complete === false
    }).length;
    if (numItems === 1) {
      $('.todoCount').text(numItems + " item left");
    } else {
      $('.todoCount').text(numItems + " items left");
    }
  } else if (flag === "Completed") {
    numItems = todos.filter(function(el){
      return el.complete === true
    }).length;
    if (numItems === 1) {
      $('.todoCount').text(numItems + " item complete");
    } else {
      $('.todoCount').text(numItems + " items complete");
    }
  } else {
    numItems = todos.length;
    if (numItems === 1) {
      $('.todoCount').text(numItems + " item");
    } else {
      $('.todoCount').text(numItems + " items");
    }
  }
}

function getCompleted() {
  var completed = todos.filter(function(el, idx, arr){
    return el.complete === true;
  });
  return completed;
}

function getFilter(arr) {
  var result = [];
  if ($('.todoMenuActive').text() === "Active") {
    result = arr.filter(function(el, idx, arr){
      return el.complete === false
    });
  } else if ($('.todoMenuActive').text() === "Completed") {
    result = arr.filter(function(el, idx, arr){
      return el.complete === true
    })
  } else {
    result = arr;
  }
  return result;
}

function updateIdx() {
  todos.forEach(function(el, idx){
    return el.idx = idx;
  });
}
