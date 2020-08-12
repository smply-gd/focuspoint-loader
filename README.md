# focuspoint-loader
Lazyloading for Focuspoint images. This autoload script uses the [jQuery focuspoint plugin](https://github.com/jonom/jquery-focuspoint) by [Jono Menz](https://github.com/jonom) and provides additional helper methods to properly init your focuspoint images with a comprehensive API.

## Markup
Use the [basic focuspoint markup](https://github.com/jonom/jquery-focuspoint#3-mark-up-your-image-container) for basic functionality:

```html
<div class="focuspoint" data-focus-x="0" data-focus-y="0" data-image-w="400" data-image-h="300">
    <img src="/path/to/image.jpg" />
</div>
```

**Example with lazy loading:**

This is not part of the original plugin functionality, this script provides this functionality. Provide an 
additional `data-image` attribute with the path to your focuspoint image. We recommend to place the 
`<img />` tag with a 1x1 transparent gif, so you don't have to extra load any placeholder images.
THe script will then exchange the image paths, wait for the image to load and then initialize
the focuspoint plugin.
```html
 <div class="focuspoint" data-focus-x="0" data-focus-y="0" data-image="/path/to/image.jpg" data-image-w="400" data-image-h="300">
    <img src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" />
 </div>
```

## Usage
Include file in your script file and run `SGFocuspointLoader.init();`. You may use the options below to 
override the base settings. The `init()` method will automatically init all focuspoint images with 
the `.focuspoint` class.

Further you can initialize additional elements or reinitialize if dimensions have changed using the
`SGFocuspointLoader.initElements( elements );` method. We use this method to reinitialize
focuspoint elements inside sliders so the focuspoint gets calculated correctly after the
slider has been initialized or after you appended some AJAX html which contains focuspoint elements.

You may pass a NodeList or a jQuery collection.

You can also you `initElement( element )` to just initialize one source. You can pass any argument that
either is an jQuery instance or may be wrapped into a jQuery instance. 

The difference between both is that `initElements` initializes each node individually 
calling the `initElement` method on each item.


### Options
You may provide additional options and overrides via an object passed to the `init({})` 
method. Here is a list of all available options and their default values:

```javascript
SGFocuspointLoader.init({
    // Provide a selector that should trigger the autoloading of
    // focuspoint images
    triggerSelector: ".focuspoint",
});
```