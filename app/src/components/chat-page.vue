<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faFile } from '@fortawesome/free-regular-svg-icons';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

</script>

<template>
  <div class="page">
    <div class="chat">

      <div class="chat-row">
        <div class="user-prompt">
          <div class="pfp">
            <img src="/user.svg" />
          </div>
          <p>What is the weather supposed to be in Clearwater FL today?</p>
        </div>
      </div>

      <div class="chat-row">
        <div class="ai-response">
          <div class="pfp">
            <img src="/robot.svg" />
          </div>
          <p>
          Today in Clearwater, FL, the weather is expected to be sunny and warm, with temperatures
          likely reaching highs in the upper 70s°F. This aligns with the general pattern for early
          December, which often features comfortable and pleasant conditions in Clearwater. There
          may be a light breeze, making it ideal for outdoor activities like visiting the beach or
          exploring local attractions <a href="https://www.almanac.com/">ALMANAC.COM</a>
          <a href="https://www.wintersunexpert.com/december-weather-in-clearwater-florida/"
          >WINTER SUN EXPERT</a
          >.
          </p>
        </div>
      </div> 

      <div class="chat-row">
        <div class="user-prompt">
          <div class="pfp">
            <img src="/user.svg" />
          </div>
          <p>What is the weather supposed to be in Clearwater FL today?</p>
        </div>
      </div>

      <div class="chat-row">
        <div class="ai-response">
          <div class="pfp">
            <img src="/robot.svg" />
          </div>
          <p>
          Today in Clearwater, FL, the weather is expected to be sunny and warm, with temperatures
          likely reaching highs in the upper 70s°F. This aligns with the general pattern for early
          December, which often features comfortable and pleasant conditions in Clearwater. There
          may be a light breeze, making it ideal for outdoor activities like visiting the beach or
          exploring local attractions <a href="https://www.almanac.com/">ALMANAC.COM</a>
          <a href="https://www.wintersunexpert.com/december-weather-in-clearwater-florida/"
          >WINTER SUN EXPERT</a
          >.
          </p>
        </div>
      </div> 
      
    </div>
      <form class="prompt-area" @submit.prevent>
        <textarea placeholder="Ask AI a question"></textarea>
        <div class="buttons">
          <button type="none">
            <FontAwesomeIcon :icon="faFile" />
          </button>
          <button type="submit">
            <FontAwesomeIcon :icon="faArrowUp" />
          </button>
        </div>
      </form>
    
  </div>
</template>

<style lang="scss" scoped>

  .page {
    width: 95%;
    margin: 3rem auto;
    position: relative;
    height: 70dvh; 
  }

  .chat {
    overflow-y: auto;
    height: 85%;
    width: 95%;
    margin: auto;
  }

  .chat-row {
    display: grid;
    grid-template-columns: 50% 50%;

    p {
      line-height: 2rem;
      background-color: rgb(0,110,255);
      padding: 1rem;
      border-radius: 2rem;
      color: white;
    }

    p>a {
      color: white;
      padding: 0.25rem;
      margin: 0 0.125rem;
      border-radius: 0.5rem;
      border: 1px solid white;
      text-decoration: none;
      font-size: 0.75rem;
    }

    p>a:hover {
      color: rgb(0,110,255);
      background-color: white;
    }

    .pfp {
      padding: 0.5rem;
      border-radius: 50%;
      border:1px solid rgb(0,110,255);
      display: flex;
      align-items: center;
      justify-content: center;

      img{
        height: 2rem;
        width: 2rem;
      }
    }
  }

  .ai-response {
    grid-column: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    &>p {
      padding-left: 1rem;
    }
  }

  .user-prompt {
    grid-column: 2;
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    &>p {
      padding-right: 1rem;
    }
  }

  .prompt-area {
    width: calc(100% - 4rem - 2px); 
    display: flex;
    background-color: white;
    border: 1px solid rgb(0,110,255);
    padding: 1rem 2rem;
    border-radius: 2rem;
    position: sticky;
    bottom: 0;
    flex-direction: column;
    
    &>textarea{
      padding: 0.5rem 0;
      font-family:'Open Sans', 'Inter', sans-serif, Times;
      resize: none;
      border: 0;
      height: auto;
      outline: none;
      font-size: 1rem;
      max-height: 25rem;
    }

    &>.buttons {
      display: flex;
      justify-content: space-between;
    }

    &>.buttons>button {
      padding: 0.5rem;
      border-radius: 50%;
      background-color: rgb(0,110,255);
      color: white;
      font-size: 1.5rem;
      width: 2.75rem;
      outline: 0;
      border: 0;
      cursor: pointer;

      &:hover {
        opacity: 0.8;
      }
    }
  }

  @media screen and (max-width: 700px) {
    .prompt-area {
      width: calc(100% - 4rem);
    }
  }

</style>
