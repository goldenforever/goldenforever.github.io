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
> \*\*Appearance is subjective but is included as it will reduce the amount of changes I will need to make. Ranked 1(best) to 5.

Whilst Min offers good support, responsive design is a requirement is needed. Equally RocketCSS has
the same disadvantage. Therefore neither would be suitable.

Skeleton is equal or better in the remaining categories (with the exception of grid precision, which can
be fixed manually) and is much smaller and more attractive, it seems to be the best choice.

**I will therefore choose @UNDERLINE:Skeleton@ as my design framework.**