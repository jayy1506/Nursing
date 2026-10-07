export const apiClient = async (endpoint, options = {}) => {
  const token = localStorage.getItem('nursing_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers
  };

  const config = {
    ...options,
    headers
  };

  try {
    const response = await fetch(endpoint, config);
    const data = await response.json();
    return data;
  } catch (error) {
    console.warn(`[API Client Error] ${endpoint}:`, error.message);
    return { success: false, error: error.message };
  }
};

export default apiClient;
