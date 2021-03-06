## Editor

<style>
    #out, #edit {
        border: 0.1rem solid #ccc;
        box-sizing: border-box;
        height: 100%;
        width: initial;
        position: absolute;
        top: 0;
        right: 0;
    }
    #hello { width:120%;position:relative;height:300px;overflow-x:hidden;overflow-y:visible;resize:vertical; }
    #edit { left:5px;right:auto; }
    #ohhai, #ohhai2 {
        margin: 0 -10.5%;
        text-align: center;
        border: 1px solid rgba(0,0,0,0.1);
        border-width: 1px 2px;
        position: relative;
        left: 1px;
        cursor: pointer;
        user-select: none;
        height: 24px;
        overflow-y: visible;
        z-index: 10;
        -webkit-user-select: none;  /* Chrome all / Safari all */
        -moz-user-select: none;     /* Firefox all */
        -ms-user-select: none;      /* IE 10+ */
        user-select: none;          /* Likely future */
    }
    #ohhai2 { z-index: 20; }
    #ohbai, #ohbai2 {
        background-color: rgba(0,0,0,0.1);
        text-transform: uppercase;
        letter-spacing: 2px;
    }
    #cheat-sheet, #cheat-sheet2 {
        background-color: #fff;
        border: 1px solid #ccc;
    }
    #cheat-sheet .highlight, #cheat-sheet2 .highlight {
        font-weight: bold;
        background-color: rgba(0,0,0,0.2);
    }
    #cheat-sheet td, #cheat-sheet2 td {
        padding: 10px;
    }
    #cheat-sheet pre, #cheat-sheet2 pre {
        margin: 0;
        white-space: pre-wrap;
    }
    #cheat-sheet p, #cheat-sheet2 p {
        margin: 0;
    }
    #cheat-sheet pre code, #cheat-sheet2 pre code {
        margin-bottom: -15px;
        padding: 0;
    }
    .CodeMirror, .CodeMirror-gutters {
        height: 100% !important;
    }
</style>

<div id="ohhai2" onclick="expandSheet2();">
    <div id="ohbai2">some-js Cheatsheet</div>
    <div id="cheat-sheet2">
        
    </div>
</div>
<div id="ohhai" onclick="expandSheet();">
    <div id="ohbai">Markdown Cheatsheet</div>
    <div id="cheat-sheet">
        
    </div>
</div>
<input id="width" value="30" type="range" style="width:120%;margin:10px -10%; 0">
<div id="hello" style="position:relative;margin-left:-10%;margin-right:-10%;">
    <div id="edit"></div>
    <div id="out">
        <div id="outp" class="container"></div>
    </div>
</div>

<script>
    var string = "# Hello\nworld.";

    if(typeof(Storage) !== "undefined") {
        var str = localStorage.getItem("editorcode");
        if (str) string = str;
    }

    window.defer(function(){
        var cm = CodeMirror(document.getElementById('edit'), {
          lineWrapping: true,
          lineNumbers: true
        });

        var x = window.changePage;
        window.changePage = function(a) {
            x(a);
            if (a === "Editor") {
                cm.refresh();
            }
        };

        cm.setValue(string);
        updateView();

        function updateView() {
            document.getElementById("outp").innerHTML = generate(cm.getValue());
            contextualise();
            $('body').css('opacity', '').css('overflow', '');
            localStorage.setItem("editorcode", cm.getValue());
        }

        cm.on("change", updateView);

    }, "typeof CodeMirror !== 'undefined'");

    var isOpen = false;
    var isOpen2 = false;

    function expandSheet2() {
        if (!isOpen2) $('#cheat-sheet2').html('<table style="width:100%"><tbody><tr><td><pre><code>This is far<span class="highlight">{hspace(50px)}</span>from this.</code></pre></td><td><p>Units can be `px`, `cm`, `mm` or any CSS unit. Can be negative.</p></td></tr><tr><td><pre><code>This is way above\n\n<span class="highlight">{vspace(50px)}</span>\n\nthis.</code></pre></td><td><p>Similar to above, will break the paragraph. Can be negative.</p></td></tr><tr><td><pre><code><span class="highlight">{color(green)This will be green}</span></code></pre></td><td><p>Colour names, hex-codes, rgb(a) values accepted</p></td></tr><tr><td><pre><code>This whole paragraph will \r\nhave a <span class="highlight">{modify(background-color,blue)}</span> blue background.</code></pre></td><td><p>Modify the parent of the text. First argument is CSS property, second is its value.</p></td></tr><tr><td><pre><code><span class="highlight">{menu()Home,About Us,Contact Us}</span></code></pre></td><td><p>Creates a menu, that shows/hides the header with the same name (and its subcontent). Header sizing will determine its subcontent.</p></td></tr><tr><td><pre><code><span class="highlight">{header(3)This is a h3 element}</span></code></pre></td><td><p>Essentially the same as Markdown `### This is...` except it doesn\'t affect menus, which is sometimes helpful. Number is header size(&lt;h#&gt;).</p></td></tr><tr><td><pre><code><span class="highlight">{tagline()Don\'t call us, we\'ll call you.}</span></code></pre></td><td><p>Creates a \'tagline\' with adaptive font sizing.</p></td></tr><tr><td><pre><code><span class="highlight">{icon(smile-o)}</span></code></pre></td><td><p>Adds font-awesome icon. This example adds the `fa-smile-o` icon.</p></td></tr><tr><td><pre><code><span class="highlight">{font(Arial)A different font!}</span></code></pre></td><td><p>Changes font. Font needs to be imported (or a standard web font).</p></td></tr></tbody></table>');
        else $('#cheat-sheet2').html("");

        if (!isOpen2) $('#ohbai2').html("Hide");
        else $('#ohbai2').html("some-js Cheatsheet");

        isOpen2 = !isOpen2;
        isOpen = true;
        expandSheet();
    }

    function expandSheet() {
        if (!isOpen) $('#cheat-sheet').html('<table style="width:100%"><tbody><tr><td><pre><code><span class="highlight">//</span>This is italicized<span class="highlight">//</span>, <wbr><span class="highlight">*</span>this is bold<span class="highlight">*</span> <wbr>and <span class="highlight">_</span>this is underlined<span class="highlight">_</span>.</code></pre></td><td><p>They can be used together on the same word or phrase. <strong style="color:blue;">Different to Markdown.</strong></p></td></tr><tr><td><pre><code><span class="highlight">{\--</span> This is a comment <span class="highlight">--}</span></code></pre></td><td><p>Removed from output.</p></td></tr><tr><td><pre><code><span class="highlight">#</span> This is a first level header</code></pre></td><td><p>Use one or more hash marks for headers: <code>#&nbsp;H1</code>, <code>##&nbsp;H2</code> ... <code>######&nbsp;H6</code></p></td></tr><tr><td><pre><code>This is a link to <wbr><span class="highlight">[Google](http://www.google.com)</span></code></pre></td><td><p>Visible text in the square brackets, link in the parentheses.</p></td></tr><tr><td><pre><code>First line.<span class="highlight">  \n</span>Second line.</code></pre></td><td><p>End a line with two spaces for a linebreak.</p></td></tr><tr><td><pre><code>First paragraph.<span class="highlight">\n\n</span>Second paragraph.</code></pre></td><td><p>Start a new paragraph by having an empty line between them.</p></td></tr><tr><td><pre><code><span class="highlight">- </span>Unordered list item\n<span class="highlight">- </span>Unordered list item</code></pre></td><td><p>Unordered (bulleted) lists use asterisks, pluses, or hyphens (<code>*</code>, <code>+</code>, or<code>-</code>) as list markers.</p></td></tr><tr><td><pre><code><span class="highlight">1. </span>Ordered list item<span class="highlight">\n2. </span>Ordered list item</code></pre></td><td><p>Ordered (numbered) lists use regular numbers, followed by periods, as list markers.</p></td></tr><tr><td><pre><code><span class="highlight">```\n</span>print("This is a code block");\n<span class="highlight">```</span></code></pre></td><td><p>Three backticks above and below for a preformatted block.</p></td></tr><tr><td><pre><code>Let\'s talk about <span class="highlight">`</span>&lt;html&gt;<span class="highlight">`</span>!</code></pre></td><td><p>Use backticks for inline code.</p></td></tr><tr><td><pre><code><span class="highlight">![](http://www.w3schools.com/html/pic_mountain.jpg)</span></code></pre></td><td><p>Images are exactly like links, with an exclamation mark in front of them.</p></td></tr></tbody></table>');
        else $('#cheat-sheet').html("");

        if (!isOpen) $('#ohbai').html("Hide");
        else $('#ohbai').html("Markdown Cheatsheet");

        isOpen = !isOpen;
    }

    function adjWidth(e) {
        $('#edit')[0].style.width = (e.target.value-1) + "%";
        $('#out')[0].style.width = (99-e.target.value) + "%";
    }
    $('#width').on("click", adjWidth);
    $('#width').on("change", adjWidth);
    adjWidth({target: {value: 30}});
</script>