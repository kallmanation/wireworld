<script>
import { onMount } from 'svelte';
import {
  currentState,
  exportCurrentState,
  importCurrentState
} from './worldStore.js';

export let done;

let textarea;
onMount(() => {
  textarea.select();
});
const onDone = () => {
  importCurrentState(textarea.value);
  done && done();
};
</script>

<section>
  <div>
    <textarea bind:this={textarea}>{exportCurrentState($currentState)}</textarea>
    <button on:click={onDone}>Done</button>
  </div>
</section>

<style>
  section {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  section > div {
    position: absolute;
    width: 90vmin;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    border-radius: 3rem;
    padding: 1rem;
  }
  textarea {
    width: 90%;
    height: 10rem;
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
</style>
