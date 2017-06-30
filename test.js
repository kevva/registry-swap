import test from 'ava';
import registryUrl from 'registry-url';
import m from '.';

const REGISTRY = registryUrl();

test(t => {
	t.true(m.list().includes(REGISTRY));
	m.add('https://foo.bar/');
	t.true(m.list().includes('https://foo.bar/'));
	m.set('https://foo.bar/');
	t.is(registryUrl(), 'https://foo.bar/');
	m.delete('https://foo.bar/');
	t.false(m.list().includes('https://foo.bar/'));
	m.set(REGISTRY);
});
