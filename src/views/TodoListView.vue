<template>
  <div clsas="todo-list-view-wrapper">
    <todo-list />
  </div>
</template>

<script>
import TodoList from "@/components/todo-list/TodoList.vue";

export default {
  name: "TodoListView",
  components: {
    TodoList,
  },
};
</script>
<style scoped>
.todo-list-view-wrapper {
  width: 100%;
  height: 100%;
}
</style>
