 /**
 * Generate function
 */

function generate(str, opt) {
    return opt ? postprocess(interpret(preprocess(str), opt)) : postprocess(interpret(preprocess(str)));
}

/**
 * Pre-process
 */

function preprocess(str) {
    str = str.replace(/\{--(.|\n)*?--}/g, "");

    var re = /\{[a-zA-Z_]+\(.*?\).*?}/g;
    var indices = [], match = re.exec(str), count, cont, i, c;

    while (match) {
        indices[indices.length] = match.index;
        match = re.exec(str);
    }

    for (var j=indices.length-1; j>=0; j--) {
        cont = false; i = 3; count = 1;
        while (count > 0) {
            if (indices[j]+i<str.length) {
                c = str.charAt(indices[j] + i);
                if (!cont && c === ')')
                    cont = true;
                else if (c === '{')
                    count++;
                else if (c === '}' && --count > 0)
                    str = str.substring(0, indices[j] + i + 1) + '<' + count + '>' + str.substring(indices[j] + i + 1);
                i++;
            } else break;
        }
    }

    return str;
}

/**
 * Interpret
 */
(function() {
    var counter = {"1":0,"2":0,"3":0,"4":0,"5":0,"6":0};

    /**
     * Object functions
     */

    var objects = {
        "menu": [
            '<nav>',
            '<span class="link-container"><a onclick="changePage(\'||p||\');">',
            '</a></span>',
            '<span class="separator"> </span>',
            '</nav>'
        ],
        "tagline":[
            '<div class="tagline t~?0?~">',
            '',
            '',
            '',
            '</div>'
        ],
        "modify":[
            '<scr'+'ipt type="text/javascript" class="_sjs_this">',
            '',
            '',
            '',
            '$("._sjs_this").first().parent().css("~?0?~","~?1?~");$("._sjs_this").first().remove();</scr'+'ipt>'
        ],
        "icon":['<i class="fa fa-~?0?~">', '', '', '', '</i>'],
        "font":['<span style="font-family:~?0?~">', '', '', '', '</span>'],
        "header":['<h~?0?~>', '', '', '', '</h~?0?~>'],
        "color":['<span style="color:~?0?~">', '', '', '', '</span>'],
        "vspace":['<div style="margin-bottom:~?0?~">', '', '', '', '</div>'],
        "hspace":['<span style="margin-left:~?0?~">', '', '', '', '</span>'],
        "escape":['', '', '', '', '']
    };

    var objList = Object.getOwnPropertyNames(objects);

    function valsToHTML(object, args, content) {
        if (object === "tagline") {
            if (args.length < 1) {
                args[1] = content[0].split(" ");
                args[0] = args[1].length<4 ? args[1].length+2 : 6;
            }
        }

        var obj = objects[object];

        var str = obj[0];
        var temp = obj[1];
        for (var i=0;i<content.length;i++) {
            obj[1] = obj[1].replace("||p||", content[i].replace(/"/g,'%22').replace(/ /g,'%20')).replace(/\|\|i\|\|/g, i);
            str += obj[1] + content[i] + obj[2];
            if (i<content.length-1) str += obj[3];
            obj[1] = temp;
        }
        str += obj[4];

        var res;
        var regex = /~\?([0-9]+)\?~/;
        do {
            res = regex.exec(str);
            if (res) {
                if (parseInt(res[1]) < args.length) {
                    str = str.substring(0, res.index) + args[parseInt(res[1])] + str.substring(res.index+res[0].length);
                } else {
                    return '<span style="color:red">Incorrect number of settings in this <strong>' + object + '</strong> object.</span>';
                }
            }
        } while (res);

        return str;
    }

    function stringToValues(str) {
        /* Split string into parts */
        var name, args, content, firstArgIndex, lastArgIndex, count = 1, char, lastPunc = true, punc;
        var match, matches = [], re = /<[0-9]+>/g;
        name = str.substring(1);
        firstArgIndex = name.indexOf('(');
        for (var i=1+firstArgIndex; i<name.length; i++) {
            char = name.charAt(i);
            if (char === '(') count++;
            else if (char === ')') {
                count--;
                if (count < 1) { lastArgIndex = i; break; }
            }
        }

        content = name.substring(lastArgIndex+1).replace(/<1>/g, "");
        if (content && content.charAt(content.length-1)==='}') content = content.substring(0,content.length-1);
        args = name.substring(firstArgIndex+1,lastArgIndex);
        name = name.substring(0,firstArgIndex);

        match = re.exec(content);
        while (match) {
            matches[matches.length] = match;
            match = re.exec(content);
        }
        for (var i=matches.length-1; i>=0; i--) {
            content = content.substring(0, matches[i].index) +
                '<' + (parseInt(matches[i][0].substring(1, matches[i][0].length - 1)) - 1) + '>' +
                content.substring(matches[i].index + matches[i][0].length);
        }

        return [name.toLowerCase(), toObject(args, false), toObject(content, true)];
    }
    function toObject(str, cln) {
        return unescapeObject(JSON.parse(jsonify(escapeObject(str, cln))));
    }

    function escapeObject(str, cln) {
        var r0 = [
            [/\\\\/g, '~!4!~'],
            [/\\\[/g, '~!5!~'],
            [/\\]/g,  '~!6!~'],
            [/\\,/g,  '~!7!~'],
            [/\\\(/g, '~!8!~'],
            [/\\\)/g, '~!9!~']
        ];
        var r1 = [
            [/\(/g, '['],
            [/\)/g, ']']
        ];
        for (var i=0; i<r0.length; i++) str = str.replace(r0[i][0],r0[i][1]);
        if (!cln) for (var i=0;i<r1.length;i++) str=str.replace(r1[i][0],r1[i][1]);
        return '[' + str + ']';
    }

    function unescapeObject(arr) {
        if (typeof arr === 'string') return arr
            .replace(/~!4!~/g, '\\')
            .replace(/~!5!~/g, "[")
            .replace(/~!6!~/g, "]")
            .replace(/~!7!~/g, ",")
            .replace(/~!8!~/g, '(')
            .replace(/~!9!~/g, ')');
        for (var i=arr.length-1; i>=0; i--) {
            arr[i] = unescapeObject(arr[i]);
        }
        return arr;
    }

    function jsonify(str) {
        var lastPunc = true, punc, char;
        for (var i=1; i<str.length; i++) {
            char = str.charAt(i);
            punc = char === '[' || char === ']' || char === ',';
            if (punc !== lastPunc) {
                str = str.substring(0,i) + '"' + str.substring(i++);
            }
            lastPunc = punc;
        }
        return str;
    }

    /**
     * Block-Level Grammar
     */

    var block = {
        newline: /^\n+/,
        code: /^( {4}[^\n]+\n*)+/,
        fences: noop,
        hr: /^( *[-*_]){3,} *(?:\n+|$)/,
        obj: /^\{[a-zA-Z\-]+\(.*?\).*?(?:}(\n+|$))}/,
        heading: /^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,
        nptable: noop,
        lheading: /^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,
        blockquote: /^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/,
        list: /^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
        html: /^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,
        def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,
        table: noop,
        paragraph: /^((?:[^\n]+\n?(?!hr|menu|heading|lheading|blockquote|tag|def))+)\n*/,
        text: /^[^\n]+/
    };

    block.bullet = /(?:[*+-]|\d+\.)/;
    block.item = /^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/;
    block.item = replace(block.item, 'gm')
    (/bull/g, block.bullet)
    ();

    block.list = replace(block.list)
    (/bull/g, block.bullet)
    ('hr', '\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))')
    ('def', '\\n+(?=' + block.def.source + ')')
    ();

    block.blockquote = replace(block.blockquote)
    ('def', block.def)
    ();

    block._tag = '(?!(?:'
        + 'a|em|strong|small|s|cite|q|dfn|abbr|data|time|code'
        + '|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo'
        + '|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b';

    block.html = replace(block.html)
    ('comment', /<!--[\s\S]*?-->/)
    ('closed', /<(tag)[\s\S]+?<\/\1>/)
    ('closing', /<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)
    (/tag/g, block._tag)
    ();

    block.paragraph = replace(block.paragraph)
    ('hr', block.hr)
    ('heading', block.heading)
    ('lheading', block.lheading)
    ('blockquote', block.blockquote)
    ('tag', '<' + block._tag)
    ('def', block.def)
    ();

    /**
     * Normal Block Grammar
     */

    block.normal = merge({}, block);

    /**
     * GFM Block Grammar
     */

    block.gfm = merge({}, block.normal, {
        fences: /^ *(`{3,}|~{3,})[ \.]*(\S+)? *\n([\s\S]*?)\s*\1 *(?:\n+|$)/,
        paragraph: /^/,
        heading: /^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/
    });

    block.gfm.paragraph = replace(block.paragraph)
    ('(?!', '(?!'
        + block.gfm.fences.source.replace('\\1', '\\2') + '|'
        + block.list.source.replace('\\1', '\\3') + '|')
    ();

    /**
     * GFM + Tables Block Grammar
     */

    block.tables = merge({}, block.gfm, {
        nptable: /^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,
        table: /^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/
    });

    /**
     * Block Lexer
     */

    function Lexer(options) {
        this.tokens = [];
        this.tokens.links = {};
        this.options = options || interpret.defaults;
        this.rules = block.normal;

        if (this.options.gfm) {
            if (this.options.tables) {
                this.rules = block.tables;
            } else {
                this.rules = block.gfm;
            }
        }
    }

    /**
     * Expose Block Rules
     */

    Lexer.rules = block;

    /**
     * Static Lex Method
     */

    Lexer.lex = function(src, options) {
        var lexer = new Lexer(options);
        return lexer.lex(src);
    };

    /**
     * Preprocessing
     */

    Lexer.prototype.lex = function(src) {
        src = src.replace(/\r\n|\r/g, '\n').replace(/\t/g, '    ').replace(/\u00a0/g, ' ').replace(/\u2424/g, '\n');

        return this.token(src, true);
    };

    /**
     * Lexing
     */

    Lexer.prototype.token = function(src, top, bq) {
        var src = src.replace(/^ +$/gm, ''),
            next, loose, cap, bull, b, item, space, i, l;

        while (src) {
            // newline
            if (cap = this.rules.newline.exec(src)) {
                src = src.substring(cap[0].length);
                if (cap[0].length > 1) {
                    this.tokens.push({
                        type: 'space'
                    });
                }
            }

            // code
            if (cap = this.rules.code.exec(src)) {
                src = src.substring(cap[0].length);
                cap = cap[0].replace(/^ {4}/gm, '');
                this.tokens.push({
                    type: 'code',
                    text: !this.options.pedantic
                        ? cap.replace(/\n+$/, '')
                        : cap
                });
                continue;
            }

            // fences (gfm)
            if (cap = this.rules.fences.exec(src)) {
                src = src.substring(cap[0].length);
                this.tokens.push({
                    type: 'code',
                    lang: cap[2],
                    text: cap[3] || ''
                });
                continue;
            }

            // heading
            if (cap = this.rules.heading.exec(src)) {
                src = src.substring(cap[0].length);
                this.tokens.push({
                    type: 'heading',
                    depth: cap[1].length,
                    text: cap[2]
                });
                continue;
            }

            // table no leading pipe (gfm)
            if (top && (cap = this.rules.nptable.exec(src))) {
                src = src.substring(cap[0].length);

                item = {
                    type: 'table',
                    header: cap[1].replace(/^ *| *\| *$/g, '').split(/ *\| */),
                    align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
                    cells: cap[3].replace(/\n$/, '').split('\n')
                };

                for (i = 0; i < item.align.length; i++) {
                    if (/^ *-+: *$/.test(item.align[i])) {
                        item.align[i] = 'right';
                    } else if (/^ *:-+: *$/.test(item.align[i])) {
                        item.align[i] = 'center';
                    } else if (/^ *:-+ *$/.test(item.align[i])) {
                        item.align[i] = 'left';
                    } else {
                        item.align[i] = null;
                    }
                }

                for (i = 0; i < item.cells.length; i++) {
                    item.cells[i] = item.cells[i].split(/ *\| */);
                }

                this.tokens.push(item);

                continue;
            }

            // lheading
            if (cap = this.rules.lheading.exec(src)) {
                src = src.substring(cap[0].length);
                this.tokens.push({
                    type: 'heading',
                    depth: cap[2] === '=' ? 1 : 2,
                    text: cap[1]
                });
                continue;
            }

            // hr
            if (cap = this.rules.hr.exec(src)) {
                src = src.substring(cap[0].length);
                this.tokens.push({
                    type: 'hr'
                });
                continue;
            }

            // obj
            if (cap = this.rules.obj.exec(src)) {
                src = src.substring(cap[0].length);
                var values = stringToValues(cap[0]);
                this.tokens.push({
                    type: 'obj',
                    object: values[0],
                    args: values[1],
                    content: values[2]
                });
                continue;
            }

            // blockquote
            if (cap = this.rules.blockquote.exec(src)) {
                src = src.substring(cap[0].length);

                this.tokens.push({
                    type: 'blockquote_start'
                });

                cap = cap[0].replace(/^ *> ?/gm, '');

                // Pass `top` to keep the current
                // "toplevel" state. This is exactly
                // how markdown.pl works.
                this.token(cap, top, true);

                this.tokens.push({
                    type: 'blockquote_end'
                });

                continue;
            }

            // list
            if (cap = this.rules.list.exec(src)) {
                src = src.substring(cap[0].length);
                bull = cap[2];

                this.tokens.push({
                    type: 'list_start',
                    ordered: bull.length > 1
                });

                // Get each top-level item.
                cap = cap[0].match(this.rules.item);

                next = false;
                l = cap.length;
                i = 0;

                for (; i < l; i++) {
                    item = cap[i];

                    // Remove the list item's bullet
                    // so it is seen as the next token.
                    space = item.length;
                    item = item.replace(/^ *([*+-]|\d+\.) +/, '');

                    // Outdent whatever the
                    // list item contains. Hacky.
                    if (~item.indexOf('\n ')) {
                        space -= item.length;
                        item = !this.options.pedantic
                            ? item.replace(new RegExp('^ {1,' + space + '}', 'gm'), '')
                            : item.replace(/^ {1,4}/gm, '');
                    }

                    // Determine whether the next list item belongs here.
                    // Backpedal if it does not belong in this list.
                    if (this.options.smartLists && i !== l - 1) {
                        b = block.bullet.exec(cap[i + 1])[0];
                        if (bull !== b && !(bull.length > 1 && b.length > 1)) {
                            src = cap.slice(i + 1).join('\n') + src;
                            i = l - 1;
                        }
                    }

                    // Determine whether item is loose or not.
                    // Use: /(^|\n)(?! )[^\n]+\n\n(?!\s*$)/
                    // for discount behavior.
                    loose = next || /\n\n(?!\s*$)/.test(item);
                    if (i !== l - 1) {
                        next = item.charAt(item.length - 1) === '\n';
                        if (!loose) loose = next;
                    }

                    this.tokens.push({
                        type: loose
                            ? 'loose_item_start'
                            : 'list_item_start'
                    });

                    // Recurse.
                    this.token(item, false, bq);

                    this.tokens.push({
                        type: 'list_item_end'
                    });
                }

                this.tokens.push({
                    type: 'list_end'
                });

                continue;
            }

            // html
            if (cap = this.rules.html.exec(src)) {
                src = src.substring(cap[0].length);
                this.tokens.push({
                    type: this.options.sanitize
                        ? 'paragraph'
                        : 'html',
                    pre: !this.options.sanitizer
                    && (cap[1] === 'pre' || cap[1] === 'script' || cap[1] === 'style'),
                    text: cap[0]
                });
                continue;
            }

            // def
            if ((!bq && top) && (cap = this.rules.def.exec(src))) {
                src = src.substring(cap[0].length);
                this.tokens.links[cap[1].toLowerCase()] = {
                    href: cap[2],
                    title: cap[3]
                };
                continue;
            }

            // table (gfm)
            if (top && (cap = this.rules.table.exec(src))) {
                src = src.substring(cap[0].length);

                item = {
                    type: 'table',
                    header: cap[1].replace(/^ *| *\| *$/g, '').split(/ *\| */),
                    align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
                    cells: cap[3].replace(/(?: *\| *)?\n$/, '').split('\n')
                };

                for (i = 0; i < item.align.length; i++) {
                    if (/^ *-+: *$/.test(item.align[i])) {
                        item.align[i] = 'right';
                    } else if (/^ *:-+: *$/.test(item.align[i])) {
                        item.align[i] = 'center';
                    } else if (/^ *:-+ *$/.test(item.align[i])) {
                        item.align[i] = 'left';
                    } else {
                        item.align[i] = null;
                    }
                }

                for (i = 0; i < item.cells.length; i++) {
                    item.cells[i] = item.cells[i]
                        .replace(/^ *\| *| *\| *$/g, '')
                        .split(/ *\| */);
                }

                this.tokens.push(item);

                continue;
            }

            // top-level paragraph
            if (top && (cap = this.rules.paragraph.exec(src))) {
                src = src.substring(cap[0].length);
                this.tokens.push({
                    type: 'paragraph',
                    text: cap[1].charAt(cap[1].length - 1) === '\n'
                        ? cap[1].slice(0, -1)
                        : cap[1]
                });
                continue;
            }

            // text
            if (cap = this.rules.text.exec(src)) {
                // Top-level should never reach here.
                src = src.substring(cap[0].length);
                this.tokens.push({
                    type: 'text',
                    text: cap[0]
                });
                continue;
            }

            if (src) {
                throw new
                    Error('Infinite loop on byte: ' + src.charCodeAt(0));
            }
        }

        return this.tokens;
    };

    /**
     * Inline-Level Grammar
     */

    var inline = {
        obj: /^\{[a-zA-Z\-]+\(.*?\).*?}(?!<[0-9]+>)/,
        escape: /^\\([\\`*{}\[\]()#+\-.!_>/])/,
        autolink: /^<([^ >]+(@|:\/)[^ >]+)>/,
        url: noop,
        tag: /^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,
        link: /^!?\[(inside)\]\(href\)/,
        reflink: /^!?\[(inside)\]\s*\[([^\]]*)\]/,
        nolink: /^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,
        underline: /^\b_((?:.|\n)+?)_\b/,
        strong: /^\*((?:.|\n)+?\*?)\*/,
        em: /^\/\/((?:.|\n)*?[^:])\/\//,
        code: /^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,
        br: /^ {2,}\n(?!\s*$)/,
        del: noop,
        text: /^[\s\S]+?(?=[@/\\<!\{\[_*`]| {2,}\n|$)/
    };

    inline._inside = /(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/;
    inline._href = /\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/;
    inline._compat = {
        underline: /(?!)/, strong:/^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,
        em: /^\b_((?:[^_]|__)+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/
    };

    inline.link = replace(inline.link)
    ('inside', inline._inside)
    ('href', inline._href)
    ();

    inline.reflink = replace(inline.reflink)
    ('inside', inline._inside)
    ();


    /**
     * Normal Inline Grammar
     */

    inline.normal = merge({}, inline);
    inline.c_normal = merge({}, inline.normal, inline._compat);

    /**
     * Pedantic Inline Grammar
     */

    inline.pedantic = merge({}, inline.normal, {
        strong: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
        em: /^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/
    });

    /**
     * GFM Inline Grammar
     */

    inline.gfm = merge({}, inline.normal, {
        escape: replace(inline.escape)('])', '~|])')(),
        url: /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,
        del: /^~~(?=\S)([\s\S]*?\S)~~/,
        text: replace(inline.text)
        (']|', '~]|')
        ('|', '|https?://|')
        ()
    });
    inline.c_gfm = merge({}, inline.gfm, inline._compat);

    /**
     * GFM + Line Breaks Inline Grammar
     */

    inline.breaks = merge({}, inline.gfm, {
        br: replace(inline.br)('{2,}', '*')(),
        text: replace(inline.gfm.text)('{2,}', '*')()
    });
    inline.c_breaks = merge({}, inline.breaks, inline._compat);

    /**
     * Inline Lexer & Compiler
     */

    function InlineLexer(links, options) {
        this.options = options || interpret.defaults;
        this.links = links;
        this.rules = inline.normal;
        this.renderer = this.options.renderer || new Renderer;
        this.renderer.options = this.options;

        if (!this.links) {
            throw new
                Error('Tokens array requires a `links` property.');
        }

        if (this.options.compatibility) {
            if (this.options.gfm) {
                if (this.options.breaks) {
                    this.rules = inline.c_breaks;
                } else {
                    this.rules = inline.c_gfm;
                }
            } else {
                this.rules = inline.c_normal;
            }
        } else {
            if (this.options.gfm) {
                if (this.options.breaks) {
                    this.rules = inline.breaks;
                } else {
                    this.rules = inline.gfm;
                }
            }
        }

        if (this.options.pedantic) {
            this.rules = inline.pedantic;
        }

    }

    /**
     * Expose Inline Rules
     */

    InlineLexer.rules = inline;

    /**
     * Static Lexing/Compiling Method
     */

    InlineLexer.output = function(src, links, options) {
        var inline = new InlineLexer(links, options);
        return inline.output(src);
    };

    /**
     * Lexing/Compiling
     */

    InlineLexer.prototype.output = function(src) {
        var out = '', link, text, href, cap;

        while (src) {
            // escape
            if (cap = this.rules.escape.exec(src)) {
                src = src.substring(cap[0].length);
                out += cap[1];
                continue;
            }

            // obj
            if (cap = this.rules.obj.exec(src)) {
                src = src.substring(cap[0].length);
                var values = stringToValues(cap[0]);
                out += objList.indexOf(values[0])>-1
                        ? this.renderer.obj(values[0], values[1], values[2])
                        : this.renderer.text(cap[0]);
                continue;
            }

            // autolink
            if (cap = this.rules.autolink.exec(src)) {
                src = src.substring(cap[0].length);
                if (cap[2] === '@') {
                    text = cap[1].charAt(6) === ':'
                        ? this.mangle(cap[1].substring(7))
                        : this.mangle(cap[1]);
                    href = this.mangle('mailto:') + text;
                } else {
                    text = escape(cap[1]);
                    href = text;
                }
                out += this.renderer.link(href, null, text);
                continue;
            }

            // url (gfm)
            if (!this.inLink && (cap = this.rules.url.exec(src))) {
                src = src.substring(cap[0].length);
                text = escape(cap[1]);
                href = text;
                out += this.renderer.link(href, null, text);
                continue;
            }

            // tag
            if (cap = this.rules.tag.exec(src)) {
                if (!this.inLink && /^<a /i.test(cap[0])) {
                    this.inLink = true;
                } else if (this.inLink && /^<\/a>/i.test(cap[0])) {
                    this.inLink = false;
                }
                src = src.substring(cap[0].length);
                out += this.options.sanitize && /^<s(cript|tyle)/i.test(cap[0])
                    ? this.options.sanitizer
                    ? this.options.sanitizer(cap[0])
                    : escape(cap[0])
                    : cap[0]
                continue;
            }

            // link
            if (cap = this.rules.link.exec(src)) {
                src = src.substring(cap[0].length);
                this.inLink = true;
                out += this.outputLink(cap, {
                    href: cap[2],
                    title: cap[3]
                });
                this.inLink = false;
                continue;
            }

            // reflink, nolink
            if ((cap = this.rules.reflink.exec(src))
                || (cap = this.rules.nolink.exec(src))) {
                src = src.substring(cap[0].length);
                link = (cap[2] || cap[1]).replace(/\s+/g, ' ');
                link = this.links[link.toLowerCase()];
                if (!link || !link.href) {
                    out += cap[0].charAt(0);
                    src = cap[0].substring(1) + src;
                    continue;
                }
                this.inLink = true;
                out += this.outputLink(cap, link);
                this.inLink = false;
                continue;
            }

            // strong
            if (cap = this.rules.strong.exec(src)) {
                src = src.substring(cap[0].length);
                out += this.renderer.strong(this.output(cap[2] || cap[1]));
                continue;
            }

            // underline
            if (cap = this.rules.underline.exec(src)) {
                src = src.substring(cap[0].length);
                out += this.renderer.underline(this.output(cap[2] || cap[1]));
                continue;
            }

            // em
            if (cap = this.rules.em.exec(src)) {
                src = src.substring(cap[0].length);
                out += this.renderer.em(this.output(cap[2] || cap[1]));
                continue;
            }

            // code
            if (cap = this.rules.code.exec(src)) {
                src = src.substring(cap[0].length);
                out += this.renderer.codespan(escape(cap[2], true));
                continue;
            }

            // br
            if (cap = this.rules.br.exec(src)) {
                src = src.substring(cap[0].length);
                out += this.renderer.br();
                continue;
            }

            // del (gfm)
            if (cap = this.rules.del.exec(src)) {
                src = src.substring(cap[0].length);
                out += this.renderer.del(this.output(cap[1]));
                continue;
            }

            // text
            if (cap = this.rules.text.exec(src)) {
                src = src.substring(cap[0].length);
                out += this.renderer.text(escape(this.smartypants(cap[0])));
                continue;
            }

            if (src) {
                throw new
                    Error('Infinite loop on byte: ' + src.charCodeAt(0));
            }
        }

        return out;
    };

    /**
     * Compile Link
     */

    InlineLexer.prototype.outputLink = function(cap, link) {
        var href = escape(link.href)
            , title = link.title ? escape(link.title) : null;

        return cap[0].charAt(0) !== '!'
            ? this.renderer.link(href, title, this.output(cap[1]))
            : this.renderer.image(href, title, escape(cap[1]));
    };

    /**
     * Smartypants Transformations
     */

    InlineLexer.prototype.smartypants = function(text) {
        if (!this.options.smartypants) return text;
        return text
        // em-dashes
            .replace(/---/g, '\u2014')
            // en-dashes
            .replace(/--/g, '\u2013')
            // opening singles
            .replace(/(^|[-\u2014/(\[{"\s])'/g, '$1\u2018')
            // closing singles & apostrophes
            .replace(/'/g, '\u2019')
            // opening doubles
            .replace(/(^|[-\u2014/(\[{\u2018\s])"/g, '$1\u201c')
            // closing doubles
            .replace(/"/g, '\u201d')
            // ellipses
            .replace(/\.{3}/g, '\u2026');
    };

    /**
     * Mangle Links
     */

    InlineLexer.prototype.mangle = function(text) {
        if (!this.options.mangle) return text;
        var out = '', l = text.length, i = 0, ch;

        for (; i < l; i++) {
            ch = text.charCodeAt(i);
            if (Math.random() > 0.5) {
                ch = 'x' + ch.toString(16);
            }
            out += '&#' + ch + ';';
        }

        return out;
    };

    /**
     * Renderer
     */

    function Renderer(options) {
        this.options = options || {};
    }

    Renderer.prototype.code = function(code, lang, escaped) {
        if (this.options.highlight) {
            var out = this.options.highlight(code, lang);
            if (out != null && out !== code) {
                escaped = true;
                code = out;
            }
        }

        if (!lang) {
            return '<pre><code>'
                + (escaped ? code : escape(code, true))
                + '\n</code></pre>';
        }

        return '<pre><code class="'
            + this.options.langPrefix
            + escape(lang, true)
            + '">'
            + (escaped ? code : escape(code, true))
            + '\n</code></pre>\n';
    };

    Renderer.prototype.blockquote = function(quote) {
        return '<blockquote>\n' + quote + '</blockquote>\n';
    };

    Renderer.prototype.html = function(html) {
        return html;
    };

    Renderer.prototype.heading = function(text, level, raw) {
        var headerCloses = 0;
        var out = "";
        for (var i=level; i<7; i++) {
            headerCloses += counter[""+i];
            counter[""+i] = 0;
        }
        counter[""+level] = 1;
        while (headerCloses>0) { out += "</div>"; headerCloses--; }
        return out + '<div class="section" id="' + raw.toLowerCase().replace(/ *<.*?>(.*?<\/[^/]*?>)? */g, '').replace(/[^\w]+/g, '-') + '">' +
            '<h' + level  + this.options.headerPrefix + '>' + text + '</h' + level + '>\n';
    };

    Renderer.prototype.hr = function() {
        return this.options.xhtml ? '<hr/>\n' : '<hr>\n';
    };

    Renderer.prototype.obj = function(object, args, content) {
        for (var i=0; i<content.length; i++)
            content[i] = interpret.inlineLexer.output(content[i]);

        return valsToHTML(object, args, content);
    };

    Renderer.prototype.list = function(body, ordered) {
        var type = ordered ? 'ol' : 'ul';
        return '<' + type + '>\n' + body + '</' + type + '>\n';
    };

    Renderer.prototype.listitem = function(text) {
        return '<li>' + text + '</li>\n';
    };

    Renderer.prototype.checkbox = function(text, checked) {
        return '<div><input disabled type="checkbox"' + (checked ? ' checked' : '') + '></input>' + text + '</div>\n';
    };

    Renderer.prototype.paragraph = function(text) {
        return '<p>' + text + '</p>\n';
    };

    Renderer.prototype.table = function(header, body) {
        return '<div class="table-wrapper">\n'
            + '<table>\n'
            + '<thead>\n'
            + header
            + '</thead>\n'
            + '<tbody>\n'
            + body
            + '</tbody>\n'
            + '</table>\n'
            + '</div>\n';
    };

    Renderer.prototype.tablerow = function(content) {
        return '<tr>\n' + content + '</tr>\n';
    };

    Renderer.prototype.tablecell = function(content, flags) {
        var type = flags.header ? "th" : "td";
        var tag = flags.align
            ? '<' + type + ' style="text-align:' + flags.align + '">'
            : '<' + type + '>';
        return tag + content + '</' + type + '>\n';
    };

// span level renderer
    Renderer.prototype.strong = function(text) {
        return '<strong>' + text + '</strong>';
    };

    Renderer.prototype.underline = function(text) {
        return '<span class="underline">' + text + '</span>';
    };

    Renderer.prototype.em = function(text) {
        return '<em>' + text + '</em>';
    };

    Renderer.prototype.codespan = function(text) {
        return '<code>' + text + '</code>';
    };

    Renderer.prototype.br = function() {
        return this.options.xhtml ? '<br/>' : '<br>';
    };

    Renderer.prototype.del = function(text) {
        return '<s>' + text + '</s>';
    };

    Renderer.prototype.link = function(href, title, text) {
        if (this.options.sanitize) {
            try {
                var prot = decodeURIComponent(unescape(href))
                    .replace(/[^\w:]/g, '')
                    .toLowerCase();
            } catch (e) {
                return '';
            }
            if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0) {
                return '';
            }
        }
        var out = '<a href="' + href + '"';
        if (title) {
            out += ' title="' + title + '"';
        }
        out += '>' + text + '</a>';
        return out;
    };

    Renderer.prototype.image = function(href, title, text) {
        var out = '<img src="' + href + '" alt="' + text + '"';
        if (title) {
            out += ' title="' + title + '"';
        }
        out += this.options.xhtml ? '/>' : '>';
        return out;
    };

    Renderer.prototype.text = function(text) {
        return text;
    };

    /**
     * Parsing & Compiling
     */

    function Parser(options) {
        this.tokens = [];
        this.token = null;
        this.options = options || interpret.defaults;
        this.options.renderer = this.options.renderer || new Renderer;
        this.renderer = this.options.renderer;
        this.renderer.options = this.options;
    }

    /**
     * Static Parse Method
     */

    Parser.parse = function(src, options, renderer) {
        var parser = new Parser(options, renderer);
        return parser.parse(src);
    };

    /**
     * Parse Loop
     */

    Parser.prototype.parse = function(src) {
        this.inline = new InlineLexer(src.links, this.options, this.renderer);
        interpret.inlineLexer = this.inline;
        this.tokens = src.reverse();

        var out = '';
        while (this.next()) {
            out += this.tok();
        }

        return out;
    };

    /**
     * Next Token
     */

    Parser.prototype.next = function() {
        return this.token = this.tokens.pop();
    };

    /**
     * Preview Next Token
     */

    Parser.prototype.peek = function() {
        return this.tokens[this.tokens.length - 1] || 0;
    };

    /**
     * Parse Text Tokens
     */

    Parser.prototype.parseText = function() {
        var body = this.token.text;

        while (this.peek().type === 'text') {
            body += '\n' + this.next().text;
        }

        return this.inline.output(body);
    };

    /**
     * Parse Current Token
     */

    Parser.prototype.tok = function() {
        switch (this.token.type) {
            case 'space': {
                return '';
            }
            case 'hr': {
                return this.renderer.hr();
            }
            case 'obj': {
                return this.renderer.obj(
                    this.token.object,
                    this.token.args,
                    this.token.content);
            }
            case 'heading': {
                return this.renderer.heading(
                    this.inline.output(this.token.text),
                    this.token.depth,
                    this.token.text);
            }
            case 'code': {
                return this.renderer.code(this.token.text,
                    this.token.lang,
                    this.token.escaped);
            }
            case 'table': {
                var header = '', body = '', i, row, cell, flags, j;

                // header
                cell = '';
                for (i = 0; i < this.token.header.length; i++) {
                    flags = { header: true, align: this.token.align[i] };
                    cell += this.renderer.tablecell(
                        this.inline.output(this.token.header[i]),
                        { header: true, align: this.token.align[i] }
                    );
                }
                header += this.renderer.tablerow(cell);

                for (i = 0; i < this.token.cells.length; i++) {
                    row = this.token.cells[i];

                    cell = '';
                    for (j = 0; j < row.length; j++) {
                        cell += this.renderer.tablecell(
                            this.inline.output(row[j]),
                            { header: false, align: this.token.align[j] }
                        );
                    }

                    body += this.renderer.tablerow(cell);
                }
                return this.renderer.table(header, body);
            }
            case 'blockquote_start': {
                var body = '';

                while (this.next().type !== 'blockquote_end') {
                    body += this.tok();
                }

                return this.renderer.blockquote(body);
            }
            case 'list_start': {
                var body = ''
                    , ordered = this.token.ordered;

                while (this.next().type !== 'list_end') {
                    body += this.tok();
                }

                return this.renderer.list(body, ordered);
            }
            case 'list_item_start': {
                var body = '';

                while (this.next().type !== 'list_item_end') {
                    body += this.token.type === 'text'
                        ? this.parseText()
                        : this.tok();
                }

                if (body.match(/^\[[ x]]/)) {
                    return this.renderer.checkbox(body.substring(3).trim(), body.charAt(1) === 'x');
                }

                return this.renderer.listitem(body);
            }
            case 'loose_item_start': {
                var body = '';

                while (this.next().type !== 'list_item_end') {
                    body += this.tok();
                }

                return this.renderer.listitem(body);
            }
            case 'html': {
                var html = !this.token.pre && !this.options.pedantic
                    ? this.inline.output(this.token.text)
                    : this.token.text;
                return this.renderer.html(html);
            }
            case 'paragraph': {
                return this.renderer.paragraph(this.inline.output(this.token.text));
            }
            case 'text': {
                return this.renderer.paragraph(this.parseText());
            }
        }
    };

    /**
     * Helpers
     */

    function escape(html, encode) {
        return html
            .replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function unescape(html) {
        return html.replace(/&([#\w]+);/g, function(_, n) {
            n = n.toLowerCase();
            if (n === 'colon') return ':';
            if (n.charAt(0) === '#') {
                return n.charAt(1) === 'x'
                    ? String.fromCharCode(parseInt(n.substring(2), 16))
                    : String.fromCharCode(+n.substring(1));
            }
            return '';
        });
    }

    function replace(regex, opt) {
        regex = regex.source;
        opt = opt || '';
        return function self(name, val) {
            if (!name) return new RegExp(regex, opt);
            val = val.source || val;
            val = val.replace(/(^|[^\[])\^/g, '$1');
            regex = regex.replace(name, val);
            return self;
        };
    }

    function noop() {}
    noop.exec = noop;

    function merge(obj) {
        var i = 1, target, key;

        for (; i < arguments.length; i++) {
            target = arguments[i];
            for (key in target) {
                if (Object.prototype.hasOwnProperty.call(target, key)) {
                    obj[key] = target[key];
                }
            }
        }

        return obj;
    }


    /**
     * Interpret function
     */

    window.interpret = function (src, opt, callback) {
        if (callback || typeof opt === 'function') {
            if (!callback) { callback = opt; opt = null; }

            opt = merge({}, interpret.defaults, opt || {});

            var highlight = opt.highlight, tokens, pending, i = 0;

            try {
                tokens = Lexer.lex(src, opt);
            } catch (e) {
                return callback(e);
            }

            pending = tokens.length;

            var done = function(err) {
                if (err) {
                    opt.highlight = highlight;
                    return callback(err);
                }

                var out;

                try {
                    out = Parser.parse(tokens, opt);
                } catch (e) {
                    err = e;
                }

                opt.highlight = highlight;

                return err
                    ? callback(err)
                    : callback(null, out);
            };

            if (!highlight || highlight.length < 3) {
                return done();
            }

            delete opt.highlight;

            if (!pending) return done();

            for (; i < tokens.length; i++) {
                (function(token) {
                    if (token.type !== 'code') {
                        return --pending || done();
                    }
                    return highlight(token.text, token.lang, function(err, code) {
                        if (err) return done(err);
                        if (code == null || code === token.text) {
                            return --pending || done();
                        }
                        token.text = code;
                        token.escaped = true;
                        --pending || done();
                    });
                })(tokens[i]);
            }

            return;
        }
        //try {
            if (opt) opt = merge({}, interpret.defaults, opt);
            return Parser.parse(Lexer.lex(src, opt), opt);
        /*} catch (e) {
            e.message += '\nPlease report this to https://github.com/chjj/interpret.';
            if ((opt || interpret.defaults).silent) {
                return '<p>An error occured:</p><pre>'
                    + escape(e.message + '', true)
                    + '</pre>';
            }
            throw e;
        }*/
    };

    /**
     * Options
     */

    interpret.options =
        interpret.setOptions = function(opt) {
            merge(interpret.defaults, opt);
            return interpret;
        };

    interpret.defaults = {
        compatibility: false,
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        sanitizer: null,
        mangle: true,
        smartLists: false,
        silent: false,
        highlight: null,
        langPrefix: 'lang-',
        smartypants: false,
        headerPrefix: '',
        renderer: new Renderer,
        xhtml: false
    };

    /**
     * Expose
     */

    interpret.Parser = Parser;
    interpret.parser = Parser.parse;

    interpret.Renderer = Renderer;

    interpret.Lexer = Lexer;
    interpret.lexer = Lexer.lex;

    interpret.InlineLexer = InlineLexer;
    interpret.inlineLexer = InlineLexer.output;

    interpret.parse = interpret;

    if (typeof module !== 'undefined' && typeof exports === 'object') {
        module.exports = interpret;
    } else if (typeof define === 'function' && define.amd) {
        define(function() { return interpret; });
    } else {
        this.interpret = interpret;
    }

}).call(function() {
    return this || (typeof window !== 'undefined' ? window : global);
}());

/**
 * Post-process
 */

function postprocess(str) {
    return '<div class="container">' + str + '</div>';
}

/**
 * Contextualise
 */

function contextualise() {
    $('body').css('opacity', '0').css('overflow', 'hidden');
    $('p:empty').remove();
    $('._sjs_this').each(function(i, x) {
        eval(x.innerHTML);
    });
}

/**
 * Add listeners
 */

function addListeners() {
    var navWidths = [];

    $('nav').each(function(i, x) {
        x = $(x);
        var totalWidth = 0;
        var c = x.children();
        c.each(function(i, x) {
            $(x).css('position', 'absolute').css('top', '0').css('left', '0');
        });
        for (var j=0; j<c.length; j++) totalWidth += c.eq(j).width();
        navWidths[i] = totalWidth + parseInt(x.css('padding-left')) + parseInt(x.css('padding-right'));
        c.each(function(k, x) {
            $(x).css('position', 'static');
        });
    });


    $('nav').each(function(i, x) {
        x = $(x);
        function adjustMenu() {
            if (x.css('display') != "none" && x.width() < navWidths[i]) {
                x.children('.link-container').css('display', 'block');
                x.children('.separator').css('display', 'none');
            } else {
                x.children('.link-container').css('display', 'inline');
                x.children('.separator').css('display', 'inline');
            }
        }
        $(window).on('resize orientationChanged', adjustMenu);
        adjustMenu();
    });

    // Menus pre-set to first one
    var n = $('nav :first-child :first-child');
    for (var i=n.size()-1; i>=0; ) eval(n.eq(--i).attr("onclick"));

    // If there's a hash, open it
    if (window.location.hash.length > 1) changePage(window.location.hash.replace(/^#/,""));

    $('body').css('opacity', '').css('overflow', '');
}

/**
 * Helper functions
 */

window.changePage = function(name) {
    if (name && name.indexOf('href')<0) {
        var tag = '#' + name.toLowerCase().replace(/%20| /g, '-').replace(/%22|[^a-z0-9\-]]/g, '');
        var query = $(tag);
        if (query.length) {
            query.removeClass('hide');
            query.siblings('.section').addClass('hide');
            query = query.siblings('nav').first().find('.link-container a');
            query.css('color', '');
            for (var i=0; i<query.length; i++) {
                if (query[i].innerHTML.toLowerCase()
                        .replace(/ /g, '-').replace(/[^a-z\d\-]/g, '')
                    === tag.substring(1)) {
                    $(query[i]).css('color', '#2c8fdb');
                    break;
                }
            }
            //window.location.hash = tag;
        }
    }
};