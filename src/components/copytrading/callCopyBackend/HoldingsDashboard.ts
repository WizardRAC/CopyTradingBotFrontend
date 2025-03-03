// Define the data type for the request
import axios from "axios";
import GlobalState from '../../../GlobalState';

const globalState = GlobalState.getInstance();

let isHoldingsDashboard = false;

// Function to call the '/api/copytrade' endpoint
export const HoldingsDashboard = async (phantomWalletKey: string, targetWallet: string): Promise<any> => {
  try {
    if (isHoldingsDashboard) return; // Prevent multiple API calls
    const userId = globalState.getUserId();
    if (!userId) {
      console.log("getTargetWallets There isn't UserId. You have to refresh")
      return;
    }
    isHoldingsDashboard = true;
    console.log(' Send HoldingsDashboard Phantom Wallet Key');
   

    // Retrieve the access token from localStorage
    let accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      console.log('No access token found. Please log in.');
      return;
    }

    // Make the API request with the access token
    let response = await axios.post(
      'http://localhost:2000/api/copytrade/getDashboardInfo', 
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

    console.log('HoldingsDashboard Phantom Wallet Key:', response);

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
        return await HoldingsDashboard(phantomWalletKey, targetWallet);
      } else {
        console.log('Unable to refresh token. Please login again.');
      }
    } 
    console.error('Error:', error);
  } finally {
    isHoldingsDashboard = false;
  }
};


// Function to call the '/api/copytrade' endpoint
export const getMultiDashboardInfo = async (phantomWalletKey: string): Promise<any> => {
  try {
    if (isHoldingsDashboard) return; // Prevent multiple API calls
    isHoldingsDashboard = true;
    console.log(' Send HoldingsDashboard Phantom Wallet Key');
    

    // Retrieve the access token from localStorage
    let accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      console.log('No access token found. Please log in.');
      return;
    }

    // Make the API request with the access token
    let response = await axios.post(
      'http://localhost:2000/api/copytrade/getMultiDashboardInfo', 
      { phantomWalletKey },
      {
        headers: {
          Authorization: `Bearer ${accessToken}` // Include the access token
        }
      }
    );

    if (response.status !== 200) {
      throw new Error('API request failed');
    }


    console.log('HoldingsDashboard Phantom Wallet Key:', response);

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
        return await getMultiDashboardInfo(phantomWalletKey);
      } else {
        console.log('Unable to refresh token. Please login again.');
      }
    } 
    console.error('Error:', error);
  } finally {
    isHoldingsDashboard = false;
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
