<script setup>
import { ref, onMounted } from 'vue';
import notesService from '@/services/notes';
import { useRoute } from 'vue-router';

const notes = ref({});
const route = useRoute();

const id = ref(route.params.id);
onMounted(async () => {
    try {
        const response = await notesService.getNote(id.value);
        console.log(response.data);
        notes.value = response.data;
    } catch (error) {
        console.error("Veri alınırken bir hata oluştu:", error.message);
    }
});

const submit = async () => {
    try {
        // console.log(JSON.stringify(notes.value, null, 2));

        await notesService.update(notes.value);
        console.log('Note updated successfully');

    } catch (error) {
        console.error('Error updating note:', error);
    }
};
</script>

<template>
    <div>

        <form class="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md dark:bg-gray-800" @submit.prevent="submit">
            <div class="grid md:grid-cols-2 md:gap-6">
                <div class="relative z-0 w-full mb-6 group">
                    <input v-model="notes.title" type="text" name="floating_first_name" id="floating_first_name"
                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" " required />
                    <label for="floating_first_name"
                        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">

                    </label>
                </div>

                <div class="relative z-0 w-full mb-6 group">
                    <label for="status" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select
                        Status</label>
                    <select id="status" v-model="notes.status"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="1">Active</option>
                        <option value="0">Passive</option>

                    </select>
                </div>
            </div>

            <div class="grid md:grid-cols-1 md:gap-6">
                <div class="relative z-0 w-full mb-6 group">
                    <label for="content" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                        content</label>
                    <textarea id="content" rows="4"
                        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Content..." v-model="notes.content"></textarea>
                </div>
            </div>

            <button type="submit"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Submit
            </button>
        </form>




    </div>
</template>

<style></style>
