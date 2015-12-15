## Editor <input style="position:relative;left:10px;bottom:5px;font-size:16px" type="button" value="Load Example" onclick="magic();">

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
    #outp {
        border: 0.1rem solid #ccc;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
</style>

<div id="hello" style="height:100%;resize:vertical;position:relative">
<div id="edit" style="height:100%;width:30%"></div>
<div id="outp" style="position:absolute;left:30%;width:70%;overflow:auto;"></div>
</div>

<script>
    window.defer(function(){
        setTimeout(function() {
            var cm = CodeMirror(document.getElementById('edit'), {
              theme: 'neo',
              lineWrapping: true,
              lineNumbers: true
            });
            
            cm.on("change", function(cm, change) {
              document.getElementById("outp").innerHTML = '<div class="container">' + marked(cm.getValue()) + '</div>';
            });
            
            document.getElementById('edit').children[0].style.height = "100%";
            document.getElementById('hello').style.height = window.innerHeight + "px";
        }, 100);
    }, "typeof CodeMirror !== 'undefined'");
</script>