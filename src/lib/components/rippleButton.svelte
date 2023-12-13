<script>
    let ripples;
    let targetStyle = { color: "#ffffff" };
  
    function handleMouseOver(e) {
      let x = e.clientX - e.target.offsetLeft;
      let y = e.clientY - e.target.offsetTop;
  
      ripples = {
        left: x + "px",
        top: y + "px"
      };
  
      targetStyle = { color: " #16161D" };
    }
  
    function handleMouseOut() {
      ripples = null;
      targetStyle = { color: "#ffffff" };
    }
  </script>
  
  <style>
    .ripple {
      position: absolute;
      background: rgba(0, 0, 0, 0.5);
      border-radius: 50%;
      width: 100px;
      height: 100px;
      transform: translate(-50%, -50%);
      pointer-events: none;
      transition: transform 0.5s, opacity 0.5s;
    }
  </style>
  
  <div on:mouseover={handleMouseOver} on:mouseout={handleMouseOut}>
    {#if ripples}
      <span class="ripple" style="left: {ripples.left}; top: {ripples.top}"></span>
    {/if}
    <!-- Your button content goes here -->
    <slot></slot>
  </div>
  