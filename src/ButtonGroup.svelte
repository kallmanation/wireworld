<script>
export let summary;

let details;
const closeDetails = () => details.removeAttribute("open");
</script>

<details bind:this={details}>
  <summary>{summary}</summary>
  <div on:click={closeDetails}>
    <slot></slot>
  </div>
</details>

<style>
  details {
    flex: 1;
    position: relative;
  }
  details > summary:focus { outline: none; }
  details > summary::-webkit-details-marker { display: none; }
  details > summary {
    list-style: none;
    text-align: center;
    color: white;
    background: black;
    width: 90%;
    padding: 1rem .1rem;
    margin: 0 auto;
    border-radius: 3rem;
    cursor: pointer;
  }
  details > div {
    position: absolute;
    min-width: 100%;
    bottom: 100%;
    display: flex;
    flex-direction: column;
  }
</style>
