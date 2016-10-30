$(document).ready(function() {
  keg.initialize('coderedDemo');
  // Set up already-existing todos in localstorage
  function update_todos() {
    var todos = keg.read(null, function(err, resp) {
      var todos = resp;
      $('.todos').empty();
      $.each(todos, function(todo) {
        function sortById(a, b) {
          var aName = a.id;
          var bName = b.id;
          return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
        }
        todos.sort(sortById);
        if (todos[todo] !== null) {
          $('.todos').append('<div class="item" id_attr="' + todos[todo].id + '"><div class="content"><div class="header">' + todos[todo].title + '</div></div></div>');
        }
      });
      $('.todos > .item').unbind('click').click(function() {
        delete_todo(parseInt($(this).attr('id_attr')));
        $(this).remove();
      });
    });
  }

  function new_todo(title) {
    keg.create({ title: title }, function(err, resp) {
      update_todos();
    });
  }

  function delete_todo(id) {
    keg.delete(id, function(err, res) {
      console.log(err, res);
      update_todos();
    });
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
