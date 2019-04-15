workflow "New workflow" {
  on = "push"
  resolves = ["GitHub Action for Zeit"]
}

action "GitHub Action for Zeit" {
  uses = "actions/zeit-now@666edee2f3632660e9829cb6801ee5b7d47b303d"
  env = {
    REACT_APP_SPOTIFY_CLIENT_ID = "3ae690176d5a4a338edc4e231d0ec207"
    REACT_APP_SPOTIFY_CLIENT_SECRET = "e71e6207c19245f699f19a811bbee9e9"
    REACT_APP_REDIRECT_URI = "https://spotify-clone.irsooti.now.sh"
  }
}
