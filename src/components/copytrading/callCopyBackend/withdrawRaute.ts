// Define the data type for the request
import axios from "axios";
import GlobalState from '../../../GlobalState';

const globalState = GlobalState.getInstance();
let isWithdrawRaute = false;

// Function to call the '/api/copytrade' endpoint
export const withdrawRaute = async (phantomWalletKey: string, amount: number, receiver: string): Promise<any> => {
  try {
    if (isWithdrawRaute) return; // Prevent multiple API calls
    const userId = globalState.getUserId();
    if (!userId) {
      console.log("getTargetWallets There isn't UserId. You have to refresh")
      return;
    }
    isWithdrawRaute = true;


    // Retrieve the access token from localStorage
    let accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      console.log('No access token found. Please log in.');
      return;
    }

    // Make the API request with the access token
    let response = await axios.post(
      'http://localhost:2000/api/copytrade/withdrawRaute', 
      { phantomWalletKey, receiver, amount, userId },
      {
        headers: {
          Authorization: `Bearer ${accessToken}` // Include the access token
        }
      }
    );

    if (response.status !== 200) {
      throw new Error('API request failed');
    }

    if (!response) {
      throw new Error('API request failed');
    }

    console.log('API Response: ', response.data);
    return response.data;
  } catch (error) {
    const errorStatus: any = error;
    if (errorStatus.response.status === 403) {
      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        // Retry the request with the new access token
        return await withdrawRaute(phantomWalletKey, amount, receiver );
      } else {
        console.log('Unable to refresh token. Please login again.');
      }
    } 
    console.error('Error:', error);
  } finally {
    isWithdrawRaute = false;
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
