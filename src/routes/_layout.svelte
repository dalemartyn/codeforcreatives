<script>
	import { stores } from '@sapper/app';
	import Icon from '../components/Icon.svelte';
	import Icons from '../components/Icons.svelte';
	import PreloadingIndicator from '../components/PreloadingIndicator.svelte';

	const { page, preloading } = stores();

	export let segment;
</script>

<Icons/>

{#if $preloading}
	<PreloadingIndicator/>
{/if}

<main>
	<slot></slot>
</main>

<style>
	main {
		position: relative;
		margin: 0 auto;
		padding: 0;
		height: 100%;
		overflow-x: hidden;
	}
</style>
