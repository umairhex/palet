<script setup lang="ts">
import LegalLayout from '../../layouts/LegalLayout.vue'
</script>

<template>
  <LegalLayout>
    <h1>Terms of Service</h1>
    <p class="text-sm font-medium uppercase tracking-[0.2em] mb-16 text-muted-foreground-subtle">
      Effective Date: March 7, 2026
    </p>

    <p>
      These Terms of Service ("Terms") structure the legal agreement between you and Palet ("the
      Service", accessible at "palet.umairrx.dev", "we", "us") governing your access and usage of
      the Palet application, its cloud interfaces, and offline persistence functionality.
    </p>

    <h2>1. Intellectual Property & Acceptable Use</h2>
    <p>
      Palet provides functional infrastructure to store and test digital assets like `.ttf` files
      and color strings. By uploading an asset:
    </p>
    <ul>
      <li>
        You explicitly warrant that you retain the legal licensing rights to upload, possess, and
        reproduce any typographic files (`.ttf`, `.woff2`) within the application context.
      </li>
      <li>
        Palet acts strictly as a neutral hosting and preview provider. We claim no ownership over
        the color pairings, UI mockups, or custom typefaces you introduce to the Vault.
      </li>
    </ul>

    <h2>2. Account Security Protocols</h2>
    <p>
      In utilizing Cloud Sync, users bear the responsibility of safeguarding execution access on
      their devices. Any destructive actions (e.g., purging your asset vault) authorized by an
      active session will be considered verified and ultimately irreversible if beyond our standard
      snapshot windows.
    </p>

    <h2>3. Service Availability and Liability</h2>
    <p>
      While Palet employs robust caching layers and redundant CDNs, we offer the service natively
      "AS IS". Palet disclaims liability for potential data loss, unrecorded hex code edits, or
      workflow interruptions caused by server degradation or browser-storage evictions outside of
      our immediate operational control.
    </p>

    <h2>4. Governing Framework</h2>
    <p>
      These terms are governed in strict accordance with relevant international corporate digital
      operational guidelines, barring conflict of law principles. Any arbitration will take place
      confidentially. For any questions or claims, please contact us at
      <a href="mailto:palet@nizsol.com">palet@nizsol.com</a>.
    </p>
  </LegalLayout>
</template>
