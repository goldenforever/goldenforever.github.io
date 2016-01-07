## Editor

<style>
    .cm-s-neo .CodeMirror-gutters {
        border-right: 0.1rem solid #ccc;
        padding-right: 0.2rem;
        margin-right: 0.3rem;
    }
    .CodeMirror.cm-s-neo {
        border: 0.1rem solid #ccc;
    }
    .cm-s-neo .CodeMirror-linenumber {
        color: #ccc;
    }
    #out {
        border: 0.1rem solid #ccc;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    #edit {
        border: 0.1rem solid #ccc;
    }
</style>

<div id="hello" style="height:100%;resize:vertical;position:relative;margin-left:-10%;margin-right:-10%;">
    <div id="edit" style="height:100%;width:30%"></div>
    <div id="out" style="position:absolute;left:30%;width:70%;overflow:auto;">
        <div id="outp" class="container"></div>
    </div>
</div>

<script>
    loadSources([
        [0,'https://cdn.jsdelivr.net/codemirror/4.5.0/codemirror.min.js'],
        [1,'https://cdn.jsdelivr.net/codemirror/4.5.0/codemirror.css']
    ]);

    window.defer(function(){
        var cm = CodeMirror(document.getElementById('edit'), {
          lineWrapping: true,
          lineNumbers: true
        });
        
        document.getElementById('edit').children[0].style.height = "100%";
        document.getElementById('hello').style.height = window.innerHeight + "px";
        
        cm.on("change", function(cm, change) {
          document.getElementById("outp").innerHTML = '<div class="container">' + generate(cm.getValue()) + '</div>';
          contextualise();
        });
    }, "typeof CodeMirror !== 'undefined'");
</script>