import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends React.Component {
  constructor() {
    super();
    this.state = ({
      searchInput: '',
      isDisable: true,
      isLoading: false,
      searchDone: false,
      nameArtist: '',
      listAlbums: [],
      notFound: false,
    });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.handleButton);
  };

  handleButton = () => {
    const minLengthName = 2;
    const { searchInput } = this.state;
    this.setState({
      isDisable: (searchInput.length < minLengthName),
    });
  };

  handleClick = async () => {
    const { searchInput } = this.state;
    this.setState({
      searchInput: '',
      isLoading: true,
      nameArtist: searchInput,
    });
    const objArtists = (await searchAlbumsAPI(searchInput));
    if (objArtists.length > 0) {
      this.setState({
        isLoading: false,
        searchDone: true,
        listAlbums: objArtists,
        notFound: false,
      });
    } else {
      this.setState({
        isLoading: false,
        searchDone: false,
        notFound: true,
      });
    }
  };

  render() {
    const {
      isDisable,
      searchInput,
      isLoading,
      searchDone,
      nameArtist,
      listAlbums,
      notFound,
    } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-search">
          {
            (isLoading) ? <Loading />
              : (
                <form>
                  <input
                    type="text"
                    name="searchInput"
                    data-testid="search-artist-input"
                    onChange={ this.handleChange }
                    value={ searchInput }
                  />
                  <button
                    type="button"
                    data-testid="search-artist-button"
                    disabled={ isDisable }
                    onClick={ this.handleClick }
                  >
                    Pesquisar
                  </button>
                </form>
              )
          }
          {
            searchDone
              ? (
                <>
                  <p>
                    Resultado de álbuns de:
                    {' '}
                    {nameArtist}
                  </p>
                  <div>
                    {listAlbums.map((album) => (
                      <div
                        key={ album.collectionId }
                      >
                        <Link
                          data-testid={ `link-to-album-${album.collectionId}` }
                          to={ `/album/${album.collectionId}` }
                        >
                          Album:
                          {album.collectionName}
                          Artist name:
                          {album.artistName}
                        </Link>
                      </div>))}
                  </div>
                </>
              )
              : (
                <div>
                  {
                    notFound ? (
                      <p>Nenhum álbum foi encontrado</p>
                    ) : ''
                  }
                </div>)
          }
        </div>
      </>
    );
  }
}

export default Search;
