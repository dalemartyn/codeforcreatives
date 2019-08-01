<script>
	import { getContext } from 'svelte';
	import Viewer from './Viewer.svelte';

	const { register_output } = getContext('REPL');

	export let status;
	export let runtimeError = null;
	export let relaxed = false;
	export let injectedJS;
	export let injectedCSS;

	register_output({
		set: async () => {},
		update: async () => {}
	});

	let viewer;
</script>

<Viewer
	bind:this={viewer}
	bind:error={runtimeError}
	{status}
	{relaxed}
	{injectedJS}
	{injectedCSS}
/>
