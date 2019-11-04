import React, { Component } from "react";
import * as $ from "jquery";
import { authEndpoint, clientId, redirectUri, scopes } from "./config";
import hash from "./hash";
import Player from "./Player";
import logo from "./logo.svg";
import "./App.css";

var SpotifyWebApi = require('spotify-web-api-js');
var spotifyApi = new SpotifyWebApi();

class App extends Component {
  constructor() {
    super();
    this.state = {
      item: {
        album: {
          images: [{ url: "" }]
        },
        name: "",
        artists: [{ name: "" }],
        duration_ms:0,
      },
      is_playing: "Paused",
      progress_ms: 0
    };

  }
  componentDidMount() {
    let _token = hash.access_token;

    if (_token) {
      spotifyApi.setAccessToken(_token);
      spotifyApi.getMyCurrentPlayingTrack((err, data) => {
        if (err) console.error(err);
        else if (data) this.setState({item: data.item, is_playing: data.is_playing, progress_ms: data.progress_ms})
      })
    }
  }


  getNowPlaying(){
    console.log(this.state)
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getMyCurrentPlayingTrack((err, data) => {
        if (err) console.error(err);
        else if (data) this.setState({item: data.item, is_playing: data.is_playing, progress_ms: data.progress_ms})
      })
    }
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {!this.state.token && (
            <a
              className="btn btn--loginApp-link"
              href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                "%20"
              )}&response_type=token&show_dialog=true`}
            >
              Login to Spotify
            </a>
          )}
          {
            (spotifyApi.getAccessToken() && this.state.progress_ms) &&
            <Player
              item={this.state.item}
              is_playing={this.state.is_playing}
              progress_ms={this.state.progress_ms}
            />
          }
          {this.state.progress_ms}
          <button onClick={this.getNowPlaying.bind(this)}>
            Check Now Playing
          </button>
        </header>
      </div>
    );
  }
}

export default App;