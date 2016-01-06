## Documentation

{menu{}Markdown,GFM,Web Objects,Complete Cheatsheet}

### Markdown

From [Wikipedia](https://en.wikipedia.org/wiki/Markdown#Example):

{vspace{-10px}}

![](http://dcs.warwick.ac.uk/~csunbg/some-js/images/markdown.png)

{hspace{20px}} **Markdown** on the left - **generated HTML** in the middle - **how it might look** on the right.

//This guide has been adapted from https://help.github.com/articles/markdown-basics/.//

#### Paragraphs

Paragraphs in Markdown are just one or more lines of consecutive text followed by one or more blank lines.

```markdown
On July 2, an alien mothership entered Earth's orbit and deployed several dozen saucer-shaped "destroyer"
spacecraft, each 15 miles (24 km) wide.

On July 3, the Black Knights, a squadron of Marine Corps F/A-18 Hornets, participated in an assault on a destroyer
near the city of Los Angeles.
```

> On July 2, an alien mothership entered Earth's orbit and deployed several dozen saucer-shaped "destroyer"
> spacecraft, each 15 miles (24 km) wide.
> 
> On July 3, the Black Knights, a squadron of Marine Corps F/A-18 Hornets, participated in an assault on a destroyer
> near the city of Los Angeles.

#### Headings

You can create a heading by adding one or more `#` symbols before your heading text. The number of `#` 
you use will determine the size of the heading.

```markdown
# The largest heading
## The second largest heading
...
###### The 6th largest heading (smallest allowed)
```

> <h1>The largest heading</h1>
> <h2>The second largest heading</h2>
> ...
> <h6>The 6th largest heading (smallest allowed)</h6>

#### Blockquotes

You can indicate [blockquote](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/blockquote) with a `>`.

```markdown
In the words of Abraham Lincoln:

> Pardon my french
```

> In the words of Abraham Lincoln:
> 
> > Pardon my french

#### Styling text

You can make text **[bold](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/strong)** or //[italic](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/em)//.

```markdown
//This text will be italic// and
*this text will be bold* and
_this text will be underlined_.
```

> //This text will be italic// and
> *this text will be bold* and
> _this text will be underlined_.

```markdown
//Everyone _must_ attend the meeting at *5 o'clock today*.//
```

> //Everyone _must_ attend the meeting at *5 o'clock today*.//

#### Unordered lists

You can make an [unordered list](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ul) by preceding list items with either a `*` or a `-`.

```markdown
* Item
* Item
* Item

- Item
- Item
- Item
```

#### Ordered lists

You can make an [ordered list](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ol) by preceding list items with a number.

```markdown
1. Item 1
2. Item 2
3. Item 3
```

#### Nested lists

You can create nested lists by indenting list items by four spaces.

```markdown
1. Item 1
    1. A corollary to the above item.
    2. Yet another point to consider.
2. Item 2
    * A corollary that does not need to be ordered.
        * This is indented eight spaces, because 
          it's four spaces further than the item above.
    * You might want to consider making a new list.
3. Item 3
```

> 1. Item 1
>     1. A corollary to the above item.
>     2. Yet another point to consider.
> 2. Item 2
>     * A corollary that does not need to be ordered.
>         * This is indented eight spaces, because 
>           it's four spaces further than the item above.
>     * You might want to consider making a new list.
> 3. Item 3

#### Inline formats

Use single backticks (`) to format text in a special monospace format. Everything within the backticks appear as-is, with no other special formatting.

```markdown
Here's an idea: why don't we take `SuperiorProject`
and turn it into `**Reasonable**Project`.
```

> Here's an idea: why don't we take `SuperiorProject` and turn it into `**Reasonable**Project`.
To Dos

Fix top header v spacing
Fix &lt; in code bug
#### Multiple lines

You can use triple backticks (\`\`\`) to format text as its own distinct block.

Check out this neat program I wrote:
<pre><code class="hljs markdown"
>```
x = 0
x = 2 + 2
what is x
```
</code></pre>

> ```
> x = 0
> x = 2 + 2
> what is x
> ```

#### Links

You can create an inline link by wrapping link text in brackets ( `[ ]` ) and wrapping the link in parentheses ( `( )` ).

```[Visit my GitHub!](https://www.github.com/goldenforever)```.

> [Visit my GitHub!](https://www.github.com/goldenforever)

#### Images

You may also create an image from a link to an image by putting an exclamation mark in front of the link:

```![Alt text for cat picture](http://dcs.warwick.ac.uk/~csunbg/some-js/images/cat.jpg)```

> ![Alt text for cat picture](http://dcs.warwick.ac.uk/~csunbg/some-js/images/cat.jpg)

### GFM

Difference                              | Example code              | Example result
----------------------------------------|:-------------------------:|:-----------------------:
Underscores joining words have no effect| `_Wow_ this_variable_name`| _Wow_ this_variable_name
URLs automatically become links         | `http://www.google.com`   | http://www.google.com
Strikethroughs can be added:            | `~~Went wrong~~`          | ~~Went wrong~~

#### Tables

GFM also includes tables. The above table was generated by this:

```
Difference                              | Example code              | Example result
----------------------------------------|:-------------------------:|:-----------------------:
Underscores joining words have no effect| `_Wow_ this_variable_name`| _Wow_ this_variable_name
URLs automatically become links         | `http://www.google.com`   | http://www.google.com
Strikethroughs can be added:            | `~~Went wrong~~`          | ~~Went wrong~~
```

You can use colons to align the columns:

Left  |  Center   |  Right
:-----|:---------:|-------:
align | //align// | *align*

can be generated by:

```markdown
Left  |  Center   |  Right
:-----|:---------:|-------:
align | //align// | *align*
```

Without colons, it will assume left alignment.

#### Code blocks

GFM adds a new way to create a code block. 

Three back-ticks (the key typically found above `TAB`) open and close a code block.

For example, the above code block was created by this code:

	```markdown
    Left  |  Center   |  Right
    :-----|:---------:|-------:
    align | //align// | *align*
	```

You will also notice that `markdown` was added after the first three backticks.

This is to give the appropriate *syntax highlighting*. 
This isn't always necessary - it will guess the language to highlight. 
If you would like to disable any highlighting on a block, follow the backticks with `none`.

### Cheatsheet

I'll do this at some point.

### Tutorial

And this at some point too.