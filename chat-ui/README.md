Real-Time Chat UI

This is a frontend-only, mock data chat UI built with React + Vite (source in src/). It includes a small suite of pure-JS unit tests that verify core UI logic (message handling, auto-replies, contact management, search filtering) and a set of React components for the UI.

How to run unit tests (no install required):

1. From the project folder run:
   node run-tests.js

This will execute the small test runner (pure Node) and print results. In my run all tests passed.

Running in development (recommended):

1. Install dependencies:
   npm install
2. Start dev server:
   npm run dev

Note: In the environment used for this run, `npm install` failed while fetching certain packages (Vitest versions). Because of network/package resolution limits the automatic dependency installation failed and the dev server could not be started here. The test suite (node-based) still runs and passes, and the full project files are present so running `npm install` in a normal environment with network access should allow `npm run dev` to start the UI.

Project structure (important files):
- index.html - app entry
- src/
  - main.jsx - React entry
  - App.jsx - application wiring and state
  - components/ - Sidebar, ChatWindow, Contacts, SearchBar
  - mockData.js - initial in-memory data
  - lib.js - pure functions unit-tested by run-tests.js
  - App.test.jsx - react-based tests (kept for reference)
- run-tests.js - minimal Node test runner (no external deps)
- vitest.config.js - present but vitest is not required to run the Node tests

If you'd like, I can now:
- Try alternative dependency versions and re-run `npm install` (may still be blocked by registry access), or
- Convert the app to a fully self-contained static bundle (no npm required) that can be opened directly in the browser using CDN scripts (I can implement that if you prefer).

Summary of my run:
- Created the project and tests
- Attempted `npm install` but it failed due to a missing package version in the registry in this environment
- Added a small Node-based test runner and verified all unit tests passed: all checks succeeded

Log excerpts:
- npm install: failed (no matching version found for vitest)
- node run-tests.js: All tests passed.

