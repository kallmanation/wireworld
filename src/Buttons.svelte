<script>
  import ButtonGroup from './ButtonGroup.svelte';
  import {
    scale,
    tool,
    Tools
  } from './uiStore.js';
  import {
    currentState,
    running
  } from './worldStore.js';

  const sorry = () => {
    alert("Sorry, I haven't built this yet");
  };
  const zoomin = () => scale.update(n => n - 1);
  const zoomout = () => scale.update(n => n + 1);
  const showExport = () => {
    sorry();
  };
  const showImport = () => {
    sorry();
  };
  let onPlayPause, playOrPause;
  $: onPlayPause = $running ? running.pause : running.play;
  $: playOrPause = $running ? "Pause" : "Play";
  const setTool = (newTool) => () => tool.set(newTool);
</script>

<aside>
  <ButtonGroup summary="Meta">
    <button on:click={zoomin}>Zoom In</button>
    <button on:click={zoomout}>Zoom Out</button>
    <button on:click={showExport}>Export</button>
    <button on:click={showImport}>Import</button>
  </ButtonGroup>
  <ButtonGroup summary="Controls">
    <button on:click={onPlayPause}>{playOrPause}</button>
    <button on:click={currentState.nextState}>Step</button>
  </ButtonGroup>
  <ButtonGroup summary="Tools">
    <button on:click={setTool(Tools.HAND)}>Move</button>
    <button on:click={setTool(Tools.NULL)}>Erase</button>
    <button on:click={setTool(Tools.WIRE)}>Wire</button>
    <button on:click={setTool(Tools.HEAD)}>Electron Head</button>
    <button on:click={setTool(Tools.TAIL)}>Electron Tail</button>
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
