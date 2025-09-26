import { fetch } from 'expo/fetch';

const API_URL = 'http://192.168.2.11:3000/api';

export type MovieOrSeries = {
    type: 'movie' | 'series';
    id: number;
    watchmodeId: number;
    title: string;
    runtime: number;
    overview: string;
    director: string;
    score: number;
    poster: string;
    artwork: string;
    year: string;
    genres: {
        id: number;
        name: string;
    }[];
    characters: {
        id: number;
        name: string;
        image: string;
        personName: string;
    }[];
};

const titlesCache = new Map<number, MovieOrSeries>();

export const api = {
    getSuggestion: async ({availableTime, genres}: {availableTime?: number; genres?: string} = {}): Promise<MovieOrSeries[]> => {
        try {
            const params = new URLSearchParams();
            if (availableTime) {
                params.append('availableTime', availableTime.toString());
            }
            if (genres) {
                params.append('genres', genres);
            }
            console.log('Fetching suggestion:', `${API_URL}/recommend?${params.toString()}`);
            const response = await fetch(`${API_URL}/recommend?${params.toString()}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result: {
                success: boolean;
                data: MovieOrSeries[],
                count: number;
                requestedOptions: {
                    availableTime: number;
                    genres: string;
                }
            } = await response.json();
            for (const title of result.data) {
                titlesCache.set(title.id, title);
            }
            return result.data;
        } catch (error) {
            console.error('Error fetching suggestion:', );
            throw error;
        }
    },
    getStreamingServices: async (watchmodeId: number): Promise<{name: string; region: string; type: string; web_url: string; format: string; source_id: number;}[]> => {
        try {
            const response = await fetch(`${API_URL}/streaming/${watchmodeId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            return result.data;
        } catch (error) {
            console.error('Error fetching streaming services:', error);
            throw error;
        }
    },
    getTitleInfo: (id: number): MovieOrSeries => {
        const title = titlesCache.get(id)!;
        if (!title) {
            throw new Error('Title not found in cache');
        }
        return title;
    }
};