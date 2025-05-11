<script setup>
useHead({
  title: "Profil Public | Jobs"
});

const jobs = ref([]);
const modalJob = ref();

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
    jobs.value.push(...toRaw(data.value).data);
}, {immediate: true});

const onScroll = () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && !pending.value)
    if (currentPage.value < data.value.meta.pagination.pageCount)
      currentPage.value++;
}

onMounted(() =>
    window.addEventListener("scroll", onScroll));
onUnmounted(() =>
    window.removeEventListener("scroll", onScroll));
</script>

<template>
  <div class="bg-gray-300 p-px">
    <ul>
      <Item v-for="job in jobs" :key="job.id" :job="job" @click="modalJob = job"/>
    </ul>
    <p v-if="pending || currentPage < data.meta.pagination.pageCount">Pending</p>
    <p v-else>Done</p>
    <Modal v-model="modalJob"/>
  </div>
</template>
