<script setup>
useSeoMeta({
  title: "Profil Public | Jobs",
  description: "Liste des jobs proposés par Profil Public"
});

const jobs = ref([]);

const currentPage = ref(0);
const jobsFetch = await useFetch(() => "https://app.profilpublic.fr/api/jobs" +
    "?fields[0]=moderated" +
    "&fields[1]=slug" +
    "&fields[2]=title" +
    "&fields[3]=type" +
    "&fields[4]=validatedAt" +
    "&filters[published]=true" +
    "&populate[employer][fields][0]=name" +
    "&populate[employer][fields][1]=slug" +
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
    "&populate[categories][fields][0]=name" +
    "&populate[categories][fields][1]=slug" +
    "&populate[sectors][fields][0]=name" +
    "&pagination[pageSize]=20" +
    `&pagination[page]=${currentPage.value}` +
    "&sort[0][imported]=asc" +
    "&sort[1][validatedAt]=desc");

watch(jobsFetch.pending, (isPending) => {
  if (isPending)
    return;
  if (jobsFetch.error.value)
    console.error("Error during the request:", jobsFetch.error.value);
  else
    jobs.value.push(...toRaw(jobsFetch.data.value).data);
}, {immediate: true});

const onScroll = () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && !jobsFetch.pending.value)
    if (currentPage.value < jobsFetch.data.value.meta.pagination.pageCount)
      currentPage.value++;
};

onMounted(() =>
    window.addEventListener("scroll", onScroll));
onUnmounted(() =>
    window.removeEventListener("scroll", onScroll));
</script>

<template>
  <div class="bg-gray-300 p-px">
    <!-- <div class="m-5 bg-blue-600 rounded-3xl">
      <select name="employers">
      </select>
    </div> -->
    <ul>
      <li v-for="job in jobs" :key="job.id"
          class="bg-white border border-gray-900 rounded-xl p-3 m-5 shadow-[0_0_25px_rgba(0,0,0,0.4)]">
        <Item :job="job"/>
      </li>
    </ul>
    <!-- <p v-if="jobsFetch.pending.value || currentPage < jobsFetch.data.value.meta.pagination.pageCount">Pending</p>
    <p v-else>Done</p> -->
  </div>
</template>
