import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      favorites: [],
    };
  }

  componentDidMount() {
    this.favoriteTracks();
  }

  favoriteTracks = async () => {
    this.setState({ loading: true });
    const receptor = await getFavoriteSongs();
    this.setState({
      favorites: receptor,
      loading: false,
    });
  };

  handleChange = async ({ target }, track) => {
    this.setState({ loading: true });
    const { favorites } = this.state;
    if (target.checked) {
      await addSong(track);
      this.setState({
        favorites: [...favorites, track],
        loading: false,
      });
    } else {
      await removeSong(track);
      this.setState({
        favorites: (favorites
          .filter((favorite) => (
            parseInt(favorite.trackId, 10) !== parseInt(track.trackId, 10)))),
        loading: false,
      });
    }
  };

  isChecked = (track) => {
    const { favorites } = this.state;
    return favorites.some((favTrack) => (
      parseInt(track.trackId, 10) === parseInt(favTrack.trackId, 10)));
  };

  render() {
    const { tracks } = this.props;
    const { loading } = this.state;
    if (loading) return <Loading />;
    return (
      <div>
        {
          tracks.map((track) => (
            <div key={ track.trackId }>
              <span>{track.trackName}</span>
              <audio data-testid="audio-component" src={ track.previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                <code>audio</code>
                .
              </audio>
              <label htmlFor={ track.trackId }>
                <input
                  type="checkbox"
                  name="inputFavorite"
                  id={ track.trackId }
                  data-testid={ `checkbox-music-${track.trackId}` }
                  onChange={ (event) => this.handleChange(event, track) }
                  checked={ this.isChecked(track) }
                />
                Favorita
              </label>
            </div>
          ))
        }
      </div>
    );
  }
}

MusicCard.propTypes = {
  tracks: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MusicCard;
