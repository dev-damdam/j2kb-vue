<template>
  <div>
    <header class="header">
      <b-input-group size="lg" class="todo-input">
        <b-form-input
          v-model="todo"
          placeholder="할 일을 입력해주세요."
          @keyup.enter="createTodo"
        ></b-form-input>
        <b-input-group-append>
          <b-button size="lg" @click="createTodo"
            ><b-icon icon="plus"
          /></b-button>
        </b-input-group-append>
      </b-input-group>
    </header>
    <main class="todo-list-wrapper">
      <swiper class="horizontal-swiper" :options="swiperOption">
        <swiper-slide
          class="slide"
          v-for="(day, index) in dayOfTodo"
          :key="index"
        >
          <b-card :title="day.date" tag="article" class="mb-2">
            <b-card-text>
              <b-list-group flush>
                <b-list-group-item
                  v-for="(todo, index) in day.todos"
                  :key="index"
                  class="todo-list"
                >
                  <b-form-checkbox
                    v-model="todo.isCompleted"
                    @change="completedTodo(todo)"
                  >
                    <span class="todo">{{ todo.title }}</span>
                  </b-form-checkbox>
                  <b-button size="sm" @click="deleteTodo(todo)">
                    <b-icon icon="trash" />
                  </b-button>
                </b-list-group-item>
              </b-list-group>
            </b-card-text>
          </b-card>
        </swiper-slide>
      </swiper>
    </main>
  </div>
</template>

<script>
import dayjs from "dayjs";
// require styles
import "swiper/dist/css/swiper.css";

// Import Swiper Vue.js components
import { swiper, swiperSlide } from "vue-awesome-swiper";

export default {
  name: "TodoList",
  props: {},
  components: {
    swiper,
    swiperSlide,
  },
  data() {
    return {
      todo: "",
      todoList: [],
      dayOfTodo: [],
      swiperOption: {
        slidesPerView: 5,
        spaceBetween: 6, // swiper-slide 사이의 간격 지정
      },
    };
  },
  mounted() {
    // set init data if not exist
    if (!localStorage.getItem("todo-list"))
      localStorage.setItem("todo-list", JSON.stringify([]));

    this.todoList = JSON.parse(localStorage.getItem("todo-list"));

    // get todo list
    this.todoList.forEach((todo) => {
      let obj = {
        date: this.getDate(todo.createTime).toString(),
        todos: this.todoList.filter(
          (f) => this.getDate(f.createTime) === this.getDate(todo.createTime)
        ),
      };
      if (!this.isKeyDuplicated(obj)) {
        this.dayOfTodo.push(obj);
      }
    });
  },
  methods: {
    isKeyDuplicated(obj) {
      return this.dayOfTodo.find((f) => f.date == obj.date) != undefined
        ? true
        : false;
    },
    getDayOfTodoIndex(date) {
      return this.dayOfTodo.findIndex((f) => f.date == date);
    },
    createTodo() {
      if (this.todo === "") {
        alert("할 일을 입력해주세요.");
        return;
      }

      const todo = {
        title: this.todo,
        createTime: new Date(),
        isCompleted: false,
      };

      this.updateDayOfTodo("add", todo);
      this.todoList.push(todo);

      localStorage.setItem("todo-list", JSON.stringify(this.todoList));

      this.todo = "";
    },
    deleteTodo(todo) {
      this.updateDayOfTodo("delete", todo);
      this.todoList = this.todoList.filter(
        (i) => i.createTime !== todo.createTime
      );
      localStorage.setItem("todo-list", JSON.stringify(this.todoList));
    },
    completedTodo(todo) {
      const index = this.todoList.findIndex(
        (obj) => obj.createTime == todo.createTime
      );
      this.todoList[index].isCompleted = true;
      localStorage.setItem("todo-list", JSON.stringify(this.todoList));
    },
    updateDayOfTodo(event, todo) {
      const index = this.getDayOfTodoIndex(
        this.getDate(todo.createTime).toString()
      );

      if (event == "add") {
        if (index > -1) {
          this.dayOfTodo[index].todos.push(todo);
        } else {
          console.log(todo);
          // create new key
          let obj = {
            date: this.getDate(todo.createTime).toString(),
            todos: [todo],
          };

          // add todo
          this.dayOfTodo.push(obj);
        }
      } else if (event == "delete") {
        if (index > -1) {
          this.dayOfTodo[index].todos = this.dayOfTodo[index].todos.filter(
            (f) => f.createTime != todo.createTime
          );
        } else {
          // todo else block
        }
      }
    },
    getDayOfWeek(time) {
      return dayjs(time).format("ddd").toUpperCase();
    },
    getDate(time) {
      return dayjs(time).format("YYYY-MM-DD");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  position: relative;
  left: 0;
  top: 0;
  width: 100%;
  height: 400px;
  background-image: url("@/assets/todo-list/header-background.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}

.header > .todo-input {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  width: 41.6%;
}

.todo-list-wrapper {
  padding: 1.04%;
}

.todo-list {
  width: 100%;
  display: flex;
  justify-content: space-around;
}

.todo-list .todo {
  width: 100px;
  text-align: left;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
