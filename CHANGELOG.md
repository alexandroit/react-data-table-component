# Changelog

All notable changes to this project will be documented in this file.

## 9.0.1 - 2026-04-03

- upgraded the Storybook docs runtime from 7.x to 8.6 to restore compatibility with React 19
- migrated legacy `*.stories.mdx` docs pages to the Storybook 8-supported `.mdx` format
- rebuilt the static `docs/` output so GitHub Pages no longer crashes on story unmount

## 9.0.0 - 2026-04-03

- upgraded the package to a React 19 support line
- updated local React, React DOM, and React type packages for React 19 development and validation
- replaced legacy Material UI v4 demo dependencies with MUI 7 and Emotion to remove outdated React peer conflicts in Storybook examples
- updated the TypeScript JSX transform to `react-jsx`
- refreshed the README compatibility table for the new `9.x` React 19 release line

## 8.0.0 - 2026-04-03

- republished the package under the scoped name `@revivejs/react-data-table-component`
- normalized npm metadata, repository links, issue links, and documentation links for the maintained repository
- switched the static docs build to output directly into `docs/` for GitHub Pages
- removed stale funding and Netlify publication references from the repository
- replaced the demo-only `axios` dependency with the native `fetch` API in the remote pagination story
- added `exports`, `publishConfig`, `engines`, and a package dry-run script for a clearer publication flow
