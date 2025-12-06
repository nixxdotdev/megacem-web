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
