import axios from 'axios';

export async function fetchPosts() {
    try {
        const response = await axios.get('http://makeup-api.herokuapp.com/api/v1/products.json');
        return response.data;
    } catch (error) {
        console.error('Error fetching skincare posts:', error);
        throw error;
    }
}
