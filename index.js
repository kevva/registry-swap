'use strict';
const Conf = require('conf');
const execa = require('execa');
const registryUrl = require('registry-url');

const config = new Conf({
	defaults: {
		registries: [
			'https://registry.npmjs.org/',
			registryUrl()
		]
	}
});

const list = () => new Set(config.get('registries'));

exports.list = list;

exports.add = registry => {
	const registries = list();

	if (registries.has(registry)) {
		return registries;
	}

	registries.add(registry);
	config.set('registries', Array.from(registries));

	return registries;
};

exports.delete = registry => {
	const registries = list();

	if (!registries.has(registry)) {
		return registries;
	}

	registries.delete(registry);
	config.set('registries', Array.from(registries));

	return registries;
};

exports.set = registry => {
	const registries = list();

	if (!registries.has(registry)) {
		registries.add(registry);
		config.set('registries', Array.from(registries));
	}

	execa.shellSync(`npm config set registry ${registry}`);
};
