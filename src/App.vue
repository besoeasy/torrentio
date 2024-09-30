<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center bg-gray-100"
  >
    <div class="my-20">
      <div class="bg-white shadow-md rounded-full flex items-center">
        <input
          v-model="imdbLink"
          placeholder="Paste IMDB URL"
          class="py-2 px-4 rounded-l-full w-full outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          @click="fetchTorrents"
          class="bg-blue-500 text-white rounded-full px-4 py-2 hover:bg-blue-600 transition duration-200"
        >
          Search
        </button>
      </div>
    </div>

    <div v-if="torrents.length" class="mt-6 w-1/3">
      <ul>
        <li
          v-for="torrent in torrents"
          :key="torrent.magnet"
          class="bg-white shadow-md rounded-lg p-4 mb-2 w-full"
        >
          <p class="text-sm text-gray-600">{{ torrent.title }}</p>

          <div class="flex justify-between mt-2">
            <a
              :href="torrent.magnet"
              class="bg-blue-500 text-white rounded-lg p-2"
              >Magnet</a
            >
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { fetchTorrent, getImdbId } from "./api.js";
import { ref } from "vue";

export default {
  setup() {
    const imdbLink = ref("");
    const torrents = ref([]);

    const fetchTorrents = async () => {
      console.log("fetching torrents");

      const imdbId = getImdbId(imdbLink.value);

      const sd3 = await fetchTorrent(imdbId);

      console.log(sd3);

      torrents.value = sd3;
    };

    return {
      imdbLink,
      torrents,
      fetchTorrents,
    };
  },
};
</script>
