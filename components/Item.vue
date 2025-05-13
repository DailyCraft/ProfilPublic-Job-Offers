<script setup>
const {job} = defineProps({
  job: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <a :href="'https://profilpublic.fr/jobs/' + job.slug" target="_blank" class="md:flex items-center">
    <NuxtImg :alt="job.title" :src="'https://app.profilpublic.fr' + job.employer.cover.url" loading="lazy"
             class="object-cover w-full md:w-[250px] h-[100px] sm:h-[125px] rounded-xl mr-3"/>
    <div class="flex-1 overflow-hidden flex flex-col h-full">
      <p class="text-2xl sm:text-3xl md:whitespace-nowrap text-ellipsis overflow-hidden max-md:line-clamp-2"
         :title="job.title">{{ job.title }}</p>
      <div class="sm:flex items-center mb-4 sm:space-x-5">
        <div class="flex space-x-1 overflow-auto">
          <NuxtImg :alt="job.employer.name" :src="'https://app.profilpublic.fr' + job.employer.logo.url"
                   loading="lazy" class="object-cover h-[30px] w-[30px] rounded-full"/>
          <p class="text-lg truncate">{{ job.employer.name }}</p>
        </div>
        <p class="flex-1 whitespace-nowrap">📍 {{ job.locations.map(l => l.city).join(" / ") }}</p>
      </div>
      <p>🛠️ {{ job.sectors.map(s => s.name).join(" / ") }}</p>
    </div>
  </a>
</template>
