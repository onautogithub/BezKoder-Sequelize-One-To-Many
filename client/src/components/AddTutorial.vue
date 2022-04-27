<template>
<div class="submit-form mt-3 mx-auto">
  <p class="headline">
    Add tutorial
  </p>
  <div v-if="!submitted">
    <v-form ref="form" lazy-validation>
      <v-text-field
        v-model="tutorial.title"
        :rule="[(v) => !v || 'Title is required']"
        label="Title"
        required
      >
      </v-text-field>
      <v-text-field
        v-model="tutorial.description"
        :rule="[(v) => !v || 'Description is required']"
        label="Description"
        required
      >
      </v-text-field>
    </v-form>
    <v-btn
      color="primary"
      class="mt-3"
      @click="saveTutorial">
      Submit
    </v-btn>
  </div>
  <div v-else>
    <v-card class="mx-auto">
      <v-card-title>
        Submitted Successfully!
      </v-card-title>
      <v-card-subtitle>
        Click the button to add a new Tutorial
      </v-card-subtitle>
      <v-card-actions>
        <v-btn
          color="success"
          @click="newTutorial"
        >
          Add
        </v-btn>
        <v-btn
          color="success"
          @click="doneAddingTutorials"
        >
          Done
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</div>
</template>

<script>
import TutorialDataService from '../services/TutorialDataService'

export default {
  name: 'AddTutorial',
  data () {
    return {
      tutorial: {
        id: null,
        title: '',
        description: '',
        published: false
      },
      submitted: false
    }
  },
  methods: {
    saveTutorial () {
      var data = {
        title: this.tutorial.title,
        description: this.tutorial.description
      }
      TutorialDataService.create(data)
        .then((response) => {
          this.tutorial.id = response.data.id
          console.log(response.data)
          this.submitted = true
        }).catch((e) => {
          console.log(e)
        })
    },
    doneAddingTutorials () {
      this.newTutorial()
      this.$router.push({ name: 'tutorials' })
    },
    newTutorial () {
      this.submitted = false
      this.tutorial = {}
    }
  }
}
</script>

<style>
  .submit-form {
    max-width: 300px
  }
</style>
