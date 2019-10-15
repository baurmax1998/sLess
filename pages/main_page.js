var grid = null;
var docElem = document.documentElement;
var gridElement = document.querySelector('.grid');
var filterField = document.querySelector('.filter-field');
var searchField = document.querySelector('.search-field');
var uuid = 0;
var searchFieldValue;


function initScriptView() {
  $("#main").show();
  initGrid();
  // Reset field values.
  searchField.value = '';
  filterField.value = filterField.querySelectorAll('option')[0].value;
  // Set inital search query, active filter, active sort value and active layout.
  searchFieldValue = searchField.value.toLowerCase();
  // Search field binding.
  searchField.addEventListener('keyup', function () {
    var newSearch = searchField.value.toLowerCase();
    if (searchFieldValue !== newSearch) {
      searchFieldValue = newSearch;
      filter();
    }
  });
  // Filter bindings.
  filterField.addEventListener('change', filter);
  // Add/remove items bindings.
  gridElement.addEventListener('click', function (e) {
    if (elementMatches(e.target, '.card-remove, .card-remove i')) {
      removeItem(e);
    }
  });

}

async function initGrid() {
  var dragCounter = 0;
  let scripts = getAllFuns();
  var ret = [];
  for (let i = 0; i < scripts.length; i++) {
    ret.push(generateElement(
      ++uuid,
      scripts[i]
    ));
  }
  
  grid = new Muuri(gridElement, {
    items: ret,
    layoutDuration: 400,
    layoutEasing: 'ease',
    dragEnabled: false, //todo buttons funktionieren nicht
    layout: {
      horizontal: false,
      alignRight: false,
      alignBottom: false,
      fillGaps: true
    },
    dragSortHeuristics: {
      sortInterval: 50,
      minDragDistance: 10,
      minBounceBackAngle: 1
    },
    dragContainer: document.body,
    dragStartPredicate: function (item, event) {
      var isRemoveAction = elementMatches(event.target, '.card-remove, .card-remove i');
      return !isRemoveAction ? Muuri.ItemDrag.defaultStartPredicate(item, event) : false;
    },
    dragPlaceholder: {
      enabled: true,
      duration: 400,
      createElement: function (item) {
        return item.getElement().cloneNode(true);
      }
    },
    dragReleaseDuration: 400,
    dragReleseEasing: 'ease'
  })
    .on('dragStart', function () {
      ++dragCounter;
      docElem.classList.add('dragging');
    })
    .on('dragEnd', function () {
      if (--dragCounter < 1) {
        docElem.classList.remove('dragging');
      }
    })
    .on('move', updateIndices);
}

function filter() {
  let filterFieldValue = filterField.value;
  grid.filter(function (item) {
    var element = item.getElement();
    var isSearchMatch = !searchFieldValue ? true : (element.getAttribute('data-title') || '').toLowerCase().indexOf(searchFieldValue) > -1;
    var isFilterMatch = !filterFieldValue ? true : (element.getAttribute('data-color') || '') === filterFieldValue;
    return isSearchMatch && isFilterMatch;
  });
}

function removeItem(e) {
  var elem = elementClosest(e.target, '.item');
  grid.hide(elem, {
    onFinish: function (items) {
      var item = items[0];
      grid.remove(item, { removeElements: true });
    }
  });
  updateIndices();
}


function generateElement(id, meta) {
  let path = meta.path;
  var color = getScriptColor(meta);
  var params = getScriptParams(findFieldsForTyp(meta.param));
  var returns = getScriptReturn(findSynonymForTyp(meta.returns)[0])
  var name = meta.name;
  var classNames = 'item h2 w2 ' + color;
  var card = $("<div>")
    .addClass(classNames)
    .attr("data-id", id)
    .attr("data-color", color)
    .attr("data-title", name)
    .append($("<div class='item-content card'>")
      .append($("<div class='card-id'>").text(id))
      .append($("<div class='card-title'>")
        .append($("<p class='functionName'>").append(
          $("<a href='#'>")
            .addClass(color)
            .text(name)
            .on("click", function () {
              console.log(name)
              $("#main").hide();
              initEditor(name)
            })
        ))
        .append(params)
        .append(returns)
        .append($("<p class='options'>")
          .append(
            $("<a class='w3-round w3-button w3-light-grey w3-tiny' href='#'>").append(
              $('<i class="fa fa-info">')))
          .append(
            $("<a class='w3-round w3-button w3-light-grey w3-tiny' href='#'>").append(
              $('<i class="fa fa-play">')))
          .append(
            $("<a class='w3-round w3-button w3-light-grey w3-tiny' href='#'>").append(
              $('<i class="fa fa-bread-slice">')))
          .append(
            $("<a class='w3-round w3-button w3-light-grey w3-tiny' href='#'>").append(
              $('<i class="fa fa-paint-brush">')))
          .append(
            $("<a class='w3-round w3-button w3-light-grey w3-tiny' href='#'>").append(
              $('<i class="fa fa-external-link-alt">')))
          // .append($("<a href='#'>").text(title))
        )
      ).append($('<div class="card-remove">')
        .append($("<i class='material-icons'>").html("&#xE5CD;"))))
  return card[0];
}

function updateIndices() {
  grid.getItems().forEach(function (item, i) {
    var newId = i + 1;
    item.getElement().setAttribute('data-id', newId);
    item.getElement().querySelector('.card-id').innerHTML = newId;
    if (item._dragPlaceholder.isActive()) {
      item._dragPlaceholder._element.querySelector('.card-id').innerHTML = newId;
    }
  });
}

function elementMatches(element, selector) {
  var p = Element.prototype;
  return (p.matches || p.matchesSelector || p.webkitMatchesSelector || p.mozMatchesSelector || p.msMatchesSelector || p.oMatchesSelector).call(element, selector);
}

function elementClosest(element, selector) {
  if (window.Element && !Element.prototype.closest) {
    var isMatch = elementMatches(element, selector);
    while (!isMatch && element && element !== document) {
      element = element.parentNode;
      isMatch = element && element !== document && elementMatches(element, selector);
    }
    return element && element !== document ? element : null;
  }
  else {
    return element.closest(selector);
  }
}

function addFunction(id, color, icon) {
  $("#functions").append(
    $("<li>").append(
      $('<a class="btn-floating w3-tiny">')
        .attr("id", id)
        .css("background-color", color)
        .append($('<i class="fa w3-small">').addClass(icon))
    )
  );
}


function getScriptColor(meta) {
  var filterOptions = ['red', 'blue', 'green', 'orange'];
  const scriptTypes = {
    Function: "green",
    Consumer: "blue",
    Supplier: "orange",
    Runnable: "red"
  }
  if (meta.returns == []) {
    if (meta.params == []) {
      return scriptTypes.Runnable;
    } else {
      return scriptTypes.Consumer;
    }
  } else {
    if (meta.params == []) {
      return scriptTypes.Supplier;
    } else {
      return scriptTypes.Function;
    }
  }
}

function getScriptParams(params) {
  var paramsElement = $("<p>");
  for (let i = 0; i < params.length; i++) {
    const param = params[i];
    let paramName = findSynonymById(param.synonym)[0];
    let paramTyp = findSynonymForTyp( param.typ)[0]
    paramsElement.append(
      $("<span class='param'>").attr("title", param.beschreibung)
        .append($("<span>").text(paramName.name))
        .append($("<a href='#' class='w3-tag w3-round w3-green'>").text(paramTyp.name))
    )
  }
  return paramsElement;
}

function getScriptReturn(returns) {
  return $("<p>")
    .append(
      $("<a href='#' class='w3-tag w3-round'>")
        .text(returns.name))
}