import React, { Component } from "react";
import { authEndpoint, clientId, redirectUri, scopes } from "./config";
import hash from "../../util/hash";
import Player from "../Player/Player";
import Timer from "../Timer/Timer"
import logo from "../../logo.svg";
import "./App.css";

var SpotifyWebApi = require('spotify-web-api-js');
var spotifyApi = new SpotifyWebApi();

class App extends Component {
  constructor() {
    super();
    this.state = {
      token: null,
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
        else if (data) this.setState({token: _token, item: data.item, is_playing: data.is_playing, progress_ms: data.progress_ms})
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

                <div>
                  <a href="#" onClick={() => {spotifyApi.pause(null, (err, succ) => {if(err){console.error(err)} else {console.log(succ)}})}}>Pause</a>
                  <br />
                  <a href="#" onClick={() => {spotifyApi.play(null, (err, succ) => {if(err){console.error(err)} else {console.log(succ)}})}}>Play</a>
                </div>

          {
            (spotifyApi.getAccessToken() && this.state.progress_ms) &&
            <Player
              item={this.state.item}
              is_playing={this.state.is_playing}
              progress_ms={this.state.progress_ms}
              onTick={this.getNowPlaying.bind(this)}
            />
          }
        </header>
      </div>
    );
  }
}

export default App;