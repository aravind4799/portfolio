import { NextResponse } from 'next/server';
import querystring from 'querystring';

// =================================================================================
// TypeScript Interfaces for Spotify API responses
// =================================================================================
interface SpotifyArtist {
  name: string;
}

interface SpotifyImage {
  url: string;
}

interface SpotifyAlbum {
  name: string;
  images: SpotifyImage[];
}

interface SpotifyExternalUrls {
  spotify: string;
}

interface SpotifyItem {
  name: string;
  artists: SpotifyArtist[];
  album: SpotifyAlbum;
  external_urls: SpotifyExternalUrls;
  duration_ms: number;
}

interface SpotifyApiResponse {
  is_playing: boolean;
  item: SpotifyItem;
  progress_ms: number;
}


const {
  SPOTIFY_CLIENT_ID: client_id,
  SPOTIFY_CLIENT_SECRET: client_secret,
  SPOTIFY_REFRESH_TOKEN: refresh_token,
} = process.env;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: querystring.stringify({
      grant_type: 'refresh_token',
      refresh_token,
    }),
  });
  return response.json();
};

export async function GET() {
  const { access_token } = await getAccessToken();

  if (!access_token) {
    return NextResponse.json({ isPlaying: false, error: 'Could not retrieve access token.' }, { status: 500 });
  }

  const response = await fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  
  if (response.status === 204 || response.status > 400) {
    return NextResponse.json({ isPlaying: false });
  }

  const song: SpotifyApiResponse = await response.json();
  
  if (!song || !song.item) {
     return NextResponse.json({ isPlaying: false });
  }

  const isPlaying = song.is_playing;
  const title = song.item.name;
  // FIXED: Replaced 'any' with the specific 'SpotifyArtist' type.
  const artist = song.item.artists.map((_artist: SpotifyArtist) => _artist.name).join(', ');
  const album = song.item.album.name;
  const albumImageUrl = song.item.album.images[0].url;
  const songUrl = song.item.external_urls.spotify;
  const progress = song.progress_ms;
  const duration = song.item.duration_ms;

  return NextResponse.json({
    album,
    albumImageUrl,
    artist,
    isPlaying,
    songUrl,
    title,
    progress,
    duration,
  });
}

// This forces the route to be dynamic, preventing caching.
export const revalidate = 0;

