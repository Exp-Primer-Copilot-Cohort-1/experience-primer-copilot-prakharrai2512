//Create a web server

const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/comments', (req, res) => {
    fs.readFile('comments.json', 'utf8', (err, data) => {
        if (err) {
            res.send('Error reading file');
        } else {
            res.send(data);
        }
    });
});

app.post('/comments', (req, res) => {
    fs.readFile('comments.json', 'utf8', (err, data) => {
        if (err) {
            res.send('Error reading file');
        } else {
            const comments = JSON.parse(data);
            comments.push(req.body);
            fs.writeFile('comments.json', JSON.stringify(comments), (err) => {
                if (err) {
                    res.send('Error writing file');
                } else {
                    res.send('Comment added');
                }
            });
        }
    });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
