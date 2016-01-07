##### EBNF syntax:

    block   = content [close];
    inline  = content close;
    
    content = open object { delim {" "} argument {" "} } ;
    object  = char { char } ;
    char    = upper | lower ;
    upper   = "A" | "B" | "C" | ... | "Y" | "Z" ;
    lower   = "a" | "b" | "c" | ... | "y" | "z" ;

##### Initial choices of characters:

    open  = "@" ;
    close = "@" ;
    delim = ":" | "," | "|" ;

###### Logic

`@` is not used in Markdown to describe syntax. It is also an unintimidating choice,
as it is a common character to anyone who uses the web.

`:`, `,` and `|` were chosen as they would prevent `@` from being read as
Markdown in the case that someone wanted to write an email address.
 
A choice of three delimiters allow flexibility in the way the website
can be written, though I would recommend making the object uppercase and 
giving the first delimiter a different character to the others as good 
practice, as then someone reading it could easily differentiate the object
and its arguments.