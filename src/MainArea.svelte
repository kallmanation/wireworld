<script>
  import {
    width,
    height,
    scale,
    cursor,
    position,
    tool,
    Tools
  } from './uiStore.js';
  import {
    currentState
  } from './worldStore.js';

  const handleClick = () => {
    setClicking();
    const dimensions = [$width, $height];
    const [x, y] = [0, 1].map(n => Math.floor($position[n] + $scale * $cursor[n] / dimensions[n]));
    switch ($tool) {
      case Tools.HAND:
        break;
      case Tools.WIRE:
        currentState.addWire(x, y);
        break;
      case Tools.TAIL:
        currentState.addTail(x, y);
        break;
      case Tools.HEAD:
        currentState.addHead(x, y);
        break;
      case Tools.NULL:
        currentState.nullifyCell(x, y);
        break;
    }
  }
  let clicking = false;
  const setClicking = () => { clicking = true };
  const unsetClicking = () => { clicking = false };
  const handleWheel = (event) => {
    if ($scale + event.deltaY >= 5) {
      position.update(([x, y]) => [x - (event.deltaY / 2), y - (event.deltaY / 2)]);
      scale.update(n => n + event.deltaY);
    }
  };
	const handleMousemove = (event) => {
    cursor.set([event.pageX, event.pageY]);
    if (clicking) {
      const movementScaling = $scale / Math.min($width, $height);
      position.update(([x, y]) => [x - (event.movementX * movementScaling), y - (event.movementY * movementScaling)]);
    }
  };
  const handleKeydown = (event) => {
    switch (event.keyCode) {
      case 192:
        // back-tick
      case 48:
        // 0 key
        tool.set(Tools.NULL);
        break;
      case 49:
        // 1 key
        tool.set(Tools.WIRE);
        break;
      case 50:
        // 2 key
        tool.set(Tools.TAIL);
        break;
      case 51:
        // 3 key
        tool.set(Tools.HEAD);
        break;
      case 52:
        // 4 key
        tool.set(Tools.HAND);
        break;
      case 80:
        // p key
        currentState.nextState();
        break;
    }
  };
  const handleResize = () => {
    width.set(window.innerWidth);
    height.set(window.innerHeight);
  };
</script>

<svelte:window on:keydown={handleKeydown} on:resize|passive={handleResize}/>

<main on:mouseup={unsetClicking} on:mousedown={handleClick} on:mousemove={handleMousemove} on:wheel|preventDefault={handleWheel}>
  <slot></slot>
</main>

<style>
	main {
		text-align: center;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
	}
</style>
