<template>
    <div class="container mt-3">
      <h1 class="mb-3">
          Login
      </h1>
      <form @submit.prevent="onSubmit">
          <div class="mb-3">
              <label for="formGroupExampleInput" class="form-label">Email</label>
              <input name="email" v-model="form.email" type="text" class="form-control" id="formGroupExampleInput" placeholder="Email">
              </div>
              <div class="mb-3">
              <label for="formGroupExampleInput2" class="form-label">Password</label>
              <input name="password" v-model="form.password" type="text" class="form-control" id="formGroupExampleInput2" placeholder="Password">
          </div>
          <button type="submit" class="btn btn-primary mb-3">
            <span v-if="isLoading">Loading...</span>
            <span v-else>Log in</span>
          </button>
      </form>
    </div>
  </template>
  
  <script setup>
    const form = reactive({
      email: "eve.holt@reqres.in",
      password: "cityslicka"
    })

    const url = "/proxy/example/login"

    const isLoading = ref(false)
    const _error = ref(null)

    async function onSubmit() {
      if (isLoading.value) return;
      isLoading.value = true

      // const { data, pending, error, refresh } = await useFetch('https://api.nuxtjs.dev/mountains',{
      //     pick: ['title']
      // })

      // console.log(data)

        const { data, pending, error, refresh } = await useFetch(url, {
          method: "post",
          body: form,
          onRequest({ request, options }) {
            // Set the request headers
            options.headers = options.headers || {}
            options.headers.authorization = '...'
          },
          onRequestError({ request, options, error }) {
            // Handle the request errors
          },
          onResponse({ request, response, options }) {
            // Process the response data
            console.log(response._data)
            return response._data
          },
          onResponseError({ request, response, options }) {
            // Handle the response errors
          }
        })

        isLoading.value = false


        if (error.value) {
          console.log(error)
          _error.value = error.value.data.error
          return

        }
        
        const token = useCookie('access_token')
        token.value = data.value.token


        const auth = useAuth();
        auth.value.isAuthenticated = true;

        navigateTo('/profile')
    };
  </script>
  