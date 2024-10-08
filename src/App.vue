<script setup>
import { onMounted, ref, computed, watch } from "vue";

const todoList = ref([]);

const inputContent = ref("");

const sortedTodoList = computed(() =>
  todoList.value.sort((a, b) => {
    return b.createdAt - a.createdAt;
  })
);

const addTodo = () => {
  if (inputContent.value.trim() === "") {
    return;
  }
  todoList.value.push({
    content: inputContent.value,
    createdAt: new Date().getTime(),
    done: false,
  });

  inputContent.value = "";
};

const removeTodo = (todo) => {
  todoList.value = todoList.value.filter((item) => item !== todo);
};

watch(
  todoList,
  (newVal) => {
    localStorage.setItem("todoList", JSON.stringify(newVal));
  },
  {
    deep: true,
  }
);

onMounted(() => {
  todoList.value = JSON.parse(localStorage.getItem("todoList")) || [];
});
</script>

<template>
  <main class="main">
    <section class="create-todo">
      <h2>Create a todo</h2>
      <form @submit.prevent="addTodo">
        <h3>What u wanna do?</h3>
        <input
          type="text"
          placeholder="type ur task here"
          v-model="inputContent"
        />
        <input type="submit" value="Add task" />
      </form>
    </section>

    <section class="todo-list">
      <h3>To do list</h3>
      <div class="list">
        <div
          v-for="task in sortedTodoList"
          :key="task.id"
          class="todo-item"
          :class="{ done: task.done }"
        >
          <label>
            <input type="checkbox" v-model="task.done" />
          </label>

          <div class="todo-content">
            <input type="text" v-model="task.content" />
          </div>

          <div class="actions">
            <button class="delete" @click="removeTodo(task)">Delete</button>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Afacad+Flux:wght@100..1000&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: #1a1a1a;
  color: white;
  font-family: "Afacad Flux", sans-serif;
}

.main {
  margin: 0 auto;
  width: 40%;
  border: 2px #e7e047 solid;
  border-radius: 20px;
  padding: 1rem;
}

h2 {
  font-size: 3rem;
  font-weight: 400;
  margin-bottom: .1rem;
}

h3 {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: .5rem;
  text-align: center;
}

.create-todo {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.todo-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.create-todo input[type="text"] {
  display: block;
  width: 100%;
  padding: 0.5rem 1rem;
  font-size: 1.5rem;
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgb(231, 224, 71);
  margin-bottom: 1.5rem;
  border: 0;
}

.create-todo input[type="text"]:focus {
  outline: 3px solid #e1d943;
}

.create-todo input[type="submit"] {
  width: 70%;
  padding: 0.5rem 1rem;
  font-size: 1.5rem;
  background-color: #e7e047;
  border: 0;
  border-radius: 2rem;
  margin-bottom: 1.5rem;
  cursor: pointer;
  transition: 0.4s;
}

.create-todo input[type="submit"]:hover {
  background-color: #b1ab36;
}

.create-todo form button {
  width: 100%;
}

.todo-item {
  display: flex;
}

.todo-item label {
  display: flex;
  align-items: center;
}

.todo-content input {
  background: transparent;
  border: 0;
  color: white;
  font-size: 1.5rem;
  width: 100%;
  padding: 0.5rem 1rem;
}

.todo-content input:focus {
  outline: none;
}

input[type="checkbox"] {
  -webkit-appearance: none;
  appearance: none;
  width: 1.5rem;
  height: 1.5rem;
  background-color: transparent;
  border: 2px solid #e7e047;
  border-radius: 100%;
  cursor: pointer;
}

input[type="checkbox"]:checked {
  background-color: #e7e047;
}

.todo-item.done .todo-content input {
  text-decoration: line-through;
}

.actions {
  display: flex;
  align-items: center;
}

.actions button {
  margin: 0 0.5rem;
  font-size: 1.5rem;
  background-color: transparent;
  border: 0;
  cursor: pointer;
  color: #e7e047;
  transition: 0.3s;
  padding: 0.2rem;
  border-radius: 5px;
}

.actions button:hover {
  background: #e7e047;
  color: #1a1a1a;
}
</style>
