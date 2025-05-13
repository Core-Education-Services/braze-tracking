const brazeTracking = () => {
    const sdkKey = process.env.BRAZE_SDK_KEY_DEV;
    const instanceURL = process.env.BRAZE_INSTANCE_URL_DEV;
  
    if (!sdkKey || !instanceURL) {
        console.error("Missing: API Key or Instance URL");
        return;
    }
  
    /// V1 - Loads SDK upon page load ///
    braze.initialize(sdkKey, {
      baseUrl: instanceURL,
      devicePropertyAllowList: [
          "browser_name",
          "browser_version",
          "os_name",
          "os_version",
          "device_model",
          "device_type",
          "language"
      ]
    });

    braze.openSession();

  /// V1 End ///

    /// V2 - Loads SDK upon RFI submission ///
    // function loadBrazeSDK(callback) {
    //   if (!script) {
    //       script = document.createElement("script");
    //       script.src = "https://js.appboycdn.com/web-sdk/latest/appboy.min.js"; 
    //       script.async = true;
    //       document.head.appendChild(script);

    //       script.onload = function () {
    //         braze.initialize(sdkKey, {
    //           baseUrl: instanceURL,
    //           devicePropertyAllowList: [
    //               "browser_name",
    //               "browser_version",
    //               "os_name",
    //               "os_version",
    //               "device_model",
    //               "device_type",
    //               "language"
    //           ]
    //         });              
            
    //         braze.openSession();
    //         console.log("Braze tracking initialized");
    //         if (callback) callback();
    //       };
    //   } else if (callback) {
    //       callback();
    //   }
    // }
    /// V2 End ///


    // Tracking

    // Update once custom events are finalized
    window.trackPageView = function (pageName) {
      braze.logCustomEvent("Program Page Viewed", { page_name: pageName });
    };
  
    // Update once custom events are finalized
    window.trackRFIForm = function (programName, email, phoneNumber) {
      braze.logCustomEvent("RFI Submitted", { program: programName });
  
      if (email) {
        braze.getUser().setEmail(email);
      }
 
      if (phoneNumber) {
        braze.getUser().setEmail(phoneNumber);
      }
    };

    // Form Submission Handlers (Django, WP, SpiderNow)
    const formSelectors = [
      ".rfi-form-submit-button",
      "#submit-button",
      "#form-submit-button",
      "#rfi-submit"
    ];
  
    formSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            element.addEventListener("click", () => {
                const program = document.getElementById("program-selection").value;
                window.trackRFIForm(program);
            });
        });
    });


    // Capture RFI form dropoff as well. Will need to be an email reminder configured within Braze too

    // Campaign Triggers based on the pages viewed (program category specific)
 
  };

  brazeTracking();
  