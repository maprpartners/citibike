$(document).ready(function ()
{
    var browser = navigator.appName;
    var ie = "Microsoft Internet Explorer";
    var ua = navigator.userAgent.toLowerCase();
    var mobile = (ua.indexOf("mobile") != -1);
    if (!mobile) { mobile = (ua.indexOf("silk/1.0") != -1); }

    // check language cookie early on in case we need to reload the correct page
    CheckLanguageCookie();

    if (!mobile)
    {

        document.getElementsByTagName("body")[0].style.overflow = "hidden";

        $("li.awstoc.closed ul").hide();

        var thispageTocEntry = $("li.awstoc a[href='" + thispage + "']");
        if (thispageTocEntry.length)
        {
            if (thispageTocEntry.position().top > $("#divLeft").height())
            {
                $("#divLeft").scrollTop(thispageTocEntry.position().top - 5);
            }
        }

        $("li.awstoc").bind("click", function (event)
        {
            event.stopPropagation();

            if (event.target.nodeName == "LI")
            {
                if ($(event.target).hasClass("closed") || $(event.target).hasClass("opened"))
                {
                    $(event.target).toggleClass("closed opened");
                    if ($(event.target).hasClass("closed"))
                    {
                        $(event.target).children("ul").hide();
                    }
                    if ($(event.target).hasClass("opened"))
                    {
                        $(event.target).children("ul").show();
                    }
                }
            }
        });


        if ((browser != ie) || ((browser == ie) && (navigator.appVersion >= 5.0)))
        {

            $("#divLeft").resizable({
            });

            $("#divLeft").bind("resize", function (event, ui)
            {
                resizePanes();
            });

        }


        resizePanes();
        window.onresize = resizePanes;

        if (location.hash != null && location.hash.length > 0 && ua.indexOf("firefox") > 0)
        {
            location.hash = location.hash;
        }
    }
});

function resizePanes()
{
    var setWidth = $("#divLeft").width();
    var headerWidth = $("#divHeader").width();
    var headerHeight = $("#divHeader").height();
    var searchHeight = $("#divSearch").height();
    var headerNavWidth = $("#divHeaderNav").width();
    var checkPosition = $("#divRight").position();
    var logoWidth = 210;

    $("#divTOC").width(setWidth - 6);
    $("#divRight").width(headerWidth - setWidth - 5);
    $("#divRight").height($(window).height() - headerHeight - 10);
    $("#divContent").height($(window).height() - headerHeight - 10);
    $("#divLeft").height($(window).height() - headerHeight);
    $("#divTOC").height($(window).height() - headerHeight - searchHeight - 30);
    $("#sq").width($("#sel").width() - 30);

    // adjust to avoid long breadcrumb problems

    if ((headerWidth - logoWidth - headerNavWidth) > 200)
    {
        $("#txt").width(headerWidth - logoWidth - headerNavWidth - 50);
    }
    else
    {
        $("#txt").width("auto");
    }

    // in odd cases where the content div is too big, reduce the size again
    if (checkPosition.left == 0)
    {
        $("#divRight").width($("#divRight").width() - 10);
    }


}

function searchFormSubmit(formElement)
{
    //#facet_doc_product=Amazon+CloudFront&amp;facet_doc_guide=Developer+Guide+(API+Version+2012-07-01)
    var so = $("#sel").val();
    if (so.indexOf("documentation") === 0)
    {
        var this_doc_product = $("#this_doc_product").val();
        var this_doc_guide = $("#this_doc_guide").val();
        var action = "";
        var facet = "";
        if (so === "documentation-product" || so === "documentation-guide")
        {
            action += "?doc_product=" + encodeURIComponent(this_doc_product);
            facet += "#facet_doc_product=" + encodeURIComponent(this_doc_product);
            if (so === "documentation-guide")
            {
                action += "&doc_guide=" + encodeURIComponent(this_doc_guide);
                facet += "&facet_doc_guide=" + encodeURIComponent(this_doc_guide);
            }
        }

        var ua = window.navigator.userAgent;
        var msie = ua.indexOf('MSIE ');
        var trident = ua.indexOf('Trident/');

        if (msie > 0 || trident > 0)
        {
            var sq = $("#sq").val();
            action += "&searchPath=" + encodeURIComponent(so);
            action += "&searchQuery=" + encodeURIComponent(sq);
            window.location.href = "/search/doc-search.html" + action + facet;
            return false;
        } else
        {
            formElement.action = "/search/doc-search.html" + facet;
        }
    } else
    {
        formElement.action = "http://aws.amazon.com/search";
    }
    return true;
}

function SelectLanguage()
{
    var languageCookieName = "aws-doc-lang";
    var targetUrl = $("#languageSelection").val();
    var selectedLanguage = targetUrl.substring(1, 6);
    var d = new Date();
    d.setTime(d.getTime() + (14 * 24 * 60 * 60 * 1000));

    SetCookie(languageCookieName, selectedLanguage);

    if (location.href.indexOf(targetUrl) < 0)
    {
        location.href = targetUrl;
    }
}

function SetCookie(name, value)
{
    var days = 14;
    var d = new Date();

    // set expire date to milliseconds
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));

    document.cookie = name + "=" + value + ";expires=" + d.toUTCString() + ";path=/";

}

function CheckLanguageCookie()
{
    try
    {
        var languageCookieName = "aws-doc-lang";
        var languageCookieValue = getCookie(languageCookieName);
        var currentSelectorUrl = $("#languageSelection").val();
        var pageLocale = currentSelectorUrl.substring(1, 6);
        var pageBasePath = currentSelectorUrl.substring(6);
        var cookieUrl = "/" + languageCookieValue + pageBasePath;

        var currentUrl = location.href;
        var pathIndex = currentUrl.indexOf(pageBasePath);

        if (pathIndex >= 6)
        {
            var startIndex = pathIndex - 5;
            var urlLocale = currentUrl.substring(startIndex, pathIndex);
            var urlLocaleStart = currentUrl.substring(startIndex - 1, startIndex);

            // Check if this page is in locale folder...
            if ((urlLocaleStart == "/") && (urlLocale.substring(2, 3) == "_"))
            {
                // Locale Folder Handling Section
                // Check if the locale of the content and the locale folder agreee
                if (pageLocale != urlLocale)
                {
                    var currentSelection = $('option:selected', 'select[id="languageSelection"]');
                    var displayText = " Translation Unavailable (Displaying: " + currentSelection.text() + ")";

                    // remove selected attribute from the currently selected option
                    currentSelection.removeAttr('selected');

                    // add option that captures the preferred language and display language
                    $("#languageSelection").append($("<option selected=\"selected\" enabled=\"false\">" + displayText + "</option>"));
                }

            }
            else
            {
                // Root Folder Handling Section
                // Normally taken care of by the server, but checking in case of a cached version is being displayed.
                if ((languageCookieValue != "") && (languageCookieValue != pageLocale))
                {
                    location.href = cookieUrl;
                }
            }
        }

        // check if cookie is set
        if (languageCookieValue.length == 5)
        {
            var cookieOption = $('select[id="languageSelection"]').find('option[value="' + cookieUrl + '"]');

            // refresh cookie
            SetCookie(languageCookieName, languageCookieValue);

            // Add checkmark to the language specified by the cookie...
            cookieOption.html(cookieOption.text() + "&nbsp;&#10003;");

        }
    }
    catch (error)
    {
        // content does not support the language selector.
    }
}

function getCookie(cname)
{
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++)
    {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
}


