<template>
  <div class="wrap-table">
    <input type="text" v-model="SearchWord" placeholder="Начните вводить текст" />
    <div class="table">
      <div class="table-columns">
        <div class="table-column" v-for="(c, index) in table.columns" :key="`c-${index}`">{{c}}</div>
      </div>
      <div class="table-rows">
        <div class="table-row" v-for="(r, index) in table.rows" :key="`r-${index}`">
          <div class="table-column" v-for="(c, index2) in r" :key="`r-${index}c-${index2}`">{{c}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

import { Table } from "../Table";

@Component
export default class MyTable extends Vue {
  @Prop() private payload!: string;

  table: Table = new Table();

  created() {
    this.table.fromCSV(this.payload, {hasTitle: true});
  }

  SearchWord = "";

  @Watch("payload")
  f1() {
    this.table.fromCSV(this.payload, {hasTitle: true});
  }

  @Watch("SearchWord")
  f2() {
    this.table.find(this.SearchWord)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
