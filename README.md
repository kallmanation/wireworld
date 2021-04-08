# Wireworld

A [Wireworld](https://en.wikipedia.org/wiki/Wireworld) is a [cellular automaton](https://en.wikipedia.org/wiki/Cellular_automaton) (like Conway's Game of Life) with four states:

1. null
2. wire
3. electron head
4. electron tail

These four states transition by the following rules:

1. null -> null
2. tail -> wire
3. head -> tail
4. wire -> head (iff exactly 1 or 2 [neighbors](https://en.wikipedia.org/wiki/Moore_neighborhood) are an electron head)
5. wire -> wire (otherwise)

Wireworlds are Turing-complete and are interesting in that they can so closely mirror digital transistor behavior with such simple rules.

This is an implementation of a Wireworld and can be found at [wireworld.klmntn.com](https://wireworld.klmntn.com).
