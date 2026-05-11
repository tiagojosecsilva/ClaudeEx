# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running the project

Open `tictactoe.html` directly in a browser — no build step or server needed.

On Windows:
```powershell
Start-Process "C:\Users\TiagoSilva\ClaudeEx\tictactoe.html"
```

## Architecture

Everything lives in a single file: `tictactoe.html`. HTML, CSS, and JS are co-located with no external dependencies.

**Game logic (inline `<script>`):**
- `board` — flat 9-element array (`null | 'X' | 'O'`), indexed 0–8 left-to-right, top-to-bottom.
- `WINS` — hardcoded array of all 8 winning index triples; used by `checkWinner()`.
- `checkWinner()` — returns `{ winner, line }` on a win, `{ winner: null, line: [] }` on a draw, or `null` if the game is still in progress.
- `scores` — session-persistent object `{ X, O, D }`; survives "New Game" clicks but resets on page reload.
- `init()` — resets board state and DOM without touching `scores`.

Cell DOM elements carry a `data-i` attribute matching their board index and gain CSS classes (`x`/`o`, `taken`, `winning`) as the game progresses.

## Git workflow

After every meaningful change, commit and push to GitHub:

```powershell
git add tictactoe.html   # or other changed files
git commit -m "short imperative description"
git push
```

Remote: `https://github.com/tiagojosecsilva/ClaudeEx` (branch: `master`)
