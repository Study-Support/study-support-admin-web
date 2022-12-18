<template>
  <div id="login">
    <img class="wave" src="/images/wave1.png" />
    <div class="container">
      <div class="img">
        <img src="/images/bg-ava.png" />
      </div>
      <div class="login-content">
        <form @submit.prevent="submit">
          <img src="/images/images.png" class="img1"/>
          <h2 class="title">Welcome</h2>
          <div class="input-div one">
            <div class="i">
              <v-icon icon="fa:fas fa-lock"></v-icon>
            </div>
            <div class="div">
              <v-text-field
                v-model="requestBody.email"
                label="Username"
                variant="underlined"
                type="email"
                required
                class="input"
              ></v-text-field>
            </div>
          </div>
          <div class="input-div pass">
            <div class="i">
              <v-icon icon="fa:fas fa-lock"></v-icon>
            </div>
            <div class="div">
              <v-text-field
                label="Password"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="show1 = !show1"
                variant="underlined"
                :type="show1 ? 'text' : 'password'"
                v-model="requestBody.password"
                required
                counter
              ></v-text-field>
            </div>
          </div>
          <input
            type="submit"
            class="btn"
            value="Login"
            :isDisabled="isDisabledButton"
            :content="'Login'"
          />
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "blank",
});

const { $toast } = useNuxtApp();
const { setToken } = useToken();
const { getConfig } = useConfig();
const requestBody = ref({ email: "", password: "" });
const unauthorizedErrorMessage = ref("");
const isDisabledButton = ref(false);
const show1 = ref(false);
const validationErrorMessages = ref({});

const { data, statusCode, onFetchResponse, onFetchError, post } = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: true,
})("login", { immediate: false });

onFetchResponse(() => {
  setToken(data.value.data.token.access_token);
  // setToken(data.value.token);
  console.log("Ok");
  $toast('Đăng nhập thành công', 'success', 1500)
  return navigateTo('/users');
});
onFetchError(() => {
  console.log("Ok1");
  if (statusCode.value === getConfig("constants.statusCodes.unauthorized")) {
    unauthorizedErrorMessage.value = data.value.message;
  } else if (
    statusCode.value === getConfig("constants.statusCodes.validation")
  ) {
    validationErrorMessages.value = data.value;
  }
  isDisabledButton.value = false;
});
// submit login
const submit = () => {
  unauthorizedErrorMessage.value = "";
  validationErrorMessages.value = {};
  isDisabledButton.value = true;
  post(requestBody).json().execute();
};
</script>

<style scoped>
#login {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
  overflow: hidden;
}
.wave {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 100%;
  z-index: -1;
}

.container {
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 7rem;
  padding: 0 2rem;
}

.img {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.login-content {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
}

.img img {
  width: 500px;
}

form {
  width: 360px;
}

.login-content img {
  height: 100px;
}

.login-content h2 {
  margin: 15px 0;
  color: #333;
  text-transform: uppercase;
  font-size: 2.9rem;
}

.login-content .input-div.one {
  margin-top: 0;
}

.i {
  display: flex;
  /* justify-content: center; */
  align-items: center;
}

.i i {
  transition: 0.3s;
}

.input-div {
  display: flex;
}

.div {
  height: 45px;
  width: 90%;
}
.pass {
  padding-top: 20px;
}
.btn {
  display: block;
  width: 100%;
  height: 50px;
  border-radius: 25px;
  outline: none;
  border: none;
  background-image: linear-gradient(to right, #4239cc, #6b62ec, #4239cc);
  background-size: 200%;
  font-size: 1.2rem;
  color: #fff;
  font-family: "Poppins", sans-serif;
  text-transform: uppercase;
  margin: 1rem 0;
  cursor: pointer;
  transition: 1s;
  margin-top: 32px;
}
.btn:hover {
  background-position: right;
}

@media screen and (max-width: 1050px) {
  .container {
    grid-gap: 5rem;
  }
}

@media screen and (max-width: 1000px) {
  form {
    width: 290px;
  }

  .login-content h2 {
    font-size: 2.4rem;
    margin: 8px 0;
  }

  .img img {
    width: 400px;
  }
}

@media screen and (max-width: 900px) {
  .container {
    grid-template-columns: 1fr;
  }

  .img {
    display: none;
  }

  .wave {
    display: none;
  }

  .login-content {
    justify-content: center;
  }
}
</style>
