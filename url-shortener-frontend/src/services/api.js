import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const shortenUrl = async (originalUrl) => {
  try {
    const response = await api.post('/shorten/', { original_url: originalUrl });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to shorten URL');
  }
};

export const getUrlAnalytics = async (shortCode) => {
  try {
    const response = await api.get(`/analytics/${shortCode}/`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to fetch analytics');
  }
};