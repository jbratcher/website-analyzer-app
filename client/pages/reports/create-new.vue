<template>
  <v-container class="px-12">
    <v-row>
      <v-col md="4">
        <h2 class="headline mb-6">New website report</h2>
        <CreateNewReport />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import CreateNewReport from "../../components/widgets/CreateNewReport";
export default {
  components: { CreateNewReport }
};
</script>
<style lang="scss"></style>
