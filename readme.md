# registry-swap [![Build Status](https://travis-ci.org/kevva/registry-swap.svg?branch=master)](https://travis-ci.org/kevva/registry-swap)

> Switch between npm registries


## Install

```
$ npm install registry-swap
```


## Usage

```js
const registrySwap = require('registry-swap');

registrySwap.add('https://foobar.unicorn');
registrySwap.set('https://foobar.unicorn');
registrySwap.delete('https://foobar.unicorn');

registrySwap.list();
// ['https://registry.npmjs.org/', ...]
```


## API

### registrySwap.add(registry)

Add a new registry.

### registrySwap.set(registry)

Set the active registry. Will be added if it doesn't exist.

### registrySwap.delete(registry)

Delete a registry.

#### registry

Type: `string`

URL to registry.

### registrySwap.list()

List all saved registries.


## CLI

```
$ npm install --global registry-swap
```

```
$ registry-swap --help

  Usage
    $ registry-swap
```


## License

MIT © [Kevin Martensson](https://github.com/kevva)
