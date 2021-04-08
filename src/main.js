import Wireworld from './Wireworld.svelte';

const wireworld = new Wireworld({
	target: document.body,
	props: {
		name: 'Wireworld'
	}
});

export default wireworld;
