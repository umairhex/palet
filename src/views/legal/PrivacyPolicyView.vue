<script setup lang="ts">
import LegalLayout from '../../layouts/LegalLayout.vue'
</script>

<template>
  <LegalLayout>
    <h1>Privacy Policy</h1>
    <p class="text-sm font-medium uppercase tracking-[0.2em] mb-16 text-muted-foreground-subtle">
      Last Updated: March 7, 2026
    </p>

    <p>
      At <strong>Palet Asset Vault</strong> (accessible at "palet.umairrx.dev" or simply "we," "us,"
      or "our"), your privacy is a foundational pillar of our service architecture. This Privacy
      Policy details the exact nature of the data we collect throughout your interactions with the
      Palet service, the mechanisms by which we secure it, and your comprehensive rights regarding
      your digital asset data.
    </p>

    <h2>1. The Information We Collect</h2>
    <p>
      Palet operates primarily as a <strong>local-first architecture</strong>, processing color
      palettes and typography files (`.ttf` and web font variants) directly within your browser.
    </p>
    <ul>
      <li>
        <strong>Anonymous Users:</strong> We do not log or track any design primitives or typeface
        uploads conducted while operating Palet in unauthenticated mode. All changes are stored
        exclusively in your browser's persistent LocalStorage layer.
      </li>
      <li>
        <strong>Registered Accounts:</strong> If you voluntarily enable our Cloud Sync tier, we
        retain your email address solely for authentication purposes via secure OAuth or magic
        links. The design assets synced to our servers are strictly encrypted and bound only to your
        account ID.
      </li>
    </ul>

    <h2>2. Processing and Usage of Your Data</h2>
    <p>
      Your data is leveraged for solely technical purposes critical to delivering a reliable design
      workspace. We process this information to:
    </p>
    <ul>
      <li>Facilitate instant cross-device syncing of your color hex configurations.</li>
      <li>
        Securely store and retrieve `.ttf` typeface formats for your own personal preview
        functionality.
      </li>
      <li>Diagnose critical infrastructure errors or application crashes.</li>
    </ul>
    <p>
      We <em>do not</em> ingest your uploaded fonts into generative AI models. We
      <em>do not</em> construct user profiles based on your color selections, nor do we sell
      metadata indicating usage trends to third-party marketing entities.
    </p>

    <h2>3. GDPR, CCPA, and International Rights</h2>
    <p>
      In compliance with the stringent requirements of the General Data Protection Regulation (GDPR)
      and the California Consumer Privacy Act (CCPA), you retain categorical rights over your stored
      assets:
    </p>
    <ul>
      <li>
        <strong>Right of the Erasure</strong> - Navigate to Account &gt; Advanced to trigger
        immediate hard deletion of all synced palettes and typographic files.
      </li>
      <li>
        <strong>Data Portability</strong> - Export your entire vault as a structured JSON object
        anytime from your workspace interface.
      </li>
    </ul>

    <h2>4. Contact Our Privacy Engineers</h2>
    <p>
      If you require deep-dive clarification on our encryption methods at rest, or wish to query how
      we process your personal data, you may open a secure ticket via
      <a href="mailto:palet@nizsol.com">palet@nizsol.com</a>.
    </p>
  </LegalLayout>
</template>
