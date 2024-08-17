<template>
  <v-app id="inspire">
    <Header />
    <br />
    <v-main class="bg-grey-lighten-3">
      <v-container>
        <v-row>
          <v-col cols="3">
            <v-btn size="x-large" color="#0277BD" @click="add">新規登録</v-btn>
          </v-col>
          <v-col cols="5">
            <v-text-field
              v-model="search"
              append-inner-icon="mdi-magnify"
              label="Search"
              single-line
              bg-color="#E4F9F5"
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>
        <br /><br />
        <v-row>
          <v-data-table
            :headers="headers"
            :items="dataList"
            class="rounded-lg elevation-3"
            :density="comfortable"
            :items-per-page="-1"
            hide-default-footer
            :search="search"
            @click:row="clickRow"
          >
            <template v-slot:[`item.title`]="{ value }">
              <div align="left">{{ value }}</div>
            </template>
            <template v-slot:[`item.deadline`]="{ value }">
              <div align="center">{{ value }}</div>
            </template>
            <template v-slot:[`item.priority`]="{ value }">
              <v-chip :color="getPriorityColor(value)">
                <div align="center">{{ value }}</div>
              </v-chip>
            </template>
            <template v-slot:[`item.status`]="{ value }">
              <v-chip :color="getStatusColor(value)">
                <div align="center">{{ value }}</div>
              </v-chip>
            </template>
            <template v-slot:[`item.manager`]="{ value }">
              <div align="center">{{ value }}</div>
            </template>
          </v-data-table>
        </v-row>
      </v-container>
    </v-main>
    <AddDialog
      v-model="addDialog"
      @close-modal="closeModal"
      @add-ticket="addTicket"
      @finally="fetchItems"
    />
    <UpdateDialog
      v-model="updateDialog"
      :object="updateObject"
      @close-modal="closeModal"
      @update-ticket="updateTicket"
      @finally="fetchItems"
    />
  </v-app>
</template>

<script>
export default {
  data: () => {
    return {
      search: "",
      addDialog: false,
      updateDialog: false,
      headers: [
        { title: "タイトル", key: "title", align: "center", width: "400" },
        { title: "期限", key: "deadline", align: "center", width: "100" },
        { title: "優先度", key: "priority", align: "center", width: "100" },
        { title: "ステータス", key: "status", align: "center", width: "200" },
        { title: "担当者", key: "manager", align: "center", width: "300" },
      ],
      dataList: [],
      updateObject: {
        title: "",
        detail: "",
        deadline: "",
        priority: "",
        status: "",
        manager: "",
      },
    };
  },
  mounted() {
    this.fetchItems()
  },
  methods: {
    add() {
      this.addDialog = true;
    },
    clickRow(row, values) {
      const updateItem = values.item;
      this.updateObject = {
        id: updateItem.id,
        title: updateItem.title,
        detail: updateItem.detail,
        deadline: updateItem.deadline.replace(/\//g, "-"),
        priority: updateItem.priority,
        status: updateItem.status,
        manager: updateItem.manager
      };
      this.updateDialog = true;
    },
    getPriorityColor(priority) {
      if (priority === "高") return "red";
      else if (priority === "中") return "orange";
      else return "green";
    },
    getStatusColor(status) {
      if (status === "未完了") return "red";
      else if (status === "作業中") return "orange";
      else return "green";
    },
    closeModal() {
      this.addDialog = false;
      this.updateDialog = false;
    },
    addTicket() {
      this.addDialog = false;
    },
    updateTicket() {
      this.updateDialog = false;
    },
    fetchItems() {
      this.$axios
        .get("http://localhost:8000/ticket")
          .then((response) => {
            this.dataList = response.data.data;
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
    }
  },
};
</script>

<style scoped></style>
