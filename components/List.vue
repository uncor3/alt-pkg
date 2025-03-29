<template>
  <div class="app-header">
    <h1 class="app-logo">AltPkg</h1>
    <div class="reset-btn">
      <button @click="handleClick">
        <SystemUiconsReset />
        Reset
      </button>
    </div>
  </div>
  <div class="pkg-header">
    <p>Manager</p>
    <p>Command</p>
  </div>
  <ul ref="parent">
    <li class="pkg" v-for="(element, index) in list" :index="index">
      <div>
        <GrabIcon />
      </div>
      <div class="pkg-manager">
        <input type="text" v-model="element.name" />
      </div>
      <div class="pkg-command">
        <input type="text" v-model="element.command" />
      </div>
      <div @click="deleteItem(index)" class="trash-bin"><TrashBin /></div>
    </li>
  </ul>

  <form @submit="handleAdd" class="add-form">
    <div class="pkg">
      <div class="pkg-manager">
        <input
          type="text"
          placeholder="Manager"
          v-model="newManager.name"
          required
        />
      </div>
      <div class="pkg-command">
        <input
          type="text"
          placeholder="Command"
          v-model="newManager.command"
          required
        />
      </div>
    </div>
    <button type="submit">Add</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useDragAndDrop } from 'vue-fluid-dnd';
import { setDefaultList, getList, setList } from '@/entrypoints/popup/utils';
import SystemUiconsReset from '@/components/icons/SystemUiconsReset.vue';
import GrabIcon from '@/components/icons/GrabIcon.vue';
import TrashBin from '@/components/icons/TrashBin.vue';
import { PkgManager } from '@/entrypoints/popup/types';
const list = ref<PkgManager[]>([]);

onMounted(async () => {
  list.value = await getList();
});

const newManager = ref({ name: '', command: '' });

const handleClick = async () => {
  list.value = await setDefaultList();
};

const { parent } = useDragAndDrop(list, {
  onDragEnd: async (event) => {
    await setList(list.value);
  },
});

const handleAdd = async (event: Event) => {
  event.preventDefault();
  if (!newManager.value.name || !newManager.value.command) {
    return;
  }
  list.value.push({ ...newManager.value });
  await setList(list.value);
  newManager.value = { name: '', command: '' };
};

const deleteItem = async (index: number) => {
  list.value = list.value.filter((_, i) => i !== index);
  await setList(list.value);
};
</script>
