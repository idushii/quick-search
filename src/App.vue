<template>
  <div id="app">
    <div class="container">
      <Table :payload="payload" :cols="[1, 1,3]" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Table from './components/Table.vue';

@Component({
  components: {
    Table,
  },
})
export default class App extends Vue {
  public payload = '';

  public async mounted() {
    this.payload = await fetch('./payload.csv').then((r) => r.text());
  }
}
</script>

<style lang="scss">
@import "style.scss";

.container {
  margin-top: 2rem;
}
</style>
