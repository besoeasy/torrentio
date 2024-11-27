<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
    <div class="my-20 mx-20 w-1/2">
      <div class="bg-gray-800 shadow-md rounded-full flex items-center">
      <input
        v-model="imdbLink"
        placeholder="Paste IMDB URL"
        class="py-4 px-6 rounded-l-full w-full outline-none focus:ring-2 focus:ring-red-500 bg-gray-700 text-white"
      />
      <button
        @click="fetchTorrents"
        class="bg-red-600 text-white rounded-full px-6 py-4 hover:bg-red-700 transition duration-200"
      >
        Search
      </button>
      </div>
    </div>

    <div v-if="torrents.length" class="mt-6 w-full max-w-3xl">
      <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
        <li
          v-for="torrent in torrents"
          :key="torrent.magnet"
          class="bg-gray-800 shadow-md rounded-lg p-4"
        >
          <p class="text-sm text-gray-400">{{ torrent.title }}</p>

          <div class="flex justify-between mt-2">
            <a
              :href="torrent.magnet"
              class="bg-red-600 text-white rounded-lg p-2 hover:bg-red-700 transition duration-200"
              >Magnet</a
            >
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { fetchTorrent, getImdbId } from "./api.js";

const imdbLink = ref("");
const torrents = ref([]);

const fetchTorrents = async () => {
  console.log("fetching torrents");

  const imdbId = getImdbId(imdbLink.value);

  const sd3 = await fetchTorrent(imdbId);

  console.log(sd3);

  torrents.value = sd3;
};
</script>
