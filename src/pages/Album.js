import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      infoAlbum: {},
      tracks: [],
    };
  }

  componentDidMount() {
    this.requestAlbum();
  }

  requestAlbum = async () => {
    const { match: { params: { id } } } = this.props;
    const request = await getMusics(id);
    this.setState({
      infoAlbum: request[0],
      tracks: request.slice(1),
    });
  }

  render() {
    const { infoAlbum: { artistName, collectionName }, tracks } = this.state;
    return (
      <Route path="/album/:id">
        <Header />
        <div data-testid="page-album">
          <div>
            <h2 data-testid="artist-name">{ artistName }</h2>
            <div>
              <h3 data-testid="album-name">{ collectionName }</h3>
              <h4>{ artistName }</h4>
            </div>
            <MusicCard tracks={ tracks } />
          </div>
        </div>
      </Route>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
