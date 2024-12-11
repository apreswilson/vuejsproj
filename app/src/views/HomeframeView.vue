<script setup>
import { onMounted, ref, toRaw } from 'vue';
import axios from 'axios';
import addTodo from '@/components/add-todo.vue';

const classNameList = {
  todo: "todoItem",
  deleteTodo: "deleteTodo",
  updateTodo: "updateTodo",
  status: "status",
  editTodo: "editTodo"
}

const todos = ref([]);
const tempData = ref({})
const editTodo = ref("");
const todoEditMessage = ref("");

const updateTodoFromList = (todoId) => {
  if (editTodo.value === todoId) {
    editTodo.value = "";
    tempData.value = {}
  } else {
    editTodo.value = todoId
    const todoEdit = todos.value.find((todo) => todo._id === todoId)
    tempData.value = { ...todoEdit }
  }
}

const fetchTodos = async () => {
  try {
    const getData = await axios.get("https://vuejsproj.onrender.com/todo")
    todos.value = getData.data;
  } catch(err) {
    console.log(err)
  }
}

const deleteTodo = async(todo) => {
  try {
    await fetch(`https://vuejsproj.onrender.com/todo/${todo._id}`, {
      method: "DELETE",
    });
    todos.value = todos.value.filter((item) => item._id !== todo._id);
  } catch (err) {
    console.error(err);
  }
}

const updateTodo = async () => {
  const todoId = editTodo.value;
  const todoIndex = todos.value.findIndex((todo) => todo._id === todoId);
  if (todoIndex !== -1) {
    try {
      const patch = await fetch(`https://vuejsproj.onrender.com/todo/${todoId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(toRaw(tempData.value))
      });
      const response = await patch.json();
      if (response.success) {
        todos.value[todoIndex] = { ...tempData.value }
        todoEditMessage.value = "Todo updated successfully"
      } else {
        todoEditMessage.value = "Error updating todo"
      }
    } catch(err) {
      console.error(err)
    }
    editTodo.value= "";
    tempData.value = {};

    setTimeout(() => {
      todoEditMessage.value = ""
    }, 3000)
  }
}

const cancelEdit = () => {
  editTodo.value = "";
  tempData.value = {};
}

onMounted(fetchTodos)
</script>

<template>
  <div class="wrapper">

    <h2>Create Todo</h2>
    <addTodo />

    <h2>Todo List</h2> 
    <p :class="classNameList.status">{{ todoEditMessage }}</p>

    <div class="todo-list">
      <div v-for="todo in todos" :key="todo._id" :class="[classNameList.todo , {'todo-completed': todo.completed === 'Complete', 'todo-incomplete': todo.completed === 'Incomplete'}]">
        <h3>{{ todo.name }}</h3>
        <p>{{ todo.description }}</p>
        <p class="completion-status">{{ todo.completed }}</p>

        
        <div class="options">
          <button
            v-show="editTodo !== todo._id" 
            @click="updateTodoFromList(todo._id)" 
            :class="classNameList.updateTodo"
            :disabled="todo.name.length < 1 || todo.description.length < 1"
          >
          Edit 
          </button>

          <button
            @click="cancelEdit()"
            v-show="editTodo === todo._id"
            class="cancel"
          >
          Cancel
          </button>
          <button 
            @click="updateTodo(todo)"
            v-show="editTodo === todo._id"
            :disabled="tempData.name?.length < 1 || tempData.description?.length < 1 || JSON.stringify(tempData) === JSON.stringify(todos.find((item) => item._id === todo._id))"
            class="confirm"
          >
          Confirm 
          </button>
          <button 
            @click="deleteTodo(todo)"
            v-show="editTodo !== todo._id" 
            :class="classNameList.deleteTodo"
          >
          Delete
          </button>
        </div>

        <form v-show="editTodo === todo._id" :class="classNameList.editTodo">
          <div class="form-section">
            <label for="updated-name">Name:</label>
            <input 
              v-model="tempData.name"
              type="text" 
              name="updated-name"
              id="updated-name"
              :placeholder="todo.name"
            >
            <p v-show="tempData.name?.length < 1" class="error">Must be 1 character</p>
          </div>
          <div class="form-section">
            <label for="updated-description">Description:</label>
            <input 
              v-model.trim="tempData.description"
              type="text"
              name="updated-description" 
              id="updated-description"
              :placeholder="todo.description"
            >
            <p v-show="tempData.description?.length < 1" class="error">Must be 1 character</p>
          </div>
          <div class="form-section">
            <label for="updated-status">Status:</label>
            <select 
              v-model="tempData.completed"
              name="updated-status" 
              id="updated-status"
            >
              <option>Incomplete</option>
              <option>Complete</option>
            </select>
          </div>
        </form>
    </div>
    </div>
  </div>
</template>

<style lang="scss">
  .wrapper {
    display: flex;
    flex-direction: column;
    place-items: center;

    h2 {
      color: rgb(0, 110, 255);
    }

    .status {
      margin: 0;
      padding: 0.25rem;
      color: rgb(10, 163, 44);
      font-weight: bold;
    }

    .todo-list {
      display: grid;
      width: 100%;
      grid-template-columns: repeat(auto-fit, minmax(27.5rem, auto));
      justify-content: center;
      gap: 2rem;
      padding: 2rem 0;

      .todoItem {
        display: grid;
        grid-template-rows: subgrid;
        grid-template-columns: 27.5rem;
        grid-row: span 5;
        white-space: normal;
        border-radius: 0.25rem;
        gap: 0.5rem;
        padding: 0 0 0.5rem 0;
        width: 27.5rem;
        box-shadow: 0px 0px 5px grey;
        border-radius: 0.25rem;
      }

      .todoItem>h3 {
        border-radius: 0.25rem 0.25rem 0 0;
        word-wrap: break-word;
        margin: 0;
        padding: 0.25rem;
        color: white;
        width: calc(100% - 0.5rem);
      }

      .todo-completed>h3 {
        background-color: rgb(10, 163, 44);
      }

      .todo-incomplete>h3 {
        background-color: rgb(209, 11, 11);
      }

      .todo-completed>.completion-status {
        border: 1px solid rgb(10, 163, 44);
        color: rgb(10, 163, 44);
      }

      .todo-incomplete>.completion-status {
        border: 1px solid rgb(209,11,11);
        color: rgb(209,11,11);
      }

      .todoItem>p {
        margin: 0.5rem;
        padding: 0.25rem;
        word-wrap: break-word;
        max-width: calc(27.5rem - 2rem);
      }

      .todoItem>.completion-status {
        width: max-content;
        border-radius: 0.25rem;
      }

      .todoItem>.options>button {
        padding: 0.5rem;
        border: 0;
        border-radius: 0.25rem;
        font-size: 1rem;
        cursor: pointer;
        color: white;
        width: max-content;
      }

      .todoItem>.options>button:hover {
        opacity: 0.8;
      }

      .todoItem>.options>.cancel,
      .todoItem>.options>.deleteTodo {
        background-color: rgb(209,11,11);
      }

      .todoItem>.options>.updateTodo {
        background-color: rgb(0, 110, 255);
      }

      .todoItem>.options>.confirm {
        background-color: rgb(10, 163, 44);
      }

      .todoItem>.options>.confirm:disabled {
        background-color: grey;
      cursor:not-allowed;
      }

      .todoItem>.options {
        display: flex;
        padding: 0.5rem;
        gap: 0.25rem;
      }

      .todoItem>.editTodo {
        display: flex;
        margin: 0 0.5rem;
        flex-direction: column;
        gap: 1rem;
        border-top: 1px solid black;
        padding: 0.5rem 0;
      }

      .todoItem>.editTodo>.form-section {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }

      .todoItem>.editTodo>.form-section>input,
      .todoItem>.editTodo>.form-section>select {
        padding: 0.5rem;
        border-radius: 0.25rem;
        outline: 1px solid black;
        border: 0;
        font-family: 'Open Sans', 'Inter', sans-serif, Times;
        font-size: 1rem;
      }

      .todoItem>.editTodo>.form-section>.error {
        color: rgb(209, 11, 11);
        margin: 0;
      }
    }
  }

  @media screen and (max-width: 600px) {
    .wrapper{
      .addTodoForm {
        width: 100%;
      }

      .todo-list{
        width: 90;
        display: flex;
        flex-direction: column; 
      }

      .todo-list>.todoItem {
        width: 100%;
        display: flex;
        flex-direction: column;
      }
    }
  }
</style>
