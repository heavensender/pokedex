require('dotenv').config();
const { red } = require('ansi-styles');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const methodOverride = require('method-override');

//////////////////////Middleware/////////////////////////
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(express.static('public'));
//////////////////////Import Data////////////////////////
const pokemons = require('./models/pokemon');

//////////////////////Routes/////////////////////////


//////Index route///////
app.get('/', (req, res) => {
	res.render('index.ejs', { allPokemons: pokemons });
});
//////New route///////
app.get('/pokemon/new', (req, res) => {
	res.render('new.ejs');
});
//////Edit route///////
app.get('/pokemon/:index/edit', (req, res) => {
	res.render('edit.ejs', {
		pokemonObj: pokemons[req.params.index],
		index: req.params.index,
	});
});

//////Show route///////
app.get('/pokemon/:index', (req, res) => {
	res.render('show.ejs', { pokemonObj: pokemons[req.params.index] });
});
//////Create route///////
app.post('/pokemon', (req, res) => {
	const newPokemon = {
		name: req.body.name,
		type: req.body.type,
		stats: {
			hp: req.body.hp,
			attack: req.body.attack,
			defense: req.body.defense,
		},
		img: req.body.img,
	};
	pokemons.push(newPokemon);
	res.redirect('/pokemon');
	// console.log(newPokemon);
});
//////Destroy route///////
app.delete('/pokemon/:index', (req, res) => {
	pokemons.splice(req.params.index, 1);
	res.redirect('/pokemon');
});
//////Update route///////
app.put('/pokemon/:index', (req, res) => {
	const editPokemon = {
		name: req.body.name,
		type: req.body.type,
		stats: {
			hp: req.body.hp,
			attack: req.body.attack,
			defense: req.body.defense,
		},
		img: req.body.img,
	};

	pokemons[req.params.index] = editPokemon;
	res.redirect('/pokemon');
});

//////////////////////////////////////////////////////
app.listen(port, () => {
	console.log('Listening at port', port);
});