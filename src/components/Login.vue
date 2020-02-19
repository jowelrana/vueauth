<template>
  <div class="page-wrapper login-form">
    <h2 class="login-heading">Login</h2>
      <div v-if="successMessage" class="success-message">{{ successMessage }}</div>
      <div v-if="errorMessage" class="server-error">{{ errorMessage }}</div>

      <div class="form-control">
        <label for="email">Email*</label>
        <input type="email" name="email" id="email" class="login-input" v-model="email">
      </div>

      <div class="form-control mb-more">
        <label for="password">Password*</label>
        <input type="password" name="password" id="password" class="login-input" v-model="password">
      </div>

      <div class="form-control">
        <button type="submit" class="btn-submit" @click="login">
          Login
        </button>
      </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
      successMessage: '',
    }
  },
  methods: {
    login() {
      if(this.email !=='' && this.password !==''){
        this.$store.dispatch('retrieveToken', {
          email: this.email,
          password: this.password,
        })
        .then(response => {
          this.$router.push({ name: 'home' })
        })
        .catch(error => {
          this.errorMessage = error.response.data.message
          this.password = ''
          this.successMessage = ''
        })
      }else{
         this.errorMessage='Please fill in all required fields'
      }
    }
  }
}
</script>

