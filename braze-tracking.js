const brazeTracking = () => {
    const brazeAPIKey = process.env.BRAZE_API_KEY;
    const brazeInstanceURL = process.env.BRAZE_INSTANCE_URL;
  
    if (!brazeAPIKey || !brazeInstanceURL) {
        console.error("Missing: API Key or Instance URL");
        return;
    }
  
    let script = document.createElement("script");
    
    script.src = "https://js.appboycdn.com/web-sdk/latest/appboy.min.js"; 
    script.async = true;
    document.head.appendChild(script);
  
    script.onload = function () {
      appboy.initialize(brazeAPIKey, { baseUrl: brazeInstanceURL });
      appboy.openSession();
  
      console.log("Braze tracking initialized");
    };

    ///// Tracking
  
    // Page views
    window.trackPageView = function (pageName) {
      appboy.logCustomEvent("Page Viewed", { page_name: pageName });
    };
  
    // RFI form submission
    window.trackRFIForm = function (programName, email, phoneNumber) {
      appboy.logCustomEvent("RFI Submitted", { program: programName });
  
      if (email) {
        appboy.getUser().setEmail(email);
      }
 
      if (phoneNumber) {
        appboy.getUser().setEmail(phoneNumber);
      }
    };

    // Django
    document.getElementsByClassName("rfi-form-submit-button").addEventListener("click", () => {
        const program = document.getElementById("program-selection").value;
        braze.logCustomEvent("RFI Form Submitted", { program_interest: program });
    });

    document.getElementById("submit-button").addEventListener("click", () => {
        const program = document.getElementById("program-selection").value;
        braze.logCustomEvent("RFI Form Submitted", { program_interest: program });
    });

    // WP - Legacy
    document.getElementById("form-submit-button").addEventListener("click", () => {
        const program = document.getElementById("program-selection").value;
        braze.logCustomEvent("RFI Form Submitted", { program_interest: program });
    });

    // WP - ER
    document.getElementById("rfi-submit").addEventListener("click", () => {
        const program = document.getElementById("program-selection").value;
        braze.logCustomEvent("RFI Form Submitted", { program_interest: program });
    });

    // SpiderNow
    document.getElementById("rfi-submit").addEventListener("click", () => {
        const program = document.getElementById("program-selection").value;
        braze.logCustomEvent("RFI Form Submitted", { program_interest: program });
    });


    // Capture RFI form dropoff as well. Will need to be an email reminder configured within Braze too

    // Campaign Triggers based on the pages viewed (program category specific)

  };

  brazeTracking();
  