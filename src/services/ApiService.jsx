import axios from 'axios'


class ApiService {

    constructor() {
        this.api = axios.create({
            //-baseURL: 'https://beyond-fashion-api-ts.onrender.com/api/v1',
            //baseURL: 'http://localhost:8000/api/v1',
            baseURL: 'https://beyond-fashion-api-ts.onrender.com/api/v1',
        });
    }

    async request (method, url, data = null, token = null) {
        const config = {
            method,
            url,
            headers: token ? { Authorization: `Bearer ${token}` } : {},
            data
        };
        try{
            const response = await this.api.request(config);
            return response.data;
        }catch(err){
            throw err.response ? err.response.data : new Error('Une erreur est survenue');
        }
    }
}

const apiService = new ApiService();

export default apiService