'use client';

import { useState, useEffect } from 'react';
import { SpotifySong } from '../lib/types';

const useNowPlaying = () => {
    const [song, setSong] = useState<SpotifySong | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSong = async () => {
            try {
                const response = await fetch('/api/now-playing');
                if (response.ok) {
                    const data = await response.json();
                    setSong(data);
                } else {
                    setSong(null);
                }
            } catch (error) {
                console.error("Failed to fetch now playing data:", error);
                setSong(null);
            } finally {
                setLoading(false);
            }
        };

        fetchSong();
        const interval = setInterval(fetchSong, 5000);
        return () => clearInterval(interval);
    }, []);

    return { song, loading };
};

export { useNowPlaying };