<script setup>
const job = defineModel({
  validator: (p) => p === undefined || typeof p === "object",
  required: true
});
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="job !== undefined" class="fixed z-1 bg-white rounded-4xl p-10">
        {{ job.title }}
        <button @click="job = undefined">X</button>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-from, .modal-leave-to {
  opacity: 0;
}
</style>