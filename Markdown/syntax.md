### Syntax

| **Key:**                                                |
|:-------------------------------------------------------:|
| <code>{color{red}this input has been removed}</code>    |
| <code>{color{orange}this input has been changed}</code> |
| *{color{green}this input has been added}*               |

{vspace{-1rem}}

Input         | HTML Output                 | Visual      | Before
--------------|-----------------------------|-------------|:-----------:
`*bold text*` | `<strong>bold text</strong>`| *bold text* | {color{orange}<code>em</code>}
`//italics//` | `<em>italics</em>`          | //italics// | {color{green}<strong>n/a</strong>}
`_underline_` | `<u>underline</u>`          | _underline_ | {color{orange}<code>em</code>}
`**was bold**`|                             |             | {color{red}<code>strong</code>}
`__was bold__`|                             |             | {color{red}<code>strong</code>}