const express = require('express');
const fs = require('fs');
const ejs = require('ejs');

var app = express();
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));

app.get('/', (req, res) => {
    let sets = JSON.parse(fs.readFileSync("data/all-sets.json"));
    sets.splice(20);
    res.render('home.ejs', { sets });
});

function getSetIdFromURI(uri) {
    let data = JSON.parse(fs.readFileSync('data/set-uris.json'));
    return data[uri]
}

function getSet(id) {
    try {
        if (fs.existsSync(`data/sets/${id}.json`)) {
            let data = JSON.parse(fs.readFileSync(`data/sets/${id}.json`));
            return data;
        }
      } catch(err) {
        return undefined;
      }
}

app.get('/set/:uri', (req, res) => {
    let setId = getSetIdFromURI(req.params.uri);
    if (setId) {
        let set = getSet(setId);
        if (set) {
            res.render('set.ejs', { set });
        } else {
            res.send("Error fetching set");
        }
    } else {
        res.send("Set doesn't exist");
    }
});

app.get('/flashcards/:uri', (req, res) => {
    let setId = getSetIdFromURI(req.params.uri);
    if (setId) {
        let set = getSet(setId);
        if (set) {
            res.render('flashcards.ejs', { set });
        } else {
            res.send("Error fetching set");
        }
    } else {
        res.send("Set doesn't exist");
    }
});

app.get('/match/:uri', (req, res) => {
    let setId = getSetIdFromURI(req.params.uri);
    if (setId) {
        let set = getSet(setId);
        if (set) {
            if (req.query.terms) {
                let newSet = [];
                let terms = set.terms;
                for (let i = 0; i < Math.min(req.query.terms, Object.keys(terms).length); i++) {
                    let j = Math.floor(Math.random() * Object.keys(terms).length);
                    newSet[Object.keys(terms)[j]] = terms[Object.keys(terms)[j]];
                    delete terms[Object.keys(terms)[j]];
                }
                set.terms = newSet
            }

            res.render('match.ejs', { set });
        } else {
            res.send("Error fetching set");
        }
    } else {
        res.send("Set doesn't exist");
    }
});

app.get('/gravity/:uri', (req, res) => {
    let setId = getSetIdFromURI(req.params.uri);
    if (setId) {
        let set = getSet(setId);
        if (set) {
            res.render('gravity.ejs', { set });
        } else {
            res.send("Error fetching set");
        }
    } else {
        res.send("Set doesn't exist");
    }
});

app.get('/api/set/:uri', (req, res) => {
    let id = getSetIdFromURI(req.params.uri);
    if (fs.existsSync(`data/sets/${id}.json`)) {
        let data = JSON.parse(fs.readFileSync(`data/sets/${id}.json`));
        res.json(data);
    }
});

app.get('/api/set-uris', (req, res) => {
    res.json(JSON.parse(fs.readFileSync(`data/set-uris.json`)));
})

app.listen(4000);