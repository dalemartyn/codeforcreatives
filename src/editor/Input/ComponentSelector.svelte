<script>
	import { getContext, createEventDispatcher, tick } from 'svelte';

	export let handle_select;

	const { components, tabs, selected, request_focus, rebundle } = getContext('REPL');

	let editing = null;
	let tabInput;

	function selectComponent(component) {
		if ($selected !== component) {
			editing = null;
			handle_select(component);
		}
	}

	function editTab(component) {
		if ($selected === component) {
			editing = $selected;
		}
	}

	function closeEdit() {
		const match = /(.+)\.(svelte|js)$/.exec($selected.name);
		$selected.name = match ? match[1] : $selected.name;
		if (match && match[2]) $selected.type = match[2];
		editing = null;

		// re-select, in case the type changed
		handle_select($selected);

		components = components; // TODO necessary?

		// focus the editor, but wait a beat (so key events aren't misdirected)
		setTimeout(request_focus);

		rebundle();
	}

	function remove(component) {
		let result = confirm(`Are you sure you want to delete ${component.name}.${component.type}?`);

		if (result) {
			const index = $components.indexOf(component);

			if (~index) {
				components.set($components.slice(0, index).concat($components.slice(index + 1)));
			} else {
				console.error(`Could not find component! That's... odd`);
			}

			handle_select($components[index] || $components[$components.length - 1]);
		}
	}

	function selectInput(event) {
		setTimeout(() => {
			event.target.select();
		});
	}

	let uid = 1;

	function addNew() {
		const component = {
			name: uid++ ? `file${uid}` : 'file1',
			type: 'js',
			source: ''
		};

		editing = component;

		setTimeout(() => {
			// TODO we can do this without IDs
			document.getElementById(component.name).scrollIntoView(false);
		});

		components.update(components => components.concat(component));
		handle_select(component);

		tick().then(() => {
			tabInput && tabInput.focus();
		});
	}
</script>

<style>
	.component-selector {
		position: relative;
		overflow: hidden;
	}

	.file-tabs {
		border: none;
		margin: 0;
		white-space: nowrap;
		overflow-x: auto;
		overflow-y: hidden;
		height: 10em;
	}

	.file-tabs .button, .file-tabs button {
		position: relative;
		display: inline-block;
		font: 400 12px/1.5 var(--font);
		background: var(--back);
		border: none;
		border-top: 4px solid transparent;
		padding: 12px 28px 16px 12px;
		margin: 0;
		color: rgba(255, 255, 255, .7);
		border-radius: 0;
		font-kerning: none;
		letter-spacing: .0025em;
	}

	.file-tabs .button:first-child {
		padding-left: 12px;
	}

	.file-tabs .button.active {
		color: var(--text);
		background-color: var(--back-light);
		border-color: #6599cc;
	}

	.editable, .uneditable, .input-sizer, input {
		display: inline-block;
		position: relative;
		line-height: 1;
	}

	.input-sizer {
		color: #ccc;
	}

	input {
		position: absolute;
		width: 100%;
		left: 12px;
		top: 12px;
		font: 400 12px/1.5 var(--font);
		border: none;
		color: var(--flash);
		outline: none;
		background-color: transparent;
	}

	.remove {
		position: absolute;
		display: none;
		right: 1px;
		top: 4px;
		width: 28px;
		text-align: right;
		padding: 10px 8px 18px 8px;
		font-size: 8px;
		cursor: pointer;
	}

	.remove:hover {
		color: var(--flash);
	}

	.file-tabs .button.active .editable {
		cursor: text;
	}

	.file-tabs .button.active .remove {
		display: block;
	}

	.add-new {
		position: absolute;
		left: 0;
		top: 0;
		padding: 12px 10px 12px 8px !important;
		height: 40px;
		text-align: center;
		background-color: white;
	}

	.add-new:hover {
		color: var(--flash) !important;
	}

	svg {
		position: relative;
		overflow: hidden;
		vertical-align: middle;
		-o-object-fit: contain;
		object-fit: contain;
		-webkit-transform-origin: center center;
		transform-origin: center center;

		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
		fill: none;
	}
</style>

<div class="component-selector">
	{#if $components.length}
		<div class="file-tabs" on:dblclick="{addNew}">
			{#each $tabs as component}
				<div
					id={component.name}
					class="button"
					role="button"
					class:active="{component === $selected}"
					on:click="{() => selectComponent(component)}"
					on:dblclick="{e => e.stopPropagation()}"
				>
					{#if component.name == 'app'}
						<div class="uneditable">
							{component.name}.{component.type}
						</div>
					{:else}
						{#if component === editing}
							<span class="input-sizer">{editing.name + (/\./.test(editing.name) ? '' : `.${editing.type}`)}</span>

							<input
								bind:this={tabInput}
								spellcheck={false}
								bind:value={editing.name}
								on:focus={selectInput}
								on:blur={closeEdit}
								on:keydown={e => e.which === 13 && e.target.blur()}
							>
						{:else}
							<div
								class="editable"
								title="edit component name"
								on:click="{() => editTab(component)}"
							>
								{component.name}.{component.type}
							</div>

							<span class="remove" on:click="{() => remove(component)}">
								<svg width="12" height="12" viewBox="0 0 24 24">
									<line stroke="#999" x1='18' y1='6' x2='6' y2='18' />
									<line stroke="#999" x1='6' y1='6' x2='18' y2='18' />
								</svg>
							</span>
						{/if}
					{/if}
				</div>
			{/each}

			<button class="add-new" on:click={addNew} title="add new component">
				<svg width="12" height="12" viewBox="0 0 24 24">
					<line stroke="#999" x1='12' y1='5' x2='12' y2='19' />
					<line stroke="#999" x1='5' y1='12' x2='19' y2='12' />
				</svg>
			</button>
		</div>
	{/if}
</div>
