## Editor <input style="position:relative;left:10px;bottom:5px;font-size:16px" type="button" value="Load Example" onclick="magic();">

<iframe id="edit" style="border:2px solid #eee;position:relative;width:95%;height:100px" src="Editor"></iframe>
<script>
    function magic() {
        var edit =$('#edit'); 
        edit.contents().find('#markdown').val(window.markdownCode);
    }
    function resizeEditor() {
        $('html').css('height','100%');
        $('#edit').css('height',($('html').height()-$('#edit').position().top-60)+'px');
    }
    $('body > .section > nav > a:last-child').click(function(){
        setTimeout(resizeEditor,10);
    });
    $(window).resize(resizeEditor);
</script>