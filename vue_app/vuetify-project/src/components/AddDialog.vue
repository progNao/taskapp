<template>
  <v-dialog v-model="dialog" max-width="50rem" persistent>
    <v-form :lazy-validation="true" ref="form">
      <v-card color="#E4F9F5">
        <v-card-title class="headline"></v-card-title>
        <v-card-item class="bg-teal-darken-4 pt-4">
          <br />
          <v-row>
            <v-text-field
              v-model="title"
              :rules="[rules.required]"
              label="タイトル"
            />
          </v-row>
          <v-row>
            <v-textarea
              v-model="detail"
              label="詳細"
            />
          </v-row>
          <br />
          <v-row>
            <v-col>
              <v-text-field
                v-model="deadline"
                :rules="[rules.required]"
                type="date"
                label="期限"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-select
                v-model="priority"
                :rules="[rules.required]"
                label="優先度"
                :items="priorityList"
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-select
                v-model="status"
                :rules="[rules.required]"
                label="ステータス"
                :items="statusList"
              ></v-select>
            </v-col>
            <v-col>
              <v-text-field
                v-model="manager"
                label="担当者"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col></v-col>
            <v-col>
              <v-btn
                size="x-large"
                color="#0277BD"
                @click="add()"
              >チケット登録</v-btn>
            </v-col>
          </v-row>
        </v-card-item>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" @click="reset()">閉じる</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
export default {
  data: () => {
    return {
      dialog: false,
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
    }
  },
  methods: {
    reset() {
      this.title = ""
      this.detail = ""
      this.deadline = ""
      this.priority = ""
      this.status = ""
      this.manager = ""
      this.$emit("close-modal")
    },
    async add() {
      try{
        const form = this.$refs.form
        const { valid } = await form.validate()
        if (valid) {
          this.fetchData()
          this.reset()
        }
      } catch (e) {
        console.log("エラー")
      }
    },
    fetchData() {
      const req = {
        title: this.title,
        detail: this.detail,
        deadline: this.deadline.replace(/-/g, "/"),
        priority: this.priority,
        status: this.status,
        manager: this.manager,
      }
      this.$axios
        .post("http://localhost:8000/ticket", req)
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
