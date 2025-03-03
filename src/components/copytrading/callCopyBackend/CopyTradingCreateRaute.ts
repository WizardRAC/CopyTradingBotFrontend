// Define the data type for the request
import axios from "axios";
import GlobalState from '../../../GlobalState';

const globalState = GlobalState.getInstance();

let isCopyTradingCreateLoading = false;
// Function to call the '/api/copytrade' endpoint
export async function CopyTradingCreate(requestData: any) {
  try {
    if (isCopyTradingCreateLoading) return; // Prevent multiple API calls
    const userId = globalState.getUserId();
    if (!userId) {
      console.log("getTargetWallets There isn't UserId. You have to refresh")
      return;
    }
    isCopyTradingCreateLoading = true;


    // Retrieve the access token from localStorage
    let accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      console.log('No access token found. Please log in.');
      return;
    }

    // Make the API request with the access token
    let response = await axios.post(
      'http://localhost:2000/api/copytrade/copyTradingCreate', 
      { userId, requestData },
      {
        headers: {
          Authorization: `Bearer ${accessToken}` // Include the access token
        }
      }
    );

    if (response.status !== 200) {
      throw new Error('API request failed');
    }

    console.log("join response:", response.data);
    // Check if the response is ok (status code 200-299)
    if (!response) {
      throw new Error('API request failed');
    }
    isCopyTradingCreateLoading = false;
  } catch (error) {
    const errorStatus: any = error;
    if (errorStatus.response.status === 403) {
      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        // Retry the request with the new access token
        return await CopyTradingCreate(requestData);
      } else {
        console.log('Unable to refresh token. Please login again.');
      }
    } 
    console.error('Error:', error);
  } finally {
    isCopyTradingCreateLoading = false;
  }
};



let getCopyTradingStrategyLoading = false;
export async function getCopyTradingStrategy(phantomWalletKey: String, targetWallet: String) {
  try {
    if (getCopyTradingStrategyLoading) return; // Prevent multiple API calls
    const userId = globalState.getUserId();
    if (!userId) {
      console.log("getTargetWallets There isn't UserId. You have to refresh")
      return;
    }
    getCopyTradingStrategyLoading = true;

    // Retrieve the access token from localStorage
    let accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      console.log('No access token found. Please log in.');
      return;
    }

    console.log("getCopyTradingStrategy phantomWalletKey = ", phantomWalletKey, " targetAddress = ", targetWallet)
    
    // Make the API request with the access token
    let response = await axios.post(
      'http://localhost:2000/api/copytrade/getCopyTradingStrategy', 
      { userId, phantomWalletKey, targetWallet },
      {
        headers: {
          Authorization: `Bearer ${accessToken}` // Include the access token
        }
      }
    );

    if (response.status !== 200) {
      throw new Error('API request failed');
    }

    // Check if the response is ok (status code 200-299)
    getCopyTradingStrategyLoading = false;
    if (!response) {
      throw new Error('API request failed');
    }
    return response.data;

  } catch (error) {
    const errorStatus: any = error;
    if (errorStatus.response.status === 403) {
      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        // Retry the request with the new access token
        return await getCopyTradingStrategy(phantomWalletKey, targetWallet);
      } else {
        console.log('Unable to refresh token. Please login again.');
      }
    } 
    console.error('Error:', error);
  } finally {
    getCopyTradingStrategyLoading = false;
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