<script setup>
import { ref, onMounted } from 'vue';
import notesService from '@/services/notes';
import Swal from 'sweetalert2'; // Swal kütüphanesini import et

const notes = ref([]);

onMounted(async () => {
  try {
    const response = await notesService.getNotes();
    notes.value = response.data;
  } catch (error) {
    console.error("Veri alınırken bir hata oluştu:", error.message);
  }
});

const confirmDelete = async (id) => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  });

  if (result.isConfirmed) {
    try {

      await notesService.delete(id);
      // Başarıyla silindiğine dair bildirim veya başka işlemler yapabilirsiniz
      Swal.fire(
        'Deleted!',
        'Your note has been deleted.',
        'success'
      );
      // this.loadNotes(); // Notları tekrar yüklemek için ilgili fonksiyonu çağırın
    } catch (error) {
      Swal.fire(
        'Error!',
        'Failed to delete note.',
        'error'
      );
    }
  }
};
</script>

<template>
  <main>
    <div class="wrapper">

      <nav>
        <RouterLink class="bg-gray-200" to="/new"><button type="button"
            class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">New
            Add</button>
        </RouterLink>


        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Order Number
                </th>
                <th scope="col" class="px-6 py-3">
                  Title
                </th>
                <th scope="col" class="px-6 py-3">
                  Status
                </th>
                <th scope="col" class="px-6 py-3">
                  Delete Action
                </th>
                <th scope="col" class="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>


              <tr v-for="(note, index) in notes" :key="note.id"
                class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {{ index + 1 }}
                </th>
                <td class="px-6 py-4">

                  {{ note.title }}

                </td>
                <td class="px-6 py-4">
                  <span v-if="note.status == 1" class="text-green-500">Active</span>
                  <span v-else class="text-red-500">Passive</span>
                </td>
                <td class="px-6 py-4">
                  <a :href="'/delete-note/' + note.id"
                    class="font-medium text-blue-600 dark:text-blue-500 cursor-pointer"
                    @click.prevent="confirmDelete(note.id)">Delete</a>
                </td>

                <td class="px-6 py-4">
                  <a :href="'/edit/' + note.id"
                    class="font-medium text-blue-600 dark:text-blue-500 cursor-pointer">Edit</a>
                </td>
              </tr>

            </tbody>
          </table>
        </div>

      </nav>
    </div>
  </main>
</template>
