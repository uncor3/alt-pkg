<template>
  <div class="app-header">
    <h1 class="app-logo">
      <AltPkgIcon />
      <span> AltPkg </span>
    </h1>
    <div class="reset-btn">
      <button @click="handleClick">
        Reset
        <SystemUiconsReset />
      </button>
    </div>
  </div>
  <div class="pkg-header">
    <Transition name="fade">
      <div class="refresh-warning" v-if="changed">
        <p>
          Please refresh any open npmjs.com tabs for the changes to take effect.
        </p>
      </div>
    </Transition>

    <p>Manager</p>
    <p>Command</p>
  </div>
  <ul ref="parent">
    <div v-if="!list.length">
      <p>Are you sure?</p>
      <p>
        This extension removes the default install command, which means you now
        have no commands on npmjs.com.
      </p>
    </div>
    <li class="pkg" v-for="(element, index) in list" :index="index">
      <div>
        <GrabIcon />
      </div>
      <div class="pkg-text">
        <span>{{ element.name }}</span>
      </div>
      <div class="pkg-text">
        <span>{{ element.command }}</span>
      </div>
      <div @click="deleteItem(index)" class="trash-bin"><TrashBin /></div>
    </li>
  </ul>

  <form @submit="handleAdd" class="add-form">
    <div class="form-fields">
      <input
        type="text"
        placeholder="Manager"
        v-model="newManager.name"
        required
      />
      <input
        type="text"
        placeholder="Command"
        v-model="newManager.command"
        required
      />
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
import AltPkgIcon from './icons/AltPkgIcon.vue';
const list = ref<PkgManager[]>([]);
const changed = ref(false);

let timeout: NodeJS.Timeout;
const warnToRefresh = () => {
  if (timeout) {
    clearTimeout(timeout);
  }
  changed.value = true;
  timeout = setTimeout(() => {
    changed.value = false;
  }, 5000);
};

onMounted(async () => {
  list.value = await getList();
  watch(() => JSON.stringify(list.value), warnToRefresh);
});

const newManager = ref({ name: '', command: '' });

const handleClick = async () => {
  list.value = await setDefaultList();
};

const { parent } = useDragAndDrop(list, {
  onDragEnd: async () => {
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

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
