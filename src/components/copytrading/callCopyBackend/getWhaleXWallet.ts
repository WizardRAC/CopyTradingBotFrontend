// Define the data type for the request
import axios from "axios";

// Function to call the '/api/copytrade' endpoint
export const getWhaleXWallet = async (phantomWalletKey: string) => {
  try {
    console.log('getWhaleXWallet phantomWalletKey: ', phantomWalletKey);

    const response = await axios.post('http://localhost:2000/api/copytrade/getWhaleXWallet', { phantomWalletKey });

    if (!response) {
      throw new Error('getWhaleXWallet request failed');
    }

    console.log('getWhaleXWallet Response: ', response);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
  }
};


export const getWhaleXWalletPublickey = async (phantomWalletKey: string): Promise<string | undefined>  => {
  try {
    console.log('getWhaleXWalletPublickey phantomWalletKey: ', phantomWalletKey);


    // Retrieve the access token from localStorage
    let accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      console.log('No access token found. Please log in.');
      return;
    }

    // Make the API request with the access token
    let response = await axios.post(
      'http://localhost:2000/api/copytrade/getWhaleXWalletPublickey', 
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

    if (!response) {
      throw new Error('getWhaleXWalletPublickey request failed');
    }
    
    console.log('getWhaleXWalletPublickey Response: ', response.data.publicKey);
    return response.data.publicKey;
  } catch (error) {
    const errorStatus: any = error;
    if (errorStatus.response.status === 403) {
      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        // Retry the request with the new access token
        return await getWhaleXWalletPublickey(phantomWalletKey);
      } else {
        console.log('Unable to refresh token. Please login again.');
      }
    } 
    console.error('Error:', error);
  }
};

let isSaveWhaleXWallet = false;

// Function to call the '/api/copytrade' endpoint
export const saveWhaleXWallet = async (walletData: any): Promise<any> => {
  try {
    if (isSaveWhaleXWallet) return; // Prevent multiple API calls
    isSaveWhaleXWallet = true;

    let response = await axios.post(
      'http://localhost:2000/api/copytrade/saveWhaleXWallet', 
      { walletData },
    );

    if (response.data.message == "Wallet data save failed") {
      return response.data.message;
    }

    if (!response) {
      throw new Error('saveWhaleXWallet request failed');
    }
    return response.data.jwtToken;
  } catch (error) {
    console.error('Error:', error);
  } finally {
    isSaveWhaleXWallet = false;
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

