<script context="module">
	export async function preload() {
		const sections = await this.fetch(`js.json`).then(r => r.json());
		return { sections };
	}
</script>

<script>
	import { setContext } from 'svelte';
	export let sections;
	export let segment;
	setContext('tutorial', { sections });
</script>

<slot></slot>
