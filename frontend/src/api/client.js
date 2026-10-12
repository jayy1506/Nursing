// Resolve API endpoint against configured environment base URL
export const getApiUrl = (endpoint = '') => {
  const baseUrl = (import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || '').trim().replace(/\/$/, '');
  if (!baseUrl) return endpoint;
  if (endpoint.startsWith('http://') || endpoint.startsWith('https://')) return endpoint;

  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  if (baseUrl.endsWith('/api') && cleanEndpoint.startsWith('/api/')) {
    return `${baseUrl}${cleanEndpoint.slice(4)}`;
  }
  return `${baseUrl}${cleanEndpoint}`;
};

export const apiClient = async (endpoint, options = {}) => {
  const url = getApiUrl(endpoint);
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
    const response = await fetch(url, config);
    const data = await response.json();
    return data;
  } catch (error) {
    console.warn(`[API Client Error] ${url}:`, error.message);
    return { success: false, error: error.message };
  }
};

export default apiClient;
