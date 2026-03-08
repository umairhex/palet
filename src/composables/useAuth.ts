import { ref, computed, onMounted } from 'vue'
import { supabase } from '@/lib/supabase'
import { queryClient } from '@/lib/queryClient'
import type { User } from '@supabase/supabase-js'

const _user = ref<User | null>(null)
const _isLoading = ref(true)
const _error = ref<string | null>(null)
let _initPromise: Promise<void> | null = null
let _listenerActive = false

const ANON_ID_KEY = 'palet-anon-uid'

async function _doInit() {
  try {
    _isLoading.value = true
    _error.value = null
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (session) {
      _user.value = session.user
    } else {
      const isAuthCallback =
        window.location.pathname === '/auth/callback' ||
        window.location.hash.includes('access_token') ||
        new URLSearchParams(window.location.search).has('code')

      if (!isAuthCallback) {
        const { data, error } = await supabase.auth.signInAnonymously()
        if (error) {
          console.error('ERROR: Anonymous sign-in failed:', error.message)
        } else {
          _user.value = data.user
        }
      }
    }
  } catch (err) {
    _error.value = err instanceof Error ? err.message : 'Failed to initialize auth'
    _user.value = null
  } finally {
    _isLoading.value = false
  }
}

function _initAuth(): Promise<void> {
  if (!_initPromise) _initPromise = _doInit()
  return _initPromise
}

function _ensureListener() {
  if (_listenerActive) return
  _listenerActive = true
  supabase.auth.onAuthStateChange((event, session) => {
    _user.value = session?.user ?? null
    if (event === 'SIGNED_OUT') _user.value = null
  })
}

export function useAuth() {
  const isAuthenticated = computed(() => _user.value !== null)
  const isAnonymous = computed(() => _user.value?.is_anonymous === true)
  const avatarUrl = computed(() => (_user.value?.user_metadata?.avatar_url as string) ?? null)

  onMounted(() => {
    _initAuth()
    _ensureListener()
  })

  const signUp = async (email: string, password: string) => {
    try {
      _error.value = null

      if (_user.value?.is_anonymous) {
        const { data, error: authError } = await supabase.auth.updateUser({
          email,
          password,
        })
        if (authError) throw authError
        _user.value = data.user ?? null

        return data
      }

      const { data, error: authError } = await supabase.auth.signUp({ email, password })
      if (authError) throw authError
      _user.value = data.user ?? null
      return data
    } catch (err) {
      _error.value = err instanceof Error ? err.message : 'Sign up failed'
      throw err
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      _error.value = null
      const anonymousId = _user.value?.is_anonymous ? _user.value.id : null

      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (authError) throw authError
      _user.value = data.user ?? null

      if (anonymousId && data.user?.id !== anonymousId) {
        const { error: rpcError } = await supabase.rpc('transfer_anonymous_data', {
          old_user_id: anonymousId,
        })
        if (rpcError) console.error('ERROR: Data transfer failed:', rpcError.message)
        queryClient.clear()
      }

      return data
    } catch (err) {
      _error.value = err instanceof Error ? err.message : 'Sign in failed'
      throw err
    }
  }

  const signOut = async () => {
    try {
      _error.value = null
      const { error: authError } = await supabase.auth.signOut()
      if (authError) throw authError
      _user.value = null
      queryClient.clear()

      const { data, error } = await supabase.auth.signInAnonymously()
      if (!error) _user.value = data.user
    } catch (err) {
      _error.value = err instanceof Error ? err.message : 'Sign out failed'
      throw err
    }
  }

  const signInWithGoogle = async () => {
    try {
      _error.value = null

      if (_user.value?.is_anonymous && _user.value.id) {
        sessionStorage.setItem(ANON_ID_KEY, _user.value.id)
      }

      const { error: authError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      if (authError) throw authError
    } catch (err) {
      _error.value = err instanceof Error ? err.message : 'Google sign in failed'
      throw err
    }
  }

  const transferAnonymousData = async () => {
    const anonId = sessionStorage.getItem(ANON_ID_KEY)
    if (!anonId) return false
    sessionStorage.removeItem(ANON_ID_KEY)

    if (_user.value?.id === anonId) return false

    const { error } = await supabase.rpc('transfer_anonymous_data', {
      old_user_id: anonId,
    })
    if (error) {
      console.error('ERROR: Post-OAuth data transfer failed:', error.message)
      return false
    }
    queryClient.clear()
    return true
  }

  const resetPassword = async (email: string) => {
    try {
      _error.value = null
      const { error: authError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })
      if (authError) throw authError
    } catch (err) {
      _error.value = err instanceof Error ? err.message : 'Password reset failed'
      throw err
    }
  }

  const updatePassword = async (newPassword: string) => {
    try {
      _error.value = null
      const { error: authError } = await supabase.auth.updateUser({ password: newPassword })
      if (authError) throw authError
    } catch (err) {
      _error.value = err instanceof Error ? err.message : 'Password update failed'
      throw err
    }
  }

  const getUserId = (): string | null => _user.value?.id ?? null

  return {
    user: _user,
    isLoading: _isLoading,
    error: _error,
    isAuthenticated,
    isAnonymous,
    avatarUrl,
    initAuth: _initAuth,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    resetPassword,
    updatePassword,
    getUserId,
    transferAnonymousData,
  }
}
