// axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://api.store.tejasvaij.com', // replace with your API URL
});

// Request Interceptor to add the token
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('mutaengine-access-token'); // Adjust if you store tokens differently
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Function to refresh access token
const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('mutaengine-refresh-token');
    try {
        const response = await axios.post('https://api.store.tejasvaij.com/auth/refresh/', { refresh: refreshToken });
        const { access } = response.data;
        localStorage.setItem('mutaengine-access-token', access);
        return access; // Return the new access token
    } catch (error) {
        console.error('Failed to refresh token', error);
        // Handle token refresh failure (e.g., logout)
        localStorage.removeItem('mutaengine-access-token');
        localStorage.removeItem('mutaengine-refresh-token');
        window.location.href = '/login'; // Redirect to login page
        throw error; // Propagate the error
    }
};

// Response Interceptor to handle errors globally
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // Check for 401 Unauthorized error
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // Mark the request to prevent infinite loop
            try {
                const newAccessToken = await refreshAccessToken(); // Attempt to refresh token
                // Update the original request with the new token
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return axios(originalRequest); // Retry the original request
            } catch (err) {
                // If refresh fails, handle logout
                console.error('Token refresh failed', err);
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
