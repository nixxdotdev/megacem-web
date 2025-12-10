import API  from "../context/axiosInstance";

export const getGMCH = async ({ setResponse, setError, setLoading }) => {
  try {
    const response = await API.get('/gmch');

    if (response.data.success) {
      setResponse(response.data.data);
    } else {
      setError("Failed to fetch data.");
    }
  } catch (error) {
    setError("An error occurred while fetching data.");
    console.error(error);
  } finally {
    setLoading(false);
  }
};

export const addGMCH = async ({ formData, setResponse, setError, setLoading }) => {
  try {
    setLoading(true);

    const response = await API.post('gmch/add', formData);

    if (response.data.success) {
      setResponse(prev => [...prev, response.data.data]);  // append new row
    } else {
      setError("Failed to add data.");
    }

  } catch (error) {
    setError("An error occurred while adding data.");
    console.error(error);

  } finally {
    setLoading(false);
  }
};

