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
      $item.toggleClass("fa-circle-o fa-check-circle-o");
      editToDo(idx, true);
      $item.siblings('.todoText').addClass('completedItem');
    } else {
      $item.toggleClass("fa-circle-o fa-check-circle-o");
      editToDo(idx, false);
      $item.siblings('.todoText').removeClass('completedItem');
    }
    updateCount($('.todoMenuActive').html());
  });

  $('.todoMenu').on("click", "li", function(event){
    $(this).siblings().removeClass('todoMenuActive');
    $(this).addClass('todoMenuActive');
    if ($(this).html() === "All") {
      addToDoListToDom(getToDo());
      updateCount();
    } else if ($(this).html() === "Active") {
      var active = todos.filter(function(el){
        return el.complete === false;
      });
      addToDoListToDom(active);
      updateCount("Active");
    } else if ($(this).html() === "Completed") {
      var completed = todos.filter(function(el){
        return el.complete === true;
      });
      addToDoListToDom(completed);
      updateCount("Completed");
    }
  });

  $Selector.on("click", '.deleteToDo', function(event){
    console.log($(this).parent().data("listitemidx"))
    deleteToDo($(this).parent().data("listitemidx"));
    addToDoListToDom(getToDo());
    updateCount($('.todoMenuActive').html());
  });

  $('.clear').on("click", function(event){
    var completed = getCompleted();
    console.log(completed)
    completed.forEach(function(el, idx){
      deleteToDo(idx);
    })
    addToDoListToDom(getToDo());
    updateCount($('.todoMenuActive').html());
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
    el.idx = idx;
    addItemToDom(el, templates.todo, $container);
  });
  $container.append(input());
}

function getToDoFromDom($selector){
  var content = $selector.val();
  return {
    content: content,
    complete: false
  }
}

function updateCount(flag) {
  var numItems = 0;
  if (flag === "Active") {
    numItems = todos.filter(function(el){
      return el.complete === false
    }).length;
    if (numItems === 1) {
      $('.todoCount').html(numItems + " item left");
    } else {
      $('.todoCount').html(numItems + " items left");
    }
  } else if (flag === "Completed") {
    numItems = todos.filter(function(el){
      return el.complete === true
    }).length;
    if (numItems === 1) {
      $('.todoCount').html(numItems + " item complete");
    } else {
      $('.todoCount').html(numItems + " items complete");
    }
  } else {
    numItems = todos.length;
    if (numItems === 1) {
      $('.todoCount').html(numItems + " item");
    } else {
      $('.todoCount').html(numItems + " items");
    }
  }
}

function getCompleted() {
  var completed = todos.filter(function(el){
    return el.complete === true;
  });
  return completed;
}
