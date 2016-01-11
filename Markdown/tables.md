By default there are no tables in Markdown.

GFM includes a table, but I've found some alternative designs on
the web, especially from 'Pandoc' - //"the universal document 
converter"//. Pandoc is a program for the desktop and has a focus
on compiling Markdown (and other languages) to LaTeX, in which
tables are a very important feature.

Pandoc has a few options regarding tables. They, and the GFM design
are below:

{menu()GFM,Simple,Multiline,Grid,Conclusion}

##### GFM

```none
| Right | Left | Default | Center |
|------:|:-----|---------|:------:|
|   12  |  12  |    12   |    12  |
|  123  |  123 |   123   |   123  |
```

##### Simple

```none
  Right     Left     Center     Default
-------     ------ ----------   -------
     12     12        12            12
    123     123       123          123
      1     1          1             1
```

##### Multiline

```none
-------------------------------------------------------------
 Centered   Default           Right Left
  Header    Aligned         Aligned Aligned
----------- ------- --------------- -------------------------
   First    row                12.0 Example of a row that
                                    spans multiple lines.

  Second    row                 5.0 Here's another one. Note
                                    the blank line between
                                    rows.
-------------------------------------------------------------
```

##### Grid

```none
+---------------+---------------+--------------------+
| Fruit         | Price         | Advantages         |
+===============+===============+====================+
| Bananas       | $1.34         | - built-in wrapper |
|               |               | - bright color     |
+---------------+---------------+--------------------+
| Oranges       | $2.10         | - cures scurvy     |
|               |               | - tasty            |
+---------------+---------------+--------------------+
```

##### Conclusion

The Multiline and Grid designs both support multiple contents.

However the Grid requires more user input and uses much more than
the one character `-` that Multiline uses.

There is no JavaScript implementation of this parser, so I will
have to create it from scratch.