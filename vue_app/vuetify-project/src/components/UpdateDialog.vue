<template>
  <v-dialog v-model="dialog" max-width="50rem" persistent>
    <v-form :lazy-validation="true" ref="form">
      <v-card color="#E4F9F5">
        <v-card-title class="headline">No.{{ object.id.toString().padStart(4, '0') }}</v-card-title>
        <v-card-item class="bg-teal-darken-4 pt-4">
          <br />
          <v-row>
            <v-text-field
              v-model="object.title"
              :rules="[rules.required]"
              label="タイトル"
            />
          </v-row>
          <v-row>
            <v-textarea
              v-model="object.detail"
              label="詳細"
            />
          </v-row>
          <br />
          <v-row>
            <v-col>
              <v-text-field
                v-model="object.deadline"
                :rules="[rules.required]"
                type="date"
                label="期限"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-select
                v-model="object.priority"
                :rules="[rules.required]"
                label="優先度"
                :items="priorityList"
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-select
                v-model="object.status"
                :rules="[rules.required]"
                label="ステータス"
                :items="statusList"
              ></v-select>
            </v-col>
            <v-col>
              <v-text-field
                v-model="object.manager"
                label="担当者"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn
                size="x-large"
                color="#EC407A"
                @click="comment"
                >Comment</v-btn>
            </v-col>
            <v-col>
              <v-btn
                size="x-large"
                color="#43A047"
                @click="update()"
              >チケット更新</v-btn>
            </v-col>
          </v-row>
        </v-card-item>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" @click="$emit('close-modal')">閉じる</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
    <Comment
      v-model="commentDialog"
      :info="commentList"
      @close-modal="closeCommentModal"
    />
  </v-dialog>
</template>

<script>
export default {
  props: ["object"],
  data: () => {
    return {
      dialog: false,
      commentDialog: false,
      title: "",
      detail: "",
      deadline: "",
      priority: "",
      status: "",
      manager: "",
      priorityList: ["高", "中", "低"],
      statusList: ["未完了", "作業中", "完了"],
      rules: {
        required: (value) => !!value || "必須項目です.",
      },
      commentList: []
    }
  },
  methods: {
    comment() {
      const ticketId = this.object.id
      this.$axios
        .get(`http://localhost:8000/comment/${ticketId}`)
          .then((response) => {
            this.commentList = response.data.data
            this.commentDialog = true
          })
          .catch((error) => {
            console.error("Error:", error)
          })
    },
    closeCommentModal() {
      this.commentDialog = false
    },
    async update() {
      try{
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
      const ticketId = this.object.id
      const req = {
        title: this.object.title,
        detail: this.object.detail,
        deadline: this.object.deadline.replace(/-/g, "/"),
        priority: this.object.priority,
        status: this.object.status,
        manager: this.object.manager,
      }
      this.$axios
        .put(`http://localhost:8000/ticket/${ticketId}`, req)
          .then(() => {
            this.$emit("finally")
          })
          .catch((error) => {
            console.error("Error:", error)
          })
    },
  },
}
</script>
