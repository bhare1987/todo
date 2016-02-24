$(document).ready(function(){
  todoList.init();
});

var todoList = {
  init: function() {
    todoList.presentation();
    todoList.events();
  },
  presentation: function() {
    todoList.addToDoListToDom(todoList.getToDo(), $('.todos'));
    todoList.updateCount($('.todoMenuActive').text(), todoList.getToDo());
  },
  events: function() {
    var $Selector = $('.todos');

    $Selector.on("keypress", "input[name='todoInput']", function(event){
      if (event.keyCode === 13) {
        if ($(this).attr('id') ===  'editToDo' ) {
          todoList.editToDo($(this).data('listitemidx'), $(this).val());
          todoList.addToDoListToDom(todoList.getToDo(), $Selector);
        } else if ($(this).attr('id') === 'addToDo') {
          todoList.addToDo(todoList.getToDoFromDom(this));
          todoList.addToDoListToDom(todoList.getToDo(), $Selector);
        }
      }
      todoList.updateCount($('.todoMenuActive').text(), todoList.getToDo());
    });

    $Selector.on("dblclick", ".todoItem", function(event){
      if ($('#editToDo').length === 0) {
        var input = _.template(templates.todoEdit);
        var content = $(this).find("span.todoText").text();
        var idx = $(this).data('listitemidx');
        $(this).replaceWith(input({idx:idx}));
        $('#editToDo').val(content);
      }
    });

    $Selector.on("click", ".checkbox", function(event){
      var $item = $(this)
      var idx = $item.parent().data("listitemidx");
      if (todoList.getToDo(idx).complete === false) {
        todoList.editToDo(idx, true);
        todoList.addToDoListToDom(todoList.getFilter(todoList.getToDo()), $Selector);
      } else {
        todoList.editToDo(idx, false);
        todoList.addToDoListToDom(todoList.getFilter(todoList.getToDo()), $Selector);
      }
      todoList.updateCount($('.todoMenuActive').text(), todoList.getToDo());
    });

    $('.todoMenu').on("click", "li", function(event){
      $(this).siblings().removeClass('todoMenuActive');
      $(this).addClass('todoMenuActive');
      var text = $(this).text();
      if (text === "All") {
        todoList.addToDoListToDom(todoList.getToDo(), $Selector);
        todoList.updateCount("All", todoList.getToDo());
      } else if (text === "Active") {
        var active = todoList.getFilter(todoList.getToDo());
        todoList.addToDoListToDom(active, $Selector);
        todoList.updateCount("Active", todoList.getToDo());
      } else if (text === "Completed") {
        var completed = todoList.getFilter(todoList.getToDo());
        todoList.addToDoListToDom(completed, $Selector);
        todoList.updateCount("Completed", todoList.getToDo());
      }
    });

    $Selector.on("click", '.deleteToDo', function(event){
      todoList.deleteToDo(+$(this).parent().data("listitemidx"));
      todoList.updateIdx();
      todoList.addToDoListToDom(todoList.getToDo(), $Selector);
      todoList.updateCount($('.todoMenuActive').text(),todoList.getToDo());
    });

    $('.clear').on("click", function(event){
      var completed = todoList.getCompleted(todoList.getToDo());
      completed.forEach(function(el, idx){
        todoList.deleteToDo(el.idx);
      })
      todoList.updateIdx();
      todoList.addToDoListToDom(todoList.getFilter(todoList.getToDo()), $Selector);
      todoList.updateCount($('.todoMenuActive').text(),todoList.getFilter(todoList.getToDo()));
    });

  },
  addToDo: function(newToDo) {
    return todos.push(newToDo);
  },
  getToDo: function(todoIdx) {
    if (todoIdx === 0 || typeof todoIdx === "number") {
      return todos[todoIdx];
    } else {
    return todos;
    }
  },
  deleteToDo: function(todoIdx) {
    return todos.splice(todoIdx, 1);
  },
  editToDo: function(todoIdx, content, complete) {
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
  },
  getTmpl: function(templateName){
    return templates[templateName];
  },
  constructTmpl: function(templateName){
    var tmpl = todoList.getTmpl(templateName);
    var tmplFunc = _.template(tmpl);
    return tmplFunc;
  },
  addItemToDom: function(templateName, item){
    var tmpl = todoList.constructTmpl(templateName);
    if (item) {
      return tmpl(item);
    } else {
      return tmpl();
    }
  },
  addToDoListToDom: function(dataArray, target){
    $(target).html('');
    var result = "";
    result += todoList.addItemToDom('listTitle');
    dataArray.forEach(function(el, idx, arr){
      result += todoList.addItemToDom('todo', el);
    });
    result += todoList.addItemToDom('todoAdd');
    $(target).append(result);
  },
  getToDoFromDom: function(selector){
    var content = $(selector).val();
    var idx = todoList.getToDo().length;
    return {
      content: content,
      complete: false,
      idx: idx
    }
  },
  updateCount: function(flag, dataArray) {
    var numItems = 0;
    if (flag === "Active") {
      numItems = dataArray.filter(function(el){
        return el.complete === false
      }).length;
      if (numItems === 1) {
        $('.todoCount').text(numItems + " item left");
      } else {
        $('.todoCount').text(numItems + " items left");
      }
    } else if (flag === "Completed") {
      numItems = dataArray.filter(function(el){
        return el.complete === true
      }).length;
      if (numItems === 1) {
        $('.todoCount').text(numItems + " item complete");
      } else {
        $('.todoCount').text(numItems + " items complete");
      }
    } else {
      numItems = dataArray.length;
      if (numItems === 1) {
        $('.todoCount').text(numItems + " item");
      } else {
        $('.todoCount').text(numItems + " items");
      }
    }
  },
  getCompleted: function(dataArray) {
    var completed = dataArray.filter(function(el, idx, arr){
      return el.complete === true;
    });
    return completed;
  },
  getFilter: function(dataArray) {
    var result = [];
    var $selector = $('.todoMenuActive');
    if ($selector.text() === "Active") {
      result = dataArray.filter(function(el, idx, arr){
        return el.complete === false
      });
    } else if ($selector.text() === "Completed") {
      result = dataArray.filter(function(el, idx, arr){
        return el.complete === true
      })
    } else {
      result = dataArray;
    }
    return result;
  },
  updateIdx: function() {
    todos.forEach(function(el, idx){
      return el.idx = idx;
    });
  }
}
