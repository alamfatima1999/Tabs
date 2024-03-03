// Controller to handle user interactions

var TabController = {
  init: function () {
    // Attach event handlers on Initialization
    //Here it attaches a clickhandler defined in this file with respect to close Tab buton
    $(".tab-bar").on("click", ".close-tab-btn", TabController.closeTab);
    //Here it attaches click handler defined here with add-tab-btn
    $("#add-tab-btn").click(TabController.addTab);
  },

  // function to close Tab
  closeTab: function (event) {
    event.stopPropagation();
    var tabId = $(this).closest(".tab").attr("id");
    $("#" + tabId).remove();
    $("#" + tabId.replace("tab", "iframe")).remove();
    if ($(".tab").length > 0) {
      $(".tab").last().click();
    }
    // Check if all tabs are closed
    if ($(".tab").length === 0) {
      TabModel.tabCounter = 0; // Reset tabCounter to zero
    }
  },

  // function to Add Tab
  addTab: function () {
    TabModel.tabCounter++;
    var tabId = "tab" + TabModel.tabCounter;

    // Hide all iframes  by default
    $(".tab-iframe").hide();

    // Pass iframe to createTab
    var iframe = TabView.createIframe(tabId);
    var tab = TabView.createTab(tabId, iframe);
    return tab;
  },
};

// Initialize the controller
TabController.init();
