// View functions to handle UI rendering
var TabView = {
    createTab: function (tabId, iframe) {
        var tabContainer = $("<div>").addClass("tab").attr("id", tabId).html("Tab " + TabModel.tabCounter);

        var closeButton = $("<span>").addClass("close-tab-btn").html("&times;");
        tabContainer.append(closeButton); // Append close button to tab

        tabContainer.click(function () {
            $(".tab").removeClass("active");
            $(this).addClass("active");
            $(".tab-iframe").hide(); // Hide all iframes
            iframe.show(); // Show only the current iframe
        });

        $(".tab-bar").append(tabContainer); // Append tab to tab bar

        // Add "active" class to newly created tab
        $(".tab").removeClass("active");
        tabContainer.addClass("active");

        return tabContainer;
    },


    createIframe: function (tabId) {
        var iframeCounter = tabId.split("tab")[1];
        var iframeId = "iframe" + iframeCounter;

        var iframe = $("<iframe>").attr("id", iframeId).addClass("tab-iframe");
        $("#tabs-container").append(iframe);

        // Set iframe CSS properties
        iframe.css({
            "width": "99%",
            "height": "calc(100vh - 65px)" // Adjust for tab bar height
        });
        //to get the iframe body
        var iframeDocument = $("#" + iframeId)[0].contentWindow.document;
        var iframeBody = $(iframeDocument.body);
        var inputContainer = $("<div>");
        var label = $("<label>").text("Please add URL here : ");
        var inputBox = $("<input>").attr("type", "text");
        var submitBtn = $("<button>").text("Submit").css({
            "background-color": "#4CAF50",
            "color": "white",
            "padding": "8px 16px",
            "border": "none",
            "border-radius": "5px",
            "cursor": "pointer",
            "margin-left": "5px"
        });

        inputContainer.append(label);
        inputContainer.append(inputBox);
        inputContainer.append(submitBtn);

        iframeBody.append(inputContainer);

        submitBtn.click(function () {
            var url = inputBox.val();
            $("#loader").show(); // Show loader
            //url gets appended to src attribute and the data from that website loads into the iframe
            iframe.attr("src", url);
        });

        // Hide loader when iframe is loaded
        iframe.on('load', function () {
            $("#loader").hide(); // Hide loader
        });

        return iframe;
    }
};
