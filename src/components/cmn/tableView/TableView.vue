<template>
  <div class="table-responsive">
    <table class="table table-view table-striped table-hover">
      <thead>
      <tr>
        <th v-for="col in columns" :key="col.key" @click="setSort(col.key)">
          {{ col.label }}
          <span v-if="state.sortColumn === col.key">
              {{ state.sortOrder === 'asc' ? '▲' : '▼' }}
            </span>
        </th>
      </tr>
      <tr>
        <th v-for="col in columns" :key="col.key">
          <input
              v-if="col.filterable"
              type="text"
              :placeholder="'Filter ' + col.label"
              @input="setFilter(col.key, $event.target.value)"
          />
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="row in pagedData" :key="row.id || row.key">
        <td v-for="col in columns" :key="col.key">
          {{ row[col.key] }}
        </td>
      </tr>
      <tr v-if="pagedData.length === 0">
        <td :colspan="columns.length" class="text-center">No Data</td>
      </tr>
      </tbody>
    </table>

    <!-- 페이징 -->
    <nav aria-label="Table pagination">
      <ul class="pagination">
        <li v-for="page in totalPages" :key="page" class="page-item">
          <button
              class="page-link"
              :class="{ active: page === state.currentPage }"
              @click="goToPage(page)"
          >
            {{ page }}
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import './TableView.css';
import { useTableView } from './TableView.js';
import { ref, isRef } from 'vue';

// defineProps 단일 호출
const props = defineProps({
  data: { type: Array, required: true },
  columns: { type: Array, required: true },
  options: { type: Object, default: () => ({}) }
});

// props.data가 ref면 그대로, 아니면 ref로 감싸기
const reactiveData = isRef(props.data) ? props.data : ref(props.data);

const { state, pagedData, totalPages, setSort, setFilter, goToPage } =
    useTableView(reactiveData, props.options);
</script>