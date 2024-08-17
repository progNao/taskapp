<template>
  <v-dialog v-model="dialog" max-width="30rem">
    <v-form :lazy-validation="true" ref="form">
      <v-card color="white">
        <v-card-title class="headline">Comment</v-card-title>
        <v-card-item class="pt-4">
          <v-row>
            <v-col cols="8">
              <v-text-field
                v-model="addComment"
                :rules="[rules.required]"
                density
              />
            </v-col>
            <v-col cols="4">
              <v-btn
                color="primary"
                @click="comment()"
                density
              >コメント追加</v-btn>
            </v-col>
          </v-row>
          <div v-if="isLoading">
            <v-row class="loading">
              <v-progress-circular
              :width="3"
              color="green"
              indeterminate
            ></v-progress-circular>
            </v-row>
          </div>
          <div v-if="!isLoading">
            <div v-for="item in obj" :key="item.id">
              <v-row dense>
                <v-col cols="12">
                  <v-card color="#385F73">
                    <v-card-item>
                      {{ item.comment }}
                    </v-card-item>
                  </v-card>
                </v-col>
              </v-row>
            </div>
          </div>
        </v-card-item>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" @click="$emit('close-modal')">閉じる</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
export default {
  props: ["info"],
  data: () => {
    return {
      dialog: false,
      addComment: '',
      rules: {
        required: (value) => !!value || "必須項目です.",
      },
      obj: [],
      isLoading: true
    }
  },
  mounted() {
    setTimeout(() => {
      this.obj = this.info
    }, 1500);
    setTimeout(() => {
      this.isLoading = false;
    }, 1500);
  },
  methods: {
    async comment() {
      try {
        const form = this.$refs.form
        const { valid } = await form.validate()
        if (valid) {
          this.fetchData()
          this.$emit("close-modal")
        }
      } catch (e) {
        console.log("エラー")
      }
    },
    fetchData() {
      const ticketId = this.obj[0].ticket_id
      const req = {
        comment: this.addComment,
        ticket_id: ticketId
      }
      this.$axios
        .post(`http://localhost:8000/comment/${ticketId}`, req)
          .then(() => {
            this.$axios
            .get(`http://localhost:8000/comment/${ticketId}`)
              .then((response) => {
                this.obj = response.data.data
              })
              .catch((error) => {
                console.error("Error:", error)
              })
        })
        .catch((error) => {
          console.error("Error:", error)
        })
    },
  },
}
</script>

<style scoped>
.loading {
  margin-left: 9rem;
  margin-bottom: 1rem;
}
</style>