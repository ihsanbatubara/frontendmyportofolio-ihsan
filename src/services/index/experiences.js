import axios from "axios";

export const getAllExperiences = async () => {
  try {
    const { data } = await axios.get("/api/experiences");
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const createExperience = async ({ token, experienceData }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post("/api/experiences", experienceData, config);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const updateExperience = async ({ token, experienceData, id }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.put(`/api/experiences/${id}`, experienceData, config);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const deleteExperience = async ({ token, id }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.delete(`/api/experiences/${id}`, config);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
