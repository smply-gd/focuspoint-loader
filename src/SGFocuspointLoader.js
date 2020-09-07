/*!
 * SGFocuspointLoader v1.1.0
 * Lazyloading for Focuspoint images.
 * MIT License
 */
window.SGFocuspointLoader = (function () {
  var _init = false;
  var app = {};
  var settings = {
    // Provide a selector that should trigger the autoloading of
    // focuspoint images
    triggerSelector: ".focuspoint",
  };

  app.init = function (options) {
    if (_init) {
      return;
    }
    _init = true;

    settings = $.extend(settings, options);

    app.initElements($(settings.triggerSelector));
  };

  app.initElement = function (element) {
    var $this = element;
    if (!($this instanceof jQuery)) {
      $this = $(element);
    }
    // focuspoint-con has data-image attribute?
    if ($this.data("image") && $this.data("image") !== "") {
      // get img element inside and reset src to data-image value
      var $image = $this.find("img");
      if ($image.length > 0) {
        $image.attr("src", $this.data("image"));
        // when the image finished loading, trigger focusPoint()
        $image.one("load", function () {
          $(this).parents(settings.triggerSelector).focusPoint();
        });
      }
    } else {
      // no data attribute? just trigger focusPoint()
      $this.focusPoint();
    }
  };

  app.initElements = function (elements) {
    $elements = elements;
    if (!(elements instanceof jQuery)) {
      $elements = $(elements);
    }
    $elements.each(function () {
      app.initElement(this);
    });
  };

  return app;
})();
