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

  let clicking = false;
  const setClicking = () => { clicking = true };
  const unsetClicking = () => { clicking = false };
  const handleWheel = (event) => {
    position.update(([x, y]) => [x - (event.deltaY / 2), y - (event.deltaY / 2)]);
    scale.update(n => Math.max(n + event.deltaY, 1));
  };
	const handleMousemove = (event) => {
    cursor.set([event.screenX, event.screenY]);
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
        tool.set(Tools.NONE);
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
    }
  };
  const handleResize = () => {
    width.set(window.innerWidth);
    height.set(window.innerHeight);
  };
</script>

<svelte:window on:keydown={handleKeydown} on:resize|passive={handleResize}/>

<main on:mouseup={unsetClicking} on:mousedown={setClicking} on:mousemove={handleMousemove} on:wheel|preventDefault={handleWheel}>
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
