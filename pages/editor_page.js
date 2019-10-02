
function initEditor(funName) {
  console.log(funName)
  $("#code_editor").show();

  

  var tributeMultipleTriggers = new Tribute({
    collection: [{
      // The function that gets call on select that retuns the content to insert
      selectTemplate: function (item) {
        if (this.range.isContentEditable(this.current.element)) {
          return '<a href="http://zurb.com" title="' + item.original.email + '">@' + item.original.value + '</a>';
        }

        return '@' + item.original.value;
      },

      // the array of objects
      values: [
        { key: 'Jordan Humphreys', value: 'Jordan Humphreys', email: 'jordan@zurb.com' },
        { key: 'Sir Walter Riley', value: 'Sir Walter Riley', email: 'jordan+riley@zurb.com' }
      ]
    }, {
      // The symbol that starts the lookup
      trigger: '#',

      // The function that gets call on select that retuns the content to insert
      selectTemplate: function (item) {
        if (this.range.isContentEditable(this.current.element)) {
          return '<a href="mailto:' + item.original.email + '">#' + item.original.name.replace() + '</a>';
        }

        return '#' + item.original.name;
      },

      // function retrieving an array of objects
      values: [
        { name: 'Bob Bill', email: 'bobbill@example.com' },
        { name: 'Steve Stevenston', email: 'steve@example.com' }
      ],

      lookup: 'name',

      fillAttr: 'name'
    }]
  });


  // example of Tribute in autocomplete mode
  var tributeAutocompleteTest = new Tribute({
    autocompleteMode: true,
    menuContainer: document.getElementById('content'),
    values: [
      { key: "Alabama", value: "Alabama" },
      { key: "Alaska", value: "Alaska" },
      { key: "Arizona", value: "Arizona" },
      { key: "Arkansas", value: "Arkansas" },
      { key: "California", value: "California" },
      { key: "Colorado", value: "Colorado" },
      { key: "Connecticut", value: "Connecticut" },
      { key: "Delaware", value: "Delaware" },
      { key: "Florida", value: "Florida" },
      { key: "Georgia", value: "Georgia" },
      { key: "Hawaii", value: "Hawaii" },
      { key: "Idaho", value: "Idaho" },
      { key: "Illinois", value: "Illinois" },
      { key: "Indiana", value: "Indiana" },
      { key: "Iowa", value: "Iowa" },
      { key: "Kansas", value: "Kansas" },
      { key: "Kentucky", value: "Kentucky" },
      { key: "Louisiana", value: "Louisiana" },
      { key: "Maine", value: "Maine" },
      { key: "Maryland", value: "Maryland" },
      { key: "Massachusetts", value: "Massachusetts" },
      { key: "Michigan", value: "Michigan" },
      { key: "Minnesota", value: "Minnesota" },
      { key: "Mississippi", value: "Mississippi" },
      { key: "Missouri", value: "Missouri" },
      { key: "Montana", value: "Montana" },
      { key: "Nebraska", value: "Nebraska" },
      { key: "Nevada", value: "Nevada" },
      { key: "New Hampshire", value: "New Hampshire" },
      { key: "New Jersey", value: "New Jersey" },
      { key: "New Mexico", value: "New Mexico" },
      { key: "New York", value: "New York" },
      { key: "North Carolina", value: "North Carolina" },
      { key: "North Dakota", value: "North Dakota" },
      { key: "Ohio", value: "Ohio" },
      { key: "Oklahoma", value: "Oklahoma" },
      { key: "Oregon", value: "Oregon" },
      { key: "Pennsylvania", value: "Pennsylvania" },
      { key: "Rhode Island", value: "Rhode Island" },
      { key: "South Carolina", value: "South Carolina" },
      { key: "South Dakota", value: "South Dakota" },
      { key: "Tennessee", value: "Tennessee" },
      { key: "Texas", value: "Texas" },
      { key: "Utah", value: "Utah" },
      { key: "Vermont", value: "Vermont" },
      { key: "Virginia", value: "Virginia" },
      { key: "Washington", value: "Washington" },
      { key: "West Virginia", value: "West Virginia" },
      { key: "Wisconsin", value: "Wisconsin" },
      { key: "Wyoming", value: "Wyoming" }
    ],
    selectTemplate: function (item) {
      if (typeof item === 'undefined') return null;
      if (this.range.isContentEditable(this.current.element)) {
        return '<span contenteditable="false"><a>' + item.original.key + '</a></span>';
      }

      return item.original.value;
    },
    menuItemTemplate: function (item) {
      return item.string;
    }
  });

  var tributeNoMatch = new Tribute({
    // trigger: '@',
    autocompleteMode: true,
    values: function (text, cb) {
      console.log(text)
      cb([{
          name: "bob"
        },{
          name: "bob1"
        }
      ])
    },
    lookup: 'name',
    fillAttr: 'name'
  })


  $("#idContentEditable > div").each((i, item) => {
    // tributeAutocompleteTest.attach(item);
    // tributeMultipleTriggers.attach(item);
    tributeNoMatch.attach(item);

  })


}


function tempInit() {



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

function getTwo() {
  return "Two";
}

function square(a, b) {
  notNull(a);
  notNull(b);
  let result = a * b;
  let one = "One";
  return result === 0 ? "Zero" :
    result === 1 ? one :
      result === 2 ? getTwo() :
        result + "th";
}

function parseTest() {
  let parser = esprima.parse;
  let ast = parser(square.toString());
  for (let i = 0; i < ast.body.length; i++) {
    let element = ast.body[i];
    if (element.type === "FunctionDeclaration" && element.id.name === "square") {
      getLines(element.body.body)
    }
  }
}

function getLines(body) {
  let lines = [];
  for (let i = 0; i < body.length; i++) {
    var element = body[i];
    var statementLines = write(element);
    if (Array.isArray(statementLines)) {
      lines.concat(statementLines)
    } else {
      lines.push(statementLines)
    }
  }
  console.log(lines);
}

function allowedInner(element) {
  if (!["BinaryExpression"
    , "ConditionalExpression"
    , "Literal"
    , "Identifier"
    , "CallExpression"
  ].includes(element.type))
    console.error(element);
}

function write(element) {
  let type = element.type;
  if (type === "ExpressionStatement") {
    return {
      name: element.expression.callee.name + "()",
      arguments: element.expression.arguments
    }
  } else if (type === "VariableDeclaration") {
    let init = element.declarations[0].init;
    // allowedInner(init);
    return {
      name: element.declarations[0].id.name,
      value: write(init)
    }
  } else if (type === "BinaryExpression") {
    return {
      operator: element.operator
    }
  } else if (type === "ConditionalExpression") {
    let consequent = element.consequent;
    let alternate = element.alternate;
    allowedInner(consequent);
    allowedInner(alternate);
    return {
      conditon: write(element.test),
      consequent: write(consequent),
      alternate: write(alternate)
    }

  } else if (type === "ReturnStatement") {
    let expressions = write(element.argument);
    console.log("return");
    return expressions;
  } else if (type === "Literal") {
    return element.raw;
  } else if (type === "Identifier") {
    return element.name; //link
  } else if (type === "CallExpression") {
    return {
      name: element.callee.name + "()",
      arguments: element.arguments
    }
  } else if (type === "IfStatement") {
    throw new Error("if's are not allowed -> {}less")
  } else if (type === "FunctionExpression") {
    throw new Error("Functions are not allowed -> {}less")
  } else {
    console.log(element);
  }
}




