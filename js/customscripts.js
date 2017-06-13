
//$('#mysidebar').height($(".nav").height());


$( document ).ready(function() {

    // activate tooltips. although this is a bootstrap js function, it must be activated this way in your theme.
    $('[data-toggle="tooltip"]').tooltip({
        placement : 'top'
    });

    /**
     * AnchorJS
     */
    anchors.add('h2,h3,h4,h5');

    // Algolia docsearch styling
    $("#algolia-docsearch").css("width", "0px");

    $( "#algolia-toggle" ).click(function() {
        $("#algolia-docsearch").css("width", "250px");
        $("#algolia-docsearch").css("background", "#ffffff");
        $("#algolia-docsearch").focus();
        $(".navbar-toggle").hide();
    });

    $("#algolia-docsearch").focusout(function() {
        $("#algolia-docsearch").attr("style", "");
        $(".navbar-toggle").show();
    });


});

// needed for nav tabs on pages. See Formatting > Nav tabs for more details.
// script from http://stackoverflow.com/questions/10523433/how-do-i-keep-the-current-tab-active-with-twitter-bootstrap-after-a-page-reload
$(function() {
    $('#mysidebar b').parents('li').addClass("active");
    $('#mysidebar b').closest('li').removeClass("active");

    var json, tabsState;
    $('a[data-toggle="pill"], a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
        var href, json, parentId, tabsState;

        tabsState = localStorage.getItem("tabs-state");
        json = JSON.parse(tabsState || "{}");
        parentId = $(e.target).parents("ul.nav.nav-pills, ul.nav.nav-tabs").attr("id");
        href = $(e.target).attr('href');
        json[parentId] = href;

        return localStorage.setItem("tabs-state", JSON.stringify(json));
    });

    tabsState = localStorage.getItem("tabs-state");
    json = JSON.parse(tabsState || "{}");

    $.each(json, function(containerId, href) {
        return $("#" + containerId + " a[href=" + href + "]").tab('show');
    });

    $("ul.nav.nav-pills, ul.nav.nav-tabs").each(function() {
        var $this = $(this);
        if (!json[$this.attr("id")]) {
            return $this.find("a[data-toggle=tab]:first, a[data-toggle=pill]:first").tab("show");
        }
    });

    $( "#marketing-nav #main-menu>li" ).hover( function() {
          $("#marketing-nav li").removeClass("open");
          $(this).addClass("open");
    });
});
