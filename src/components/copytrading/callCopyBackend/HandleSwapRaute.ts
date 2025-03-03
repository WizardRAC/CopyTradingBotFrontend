// Define the data type for the request
import axios from "axios";

let isHandleSwapRaute = false;

// Function to call the '/api/copytrade' endpoint
export async function HandleSwapRaute(type: string, amount: number, tokenAddress: String) {
  try {
    console.log("HandleSwapRaute publickey = ", type)

    if (!isHandleSwapRaute) {
      isHandleSwapRaute = true;

    // Retrieve the access token from localStorage
    let accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      console.log('No access token found. Please log in.');
      return;
    }

    // Make the API request with the access token
    let response = await axios.post(
      'http://localhost:2000/api/copytrade/HandleSwap', 
      { type, amount, tokenAddress },
      {
        headers: {
          Authorization: `Bearer ${accessToken}` // Include the access token
        }
      }
    );

      console.log("join response:", response.status);
      isHandleSwapRaute = false;
      // Check if the response is ok (status code 200-299)
      if (!response) {
        throw new Error('API request failed');
      }


      if (response.status == 200)
        return true;
      else
        return false;
    }
  } catch (error) {
    const errorStatus: any = error;
    if (errorStatus.response.status === 403) {
      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        // Retry the request with the new access token
        return await HandleSwapRaute(type, amount, tokenAddress);
      } else {
        console.log('Unable to refresh token. Please login again.');
      }
    } 
    console.error('Error:', error);
  }
};


// Utility to refresh the access token using the refresh token
const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      console.log('No refresh token found. Please log in.');
      return null;
    }

    const response = await axios.post('http://localhost:2000/api/copytrade/refreshToken', { refreshToken });
    if (response.data.accessToken) {
      // Store the new access token in localStorage
      localStorage.setItem('accessToken', response.data.accessToken);
      return response.data.accessToken;
    } else {
      console.log('Refresh token expired or invalid');
      return null;
    }
  } catch (error) {
    console.error('Error refreshing access token:', error);
    return null;
  }
};
