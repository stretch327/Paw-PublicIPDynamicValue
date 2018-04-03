// Gets and returns the user's public IP
var publicip = function() {
    // implement the evaluate() method to generate the dynamic value
    this.evaluate = function() {
        // get value from https://api.ipify.org
        const http_request = new NetworkHTTPRequest();
        http_request.requestUrl = "https://api.ipify.org";
        http_request.requestMethod = "GET";
        http_request.requestTimeout = 3600000;
        http_request.send()

        var ip = http_request.responseBody;

        this.value = ip;

        if (this.convertToInt) {
            var parts = ip.split(".");
            var n = 0;
            for (i = 0; i < parts.length; i++) {
                n = n * 256 + parseInt(parts[i]);
            }
            this.value = n.toString(10);
            return n;
        }

        return ip;
    }

    this.title = function(context) {
        if (this.convertToInt) {
            return "Public IP Address as Integer";
        }
        return "Public IP Address";
    }

    this.text = function(context) {
        return this.value;
        return "PublicIP";
    }
}

// User Options
publicip.inputs = [
    InputField("convertToInt", "Convert to Integer", "Checkbox", { defaultValue: false })
];

// set the Extension Identifier (must be same as the directory name)
publicip.identifier = "com.stretchedout.publicip";

// give a display name to your Dynamic Value
publicip.title = "Public IP Address";

// call to register function is required
registerDynamicValueClass(publicip)