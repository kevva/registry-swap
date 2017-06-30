#!/usr/bin/env node
'use strict';
const chalk = require('chalk');
const inquirer = require('inquirer');
const meow = require('meow');
const normalizeUrl = require('normalize-url');
const registryUrl = require('registry-url');
const m = require('.');

meow(`
	Usage
	  $ registry-swap
`);

const getItems = () => inquirer.prompt([{
	name: 'registry',
	type: 'list',
	message: 'Choose a registry',
	choices: m.list().map(x => ({
		name: `${normalizeUrl(x)} ${x === registryUrl() ? chalk.gray('*') : ''}`,
		value: x
	}))
}]);

const set = () => getItems().then(answer => {
	m.set(answer.registry);
});

const add = () => inquirer.prompt([{
	name: 'registry',
	message: 'Enter registry URL'
}]).then(answer => {
	m.add(answer.registry);
});

const del = () => getItems().then(answer => {
	m.delete(answer.registry);
});

const init = () => inquirer.prompt([{
	name: 'type',
	type: 'list',
	message: 'What do you want to do?',
	choices: [{
		name: 'Set the active registry',
		value: set
	}, {
		name: 'Add a new registry',
		value: add
	}, {
		name: 'Delete a registry',
		value: del
	}]
}]).then(answer => answer.type().then(init));

init();
