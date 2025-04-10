import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000'

export const loginUser = async (credentials: { email: string; password: string }) => {
    const response = await axios.post(`${API_BASE_URL}/users/login`, credentials);
    return response.data;
};
