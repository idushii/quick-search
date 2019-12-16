<template>
  <div class="wrap-table">
    <input type="text" v-model="SearchWord" placeholder="Начните вводить текст" autofocus />
    <div class="table">
      <div class="table-columns" :style="`grid-template-columns: ${table.gridWidths}`">
        <div class="table-column" v-for="(c, index) in table.columns" :key="`c-${index}`">{{c}}</div>
      </div>
      <div class="table-rows">
        <template v-for="(r) in table.rows_reduce">
          <div
            class="table-row"
            :key="`r-${r.id}`"
            :style="`grid-template-columns: ${table.gridWidths}`"
          >
            <div
              class="table-column"
              v-for="(c, index2) in table.columns"
              :key="`c-${index2}-${r.id}`"
            >{{r[index2]}}</div>
          </div>
        </template>
      </div>
      <div class="count">Всего: {{table.rows.length}}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

import { Table, Delimiter } from '../Table';

@Component
export default class MyTable extends Vue {
  public table: Table = new Table(['c1', 'c2', 'c3']);

  public SearchWord = '';
  @Prop() private payload!: string;
  @Prop() private cols!: number[];

  public created() {
    this.table.fromCSV(this.payload, {
      delimiter: Delimiter.tck,
      hasTitle: false,
    });
  }

  @Watch('payload')
  public f1() {
    this.table.fromCSV(this.payload, {
      delimiter: Delimiter.tck,
      hasTitle: false,
    });
    this.table.cols =  this.cols
  }

  @Watch('SearchWord')
  public f2() {
    this.table.find(this.SearchWord);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
