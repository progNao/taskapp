<template>
  <v-app-bar flat color="#11999E">
    <v-container class="mx-auto d-flex align-center justify-center">
      <v-avatar class="me-4" color="grey-darken-1" size="32"></v-avatar>

      <span class="app_name">AppName</span>

      <v-spacer></v-spacer>

      <v-avatar class="me-4" color="grey-darken-1" size="50"></v-avatar>
    </v-container>
  </v-app-bar>
</template>

<script>
export default {
  data: () => {
    return {}
  },
};
</script>

<style scoped>
.app_name {
  font-size: 2rem;
}
</style>
