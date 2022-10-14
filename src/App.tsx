import React from 'react';
import './App.css';
import { OutlinedInput } from '@mui/material';
import { debounce } from 'lodash'
import IArtist from './interfaces/IArtist';
import ITrack from './interfaces/ITrack';
const AUTH_TOKEN = 'Bearer BQCNBEyxK3lWI8NDEm_Jb3JpWtbuhEYfDn4txEl8DDtJmjGFFhhLAcujFsdu7U0U9OmqGbmyHr61sYjDM9P2WBUrz6HR7DX-i-03a3rt0vXvNmlrEf5h0c2_YLgKTRxcowz85kHSWRRLdkTRAU4UEZ5294ttAXHNrgD9-ZAvuQAQSlWde6rt3qubNgCR8hU'

function App() {
  const axios = require('axios').default
  axios.defaults.headers.common['Authorization'] = AUTH_TOKEN
  const [prompt, setPrompt] = React.useState('')
  const [artists, setArtist] = React.useState<IArtist[]>()
  const [tracks, setTrack] = React.useState<ITrack[]>()
  async function getArtist(q: string) {
    try {
      const response = await axios.get('https://api.spotify.com/v1/search', { params: {
        query: q,
        type: 'artist',
        limit: 21
      }})
      setArtist(response.data.artists.items)
    }
    catch (error) {
      console.error(error)
    }
  }

  async function getTracks(id: string) {
    try {
      const response = await axios.get(`https://api.spotify.com/v1/artists/${id}/top-tracks`, { params: {
        market: 'ES'
      }})
      setTrack(response.data.tracks)
    }
    catch (error) {
      console.error(error)
    }
  }

  const handler = React.useCallback(debounce(getArtist, 2000), [])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTrack(undefined)
    setPrompt(e.target.value)
    handler(e.target.value)
  }

  return (
    <div className="App">
      <div className="artist-prompt">
        <label htmlFor='prompt'>Artist Name:</label>
        <OutlinedInput id='prompt' size='small' fullWidth onChange={handleChange} value={prompt}/>
      </div>
      <div className="artist-result">
        {artists && artists.map((m) => (
          <div className='artist' onClick={() => getTracks(m.id)}>
            {m.images.length !==0? <img src={m.images[0].url} alt="Profile"/> : <img src="https://www.pngkey.com/png/full/349-3499617_person-placeholder-person-placeholder.png" alt='N/A'/>}
            <div className='artist-desc'>
              <p>{`Name: ${m.name}`}</p>
              <p>{`Popularity: ${m.popularity}`}</p>
              <p>{`Genres: ${m.genres.toString().replaceAll(',', ', ')}`}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="track-result">
        {tracks && tracks.map((t) => (
          <div className="tracks">
            {t.album.images.length !==0? <img src={t.album.images[0].url} alt="Track"/> : <img src="https://www.grouphealth.ca/wp-content/uploads/2018/05/placeholder-image.png" alt='N/A'/>}
            <div className="track-desc">
              <p>{t.name}</p>
              <p>{t.album.album_type}</p>
              <p>{t.album.release_date}</p>
              {t.preview_url && 
                <audio controls>
                  <source src={t.preview_url} type="audio/mp3"/>
                </audio>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
