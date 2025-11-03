<h1 align="center">ShusthoGram (শুস্থগ্রাম)</h1>

<p align="center">
    <strong>The AI Rural Health Navigator for Bangladesh</strong>
</p>

<p align="center">
    ShusthoGram, meaning "Healthy Village," is an AI-powered health assistant designed to bridge the healthcare gap in rural Bangladesh. It provides accessible health guidance, facility navigation, and digital health records through a simple chat interface.
</p>

<p align="center">
  <a href="https://chat-sdk.dev"><strong>Read Docs</strong></a> ·
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#model-providers"><strong>Model Providers</strong></a> ·
  <a href="#deploy-your-own"><strong>Deploy Your Own</strong></a> ·
  <a href="#running-locally"><strong>Running locally</strong></a>
</p>
<br/>

## Features

### Core Health Services
- **AI Symptom Triage**: Conversational AI to assess symptoms and guide users to appropriate care levels
- **Health Facility Locator**: Find nearby hospitals, clinics, health centers, pharmacies, and diagnostic centers
- **Digital Health Records**: Voice-powered personal health record management
- **Preventive Health Education**: Information on maternal health, child nutrition, disease prevention
- **Vaccination Reminders**: Track and remind about child vaccination schedules
- **Disease Outbreak Alerts**: Regional health alerts and outbreak information

### Technology Stack
- [Next.js](https://nextjs.org) App Router for robust web application
- [AI SDK](https://ai-sdk.dev/docs/introduction) with tool calling for health-specific functions
- [shadcn/ui](https://ui.shadcn.com) for accessible user interface
- [Neon Serverless Postgres](https://vercel.com/marketplace/neon) for health data storage
- [Auth.js](https://authjs.dev) for secure authentication

## Problem Statement

Bangladesh faces a critical healthcare disparity:
- 66% of the population lives in rural areas but only 25% of health workers serve them
- Doctor-to-patient ratio is 7:10,000 (WHO recommends 22.8:10,000)
- 74% of healthcare costs are out-of-pocket, pushing families into poverty
- Lack of digital health infrastructure and fragmented health records

## Solution

ShusthoGram addresses these challenges by:
1. **Reducing barriers to care**: Accessible through simple chat interface
2. **Intelligent triage**: Guides users to appropriate care level, reducing unnecessary hospital visits
3. **Building health data infrastructure**: Creates digital health records at the individual level
4. **Preventive focus**: Proactive health education and disease prevention

## Target Users

Primary beneficiaries:
- 112 million rural residents of Bangladesh
- Particular focus on women and children who face the greatest healthcare barriers
- Secondary: Rural healthcare workers and urban tertiary hospitals (reduced patient load)

## Running locally

You will need to use the environment variables [defined in `.env.example`](.env.example) to run Next.js AI Chatbot. It's recommended you use [Vercel Environment Variables](https://vercel.com/docs/projects/environment-variables) for this, but a `.env` file is all that is necessary.

> Note: You should not commit your `.env` file or it will expose secrets that will allow others to control access to your various AI and authentication provider accounts.

1. Install Vercel CLI: `npm i -g vercel`
2. Link local instance with Vercel and GitHub accounts (creates `.vercel` directory): `vercel link`
3. Download your environment variables: `vercel env pull`

```bash
pnpm install
pnpm db:migrate # Setup database or apply latest database changes
pnpm dev
```

Your app template should now be running on [localhost:3000](http://localhost:3000).
