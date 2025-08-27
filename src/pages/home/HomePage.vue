<template>
  <TableView
      :data="tableData"
      :columns="columns"
      :options="{ pageSize: 5 }"
  />
</template>

<script setup>
import TableView from '@/components/cmn/TableView/TableView.vue';
import { ref } from 'vue';

const tableData = ref([
  { id: 1, name: 'Apple', price: 100 },
  { id: 2, name: 'Banana', price: 50 },
  { id: 3, name: 'Orange', price: 80 },
  { id: 4, name: 'Grapes', price: 120 },
  { id: 5, name: 'Mango', price: 200 },
  { id: 6, name: 'Pineapple', price: 150 },
]);

const columns = [
  { key: 'id', label: 'ID', filterable: true },
  { key: 'name', label: 'Name', filterable: true },
  { key: 'price', label: 'Price', filterable: false }
];
</script>