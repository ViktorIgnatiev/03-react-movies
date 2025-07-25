import axios from 'axios';
import { Movie } from '../types/movie';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export const fetchMovies = async (query: string): Promise<Movie[]> => {
    if (!API_TOKEN) {
        throw new Error('API token is not configured');
    }

    const response = await axios.get<{ results: Movie[] }>(`${BASE_URL}/search/movie`, {
        params: {
            query,
            include_adult: false,
            language: 'en-US',
            page: 1,
        },
        headers: {
            Authorization: `Bearer ${API_TOKEN}`,
        },
    });

    return response.data.results;
};