# some-js

Making web development quicker and easier: -

> A runtime JavaScript compiler of a language much more fit for purpose than the current mix of HTML, CSS and JS.

[This link](http://some-website.com/some-js) is an example of a website created with it, and gives much more info.

## Get started

This should be your `index.html` file.

```html
<!DOCTYPE html>
<!-- This is where you specify the name of your file -->
<html md="hello_world.md">
    <noscript>
        <!-- This is a redirect in case the user doesn't use JavaScript -->
        <meta http-equiv="refresh" content="0;URL=hello_world.md">
    </noscript>
    <!-- This is the script that does the magic -->
    <script type="text/javascript" src="//cdn.rawgit.com/goldenforever/some-js/master/some.min.js"></script>
</html>
```

This is your hello world example code (`hello_world.md`)
```markdown
# Hello world

This is my first some-js website.
```

*That's it.* You can see the website you have created by right clicking
it in a file explorer and opening `index.html` in a browser of your choosing.

- - -

## tl;dr _(too loaded-with-mad-web-skills; didn't read)_

![](http://dcs.warwick.ac.uk/~csunbg/some-js/images/diagram.png)
