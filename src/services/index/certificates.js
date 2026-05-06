import axios from "axios";

export const getAllCertificates = async (searchKeyword = "", page = 1, limit = 6) => {
  try {
    const { data, headers } = await axios.get(
      `/api/certificates?searchKeyword=${searchKeyword}&page=${page}&limit=${limit}`
    );
    return { data, headers };
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};


export const getSingleCertificate = async ({ id }) => {
  try {
    const { data } = await axios.get(`/api/certificates/${id}`);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const createCertificate = async ({ token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post("/api/certificates", {}, config);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const updateCertificate = async ({ token, formData, id }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await axios.put(`/api/certificates/${id}`, formData, config);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const deleteCertificate = async ({ token, id }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.delete(`/api/certificates/${id}`, config);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
