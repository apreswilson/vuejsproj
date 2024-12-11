<script setup>
import { ref, toRaw } from 'vue';

const newTodoData = ref({})
const statusMessage = ref("");

const classNameList = {
   addTodo: "addTodoForm",
   status: "status",
   formArea: "form-section"
}

const addTodo = async () => {
   try {
      const post = await fetch("https://vuejsproj.onrender.com/todo", {
         method: "POST",
         headers: {
         "Content-Type": "application/json",
         },
         body: JSON.stringify(toRaw(newTodoData.value))
      });

      const response = await post.json();
      response.success ? statusMessage.value = "Added todo" : statusMessage.value = "Error adding todo";

      //Current workaround is to reload page, unable to pass async prop currently
      setTimeout(() => {
         statusMessage.value = "";
         window.location.reload();
      }, 2000)
   } catch(err) {
      console.error(err);
   }
}
</script>

<template>
   <form @submit.prevent="addTodo" :class="classNameList.addTodo">
      <div :class="classNameList.formArea">
         <label for="name">Name</label>
         <input 
         v-model.trim="newTodoData.name" 
         type="text" 
         name="name" 
         id="name"
         >
      </div>
      <div :class="classNameList.formArea">
         <label for="description">Description</label>
         <input 
         v-model="newTodoData.description" 
         type="text"
         name="description" 
         id="description"
         >
      </div> 
      <button type="submit">Add</button>
   </form>
   <p :class="classNameList.status">{{ statusMessage }}</p>
</template>

<style lang="scss" scoped>
   .addTodoForm {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      width: 27.5rem;
   }

   .form-section {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
   }

   .form-section>input {
      padding: 0.5rem;
      border-radius: 0.25rem;
      outline: 1px solid black;
      border: 0;
      font-family: 'Open Sans', 'Inter', sans-serif, Times;
      font-size: 1rem;
   }

   .form-section>input:focus {
      outline: 1px solid rgb(0, 110, 255);
   }

   button {
      background-color: rgb(0, 110, 255);
      color: white;
      padding: 0.5rem;
      border: 0;
      font-size: 1.25rem;
      border-radius: 0.25rem;
      cursor: pointer;
   }

   button:hover {
      opacity: 0.8;
   }
</style>