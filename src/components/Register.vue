<template>
  <div class="page-wrapper login-form">
    <h2 class="login-heading">Register</h2>
      <div v-if="errorMessage" class="server-error">
        <p>{{errorMessage}}</p>
      </div>
      <div v-if="successMessage" class="server-error">
        <p>{{successMessage}}</p>
      </div>

      <div class="form-control">
        <label for="email">Email*</label>
        <input type="text" name="email" id="email" class="login-input"  v-model="email" >
      </div>
      <div v-if="!step">
        <div class="form-control">
          <button type="submit" class="btn-submit" @click="stepOne">Next</button>
        </div>
      </div>
      <div v-else>
        <div class="form-control">
          <label for="code">Verification code*</label>
          <input type="text" name="code" id="code" class="login-input" v-model="code">
        </div>
        <div class="form-control">
          <label for="name">Name*</label>
          <input type="text" name="name" id="name" class="login-input" v-model="name">
        </div>
        <div class="form-control mb-more">
          <label for="password">Password*</label>
          <input type="password" name="password" id="password" class="login-input" v-model="password">
        </div>
        <div class="form-control">
          <button type="submit" class="btn-submit" @click="register">Submit</button>
        </div>
      </div>
  </div>
</template>

<script>

import axios from 'axios'
export default {
  data() {
    return {
      email: '',
      name: '',
      step:false,
      code: '',
      password: '',
      errorMessage: '',
      successMessage: '',
    }
  },
  methods: {
    stepOne(){
      if(this.email !=''){
        this.errorMessage=''
        this.$store.dispatch('step', {email: this.email,})
        .then(response => {
          this.successMessage = response.data.message    
          this.step=true      
        })
        .catch(error => {
        this.errorMessage = error.response.data.message
        })

      }else{
         this.errorMessage='Please enter email address'
      }

    },
    register() {
      if(this.email !='' && this.name !=''&& this.code !='' && this.password !=''){
        this.$store.dispatch('register', {
          name: this.name,
          email: this.email,
          code: this.code,
          password: this.password,
        })
        .then(response => {
          this.successMessage = 'Registered Successfully!' 
          this.$router.push({ name: 'home' })        
        })
        .catch(error => {
         this.errorMessage = error.response.data.message
        })

      }else{
         this.errorMessage='Please fill in all required fields'
      }
      
    }
  }
}
</script>
