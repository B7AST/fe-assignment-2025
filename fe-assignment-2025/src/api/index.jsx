import axios from 'axios';

// Code to make API requests
const apiRequest = axios.create({
  baseURL: 'https://686547495b5d8d0339808f5d.mockapi.io/spitogatos/api/customer-email-lookup',
  timeout: 3000, // 3 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiRequest;