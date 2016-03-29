## Editor

<script>
    $('nav').on('click', function () {
        if ($('#editor.section:not(.hide)').size() > 0) $('body,html').css('overflow','hidden');
        else $('body,html').css('overflow','');
    });
</script>

<iframe src="editor.html" style="border:0;height:99999px;width:100%;"></iframe>