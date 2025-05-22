function brazeTracking() {
    console.log("Inside Braze script");

    const sdkKey = window.BRAZE_SDK_KEY_DEV;
    const instanceURL = window.BRAZE_INSTANCE_URL_DEV;
    const fieldMap = window.BRAZE_FIELD_MAP || {
        email: "email",
        phone: "phone",
        program: "program",
        academic_partner: "academic_partner"
    };


    if (!sdkKey || !instanceURL) {
        console.error("Missing: API Key or Instance URL"); // Remove. Add Jill?
        return;
    }

    // Utils 
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(";").shift();
    }

    function setCookie(name, value, days) {
        const expires = new Date(Date.now() + days * 864e5).toUTCString();
        const secureFlag = window.location.protocol === "https:" ? "; Secure" : "";
        document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax${secureFlag}`;
    }

    function initializeBraze(userId) {
        if (!braze.isInitialized?.()) {
            braze.initialize(sdkKey, {
                baseUrl: instanceURL,
                // Automatic Data Collection
                devicePropertyAllowList: [
                    "browser_name",
                    "browser_version",
                    "os_name",
                    "os_version",
                    "device_model",
                    "device_type",
                    "language",
                    "timezone",
                    "user_agent",
                    "screen_width",
                    "screen_height"
                ]
            });
        }

        braze.changeUser(userId);
        braze.openSession();
        console.log("Braze session started for user:", userId); // Remove. Add Jill?
    }

    // Returning users
    let userId = getCookie("braze_user_id");
    if (userId) {
        console.log("Returning user detected:", userId); // Remove. Add Jill?
        initializeBraze(userId);
    }

    // SDK Initialization upon form submission
    document.addEventListener("submit", function (event) {
        const form = event.target;

        if (form.matches(".rfi-form, #rfi-form, #contact-form, #rfi-form-id")) {
            event.preventDefault();

            const email = form.querySelector(`[name='${fieldMap.email}']`)?.value.trim() || "";
            const phone = form.querySelector(`[name='${fieldMap.phone}']`)?.value.trim() || "";
            const program = form.querySelector(`[name='${fieldMap.program}']`)?.value.trim() || "";

            if (!userId) {
                userId = "user_" + Date.now(); // Temporary ID setup. Replace with hashed email? UUID?
                // userId = await hashEmail(email); 
                setCookie("braze_user_id", userId, 365);
                initializeBraze(userId);
                console.log("New user identified:", userId); // Remove. Add Jill?
            }

            const user = braze.getUser();

            // For testing. Will need to decide with team what we send via SDK vs. lakehouse
            if (email) user.setEmail(email);
            if (phone) user.setPhoneNumber(phone);
            if (program) user.setCustomUserAttribute("Program_Of_Interest", program);
            //


            // For testing. Will need to identify custom events with team and marketing
            // braze.logCustomEvent("RFI Submitted", {
            //     program: program,
            //     email: email,
            //     phone: phone
            // });

            console.log("RFI Submitted event logged for:", userId); // Remove. Add Jill?

            // form.submit();
        }
    });
}

brazeTracking();