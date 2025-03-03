// Define the data type for the request
import axios from "axios";
import GlobalState from '../../../GlobalState';

const globalState = GlobalState.getInstance();

let isactivateCopyTradingRaute = false;

// Function to call the '/api/copytrade' endpoint
export const activateCopyTradingRaute = async (phantomWalletKey: string, targetWallet: string, isActive: boolean): Promise<any>=> {
  try {
    if (isactivateCopyTradingRaute) return; // Prevent multiple API calls
    const userId = globalState.getUserId();
    if (!userId) {
      console.log("getTargetWallets There isn't UserId. You have to refresh")
      return;
    }
    isactivateCopyTradingRaute = true;

    // Retrieve the access token from localStorage
    let accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      console.log('No access token found. Please log in.');
      return;
    }

    // Make the API request with the access token
    let response = await axios.post(
      'http://localhost:2000/api/copytrade/copyTradingset', 
      { userId, phantomWalletKey, targetWallet, isActive },
      {
        headers: {
          Authorization: `Bearer ${accessToken}` // Include the access token
        }
      }
    );

    if (response.status !== 200) {
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
        return await activateCopyTradingRaute(phantomWalletKey, targetWallet, isActive);
      } else {
        console.log('Unable to refresh token. Please login again.');
      }
    } 
    console.error('Error:', error);
  } finally {
    isactivateCopyTradingRaute = false;
  }
};

let isgetTargetWallets = false;

// Function to call the '/api/copytrade' endpoint
export const getTargetWallets = async (phantomWalletKey: string): Promise<any> => {
  try {
    if (isgetTargetWallets) return; // Prevent multiple API calls
    const userId = globalState.getUserId();
    if (!userId) {
      console.log("getTargetWallets There isn't UserId. You have to refresh")
      return;
    }
    isgetTargetWallets = true;

    // Retrieve the access token from localStorage
    let accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      console.log('No access token found. Please log in.');
      return;
    }

    // Make the API request with the access token
    let response = await axios.post(
      'http://localhost:2000/api/copytrade/getTargetWallets', 
      { userId, phantomWalletKey },
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

    if (response.data.length = 0) {
      throw new Error('there isnt target');
    }
    
    return response.data.data;
  } catch (error) {
    const errorStatus: any = error;
    if (errorStatus.response.status === 403) {
      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        // Retry the request with the new access token
        return await getTargetWallets(phantomWalletKey);
      } else {
        console.log('Unable to refresh token. Please login again.');
      }
    } 
    console.error('Error:', error);
  } finally {
    isgetTargetWallets = false;
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

let isDeleteTargetWallets = false;
// Function to call the '/api/copytrade' endpoint
export const getDeleteWallets = async (phantomWalletKey: string, targetWallet: string): Promise<any> => {
  try {
    if (isDeleteTargetWallets) return; // Prevent multiple API calls
    const userId = globalState.getUserId();
    if (!userId) {
      console.log("getDeleteWallets There isn't UserId. You have to refresh");
      return;
    }

    isDeleteTargetWallets = true;

    // Retrieve the access token from localStorage
    let accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      console.log('No access token found. Please log in.');
      return;
    }

    // Make the API request with the access token
    let response = await axios.post(
      'http://localhost:2000/api/copytrade/getDeleteWallets', 
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

    return response.data;  // Return the data if the request is successful

  } catch (error) {
    const errorStatus: any = error;
    if (errorStatus.response.status === 403) {
      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        // Retry the request with the new access token
        return await getDeleteWallets(phantomWalletKey, targetWallet);
      } else {
        console.log('Unable to refresh token. Please login again.');
      }
    } 
    console.error('Error:', error);
  } finally {
    isDeleteTargetWallets = false;
  }
};