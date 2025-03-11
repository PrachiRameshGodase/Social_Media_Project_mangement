import axios from 'axios';
const apiUrl = process.env.NEXT_PUBLIC_BASE_URL;
import toast from 'react-hot-toast';

// Helper function to get the token
const getAccessToken = () => localStorage.getItem('access_token');

// Create base axios instance
const axiosInstance = axios.create({
    baseURL: apiUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Set up interceptors to dynamically add Authorization token for each request
axiosInstance.interceptors.request.use((config) => {
    const token = getAccessToken();
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    } else {
        console.warn("No AccessToken found. Request will be sent without Authorization header.");
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Add response interceptor to handle errors globally
axiosInstance.interceptors.response.use(null, (error) => {
    if (error.response) {
        if (error.response.status === 500) {
            toast.error("Internal Server Error: Something went wrong on the server.");
        } else if (error.response.status === 401) {
            toast.error("Unauthorized: Please log in again.");
        }
        // Add more status-based error handling as needed
    }
    return Promise.reject(error);
});

// Export the default axios instance
export default axiosInstance;

// Create axios instance specifically for file uploads
export const axiosInstanceForFile = axios.create({
    baseURL: apiUrl,
    headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    },
});

// Set up interceptors for axiosInstanceForFile to dynamically add Authorization token
axiosInstanceForFile.interceptors.request.use((config) => {
    const token = getAccessToken();
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    } else {
        console.warn("No AccessToken found. File request will be sent without Authorization header.");
        toast.error("Authorization token is missing. File request cannot be processed.");
        // Optional: Reject the request if token is mandatory for file operations
        return Promise.reject(new Error("Authorization token is missing."));
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Add response interceptor for axiosInstanceForFile to handle errors
axiosInstanceForFile.interceptors.response.use(null, (error) => {
    if (error.response) {
        if (error.response.status === 500) {
            toast.error("File Server Error: Something went wrong while processing the file request.");
        } else if (error.response.status === 401) {
            toast.error("Unauthorized: File request failed due to missing/invalid token.");
        }
        // Add more status-based error handling as needed
    }
    return Promise.reject(error);
});
