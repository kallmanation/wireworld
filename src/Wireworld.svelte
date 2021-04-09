<script>
  import MainArea from './MainArea.svelte';
  import GraphicWrapper from './GraphicWrapper.svelte';
  import {
    width,
    height,
    scale,
    position,
    tool
  } from './uiStore.js';
</script>

<MainArea>
  <p>Tool: {$tool.toString()}</p>
  <p>Window: {$width} x {$height}</p>
  <p>Scale: {$scale}</p>
  <p>Position: {$position[0]} : {$position[1]}</p>
  <GraphicWrapper></GraphicWrapper>
</MainArea>

<style>
</style>
