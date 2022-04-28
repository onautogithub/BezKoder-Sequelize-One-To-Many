<template>
<div class="submit-form mt-3 mx-auto">
  <p class="headline">
    Add Comment
  </p>
  <div v-if="!submitted">
    <v-form ref="form" lazy-validation>
      <v-text-field
        v-model="comment.name"
        :rule="[(v) => !v || 'Title is required']"
        label="Title"
        required
      >
      </v-text-field>
      <v-text-field
        v-model="comment.text"
        :rule="[(v) => !v || 'Description is required']"
        label="Description"
        required
      >
      </v-text-field>
    </v-form>
    <v-btn
      color="primary"
      class="mt-3"
      @click="saveComment">
      Submit
    </v-btn>
  </div>
  <div v-else>
    <v-card class="mx-auto">
      <v-card-title>
        Submitted Successfully!
      </v-card-title>
      <v-card-subtitle>
        Click the button to add a new Comment
      </v-card-subtitle>
      <v-card-actions>
        <v-btn
          color="success"
          @click="newComment"
        >
          Add
        </v-btn>
        <v-btn
          color="success"
          @click="doneAddingComments"
        >
          Done
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</div>
</template>

<script>
import CommentDataService from '../services/CommentDataService'

export default {
  name: 'AddComment',
  data () {
    return {
      comment: {
        id: null,
        name: '',
        text: '',
        tutorialId: ''
      },
      submitted: false
    }
  },
  methods: {
    saveComment () {
      console.log(this.$route.params.id)
      var data = {
        name: this.comment.name,
        text: this.comment.text,
        tutorialId: this.$route.params.id
      }
      console.log(data)
      CommentDataService.create(data)
        .then((response) => {
          this.comment.id = response.data.id
          console.log(response.data)
          this.submitted = true
        }).catch((e) => {
          console.log(e)
        })
    },
    doneAddingComments () {
      this.newComment()
      this.$router.push({ name: 'tutorial-details' })
    },
    newComment () {
      this.submitted = false
      this.comment = {}
    }
  }
}
</script>

<style>
  .submit-form {
    max-width: 300px
  }
</style>
