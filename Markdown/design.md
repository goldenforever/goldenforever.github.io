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
    
    content = open object { delim {" "} argument {" "} } ;
    object  = char { char } ;
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
        if ($(tmp[i]).html() === element.value) $(tmp[i]).parent().css('display', 'table-row');
        else $(tmp[i]).parent().css('display', 'none');
    }
}
</script>