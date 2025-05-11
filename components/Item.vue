<script setup>
const {job} = defineProps({
  job: {
    type: Object,
    required: true
  }
});

function onClick() {
  window.open("https://profilpublic.fr/jobs/" + job.slug, "_blank");
}
</script>

<template>
  <li class="flex items-center cursor-pointer bg-white border border-gray-900 rounded-xl p-3 m-5 shadow-[0_0_25px_rgba(0,0,0,0.4)]">
    <NuxtImg :alt="job.title" :src="'https://app.profilpublic.fr' + job.employer.cover.url" loading="lazy"
             class="object-cover h-[150px] w-[270px] rounded-xl mr-3"/>
    <div class="flex-1 overflow-hidden">
      <p class="text-3xl whitespace-nowrap text-ellipsis overflow-hidden" :title="job.title">{{ job.title }}</p>
      <div class="flex items-center">
        <NuxtImg :alt="job.employer.name" :src="'https://app.profilpublic.fr' + job.employer.logo.url"
                 loading="lazy" class="object-cover h-[30x] w-[30px] rounded-full mr-1"/>
        {{ job.employer.name }}
      </div>
    </div>
  </li>
</template>
