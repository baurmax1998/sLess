document.addEventListener('DOMContentLoaded', function () {
  var grid = null;
  var docElem = document.documentElement;
  var gridElement = document.querySelector('.grid');
  var filterField = document.querySelector('.filter-field');
  var searchField = document.querySelector('.search-field');
  var addItemsElement = document.querySelector('.add-more-items');
  var uuid = 0;
  var filterFieldValue;
  var searchFieldValue;

  function initDemo() {
    initGrid();
    // Reset field values.
    searchField.value = '';
    filterField.value = filterField.querySelectorAll('option')[0].value;
    // Set inital search query, active filter, active sort value and active layout.
    searchFieldValue = searchField.value.toLowerCase();
    filterFieldValue = filterField.value;
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
    addItemsElement.addEventListener('click', addItems);
    gridElement.addEventListener('click', function (e) {
      if (elementMatches(e.target, '.card-remove, .card-remove i')) {
        removeItem(e);
      }
    });

  }

  function initGrid() {
    var dragCounter = 0;
    grid = new Muuri(gridElement, {
      items: generateElements(20),
      layoutDuration: 400,
      layoutEasing: 'ease',
      dragEnabled: true,
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
        return  !isRemoveAction ? Muuri.ItemDrag.defaultStartPredicate(item, event) : false;
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
    filterFieldValue = filterField.value;
    grid.filter(function (item) {
      var element = item.getElement();
      var isSearchMatch = !searchFieldValue ? true : (element.getAttribute('data-title') || '').toLowerCase().indexOf(searchFieldValue) > -1;
      var isFilterMatch = !filterFieldValue ? true : (element.getAttribute('data-color') || '') === filterFieldValue;
      return isSearchMatch && isFilterMatch;
    });
  }

  function addItems() {
    var newElems = generateElements(5);
    newElems.forEach(function (item) {
      item.style.display = 'none';
    });
    grid.add(newElems);
    updateIndices();
    filter();
  }

  function removeItem(e) {
    var elem = elementClosest(e.target, '.item');
    grid.hide(elem, {onFinish: function (items) {
      var item = items[0];
      grid.remove(item, {removeElements: true});
    }});
    updateIndices();
  }

  function generateElements(amount) {
    var ret = [];
    var filterOptions = ['red', 'blue', 'green'];
    for (var i = 0; i < amount; i++) {
      ret.push(generateElement(
        ++uuid,
        "hallo",
        filterOptions[2],
        2,
        2
      ));
    }
    return ret;
  }

  function generateElement(id, title, color, width, height) {
    var itemElem = document.createElement('div');
    var classNames = 'item h' + height + ' w' + width + ' ' + color;
    var itemTemplate = '' +
        '<div class="' + classNames + '" data-id="' + id + '" data-color="' + color + '" data-title="' + title + '">' +
          '<div class="item-content">' +
            '<div class="card">' +
              '<div class="card-id">' + id + '</div>' +
              '<div class="card-title">' + title + '</div>' +
              '<div class="card-remove"><i class="material-icons">&#xE5CD;</i></div>' +
            '</div>' +
          '</div>' +
        '</div>';

    itemElem.innerHTML = itemTemplate;
    return itemElem.firstChild;
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
  initDemo();
});