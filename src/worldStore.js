import { writable, derived } from 'svelte/store';

const locationToCoordinates = (location) => location.split("-").map(n => n.replace("p", "").replace("n", "-") - 0);
const coordinatesToLocation = (x, y) => [x, y].map(n => n < 0 ? `n${-n}` : `p${n}`).join("-");

const head = {
  next: (sparks) => tail,
  spark: (location) => {
    const [x, y] = locationToCoordinates(location);
    return [
      [x + 1, y + 1],
      [x + 1, y],
      [x + 1, y - 1],
      [x, y + 1],
      [x, y - 1],
      [x - 1, y + 1],
      [x - 1, y],
      [x - 1, y - 1],
    ].map(([x, y]) => coordinatesToLocation(x, y));
  },
  rehydrate: "head"
};
const tail = {
  next: (sparks) => wire,
  spark: (location) => [],
  rehydrate: "tail"
};
const wire = {
  next: (sparks) => (sparks == 1 || sparks == 2) ? head : wire,
  spark: (location) => [],
  rehydrate: "wire"
};
const rehydrate = (o) => {
  switch (o.rehydrate) {
    case "head":
      return head;
    case "tail":
      return tail;
    case "wire":
      return wire;
  }
};

const initialState = () => {
  const { subscribe, set, update } = writable({})
  const addX = (type) => (x, y) => update(currentState => {
    currentState[coordinatesToLocation(x, y)] = type;
    return currentState;
  });
	return {
		subscribe,
    inport: (importable) => {
      const locationsOfInterest = Object.keys(importable);
      set(locationsOfInterest.reduce((state, locationOfInterest) => {
        state[locationOfInterest] = rehydrate(importable[locationOfInterest]);
        return state;
      }, {}));
    },
    addWire: addX(wire),
    addTail: addX(tail),
		addHead: addX(head),
    nullifyCell: (x, y) => update(currentState => {
      delete currentState[coordinatesToLocation(x, y)];
      return currentState;
    }),
    nextState: () => update(currentState => {
      const locationsOfInterest = Object.keys(currentState);
      const sparkList = locationsOfInterest.reduce((list, locationOfInterest) => {
        return [
          ...list,
          ...currentState[locationOfInterest].spark(locationOfInterest)
        ];
      }, []);
      const sparks = sparkList.reduce((counts, spark) => {
        counts[spark] = (counts[spark] ?? 0) + 1;
        return counts;
      }, {});
      return locationsOfInterest.reduce((nextState, locationOfInterest) => {
        nextState[locationOfInterest] = currentState[locationOfInterest].next(sparks[locationOfInterest]);
        return nextState;
      }, {});
    }),
	};
};
export const currentState = initialState();
export const exportCurrentState = (exportable) => btoa(JSON.stringify(exportable));
export const importCurrentState = (importable) => currentState.inport(JSON.parse(atob(importable)));
if (localStorage.wireworldState) importCurrentState(localStorage.wireworldState);
currentState.subscribe((s) => localStorage.wireworldState = exportCurrentState(s));

const buildRunning = () => {
  let interval;
  const start = () => interval = setInterval(() => currentState.nextState(), 120);
  start();
  let { subscribe, set } = writable(true);
	return {
    subscribe,
    play: () => {
      set(true);
      start();
    },
    pause: () => {
      set(false);
      clearInterval(interval);
    },
	};
};
export const running = buildRunning();

export const cells = derived(currentState, $currentState => {
  const locationsOfInterest = Object.keys($currentState);
  return locationsOfInterest.reduce((cells, locationOfInterest) => {
    const [x, y] = locationToCoordinates(locationOfInterest);
    let color;
    switch ($currentState[locationOfInterest].rehydrate) {
      case "head":
        color = "rgb(255,87,21)";
        break;
      case "tail":
        color = "rgb(244,133,92)";
        break;
      case "wire":
        color = "rgb(0,0,0)";
        break;
    }
    cells.push({ x, y, color });
    return cells;
  }, []);
});
