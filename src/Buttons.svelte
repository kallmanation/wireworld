<script>
  import ButtonGroup from './ButtonGroup.svelte';
  import PortModal from './PortModal.svelte';
  import {
    scale,
    tool,
    Tools
  } from './uiStore.js';
  import {
    currentState,
    running
  } from './worldStore.js';

  const zoomin = () => scale.update(n => n - 1);
  const zoomout = () => scale.update(n => n + 1);
  const deleteAll = () => confirm("Delete all your hard work?") ? currentState.inport({}) : null;
  let shouldShowPortModal = false;
  const showPortModal = () => {
    running.pause();
    shouldShowPortModal = true;
  }
  const hidePortModal = () => shouldShowPortModal = false;
  let onPlayPause, playOrPause;
  $: onPlayPause = $running ? running.pause : running.play;
  $: playOrPause = $running ? "Pause" : "Play";
  const setTool = (newTool) => () => tool.set(newTool);
</script>

{#if shouldShowPortModal}
  <PortModal done={hidePortModal}></PortModal>
{/if}
<aside>
  <ButtonGroup summary="Meta">
    <button on:click={showPortModal}>Export</button>
    <button on:click={showPortModal}>Import</button>
    <button on:click={deleteAll}>Delete All</button>
  </ButtonGroup>
  <ButtonGroup summary="Controls">
    <button on:click={zoomin}>Zoom In</button>
    <button on:click={zoomout}>Zoom Out</button>
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
