$(document).ready(function() {
  // Set up already-existing todos in localstorage
  function update_todos() {
    var todos = JSON.parse(localStorage.getItem('todos'));
    $('.todos').empty();
    $.each(todos, function(todo) {
      if (todos[todo] !== null) {
        $('.todos').append('<li id_attr="' + todos[todo].id + '">' + todos[todo].title + '</li>');
      }
    });
    $('ul > li').unbind('click').click(function() {
      delete_todo(parseInt($(this).attr('id_attr')));
      $(this).remove();
    });
  }

  function new_todo(title) {
    if (localStorage.getItem('todos') !== null) {
      var todos_list = JSON.parse(localStorage.getItem('todos'));
      var id = todos_list.length + 1;
    } else {
      var todos_list = [];
      var id = 1;
    }
    todos_list.push({
      'id': id,
      'title': title
    });
    localStorage.setItem('todos', JSON.stringify(todos_list));
    update_todos();
  }

  function delete_todo(id) {
    if (localStorage.getItem('todos') !== null) {
      var todos_list = JSON.parse(localStorage.getItem('todos'));
      console.log(todos_list);
      if (id > 0 && id <= todos_list.length) {
        delete todos_list[id - 1];
        console.log(todos_list[id - 1]);
        localStorage.setItem('todos', JSON.stringify(todos_list));
      } else {
        return false;
      }
      update_todos();
      return true;
    } else {
      return false;
    }
  }

  update_todos();

  $('input[type="submit"]').click(function() {
    new_todo($('.new.todo').val());
    $('.new.todo').val('');
  });
  $('.new.todo').keypress(function(e) {
    if (e.which == 13) {
      new_todo($('.new.todo').val());
      $('.new.todo').val('');
    }
  });
});
