# Bun Todo

Simple todo app using Bun.

## Setup

- Windows
  - Currently Bun only supports Windows through WSL, so [set that up](https://learn.microsoft.com/en-us/windows/wsl/install).

1. Install [Bun](https://bun.sh/)
2. In the root directory run `bun install` or just `bun i`

- `bun run dev` - starts api and ui local servers
  - api source is located in "/packages/api"
  - ui source is located in "/packages/ui"
- `bun run lint` - runs eslint checks on all packages
- `bun run format` - runs prettier formatting checks on all packages
- `bun run test` - runs tests for all packages
- `bun run clean` - deletes all node_modules folders and the bun.lockb file
