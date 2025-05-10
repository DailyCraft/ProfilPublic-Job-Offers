<script setup lang="ts">
const { value } = defineProps({ value: Object });
if (value === undefined)
  throw new Error("Value must be set");

function onClick() {
  window.open("https://profilpublic.fr/jobs/" + value.slug, "_blank");
}
</script>

<template>
  <li class="flex" @click="onClick">
    <NuxtImg :alt="value.title" :src="'https://app.profilpublic.fr' + value.employer.cover.url" loading="lazy" class="object-cover h-[200px] w-[270px] rounded-xl" />
    <div>
      {{ value.title }}
      <div class="flex items-center">
        <NuxtImg :alt="value.employer.name" :src="'https://app.profilpublic.fr' + value.employer.logo.url" loading="lazy" class="object-cover h-[40x] w-[40px] rounded-xl" />
        {{ value.employer.name }}
      </div>
    </div>
  </li>
</template>

<style scoped>

</style>