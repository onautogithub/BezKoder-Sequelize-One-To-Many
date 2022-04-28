<template>
  <div v-if="currentComment" class="edit-form py-3">
    <p class="headline">Edit Comment</p>
      <v-form ref="form" lazy-validation>
          <v-text-field
              v-model="currentComment.name"
              :rules="[(v) => !!v || 'Comment name is required']"
              label="Name"
              required
          ></v-text-field>
          <v-text-field
              v-model="currentComment.text"
              :rules="[(v) => !!v || 'Description is required']"
              label="Description"
              required
          ></v-text-field>
          <v-btn color="error" small class="mr-2" @click="deleteComment">
            Delete
          </v-btn>
          <v-btn color="success" small @click="updateComment">
            Update
          </v-btn>
          <v-btn color="information" small @click="backToPrevious">
            Back
          </v-btn>
      </v-form>
    <p class="mt-3">{{ message }}</p>
  </div>
  <div v-else>
    <p>Please click on a Comment...</p>
  </div>
</template>

<script>
import CommentDataService from '../services/CommentDataService'
export default {
  name: 'CommentDetails',
  data () {
    return {
      currentComment: null,
      message: '',
      id: ''
    }
  },
  methods: {
    getComment (id) {
      CommentDataService.get(id)
        .then((response) => {
          this.currentComment = response.data
          console.log(response.data)
        })
        .catch((e) => {
          console.log(e)
        })
    },
    updateComment () {
      CommentDataService.update(this.currentComment.id, this.currentComment)
        .then((response) => {
          console.log(response.data)
          this.message = 'The comment was updated successfully!'
        })
        .catch((e) => {
          console.log(e)
        })
    },
    deleteComment () {
      var id = this.currentComment.id
      console.log(`This is what I passed as an id ` + id)
      CommentDataService.delete(id)
        .then((response) => {
          console.log(response.data)
          this.$router.push(
            {name: 'tutorial-details', params: {id: this.currentComment.tutorialId}})
        })
        .catch((e) => {
          console.log(e)
        })
    },
    backToPrevious () {
      this.$router.push(
        {name: 'tutorial-details', params: {id: this.currentComment.tutorialId}})
    }
  },
  mounted () {
    this.message = ''
    this.getComment(this.$route.params.id)
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
