This is a simple sauce code jump game where the terrain gets generated based on the runtime behaviour of the entered source code (see right panel inside the game). [Iroh.js](https://github.com/maierfelix/Iroh) is used to collect runtime data like ``function calls``, ``loops`` and ``if statements`` and to detect ``eval`` calls.

A short list of block types:
 * function calls turn into *normal blocks*
 * eval calls turn into *red blocks*
 * if statements turn into *yellow blocks*

Also:
 - Don't ever touch the red blocks!
 - Bumping yellow blocks from downside gives you +10 points
 - Jumping onto a block with high speed destroys this block and gives you +1 point
 - Touching the lightgreen block at the very end let's you win the game

I hacked this together in a few hours, so don't expect any kind of clean code or a bug free gameplay.
