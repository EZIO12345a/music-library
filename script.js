// Example of manually listing the songs
const songs = ['song1.mp3', 'song2.mp3', 'song3.mp3'];

const songListContainer = document.getElementById('song-list');
songs.forEach(song => {
  const songElement = document.createElement('li');
  songElement.textContent = song;
  songListContainer.appendChild(songElement);
});
