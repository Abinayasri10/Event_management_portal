import axios from 'axios';

export const login = async (formData) => {
  return axios.post('http://localhost:5000/api/auth/login', formData);
};

export const signup = async (formData) => {
  return axios.post('http://localhost:5000/api/auth/signup', formData);
};
