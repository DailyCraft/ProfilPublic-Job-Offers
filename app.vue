<script setup>
const list = ref([]);

const currentPage = ref(0);
const {data, pending, error} = await useFetch(() => "https://app.profilpublic.fr/api/jobs" +
    "?fields[0]=moderated" +
    "&fields[1]=slug" +
    "&fields[2]=title" +
    "&fields[3]=type" +
    "&fields[4]=validatedAt" +
    "&filters[published]=true" +
    "&populate[employer][fields][0]=name" +
    "&populate[employer][populate][cover][fields][0]=url" +
    "&populate[employer][populate][logo][fields][0]=url" +
    "&populate[header][fields][0]=title" +
    "&populate[header][populate][cover][fields][0]=url" +
    "&populate[locations][fields][0]=%2A" +
    "&populate[locations][populate][region][fields][0]=name" +
    "&populate[locations][populate][region][fields][1]=slug" +
    "&populate[speaker][fields][0]=firstName" +
    "&populate[speaker][fields][1]=lastName" +
    "&populate[speaker][populate][photo][fields][0]=url" +
    "&populate[categories][fields][0]=name&populate[categories][fields][1]=slug" +
    "&pagination[pageSize]=20" +
    `&pagination[page]=${currentPage.value}` +
    "&sort[0][imported]=asc" +
    "&sort[1][validatedAt]=desc");

watch(pending, (isPending) => {
  if (isPending)
    return;
  if (error.value)
    console.error("Error during the request:", error.value);
  else
    list.value.push(...toRaw(data.value).data);
}, {immediate: true});

function onScroll(event) {
  const target = event.target;
  if (target.scrollTop + target.clientHeight >= target.scrollHeight - 100 && !pending.value)
    if (currentPage.value < data.value.meta.pagination.pageCount)
    currentPage.value++;
}
</script>

<template>
  <ul @scroll="onScroll" class="h-screen overflow-y-auto">
    <Item v-for="job in list" :key="job.id" :value="job"/>
  </ul>
  <p v-if="pending || currentPage < data.meta.pagination.pageCount">Pending</p>
  <p v-else>Done</p>
</template>