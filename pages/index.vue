<script setup>
useSeoMeta({
  title: "Profil Public | Jobs",
  description: "Liste des jobs proposés par Profil Public"
});

const jobs = ref([]);
const currentPage = ref(0);

const employers = await useFetch("https://app.profilpublic.fr/api/employers?fields=name&sort[name]=asc&pagination[pageSize]=200");
const sectors = await useFetch("https://app.profilpublic.fr/api/sectors?fields=name&sort[name]=asc&pagination[pageSize]=200");
const selectedEmployer = ref("-1");
const selectedSector = ref("-1");

watch([selectedEmployer, selectedSector], () => {
  jobs.value = [];
  currentPage.value = 0;
});

const jobsFetch = await useFetch(() => "https://app.profilpublic.fr/api/jobs" +
    "?fields[0]=slug" +
    "&fields[1]=title" +
    (selectedEmployer.value === "-1" ? "" : `&filters[employer][id]=${selectedEmployer.value}`) +
    (selectedSector.value === "-1" ? "" : `&filters[sectors][id]=${selectedSector.value}`) +
    "&populate[employer][fields]=name" +
    "&populate[employer][populate][cover][fields]=url" +
    "&populate[employer][populate][logo][fields]=url" +
    "&populate[locations][fields]=city" +
    "&populate[sectors][fields]=name" +
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

function onScroll(event) {
  const {scrollTop, clientHeight, scrollHeight} = event.target;
  if (scrollTop + clientHeight >= scrollHeight - 100 && !jobsFetch.pending.value)
    if (currentPage.value < jobsFetch.data.value.meta.pagination.pageCount)
      currentPage.value++;
}
</script>

<template>
  <div class="bg-gray-300 p-px h-screen flex flex-col">
    <div class="m-5 bg-blue-500 rounded-3xl flex max-xl:flex-col justify-around pl-5 pr-5 pt-3 pb-3 whitespace-nowrap">
      <div class="flex">
        <p>Employeur :&nbsp;</p>
        <select name="employers" v-model="selectedEmployer" class="truncate max-lg:w-full">
          <option selected value="-1"> -- Sélectionner une option -- </option>
          <option v-for="employer in employers.data.value.data" :key="employer.id" :value="employer.id">{{ employer.name }}</option>
        </select>
      </div>
      <div class="flex">
        <p>Secteur :&nbsp;</p>
        <select name="sectors" v-model="selectedSector" class="truncate max-sm:w-full">
          <option selected value="-1"> -- Sélectionner une option -- </option>
          <option v-for="sector in sectors.data.value.data" :key="sector.id" :value="sector.id">{{ sector.name }}</option>
        </select>
      </div>
    </div>

    <ul @scroll="onScroll" class="flex-1 overflow-y-scroll">
      <li v-for="job in jobs" :key="job.id"
          class="bg-white border border-gray-700 rounded-xl p-3 m-5 shadow-[0_0_25px_rgba(0,0,0,0.4)]">
        <Item :job="job"/>
      </li>
      <li class="w-full text-center text-2xl">
        <p v-if="jobsFetch.pending.value || currentPage < jobsFetch.data.value.meta.pagination.pageCount - 1">
          Chargement
        </p>
        <p v-else>
          Fin de la liste
        </p>
      </li>
    </ul>
  </div>
</template>
