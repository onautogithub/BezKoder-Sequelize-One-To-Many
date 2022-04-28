<template>
  <div v-if="currentTutorial" class="edit-form py-3">
    <p class="headline">Edit Tutorial</p>
    <v-form ref="form" lazy-validation>
      <v-text-field
        v-model="currentTutorial.title"
        :rules="[(v) => !!v || 'Title is required']"
        label="Title"
        required
      ></v-text-field>
      <v-text-field
        v-model="currentTutorial.description"
        :rules="[(v) => !!v || 'Description is required']"
        label="Description"
        required
      ></v-text-field>
      <label><strong>Status:</strong></label>
      {{ currentTutorial.published ? "Published" : "Pending" }}
      <v-divider class="my-5"></v-divider>
      <v-btn v-if="currentTutorial.published"
        @click="updatePublished(false)"
        color="primary" small class="mr-2"
      >
        UnPublish
      </v-btn>
      <v-btn v-else
        @click="updatePublished(true)"
        color="primary" small class="mr-2"
      >
        Publish
      </v-btn>
      <v-btn color="error" small class="mr-2" @click="deleteTutorial">
        Delete
      </v-btn>
      <v-btn color="success" small @click="updateTutorial">
        Update
      </v-btn>
      <v-btn color="information" small @click="backToPrevious">
        Back
      </v-btn>
      <v-card class="mx-auto" tile>
      <v-card-title>
        Comments
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="comments"
        disable-pagination
        :hide-default-footer="true"
        >
        <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editComment(item.id)">mdi-pencil</v-icon>
            <v-icon small @click="deleteComment(item.id)">mdi-delete</v-icon>
          </template>
      </v-data-table>
      <v-card-actions
        v-if="comments.length > 0" >
        <v-btn
          small
          color="error"
          @click="removeAllComments">
          Remove All
        </v-btn>
      </v-card-actions>
    </v-card>
    </v-form>
    <p class="mt-3">{{ message }}</p>
  </div>
  <div v-else>
    <p>Please click on a Tutorial...</p>
  </div>
</template>

<script>
import TutorialDataService from '../services/TutorialDataService'
import CommentDataService from '../services/CommentDataService'
export default {
  name: 'tutorial',
  data () {
    return {
      currentTutorial: null,
      message: '',
      currentcomment: null,
      comments: [],
      title: '',
      headers: [
        {text: 'Title', align: 'start', sortable: false, value: 'name'},
        {text: 'Comment', value: 'text', sortable: false},
        {text: 'Actions', value: 'actions', sortable: false}
      ]
    }
  },
  methods: {
    getTutorial (id) {
      TutorialDataService.get(id)
        .then((response) => {
          this.currentTutorial = response.data
          this.comments = response.data.comments.map(this.getDisplayComments)
          console.log(response.data)
        })
        .catch((e) => {
          console.log(e)
        })
    },
    updatePublished (status) {
      var data = {
        id: this.currentTutorial.id,
        title: this.currentTutorial.title,
        description: this.currentTutorial.description,
        published: status
      }
      TutorialDataService.update(this.currentTutorial.id, data)
        .then((response) => {
          this.currentTutorial.published = status
          console.log(response.data)
        })
        .catch((e) => {
          console.log(e)
        })
    },
    updateTutorial () {
      TutorialDataService.update(this.currentTutorial.id, this.currentTutorial)
        .then((response) => {
          console.log(response.data)
          this.message = 'The tutorial was updated successfully!'
        })
        .catch((e) => {
          console.log(e)
        })
    },
    deleteTutorial () {
      TutorialDataService.delete(this.currentTutorial.id)
        .then((response) => {
          console.log(response.data)
          this.$router.push({ name: 'tutorials' })
        })
        .catch((e) => {
          console.log(e)
        })
    },
    deleteComment (id) {
      console.log(`This is what I passed as an id ` + id)
      CommentDataService.delete(id)
        .then((response) => {
          console.log(response.data)
          // this.$router.push(
          //   {name: 'tutorial-details', params: {id: this.currentTutorial.id}})
          // this.$router.push({ name: 'tutorial-details' })
          this.getTutorial(this.$route.params.id)
          // this.getDisplayComments(this.comment)
        })
        .catch((e) => {
          console.log(e)
        })
    },
    getDisplayComments (comment) {
      return {
        id: comment.id,
        name: comment.name.length > 30 ? comment.name.substr(0, 30) + '...' : comment.name,
        text: comment.text.length > 30 ? comment.text.substr(0, 30) + '...' : comment.text
      }
    },
    editComment (id) {
      console.log(`This is what I passed as an id ` + id)
      this.$router.push(
        {name: 'comment-details', params: {id: id}})
    },
    removeAllComments () {
      // console.log(`This is what I passed as an id ` + id)
      // this.$router.push(
      //   {name: 'comment-details', params: {id: id}})
    },
    backToPrevious () {
      this.$router.push({name: 'tutorials'})
    }
  },
  mounted () {
    this.message = ''
    this.getTutorial(this.$route.params.id)
  }
}
</script>
<style>
.edit-form {
  max-width: 700px;
  margin: auto;
}
.list {
  max-width: 750px
}
</style>
