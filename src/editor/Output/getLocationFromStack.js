import { decode } from 'sourcemap-codec';

export default function getLocationFromStack(stack, map) {
	if (!stack) return;
	const last = stack.split('\n')[1];
	const match = /<anonymous>:(\d+):(\d+)\)$/.exec(last);

	if (!match) return null;

	const line = +match[1] - 22; // bundle is 22 lines down in the proxy.eval.
	const column = +match[2] + 3; // don't know why the error column value is innacurate

	return trace({ line, column }, map);
}

function trace(loc, map) {
	const mappings = decode(map.mappings);
	const segments = mappings[loc.line - 1];

	for (let i = 0; i < segments.length; i += 1) {
		const segment = segments[i];
		if (segment[0] === loc.column) {
			const [, sourceIndex, line, column] = segment;
			const source = map.sources[sourceIndex];

			return { source, line: line + 1, column };
		}
	}

	return null;
}
