| **Key:**                                     |
|:--------------------------------------------:|
| {color(red)`this input has been removed`}    |
| {color(orange)`this input has been changed`} |
| {color(green)*this input has been added*}    |

{vspace(-2rem)}

Input         | HTML Output                 | Visual      | Before
--------------|-----------------------------|-------------|:-----------:
`*bold text*` | `<strong>bold text</strong>`| *bold text* | {color(orange)`em`}
`//italics//` | `<em>italics</em>`          | //italics// | {color(green)*n/a*}
`_underline_` | `<u>underline</u>`          | _underline_ | {color(orange)`em`}
`**was bold**`|                             |             | {color(red)`strong`}
`__was bold__`|                             |             | {color(red)`strong`}