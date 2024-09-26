// sendSOSAlert.js
import axios from 'axios';

const API_URL = 'https://port-0-rangers-be-m1dcjhj379a3cf53.sel4.cloudtype.app/api/sos';

export async function sendSOSAlert(dependantId, currentLocation, trackingLink = "link") {
  try {
    const response = await axios.post(
      API_URL,
      {
        dependantId,
        currentLocation,
        trackingLink,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          accept: '*/*',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error sending SOS alert:', error);
    throw error;
  }
}
