const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000; // Change if necessary

// Serve static files (songs, covers)
app.use('/songs', express.static(path.join(__dirname, 'songs')));
app.use('/covers', express.static(path.join(__dirname, 'covers')));

// Endpoint to get the list of songs with random cover images
app.get('/songs-list', (req, res) => {
    const songsFolder = path.join(__dirname, 'songs');
    const coversFolder = path.join(__dirname, 'covers');

    // Read all songs
    fs.readdir(songsFolder, (err, songFiles) => {
        if (err) {
            console.error('Error reading songs folder:', err);
            return res.status(500).json({ error: 'Unable to read songs folder' });
        }

        // Filter .mp3 files
        const songs = songFiles.filter(file => file.endsWith('.mp3'));

        // Read all cover images
        fs.readdir(coversFolder, (err, coverFiles) => {
            if (err) {
                console.error('Error reading covers folder:', err);
                return res.status(500).json({ error: 'Unable to read covers folder' });
            }

            // Filter .jpg files
            const covers = coverFiles.filter(file => file.endsWith('.jpg'));

            if (covers.length === 0) {
                console.error('No cover images found.');
                return res.status(500).json({ error: 'No cover images available.' });
            }

            // Assign random covers to songs
            const songDetails = songs.map(song => {
                const randomCover = covers[Math.floor(Math.random() * covers.length)];
                return {
                    name: song.replace('.mp3', ''), // Remove '.mp3' from name
                    songFile: song,
                    coverImage: randomCover || 'default.jpg', // Fallback if no covers
                };
            });

            // Send song details
            res.json(songDetails);
        });
    });
});

// Serve the frontend files
app.use(express.static(path.join(__dirname)));

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
