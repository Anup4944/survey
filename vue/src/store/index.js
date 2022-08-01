import { createStore } from "vuex";
import axiosClient from "../axios";

const tempSurverys = [
  {
    id: 100,
    title: "The codeholic",
    slug: "the-code-holic",
    status: "draft",
    image:
      "https://images.unsplash.com/photo-1659298136703-f5880b90b174?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1528&q=80",
    description: "My name is Zura. <br> I am PHP coder",
    created_at: "2021-12-20 18:00:00",
    updated_at: "2021-12-20 18:00:00",
    expire_date: "2021-12-28 18:00:00",
    questions: [
      {
        id: 1,
        type: "select",
        question: "Which country are you from?",
        description: null,
        data: {
          options: [
            {
              uuid: "12asds",
              text: "USA",
            },
            {
              uuid: "124sdfsdf",
              text: "UK",
            },
            {
              uuid: "asda34534",
              text: "India",
            },
          ],
        },
      },
      {
        id: 2,
        type: "checkbox",
        question: "Which programming language are you familar?",
        description: null,
        data: {
          options: [
            {
              uuid: "12aas34sds",
              text: "JavaScript",
            },
            {
              uuid: "eert124sddf",
              text: "Python",
            },
            {
              uuid: "23ad56",
              text: "PHP",
            },
          ],
        },
      },
      {
        id: 3,
        type: "text",
        question: "Which is your fav youtube channel",
        description: null,
        data: {},
      },
      {
        id: 4,
        type: "textarea",
        question: "Tell us about your expreince working in a team",
        description: "Write you honest answer. Everything is anonymous",
        data: {},
      },
    ],
  },
];

const store = createStore({
  state: {
    user: {
      data: {},
      token: sessionStorage.getItem("TOKEN"),
    },
    surveys: [...tempSurverys],
  },
  getters: {},
  actions: {
    register({ commit }, user) {
      return axiosClient.post("/register", user).then(({ data }) => {
        commit("setUser", data);
        return data;
      });
    },
    login({ commit }, user) {
      return axiosClient.post("/login", user).then(({ data }) => {
        commit("setUser", data);
        return data;
      });
    },
    logout({ commit }) {
      return axiosClient.post("/logout").then((res) => {
        commit("logout");
        return res;
      });
    },
  },
  mutations: {
    logout: (state) => {
      state.user.data = {};
      state.user.token = null;
    },
    setUser: (state, userData) => {
      state.user.token = userData.token;
      state.user.data = userData.user;
      sessionStorage.setItem("TOKEN", userData.token);
    },
  },
  modules: {},
});

export default store;
