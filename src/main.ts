import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { createHead } from '@unhead/vue/client'
import App from './App.vue'
import router from './router'
import { queryClient } from './lib/queryClient'

const app = createApp(App)

app.config.errorHandler = (err, vm, info) => {
  console.error('[Vue error]', err, info)
}

// Initialize Unhead for head management
const head = createHead()
app.use(head)

app.use(createPinia())
app.use(VueQueryPlugin, { queryClient })
app.use(router)

app.mount('#app')
