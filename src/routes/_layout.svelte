<script>
	import { stores } from '@sapper/app';
	import Icon from '../components/Icon.svelte';
	import Icons from '../components/Icons.svelte';
	import Nav from '../components/Nav.svelte';
	import NavItem from '../components/NavItem.svelte';
	import PreloadingIndicator from '../components/PreloadingIndicator.svelte';

	const { page, preloading } = stores();

	export let segment;
</script>

<Icons/>

{#if $preloading}
	<PreloadingIndicator/>
{/if}

{#if $page.path !== '/repl/embed'}
	<Nav {segment} {page}>
		<NavItem segment="tutorial">Tutorial</NavItem>

		<NavItem external="https://github.com/dalemartyn" title="GitHub Repo">
			<Icon name="github"/>
		</NavItem>
	</Nav>
{/if}

<main>
	<slot></slot>
</main>

<style>
	main {
		position: relative;
		margin: 0 auto;
		/* padding: var(--nav-h) var(--side-nav) 0 var(--side-nav); */
		padding: var(--nav-h) 0 0 0;
		overflow-x: hidden;
	}
</style>
