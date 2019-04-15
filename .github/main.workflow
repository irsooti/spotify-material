workflow "New workflow" {
  on = "push"
  resolves = ["GitHub Action for Zeit"]
}

action "GitHub Action for Zeit" {
  uses = "actions/zeit-now@666edee2f3632660e9829cb6801ee5b7d47b303d"
  secrets = [
    "ZEIT_TOKEN",
    "REACT_APP_SPOTIFY_CLIENT_SECRET",
    "REACT_APP_REDIRECT_URI",
    "REACT_APP_SPOTIFY_CLIENT_ID",
  ]
}
