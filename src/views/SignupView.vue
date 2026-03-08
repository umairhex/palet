<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import Button from '@/components/ui/Button.vue'

const router = useRouter()
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const isLoading = ref(false)
const error = ref<string | null>(null)
const success = ref(false)

const { signUp, signInWithGoogle, isAuthenticated, isAnonymous } = useAuth()

watch([isAuthenticated, isAnonymous], ([authed, anon]) => {
  if (authed && !anon) {
    router.push('/generator')
  }
})

const handleGoogleSignIn = async () => {
  try {
    error.value = null
    await signInWithGoogle()
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Google sign in failed'
  }
}

const handleSignUp = async () => {
  if (!email.value || !password.value || !confirmPassword.value) {
    error.value = 'Please fill in all fields'
    return
  }

  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match'
    return
  }

  if (password.value.length < 8) {
    error.value = 'Password must be at least 8 characters'
    return
  }

  try {
    isLoading.value = true
    error.value = null
    await signUp(email.value, password.value)
    success.value = true
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to sign up'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex flex-col bg-[#f5f5f5] px-4 py-6">
    <div class="flex-1 flex items-center justify-center">
      <div class="w-full max-w-md bg-white rounded-2xl shadow-md p-6">
        <div class="max-w-md mx-auto w-full mb-6 text-xs text-gray-400 flex items-center gap-2">
          <RouterLink to="/" class="text-gray-300 hover:text-black transition-colors"
            >Home</RouterLink
          >
          <span>/</span>
          <span class="text-black">Sign Up</span>
        </div>

        <div class="text-center mb-5">
          <RouterLink to="/" class="inline-block mb-3">
            <h1 class="text-2xl font-bold tracking-[0.2em] text-gray-900">PALET</h1>
          </RouterLink>
          <h2 class="text-xl font-bold text-gray-900">Get Started</h2>
        </div>

        <div
          v-if="success"
          class="mb-4 p-3 rounded-lg bg-green-50 border border-green-200 text-green-700 text-center text-sm"
        >
          <p class="font-medium">Account created successfully!</p>
          <RouterLink
            to="/login"
            class="text-xs font-medium mt-2 inline-block text-green-600 hover:text-green-700"
          >
            Go to login →
          </RouterLink>
        </div>

        <form v-if="!success" @submit.prevent="handleSignUp" class="space-y-3">
          <div
            v-if="error"
            class="p-2 rounded-lg bg-red-50 border border-red-200 text-red-600 text-xs"
          >
            {{ error }}
          </div>

          <div>
            <label for="email" class="block text-xs font-medium text-gray-700 mb-1">Email</label>
            <input
              v-model="email"
              type="email"
              id="email"
              placeholder="you@example.com"
              class="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-colors"
              required
            />
          </div>

          <div>
            <label for="password" class="block text-xs font-medium text-gray-700 mb-1"
              >Password</label
            >
            <input
              v-model="password"
              type="password"
              id="password"
              placeholder="••••••••"
              class="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-colors"
              required
            />
            <p class="text-xs text-gray-400 mt-0.5">At least 8 characters</p>
          </div>

          <div>
            <label for="confirm-password" class="block text-xs font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              v-model="confirmPassword"
              type="password"
              id="confirm-password"
              placeholder="••••••••"
              class="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-colors"
              required
            />
          </div>

          <Button
            :disabled="isLoading"
            class="w-full mt-4 bg-primary hover:bg-primary/90 text-white h-10"
          >
            {{ isLoading ? 'Creating Account...' : 'Create Account' }}
          </Button>
        </form>

        <div v-if="!success" class="my-3 flex items-center gap-2">
          <div class="flex-1 h-px bg-gray-200"></div>
          <span class="text-xs text-gray-400">or</span>
          <div class="flex-1 h-px bg-gray-200"></div>
        </div>

        <button
          v-if="!success"
          @click="handleGoogleSignIn"
          class="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <svg class="size-4" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Continue with Google
        </button>

        <p v-if="!success" class="text-center text-gray-500 mt-4 text-sm">
          Already have an account?
          <RouterLink to="/login" class="text-primary hover:text-primary/80 font-medium">
            Sign in
          </RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>
