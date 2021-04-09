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
  <p>Press 'p' to advance time</p>
  <GraphicWrapper></GraphicWrapper>
</MainArea>

<style>
</style>
