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

  const upperLeftCorner = ({ position, scale, width, height }) => {
    return [
      position[0],
      position[1]
    ];
  };

  const aspectScales = ({ scale, width, height }) => {
    const minDimension = Math.min(width, height);
    return [
      scale * width / minDimension,
      scale * height / minDimension
    ];
  };

  let xScale, yScale;
  let leftEdge, topEdge;
  $: [xScale, yScale] = aspectScales({ scale: $scale, width: $width, height: $height });
  $: [leftEdge, topEdge] = upperLeftCorner({ position: $position, scale: $scale, width: $width, height: $height });
</script>


<svg viewBox="{leftEdge} {topEdge} {xScale} {yScale}">
  <circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" />
</svg>

<style>
  svg {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
</style>
