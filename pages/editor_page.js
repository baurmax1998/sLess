
function initEditor() {
  $("#main").hide();

  // example of alternative callback
  var tribute = new Tribute({
    // menuContainer: document.getElementById('content'),
    values: [
      {key: 'Jordan Humphreys', value: 'Jordan Humphreys', email: 'getstarted@zurb.com'},
      {key: 'Sir Walter Riley', value: 'Sir Walter Riley', email: 'getstarted+riley@zurb.com'}
    ],
    selectTemplate: function (item) {
      if (typeof item === 'undefined') return null;
      if (this.range.isContentEditable(this.current.element)) {
        return '<span contenteditable="false"><a href="http://zurb.com" target="_blank" title="' + item.original.email + '">' + item.original.value + '</a></span>';
      }

      return '@' + item.original.value;
    }
  });
  $("#idContentEditable > div").each((i, item) =>{
    tribute.attach(item);
  })

  $("#idContentEditable > div").keydown(function editorKeydown(e) {
    let target = $(e.target);
    if (e.which == 13 && !$(".tribute-container").is(":visible")) {
      var newRow = $("<div contenteditable='true'>");
      tribute.attach(newRow);
      newRow
        .keydown(editorKeydown)
        .insertAfter(target)
      target.next().focus();
      return false;
    }

    if (e.keyCode == 8 && e.target.textContent == "" && $("#idContentEditable").children().length > 1) {
      var prev = target.prev()
      target.remove();
      prev.focus().delay(20).caretToEnd();

    }
    return true;
  })
}