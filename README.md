@VSPACE: 1rem@

###### Simplifying Web Development

@VSPACE: -2.5rem@

# FreeDOM

@MENU: To Dos, Requirements Specification, Components, Design, Documentation, Progress Report, Editor@

## To Dos

- CodeMirror for syntax highlighting in the editor
- Design Tree Include
- Design Tables
- Design Layout
- Better transforms for elements that are too large
- Less.js is big. Check for scripts before getting the script.
- Investigate how http://strapdownjs.com/ works
- LESS (vs. SASS) at runtime:
    - https://css-tricks.com/using-less-as-a-live-css-engine/
    
## Requirements Specification

From the specification:

> The method should be:
> - fast to write (important)
> - require little knowledge of web languages (important)
> - further accommodate those with knowledge of web development
> - documented

> The resulting website should have:
> - a level of consistency
> - content-aware display
> - basic modern styling
> - responsive design
> - fast to load
> - small (file size) without compromising functionality

### Targets

The project aims to have a balance between 'one-size fits all'
and aggressively context-predictive content display.

I will set this balance to be that which satisfies 95% of
the population for quantifiable metrics.

![](http://dcs.warwick.ac.uk/~csunbg/Project/images/normal-distribution.png)

![](http://dcs.warwick.ac.uk/~csunbg/Project/images/normal-distribution-both.png)

 Objective          | Target
--------------------|:-------------:
Fast to write       | ***to be minimised***
Little knowledge    | ***to be minimised***
Further accommodate | Each web language could still be easily included
Documented          | All encompassing documentation
Consistency         | The website should have continuity of style
Content-aware       | At minimum, looks for different 'types' of page content to match
Modern style        | Use modern principles and generally not look dated
Responsive design   | ***see below***
Fast to load        | ***see below***
Small file size     | ***see below***

#### Responsive design
* This is indented four spaces, because it's two spaces further than the item above.
[This table](http://www.rapidtables.com/web/dev/screen-resolution-statistics.htm)
shows popular screen resolutions.

Screen resolution | Display ratio | Usage     | Screen size / type
------------------|---------------|-----------|-----------------
1366x768          | 16:9          | 19.1%     | 14" Notebook / 15.6" Laptop / 18.5" monitor
1920x1080         | 16:9          | 9.4%      | 21.5" monitor / 23" monitor / 1080p TV
1280x800          | 8:5           | 8.5%      | 14" Notebook
320x568           | 9:16          | 6.4%      | 4" iPhone 5
1440x900          | 8:5           | 5.7%      | 19" monitor
1280x1024         | 5:4           | 5.5%      | 19" monitor
320x480           | 2:3           | 5.2%      | 3.5" iPhone
1600x900          | 16:9          | 4.6%      | 20" monitor
768x1024          | 3:4           | 4.5%      | 9.7" iPad
1024x768          | 4:3           | 3.9%      | 15" monitor
1680x1050         | 8:5           | 2.8%      | 22" monitor
360x640           | 9:16          | 2.3%      |
1920x1200         | 8:5           | 1.7%      | 24" monitor
720x1280          | 9:16          | 1.6%      | 4.8" Galaxy S
480x800           | 3:5           | 1.1%      |
1360x768          | 16:9          | 0.9%      |
1280x720          | 16:9          | 0.9%      | 720p TV
                  |               | **84.1%** |

The 320x480 of the first three generations of the iPhone seem to provide
a lower bound as they are responsible for over 5% of web-page loads.

The 1920x1080 resolution will serve as an upper bound as larger screens are
responsible for less than 5% of web-page loads.

For the same reason, the screen will need to support resolutions between
16:9 in landscape to 16:9 in portrait.

*i.e. all of these*
(provided the short side is at least 320px, and the long side is no more than 1920px):

![](http://dcs.warwick.ac.uk/~csunbg/Project/images/aspect-ratio-diagram.png)

#### Fast to load / Small file size
As part of Ofcom's duties as a regulator, they used 
[this data](http://media.ofcom.org.uk/content/posts/news/2015/one-in-three-uk-broadband-superfast)
from SamKnows (11/2014).

The minimum average download speed for a currently offered service (and over 99.5% in use are) in the UK is
7.5Mbit/s. Google says a website should aim to have loaded within a second and
so = 7.5(1-x)Mbits where x is the time taken to create the website.

Therefore I will sit an upper bound on 7.5Mbits as the size of the website *including* the assets.

The average size of the images on a web-page is 1.4Mbits {http://httparchive.org/trends.php},
so I will subtract the size of these assets from the upper bound to make a new
***upper bound of 6.1Mbits***.

Video would not affect the initial loading time on most modern browsers as it is part of the HTML5 standard.

Adding hosted libraries (js/css/fonts) through runtime adding of links seems to
be a very logical way to mitigate this upper bound whilst still retaining a
wide range of output formats. For example, in the case I have no icons, then I
need not include icons

## Components

**Markdown** will be used as the base of the idea.

This is an obvious choice, there is no similar language, it is very well designed and
has plenty of JavaScript compilers 

**GFM** (**G**ithub **F**lavoured **M**arkdown) is the variant of Markdown which is used by Github.

GFM will be a necessary add-on. It will provide complete compatability for people who 
have written material on Github in the past.

@MENU: Compiler, Framework@

### Compiler

There are many open licence JavaScript Markdown compilers and these are the most popular.

Compiler     |  markdown-js |    marked    | &#181;markdown |   showdown
------------:|:------------:|:------------:|:--------------:|:-------------:
Size (bytes) |    16,750    |    16,528    |    10,097      |    26,423
Speed (x1000)|    17191ms   |    3727ms    |     n/a        |    17191ms
Supports GFM | @ICON:times@ | @ICON:check@ |  @ICON:times@  | @ICON:check@

The most difficult part of GFM to recreate are tables. These would take a large amount of time
to add, and as a result I will exclude *markdown-js* and *&#181;markdown* from the choices.

The difference then comes down to size and speed; ***marked*** is superior to *Showdown* at both.

**I will therefore choose @UNDERLINE:marked@ as my Markdown parser.**

### Framework

There are also a number of HTML/CSS/JS frameworks that are meant to ease web development.

Here the aim is not to make this available to the end user but rather to use it as a 
base for developing from.

Consequently, I will choose one that has a small file size.

I found [this link](//www.hongkiat.com/blog/bootstrap-alternatives/) useful, and decided to compare each one listed.

Framework       |   Pure.css   |   Skeleton   |    Furtive   |     Min      |   RocketCSS    
---------------:|:------------:|:------------:|:------------:|:------------:|:------------:
Size (KB)       |     17.2     |      5.9     |     10.2     |     2.3      |     6.4      
Grid            | @ICON:check@ | @ICON:check@ | @ICON:check@ | @ICON:check@ | @ICON:times@ 
Grid precision\*|       7      |       5      |       4      |       5      |     n/a      
Font-size in rem| @ICON:times@ | @ICON:check@ | @ICON:check@ | @ICON:times@ | @ICON:times@ 
Responsive      | @ICON:check@ | @ICON:check@ | @ICON:check@ | @ICON:times@ | @ICON:times@ 
Appearance\*\*  |       2      |      1       |      3       |      5       |      4

> \*Grid precision is here defined as the minimum number such that you cannot use the framework
to generate a grid of columns with equal size.
> 
> \*\*Appearance is subjective but is included as it will reduce the amount of work later. Ranked 1(best) to 5.

Whilst Min offers good support, responsive design is a requirement is needed. Equally RocketCSS has
the same disadvantage. Therefore neither would be suitable.

Skeleton is equal or better in the remaining categories (with the exception of grid precision, which can
be fixed manually) and is much smaller and more attractive, it seems to be the best choice.

**I will therefore choose @UNDERLINE:Skeleton@ as my design framework.**

## Design

> ![](http://dcs.warwick.ac.uk/~csunbg/Project/images/diagram.png)
>
> **The code in the four files** (on the left) **should generate the website** bottom-right
> using freeDOM.js (top-right).
>
> The top file on the left is the same for all pages - the content is from the other three
> (markdown) files, which are linked together.

#### EBNF syntax:

    block   = content [close];
    inline  = content close;
    
    content = open object {delim {" "} argument {" "}} ;
    object  = char {char} ;
    char    = upper | lower ;
    upper   = "A" | "B" | "C" | ... | "Y" | "Z" ;
    lower   = "a" | "b" | "c" | ... | "y" | "z" ;

#### Initial choices of characters:

    open  = "@" ;
    close = "@" ;
    delim = ":" | "," | "|" ;


##### Logic

`@` is not used in Markdown to describe syntax. It is also an unintimidating choice,
as it is a common character to anyone who uses the web.

`:`, `,` and `|` were chosen as they would prevent `@` from being read as
Markdown in the case that someone wanted to write an email address.
 
A choice of three delimiters allow flexibility in the way the website
can be written, though I would recommend making the object uppercase and 
giving the first delimiter a different character to the others as good 
practice, as then someone reading it could easily differentiate the object
and its arguments.

### HTML Tags

There are many HTML tags that Markdown doesn't generate. I've been through each and every tag
to see which ones would make a good addition to Markdown.

> Filter 'Will Add?' column:
@HSPACE: 10px@Yes <input type="radio" name="filter" value="Yes" onclick="tagFilter(this)">
@HSPACE: 10px@Maybe <input type="radio" name="filter" value="Maybe" onclick="tagFilter(this)"> 
@HSPACE: 10px@No <input type="radio" name="filter" value="No" onclick="tagFilter(this)">
 
@VSPACE: -40px@

Tag             | Description                                                                                         | Will Add? | Syntax            | Assumption                                     
----------------|-----------------------------------------------------------------------------------------------------|:---------:|:-----------------:|:----------------------------------------------:
&lt;!--...-->   | Defines a comment                                                                                   | Yes       | `{-- Comment --}` |                                                
&lt;!DOCTYPE>   | Defines the document type                                                                           | No        |                   | Needed on page load                                               
&lt;abbr>       | Defines an abbreviation or an acronym                                                               | Yes       | `auto           ` |                                                
&lt;address>    | Defines contact information for the author/owner of a document                                      | No        |                   | Not necessary                                  
&lt;area>       | Defines an area inside an image-map                                                                 | No        |                   | Not necessary                                  
&lt;article>    | Defines an article                                                                                  | No        |                   | Too specific                                   
&lt;aside>      | Defines content aside from the page content                                                         | Maybe     |                   |                                                
&lt;audio>      | Defines sound content                                                                               | No        |                   | Bad web practice                               
&lt;base>       | Specifies the base URL/target for all relative URLs in a document                                   | No        |                   | Not necessary                                  
&lt;bdi>        | Isolates a part of text that might be formatted in a different direction from other text outside it | No        |                   | Complex and not immediately necessary          
&lt;bdo>        | Overrides the current text direction                                                                | No        |                   | Not necessary                                  
&lt;br>         | Defines a single line break                                                                         | Yes       |                   |                                                
&lt;button>     | Defines a clickable button                                                                          | No        |                   | Bad web practice                               
&lt;canvas>     | Used to draw graphics, on the fly, via scripting (usually JavaScript)                               | No        |                   | For pros                                       
&lt;caption>    | Defines a table caption                                                                             | Yes       |                   |                                                
&lt;cite>       | Defines the title of a work                                                                         | No        |                   | Too specific                                   
&lt;col>        | Specifies column properties for each column within a &lt;colgroup> element                          | Maybe     |                   |                                                
&lt;colgroup>   | Specifies a group of one or more columns in a table for formatting                                  | Maybe     |                   |                                                
&lt;datalist>   | Specifies a list of pre-defined options for input controls                                          | Maybe     |                   |                                                
&lt;dd>         | Defines a description/value of a term in a description list                                         | Maybe     |                   |                                                
&lt;del>        | Defines text that has been deleted from a document                                                  | No        |                   | Too specific                                   
&lt;details>    | Defines additional details that the user can view or hide                                           | No        |                   |                                                
&lt;dfn>        | Represents the defining instance of a term                                                          | Yes       | `auto           ` |                                                
&lt;dialog>     | Defines a dialog box or window                                                                      | No        |                   | Compatibility                                  
&lt;dl>         | Defines a description list                                                                          | Maybe     |                   |                                                
&lt;dt>         | Defines a term/name in a description list                                                           | Maybe     |                   |                                                
&lt;fieldset>   | Groups related elements in a form                                                                   | Yes       |                   |                                                
&lt;figcaption> | Defines a caption for a &lt;figure> element                                                         | Yes       |                   |                                                
&lt;figure>     | Specifies self-contained content                                                                    | Yes       |                   |                                                
&lt;footer>     | Defines a footer for a document or section                                                          | No        |                   |                                                
&lt;form>       | Defines an HTML form for user input                                                                 | Yes       |                   |                                                
&lt;header>     | Defines a header for a document or section                                                          | Yes       |                   |                                                
&lt;iframe>     | Defines an inline frame                                                                             | No        |                   | For pros                                       
&lt;input>      | Defines an input control                                                                            | Yes       |                   |                                                
&lt;ins>        | Defines a text that has been inserted into a document                                               | No        |                   | Too specific                                   
&lt;kbd>        | Defines keyboard input                                                                              | No        |                   | Too specific                                   
&lt;keygen>     | Defines a key-pair generator field (for forms)                                                      | No        |                   | Too specific                                   
&lt;label>      | Defines a label for an &lt;input> element                                                           | Yes       |                   |                                                
&lt;legend>     | Defines a caption for a &lt;fieldset> element                                                       | No        |                   |                                                
&lt;main>       | Specifies the main content of a document                                                            | Yes       |                   |                                                
&lt;map>        | Defines a client-side image-map                                                                     | No        |                   | Bad web practice                               
&lt;mark>       | Defines marked/highlighted text                                                                     | Yes       |                   |                                                
&lt;menu>       | Defines a list/menu of commands                                                                     | No        |                   | Compatibility                                  
&lt;menuitem>   | Defines a command/menu item that the user can invoke from a popup menu                              | No        |                   | Compatibility                                  
&lt;meta>       | Defines metadata about an HTML document                                                             | Maybe     |                   |                                                
&lt;meter>      | Defines a scalar measurement within a known range (a gauge)                                         | Maybe     |                   |                                                
&lt;nav>        | Defines navigation links                                                                            | Yes       |                   |                                                
&lt;noscript>   | Defines an alternate content for users that do not support client-side scripts                      | No        |                   | Requires JavaScript in the first place         
&lt;object>     | Defines an embedded object                                                                          | Yes       |                   |                                                
&lt;optgroup>   | Defines a group of related options in a drop-down list                                              | Yes       |                   |                                                
&lt;option>     | Defines an option in a drop-down list                                                               | Yes       |                   |                                                
&lt;output>     | Defines the result of a calculation                                                                 | No        |                   | Compatibility                                  
&lt;param>      | Defines a parameter for an object                                                                   | Yes       |                   |                                                
&lt;progress>   | Represents the progress of a task                                                                   | Yes       |                   |                                                
&lt;q>          | Defines a short quotation                                                                           | Yes       | &#124;"To be or not"&#124; |                                                
&lt;rp>         | Defines what to show in browsers that do not support ruby annotations                               | No        |                   | For pros                                       
&lt;rt>         | Defines an explanation/pronunciation of characters (for East Asian typography)                      | No        |                   | For pros                                       
&lt;ruby>       | Defines a ruby annotation (for East Asian typography)                                               | No        |                   | For pros                                       
&lt;s>          | Defines text that is no longer correct                                                              | Yes       | `~~bye~~        ` |                                                
&lt;samp>       | Defines sample output from a computer program                                                       | No        |                   |                                                
&lt;script>     | Defines a client-side script                                                                        | Yes       |                   |                                                
&lt;section>    | Defines a section in a document                                                                     | Yes       |                   |                                                
&lt;select>     | Defines a drop-down list                                                                            | Yes       |                   |                                                
&lt;small>      | Defines smaller text                                                                                | No        |                   | Not necessary                             
&lt;source>     | Defines multiple media resources for media elements (&lt;video> and &lt;audio>)                     | Yes       |                   |                                                
&lt;span>       | Defines a section in a document                                                                     | No        |                   |                                                
&lt;style>      | Defines style information for a document                                                            | Yes       |                   |                                                
&lt;sub>        | Defines subscripted text                                                                            | Yes       |                   |                                                
&lt;summary>    | Defines a visible heading for a &lt;details> element                                                | No        |                   |                                                
&lt;sup>        | Defines superscripted text                                                                          | Yes       |                   |                                                
&lt;textarea>   | Defines a multiline input control (text area)                                                       | No        |                   |                                                
&lt;tfoot>      | Groups the footer content in a table                                                                | No        |                   |                                                
&lt;time>       | Defines a date/time                                                                                 | Yes       | `auto           ` |                                                
&lt;title>      | Defines a title for the document                                                                    | No        |                   | Web crawlers need this and don't run JavaScript
&lt;track>      | Defines text tracks for media elements (&lt;video> and &lt;audio>)                                  | No        |                   | Too specific                                   
&lt;u>          | Defines text that should be stylistically different from normal text                                | Yes       | `_underlined_   ` |                                                
&lt;var>        | Defines a variable                                                                                  | No        |                   |                                                
&lt;video>      | Defines a video or movie                                                                            | Yes       | [[&#124;>          |                                                
&lt;wbr>        | Defines a possible line-break                                                                       | Yes       | `auto           ` |                                                

<script>
function tagFilter(element) {
    var tmp = $('#html-tags tr :nth-child(3)');
    for (var i=1; i<tmp.length; i++) {
        if ($(tmp[i]).html() === element.value) {
            console.log($(tmp[i]).siblings().first().html());
            $(tmp[i]).parent().css('display', 'table-row');
        } else {
            $(tmp[i]).parent().css('display', 'none');
        }
    }
}
</script>

## Documentation

@MENU: Markdown, GFM, Web Objects, Complete Cheatsheet

### Markdown

From [Wikipedia](https://en.wikipedia.org/wiki/Markdown#Example):

@VSPACE: -10px@

![](http://dcs.warwick.ac.uk/~csunbg/Project/images/markdown.png)

@HSPACE: 20px@**Markdown** on the left - **generated HTML** in the middle - **how it might look** on the right.

*This guide has been adapted from https://help.github.com/articles/markdown-basics/.*

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

You can make text **[bold](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/strong)** or *[italic](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/em)*.

```markdown
*This text will be italic* and
**this text will be bold**
```

> *This text will be italic* and
> **this text will be bold**

Both **bold** and *italic* can use either a `*` or an `_` around the text for styling

This allows you to combine both bold and italic if needed.

```markdown
*Everyone __must__ attend the meeting at 5 o'clock today.*
```

> *Everyone __must__ attend the meeting at 5 o'clock today.*

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

You can create an inline link by wrapping link text in brackets and wrapping the link in parentheses ( `( )` ).

```[Visit my GitHub!](https://www.github.com/goldenforever)```.

> [Visit my GitHub!](https://www.github.com/goldenforever)

#### Images

You may also create an image from a link to an image by putting an exclamation mark in front of the link:

```![Alt text for cat picture](http://dcs.warwick.ac.uk/~csunbg/Project/images/cat.jpg)```

> ![Alt text for cat picture](http://dcs.warwick.ac.uk/~csunbg/Project/images/cat.jpg)

### GFM

Difference                              | Example code                        | Example result
----------------------------------------|:-----------------------------------:|:---------------:
Underscores joining words have no effect| `Change this_variable_name _now!_`  | Change this_variable_name _now!_
URLs automatically become links         | `http://www.google.com`             | http://www.google.com
Strikethroughs can be added:            | `~~Went wrong~~`                    | ~~Went wrong~~

#### Tables

GFM also includes tables. The above table was generated by this:

```
Difference                              | Example code                        | Example result
----------------------------------------|:-----------------------------------:|:---------------------------------:
Underscores joining words have no effect| `Change this_variable_name _now!_`  | Change this_variable_name _now!_
URLs automatically become links         | `http://www.google.com`             | http://www.google.com
Strikethroughs can be added:            | `~~Went wrong~~`                    | ~~Went wrong~~
```

You can use colons to align the columns:

Left  |  Center |     Right
:-----|:-------:|----------:
align | *align* | **align**

can be generated by:

```markdown
Left  |  Center |     Right
:-----|:-------:|----------:
align | *align* | **align**
```

Without colons, it will assume left alignment.

#### Code blocks

GFM adds a new way to create a code block. 

Three back-ticks (the key typically found above `TAB`) open and close a code block.

For example, the above code block was created by this code:

	```markdown
    Left  |  Center |     Right
    :-----|:-------:|----------:
    align | *align* | **align**
    
    Without colons, it will assume left alignment.
	```

You will also notice that `markdown` was added after the first three backticks.

This is to give the appropriate **syntax highlighting**. This isn't always necessary - it will guess the language to highlight. If you would like to disable any highlighting on a block, follow the backticks with `none`.

### Cheatsheet

I'll do this at some point.

### Tutorial

And this at some point too.

## Progress Report

### Some Details and Links

The working copy of the project is kept at http://dcs.warwick.ac.uk/~csunbg/Project/ including:
- Requirements Specification 
- Component Analysis 
- Design
- Progress Report (i.e. *this!*)

In spirit of the project, the entirety of the website has been written in itself.

You can see what it came from at http://dcs.warwick.ac.uk/~csunbg/Project/README.md and 

The project is also kept on Github at http://goldenforever.github.io/ with regular commits at key checkpoints.

#### Brief introduction to the project

I am developing a quicker, easier and more accessible alternative to conventional web development.

It has become increasingly apparent that the way I am going to do this is through an extension of **Markdown**.

> *Markdown* is a small markup language that has had great success within the developer community, becoming the means of
> asking a question or writing documentation on StackOverflow and Github respectively.
> 
> *Markdown* is a language that parses(and was designed to do so) to HTML. However, as *Markdown* was designed with
> content production language, it is only compiled to a small subset of HTML's tags.
> 
> Due to Markdown's simplicity and efficiency(both to write and to compile), it could potentially make web
> development more accessible to those who have not done it before.

My project is to expand Markdown to encompass much more of web development, whilst ensuring that it
maintains Markdown's aim to be as publishable in its plain-text format (for the benefit of those not using JavaScript).

#### How will I expand Markdown

Most simple elements(paragraphs, links, images) are rendered from **Markdown**.

Some have been added from **GFM** - *Github Flavoured Markdown* - which is essentially Markdown with
a few helpful changes and extensions used for project documentation on Github. These include tables.

The rest have been specially added to accommodate web development. Most of these are in the
*general web object* form.

##### Example: General Web Object

If I wanted to create a menu that opens 
'*Home*', '*Services*', '*About Us*' and '*Contact*', I could write:

```none
@MENU:Home, "Services", About Us, Contact
```

which would become something like:

@MENU:Home, "Services", About Us, Contact

And if I wanted to underline some text, I could write:

```none
...@UNDERLINE:this is now underlined@...
```
which would become: 

> ...@UNDERLINE:this is now underlined@...

The form follows the pattern `@ OBJNAME : No spaces either side, " <- This space is included", "escaped comma -> , " @`

#### Limitations of what can be added

HTML, CSS and JS have mixed support.
- HTML should not be used within objects (except paragraphs or blockquotes)
- Markdown will not be changed to HTML inside a HTML tag other than the body tag

@ HSPACE: 30px @ <span style="color:green">@ICON:thumbs-up@</span> `<span>Hello!</span>`

@ HSPACE: 30px @ <span style="color:green">@ICON:thumbs-up@</span> `> <span>Hello!</span>`

@ HSPACE: 30px @ <span style="color:green">@ICON:thumbs-up@</span> `I'd like to say "<span>Hello!</span>"`

@ HSPACE: 30px @ <span style="color:red">@ICON:thumbs-down@</span> `## <span>Hello!</span>`

- CSS and JS are fully supported externally, internally and (where HTML is supported) inline.
- JavaScript scripts in the head of the document should be placed below the FreeDOM script.

The HTML document can be as simple as this:
```html
<!DOCTYPE html><html md="README.md"><script src="freeDOM.js"></script></html>
```

#### Background research

When I was researching different Markdown compilers I discovered http://strapdownjs.com/ which had attempted a similar
project. There are many ways that it is similar and many ways it is different to my project.

They both:
- Generate web documents from Markdown at runtime
- Require one single .html file
- Use marked.js as the Markdown compiler
- They both have syntax highlighting in code blocks

However after this they differ in that:
- My project keeps the Markdown file externally
    - HTML elements rendered when the file was included within the HTML file, causing any code blocks 
      including any HTML tags to cause huge side-effects. This is the primary reason for keeping it externally
- StrapdownJS makes *no effort to extend Markdown*
- StrapdownJS keeps the Markdown enclosed in &lt;xmp&gt; tags
    - This is supported for now, but it is marked as obsolete in HTML5
- StrapdownJS uses Google Code Prettify
    - In my component analysis, I concluded that the best syntax highlighter to use would be highlight.js
- StrapdownJS includes Twitter Bootstrap
    - Bootstrap in its entirety seems larger than necessary

#### Where are you now?

I have completed the Requirement Specification. I *had* also nearly completed the Design, but in the last two weeks my
ideas for development have changed drastically. Particularly, I felt as if building the extra functionality into the
compiler would be a much better way of rendering the page than changing it after compilation. This decision was
partly due to the extra experience picked up in the module *'Compiler Design'* and due to noticing some performance 
issues.

An abbreviated version of the design is available on the website and is in the process of being added to.

From this I have decided to amend the schedule to accommodate this happening in future; I will update the 
design(and the component analysis) in intervals alongside the development phase of the project.

The development stage is ahead of schedule, and the general conclusion seems to be that while the requirement
modification stage is typically important in a reuse-oriented model, it is unnecessary for this one, as the scope of 
components is so large that there is normally a few options for each component, with one having the desired feature.
If the feature is unavailable, then I expect I should be able to add it myself; so this will now come under the design
stage.

These amendments have caused the schedule to be updated, below (the green boxes have been added to the schedule).

#### What are you doing next?

You may have changed your plans for Term 2. At the very least, you are likely to have a much clearer idea of how things will proceed and the timings needed to complete each stage. Outline the plans for next term and any alterations to your original ideas. 
Provide an updated timetable with as much detail as possible.

![](http://dcs.warwick.ac.uk/~csunbg/Project/images/projectplan.png)

#### Ethics

I will require ethical consent during the evaluation stage of my project. I have not applied for consent yet, but I will
soon, as I plan to have a quick testing session with a few users around Week 17 (Term 2, Wk 3).

#### Project management

I have made the same amount of progress I said I would - I am ahead in the development stage but behind in the design 
stage, which means I should make sure I get up to date with that in the next couple of weeks.

## Editor <input style="position:relative;left:10px;bottom:5px;font-size:16px" type="button" value="Load Example" onclick="magic();">

<iframe id="edit" style="border:2px solid #eee;position:relative;width:95%;height:100px" src="Editor"></iframe>
<script>
    function magic() {
        var edit =$('#edit'); 
        edit.contents().find('#markdown').val(window.markdownCode);
        console.log(window.markdownCode);
    }
    function resizeEditor() {
        $('html').css('height','100%');
        $('#edit').css('height',($('html').height()-$('#edit').position().top-60)+'px');
        console.log(($('html').height()-$('#edit').position().top-60));
    }
    $('body > .section > nav > a:last-child').click(function(){
        setTimeout(resizeEditor,10);
    });
    $(window).resize(resizeEditor);
</script>