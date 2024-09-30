<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center bg-gray-100"
  >
    <input
      v-model="imdbLink"
      type="text"
      placeholder="Enter IMDb link"
      class="border border-gray-300 rounded-lg p-2 mb-4 w-1/3"
    />
    <button
      @click="fetchTorrents"
      class="bg-blue-500 text-white rounded-lg p-2"
    >
      Fetch Torrents
    </button>

    <div v-if="torrents.length" class="mt-6 w-1/3">
      <h2 class="text-xl font-semibold mb-2">Available Torrents</h2>
      <ul>
        <li
          v-for="torrent in torrents"
          :key="torrent.magnet"
          class="bg-white shadow-md rounded-lg p-4 mb-2"
        >
          <h3 class="font-semibold">{{ torrent.name }}</h3>
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
