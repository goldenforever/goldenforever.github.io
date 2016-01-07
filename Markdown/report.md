## Progress Report

### Some Details and Links

The working copy of the project is kept at http://dcs.warwick.ac.uk/~csunbg/some-js/ including:
- Requirements Specification 
- Component Analysis 
- Design
- Progress Report (i.e. //this!//)

In spirit of the project, the entirety of the website has been written in itself.

You can see what it came from at http://dcs.warwick.ac.uk/~csunbg/some-js/README.md and 

The project is also kept on Github at http://goldenforever.github.io/ with regular commits at key checkpoints.

#### Brief introduction to the project

I am developing a quicker, easier and more accessible alternative to conventional web development.

It has become increasingly apparent that the way I am going to do this is through an extension of **Markdown**.

> //Markdown// is a small markup language that has had great success within the developer community, becoming the means of
> asking a question or writing documentation on StackOverflow and Github respectively.
> 
> //Markdown// is a language that parses(and was designed to do so) to HTML. However, as //Markdown// was designed with
> content production language, it is only compiled to a small subset of HTML's tags.
> 
> Due to Markdown's simplicity and efficiency(both to write and to compile), it could potentially make web
> development more accessible to those who have not done it before.

My project is to expand Markdown to encompass much more of web development, whilst ensuring that it
maintains Markdown's aim to be as publishable in its plain-text format (for the benefit of those not using JavaScript).

#### How will I expand Markdown

Most simple elements(paragraphs, links, images) are rendered from **Markdown**.

Some have been added from **GFM** - //Github Flavoured Markdown// - which is essentially Markdown with
a few helpful changes and extensions used for project documentation on Github. These include tables.

The rest have been specially added to accommodate web development. Most of these are in the
//general web object// form.

##### Example: General Web Object

If I wanted to create a menu that opens 
'//Home//', '//Services//', '//About Us//' and '//Contact//', I could write:

```none
@MENU:Home, "Services", About Us, Contact
```

which would become something like:

@MENU:Home, "Services", About Us, Contact

And if I wanted to underline some text, I could write:

```none
... @UNDERLINE:this is now underlined@ ...
```
which would become: 

> ... _this is now underlined_ ...

The form follows the pattern `@ OBJNAME : No spaces either side, " <- This space is included", "escaped comma -> , " @`

#### Limitations of what can be added

HTML, CSS and JS have mixed support.
- HTML should not be used within objects (except paragraphs or blockquotes)
- Markdown will not be changed to HTML inside a HTML tag other than the body tag

{hspace(30px)} <span style="color:green">{icon(thumbs-up)} </span> `<span>Hello!</span>`

{hspace(30px)} <span style="color:green">{icon(thumbs-up)} </span> `> <span>Hello!</span>`

{hspace(30px)} <span style="color:green">{icon(thumbs-up)} </span> `I'd like to say "<span>Hello!</span>"`

{hspace(30px)} <span style="color:red">{icon(thumbs-down)} </span> `## <span>Hello!</span>`

- CSS and JS are fully supported externally, internally and (where HTML is supported) inline.
- JavaScript scripts in the head of the document should be placed below the FreeDOM script.

The HTML document can be as simple as this:
```html
<!DOCTYPE html><html md="README.md"><script src="root.js"></script></html>
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
- StrapdownJS makes //no effort to extend Markdown//
- StrapdownJS keeps the Markdown enclosed in &lt;xmp&gt; tags
    - This is supported for now, but it is marked as obsolete in HTML5
- StrapdownJS uses Google Code Prettify
    - In my component analysis, I concluded that the best syntax highlighter to use would be highlight.js
- StrapdownJS includes Twitter Bootstrap
    - Bootstrap in its entirety seems larger than necessary

#### Where are you now?

I have completed the Requirement Specification. I //had// also nearly completed the Design, but in the last two weeks my
ideas for development have changed drastically. Particularly, I felt as if building the extra functionality into the
compiler would be a much better way of rendering the page than changing it after compilation. This decision was
partly due to the extra experience picked up in the module //'Compiler Design'// and due to noticing some performance 
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

![](http://dcs.warwick.ac.uk/~csunbg/some-js/images/projectplan.png)

#### Ethics

I will require ethical consent during the evaluation stage of my project. I have not applied for consent yet, but I will
soon, as I plan to have a quick testing session with a few users around Week 17 (Term 2, Wk 3).

#### Project management

I have made the same amount of progress I said I would - I am ahead in the development stage but behind in the design 
stage, which means I should make sure I get up to date with that in the next couple of weeks.