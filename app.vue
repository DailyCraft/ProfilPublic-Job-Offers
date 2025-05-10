<template>
  <ul>
    <li v-for="job in list">{{job.title}}</li>
  </ul>
</template>

<script setup>
const list = ref([]);

const { data } = await useFetch("https://app.staging.profilpublic.fr/api/jobs");
list.value.push(...data.value.data);
</script>