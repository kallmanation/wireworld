import { writable } from 'svelte/store';

export const Tools = {
  NONE: Symbol("none"),
  WIRE: Symbol("wire"),
  TAIL: Symbol("tail"),
  HEAD: Symbol("head"),
  HAND: Symbol("hand"),
};

export const width = writable(window.innerWidth);
export const height = writable(window.innerHeight);
export const scale = writable(Math.floor(Math.min(window.innerWidth, window.innerHeight) / 10));
export const cursor = writable([0, 0]);
export const position = writable([0, 0]);
export const tool = writable(Tools.HAND);
