<script>
  import ButtonGroup from './ButtonGroup.svelte';
  import {
    width,
    height,
    scale,
    cursor,
    position,
    tool,
    Tools
  } from './uiStore.js';

  const sorry = () => {
    alert("Sorry, I haven't built this yet");
  };
</script>

<aside>
  <ButtonGroup summary="Meta">
    <button on:click={sorry}>Export</button>
    <button on:click={sorry}>Import</button>
  </ButtonGroup>
  <ButtonGroup summary="Controls">
    <button on:click={sorry}>Play</button>
    <button on:click={sorry}>Step</button>
  </ButtonGroup>
  <ButtonGroup summary="Tools">
    <button on:click={sorry}>Move</button>
    <button on:click={sorry}>Erase</button>
    <button on:click={sorry}>Wire</button>
    <button on:click={sorry}>Electron Head</button>
    <button on:click={sorry}>Electron Tail</button>
  </ButtonGroup>
</aside>

<style>
  aside {
    position: fixed;
    display: flex;
    flex-direction: row;
    width: 90vmin;
    left: 50%;
    transform: translateX(-50%);
    bottom: 1vh;
  }
  button {
    text-align: center;
    color: white;
    background: black;
    width: 90%;
    padding: 1rem .1rem;
    margin: .3rem auto;
    border-radius: 3rem;
    cursor: pointer;
  }
  button:last-child {
    margin-bottom: .6rem;
  }
</style>
