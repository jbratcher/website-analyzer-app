<template>
  <v-container class="pa-0" fluid>
    <!-- Expanding Cards Header -->
    <v-row>
      <v-col class="pb-0">
        <v-card color="#fefefe" flat>
          <v-card-title class="display-1 py-1">{{ sectionName }}</v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "SectionHeader",
  props: {
    sectionName: {
      type: String,
      default: ""
    }
  }
};
</script>

<style></style>
