# frontend-decide-question-answering

The Smart Search is a small application that communicates with the RAG/LLM backend of the DECIDe project.

As a user, you select a local authority, and ask an open question by entering it in the text area, or select an example question using the buttons below the Send button.

## Prerequisites

You will need the following things properly installed on your computer.

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) (with npm)
- [Ember CLI](https://cli.emberjs.com/release/)
- [Google Chrome](https://google.com/chrome/)

## Installation

- `git clone https://github.com/lblod/frontend-decide-question-answering.git` this repository
- `cd frontend-decide-question-answering`
- `npm install`

## Running / Development

To run in combination with the full `app-decide` backend, add this to your `docker-compose.override.yml`:

```
services:
  frontend-smart-search:
    entrypoint: "echo 'service disabled'"
    restart: "no"
```
Then run `npm run dev` or `ember serve --proxy=http://localhost:80`.

- Visit your app at [http://localhost:4200](http://localhost:4200).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

- `ember test`
- `ember test --server`

### Linting

- `npm run lint`
- `npm run lint:fix`

### Building

- `ember build` (development)
- `ember build --environment production` (production)
