function initCalc(elem, vars) {
  $("#calculator").show()
  var modal = document.getElementById('calculator');
  window.onclick = function (event) {
    if (event.target == modal) {
      $("#calculator").hide()    
    }
  }

 for (let i = 0; i < vars.length; i++) {
    const name = vars[i];
    $("#vars").append($("<div>").text(name))
  }

  var input = $("#input");
  var resultDisplayed = false;

  $("#clear").on("click", function () {
    $("#input").html("");
  })
  $("#result").on("click", function () {
    var result = $("#input").html();
    console.log(result)
    elem.html(result)
  })


  $(".operators div").on("click", function () {
    var currentString = input.html();
    var lastChar = currentString[currentString.length - 1];
    var target = $(this).text()

    if (lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
      var newString = currentString.substring(0, currentString.length - 1) + target;
      input.html(newString);
    } else if (currentString.length == 0) {
      console.log("enter a number first");
    } else {
      input.html(currentString + target);
    }
  })


  $(".numbers div").on("click", function () {
    var currentString = input.html();
    var lastChar = currentString[currentString.length - 1];
    var target = $(this).text()
    if ($(this).attr("id") == "clear") return;

    if (resultDisplayed === false) {
      input.html(currentString + target);
    } else if (resultDisplayed === true && lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {

      resultDisplayed = false;
      input.html(currentString + target);
    } else {
      resultDisplayed = false;
      input.html("" + target);
    }
  })
}
