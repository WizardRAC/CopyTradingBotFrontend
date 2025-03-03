// Define the data type for the request
import axios from "axios";

let isGenerateWhalesXWallet = false;

// Function to call the '/api/copytrade' endpoint
export const generateWhalesXWallet = async (phantomWalletKey: string) => {
  try {
    if (isGenerateWhalesXWallet) return; // Prevent multiple API calls
    isGenerateWhalesXWallet = true;

    console.log('generateWhalesXWallet phantomWalletKey: ', phantomWalletKey);

    const response = await axios.post('http://localhost:2000/api/copytrade/generateWhalesXWallet', { phantomWalletKey });
    if (!response) {
      throw new Error('generateWhalesXWallet request failed');
    }
    // const { data } = response.data

    // if (jwtToken) {
    //   // Store JWT token in localStorage (or HttpOnly cookies for better security)
    //   localStorage.setItem('accessToken', jwtToken.accessToken);
    //   localStorage.setItem('refreshToken', jwtToken.refreshToken);
    // } else {
    //   return;
    // }
    return response.data.data; 
  } catch (error) {
    console.error('Error:', error);
  } finally {
    isGenerateWhalesXWallet = false;
  }
};