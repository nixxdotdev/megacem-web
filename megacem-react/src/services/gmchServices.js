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

export const updateGMCH = async ({ id, formData, setResponse, setError, setLoading }) => {
  try {
    setLoading(true);
    const res = await API.put(`gmch/update/${id}`, formData);

    if (res.data.success) {
      setResponse(prev =>
        prev.map(item => item._id === id ? res.data.data : item)
      );
    }
  } catch (err) {
    setError("Failed to update data");
  } finally {
    setLoading(false);
  }
};

export const deleteGMCH = async ({ id, setResponse, setError, setLoading }) => {
  try {
    const res = await API.delete(`gmch/delete/${id}`);

    if (res.data.success) {
      setResponse(prev => prev.filter(item => item._id !== id));
    } else {
      setError("Failed to delete data.");
    }
  } catch (err) {
    setError("An error occurred while deleting data.");
    console.error(err);
  } finally {
    setLoading(false);
  }
};


