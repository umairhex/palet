<script setup lang="ts">
import LegalLayout from '../../layouts/LegalLayout.vue'
</script>

<template>
  <LegalLayout>
    <h1>Cookie Policy</h1>
    <p class="text-sm font-medium uppercase tracking-[0.2em] mb-16 text-muted-foreground-subtle">
      Published: March 7, 2026
    </p>

    <p>
      Palet (accessible at "palet.umairrx.dev") employs an exceptionally minimalist approach toward
      cookies and local telemetry. By continuing usage of the vault interface, you acknowledge our
      restricted deployment of storage technologies.
    </p>

    <h2>1. The Technology</h2>
    <p>
      Cookies, JSON Web Tokens (JWTs), and HTML5 LocalStorage are technical primitives allowing
      statefulness on modern web clients. Without them, Palet would instantly "forget" your color
      configurations formatting upon every refresh.
    </p>

    <h2>2. Strictly Essential Functional Cookies</h2>
    <p>
      Instead of invasive marketing trackers, the Palet architecture relies nearly entirely on
      generic local caching nodes.
    </p>
    <ul>
      <li>
        <strong>Session Persistence</strong>: If an account is registered, a secure authentication
        token maintains persistent connections to our Cloud Sync relays.
      </li>
      <li>
        <strong>Vault Caching</strong>: `localStorage` is used deeply to preserve offline
        accessibility. When you paste in a color hex without an account, we rely directly on this
        mechanism to save the changes to your machine locally.
      </li>
    </ul>

    <h2>3. Zero Third-Party Advertising Pixels</h2>
    <p>
      As of 2026, Palet hosts exactly <strong>zero</strong> ad-network pixels, Facebook tracking
      modules, or cross-site fingerprinting scripts. We operate the workspace exclusively to serve
      creators—not data brokers. Performance telemetry is fully anonymized and restricted to error
      triage.
    </p>

    <h2>4. Storage Management</h2>
    <p>
      You may purge Palet’s functional storage elements by clearing site data directly via your
      browser context menus. Doing so will securely wipe your offline `localStorage` asset vault and
      instantly sever any authenticated Cloud Sync connections. If you have any cookie-related
      inquiries, contact us at <a href="mailto:palet@nizsol.com">palet@nizsol.com</a>.
    </p>
  </LegalLayout>
</template>
