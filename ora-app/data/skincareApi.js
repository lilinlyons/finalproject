import axios from 'axios';

export async function fetchPosts() {
    try {
        const response = await axios.get('https://skincare-api.herokuapp.com/products');
        return response.data;
    } catch (error) {
        console.error('Error fetching skincare posts:', error);
        throw error;
    }
}