## Editor

<script>
    $('nav').on('click', function () {
        if ($('#editor.section:not(.hide)').size() > 0) { $('html').css('overflow','hidden'); $('body').css('overflow','scroll'); }
        else $('body,html').css('overflow','');
    });
</script>

<iframe src="editor.html" style="border:0;height:99999px;width:100%;"></iframe>