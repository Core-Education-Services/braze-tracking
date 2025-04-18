import requests
import json
import logging

# Braze API Credentials
BRAZE_API_URL = ""
BRAZE_API_KEY = ""


# Add retries?
# Batch processing?

def send_data_to_braze(user_data):
    """ Sends user data to Braze for tracking. """
    try:
        payload = {
            "api_key": BRAZE_API_KEY,
            "attributes": [{
                "external_id": user_data["email"],  # Unique identifier
                "email": user_data["email"],
                "custom_attributes": {
                    "last_rfi_program": user_data["program"],
                    "utm_source": user_data.get("utm_source", "unknown")
                }
            }]
        }

        response = requests.post(BRAZE_API_URL, json=payload)

        if response.status_code == 201:
            logging.info(f"Successfully sent data to Braze for {user_data['email']}")
        else:
            logging.error(f"Failed to send data to Braze: {response.text}")

    except Exception as e:
        logging.error(f"Error sending data to Braze: {str(e)}")
