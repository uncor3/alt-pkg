<script lang="ts" setup>
import List from './List.vue';
const version =
  typeof __APP_VERSION__ !== 'undefined' ? __APP_VERSION__ : 'unknown';
</script>

<template>
  <List />
  <footer>
    <a target="_blank" href="https://uncore.me/donate">Donate</a>
    <p>
      <a target="_blank" href="https://github.com/uncor3/alt-pkg"
        >Source code</a
      >
    </p>
    <p>
      Made by <a target="_blank" href="https://github.com/uncor3">uncore</a>
    </p>
  </footer>
  <div class="version-info">
    <h3>v{{ version }}</h3>
  </div>
</template>
