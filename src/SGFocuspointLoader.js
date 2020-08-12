/**
 * Lazyloading for Focuspoint images.
 *
 * Use data-image on .focuspoint container to trigger lazy loading
 *
 * Inside provide an <img> tag w/
 * 	class .focuspoint-lazyload-target and
 *  src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
 *
 * just want to trigger focuspoint images? Don't worry, Just use the normal
 * focuspoint syntax w/o data-image and the focuspoint plugin will be triggered automatically.
 */
window.SGFocuspointLoader = (function () {
  var _init = false;
  var app = {};
  var settings = {
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
