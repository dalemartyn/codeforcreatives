## Running locally

Set up the project:

```bash
git clone https://github.com/dalemartyn/codeforcreatives.git
cd codeforcreatives
npm ci
npm run update
npm run editor-build
```

Start the server with `npm run dev`, and navigate to [localhost:3000](http://localhost:3000).

Build the worker scripts using `npm run editor-dev`.

## Building the site

To build a static website, run `npm run export`. The output can be found in `__sapper__/export`.
