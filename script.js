document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('audio');
    const songList = document.getElementById('song-list');
    const songTitle = document.getElementById('song-title');
    const coverImage = document.getElementById('cover-image');

    // Fetch the list of songs from the server
    fetch('/songs-list')
        .then(response => response.json())
        .then(songs => {
            // Loop through each song and create buttons and cover images dynamically
            songs.forEach(song => {
                const songItem = document.createElement('div');
                songItem.classList.add('song-item');

                // Create cover image for each song
                const songImg = document.createElement('img');
                songImg.src = `covers/${song.coverImage}`; // Use the cover image from the server
                songImg.alt = `Cover for ${song.name}`;

                // Create button for each song
                const songButton = document.createElement('button');
                songButton.textContent = song.name;

                // Append cover image and button to the song item
                songItem.appendChild(songImg);
                songItem.appendChild(songButton);

                // Function to play the selected song
                const playSong = () => {
                    const audioPath = `songs/${song.songFile}`;
                    const coverPath = `covers/${song.coverImage}`;

                    // Set the cover image and song title dynamically
                    coverImage.src = coverPath;
                    songTitle.textContent = song.name;

                    // Set the audio source and play the song
                    audio.src = audioPath;
                    audio.play().catch(err => {
                        console.error('Error playing audio:', err);
                        alert('Error playing audio. Please try again.');
                    });
                };

                // Attach click event to both the song button and the cover image
                songButton.addEventListener('click', playSong);
                songImg.addEventListener('click', playSong);

                // Append the song item to the song list
                songList.appendChild(songItem);
            });
        })
        .catch(err => {
            console.error('Error fetching songs:', err);
            alert('Failed to load song list.');
        });
});
