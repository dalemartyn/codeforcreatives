import polka from 'polka';
import sirv from 'sirv';
import * as sapper from '@sapper/server';

const { PORT = 3000 } = process.env;

function onError(err, req, res) {
	const error = err.message || err;
	const code = err.code || err.status || 500;
	res.headersSent || send(res, code, { error });
}

const app = polka({ onError });

app.use(
		sirv('static', {
			dev: process.env.NODE_ENV === 'development',
			setHeaders(res) {
				res.setHeader('Access-Control-Allow-Origin', '*');
				res.hasHeader('Cache-Control') || res.setHeader('Cache-Control', 'max-age=600'); // 10min default
			}
		}),

		sapper.middleware({
			//
		})
	)
	.listen(PORT);
