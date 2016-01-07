## Design

> ![](http://dcs.warwick.ac.uk/~csunbg/some-js/images/diagram.png)
>
> //The code in the four files// (on the left) //should generate the website// bottom-right
> using root.js (top-right).
>
> The top file on the left is the same for all pages - the content is from the other three
> (markdown) files, which are linked together.

{menu()Structure,Concepts,Old Concepts}

### Structure

#### Pre-process file
- Make non-regexable content regexable

#### Interpret file
- Single pass through file using regex

#### Post-process file
- Remove side-effects

#### Process DOM
- Contextualise document
- Add listeners based on this context

### Concepts

{menu()HTML Tags,Tables,Concept Drawings}

#### HTML Tags

{{Markdown/htmltags.md}}

#### Tables

{{Markdown/tables.md}}

#### Concept Drawings

```none
{{Designs/tables.txt}}
```

### Old Concepts

#### General Web Objects

{{Markdown/gwo.md}}