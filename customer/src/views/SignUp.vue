<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-6" style="margin: auto;">
        <div class="card bg-dark text-white">
          <img src="../assets/signinBG.jpg" class="card-img" alt="...">
          <div class="card-img-overlay">
            <h1 class="card-title"  style="margin-top: 3rem"><strong>Create your new account</strong></h1>

            <form @submit.prevent="signUp">
              <div class="mb-3 text-start mt-5">
                <label for="username" class="form-label">Username</label>
                <input type="text" class="form-control" v-model="username" required>
              </div>
              <div class="mb-3 text-start ">
                <label for="email" class="form-label">Email address</label>
                <input type="email" class="form-control" v-model="email" required>
                <div class="form-text">We'll never share your email with anyone else.</div>
              </div>
              <div class="mb-3 text-start">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" v-model="password" required>
              </div>
              <button type="submit" class="btn btn-outline-dark">Sign Up</button>
            </form>
            <hr>
            <p class="card-text">or signin with Google</p>
            <button v-google-signin-button="clientId" class="google-signin-button"><i class="fab fa-google-plus-g" style="font-size: 25px;"></i></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name    : 'SignUp',
  data () {
    return {
      username  : '',
      email     : '',
      password  : '',
      clientId  : '477949842281-22et6lkr8vh7vf1ki14phhal0f3mdksh.apps.googleusercontent.com'
    }
  },
  methods : {
    signUp() {
      const user = { username: this.username, email : this.email, password : this.password }
      this.$store.dispatch('signUp', user)
    },
      OnGoogleAuthSuccess (idToken) {
      console.log(idToken, `token`)
      this.$store.dispatch('googleLogin', idToken)
    },
      OnGoogleAuthFail (error) {
      console.log(error, `error`)
    }
  }
}
</script>

<style scoped>
  .container {
    margin: auto;
    outline: 0px solid transparent

  }
  .card {
    border: 0;
    outline: 0px solid transparent
  }

  .card-img {
    border: 0;
    border-radius: 0;
    outline: 0px solid transparent
  }

  .google-signin-button {
    color: white;
    background-color: red;
    height: 50px;
    font-size: 16px;
    border-radius: 100%;
    padding: 10px 20px 25px 20px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
</style>