'use strict';
const arrayUniq = require('array-uniq');
const Conf = require('conf');
const execa = require('execa');
const registryUrl = require('registry-url');

const config = new Conf({
	defaults: {
		registries: arrayUniq([
			'https://registry.npmjs.org/',
			registryUrl()
		])
	}
});

exports.list = () => config.get('registries');

exports.add = registry => {
	const registries = config.get('registries');

	if (registries.indexOf(registry) !== -1) {
		return registries;
	}

	config.set('registries', registries.concat(registry));
	return config.get('registries');
};

exports.delete = registry => {
	const registries = config.get('registries');

	if (registries.indexOf(registry) === -1) {
		return registries;
	}

	config.set('registries', registries.filter(x => x !== registry));
	return config.get('registries');
};

exports.set = registry => {
	const registries = config.get('registries');

	if (registries.indexOf(registry) === -1) {
		config.set('registries', registries.concat(registry));
	}

	execa.shellSync(`npm config set registry ${registry}`);
};
