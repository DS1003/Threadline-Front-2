import axios from 'axios';

export const fetchRequest = async (method, url, data = null, token = null) => {
  try {

    const config = {
      method,
      url,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      data,
    };

    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.error(`${method} requête erreur :`, error);
    throw error.response?.data || error.message;
  }
};
