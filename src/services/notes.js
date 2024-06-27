import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default {
    getNotes() {
        return apiClient.get('/notes');
    },

    getNote(id) {
        return apiClient.get(`/get-note/${id}`);
    },

    update(noteData) {

        return apiClient.put(`/notes`, noteData);
    }
};