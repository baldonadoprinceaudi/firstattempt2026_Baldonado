### Baldonado

### Project Details

Framework: Next JS
Module: Donation

**1. Prerequisites**

Before running the project, make sure the following tools are properly installed and working:

Install Node.js (Required for npm)
Download Node.js from: https://nodejs.org/
Install the LTS (Long-Term Support) version.
After installation, open a terminal or command prompt and run:
```
node -v
npm -v
```
Both commands should return version numbers.

Test Next JS Installation (Optional)

Create a test project:
```
npx create-next-app@latest test-app
```
Navigate into the folder:
```
cd test-app
```
Run the project:
```
npm run dev
```
Open your browser and go to:
http://localhost:3000

Clone the Repository:
```
git clone https://github.com/baldonadoprinceaudi/firstattempt2026_Baldonado.git
```
```
cd addu-alumni-portal
```
Install Dependencies:
```
npm install
```
Run the Development Server:
```
npm run dev
```
**The application will be available at http://localhost:3000.**

### AI Tools Used

Google Gemini (Code generation and Lead Developer Persona)
GitHub Copilot (Real-time tweaks)

### Prompt

Pretend you are a senior developer at Ateneo de Davao's faculty. You are tasked to convert the mobile application into a desktop website. I will be sending screenshots of the figma prototype along with its flow. According to the google document, please do the task. Make sure it is compiled in two files, page.js and layout.js. i will be using Next JS.  Two files since i will be using both layout.js and page.js. Again, JS not TSX. The design must be same as the mobile app screenshots from the google.
https://docs.google.com/document/d/13NIZ3nuV5V8HZF5EA5cs13c29f0GBIvSYKqFWOEXlP8/edit?tab=t.0


### PWA Implementation (Progressive Web App)
Master Prompt used for PWA Conversion: I am converting a static project built with next.js into a Progressive Web Application (PWA). Please guide me through the implementation. I need you to generate:1. A valid manifest.json configured for a university-branded app.2. A Service Worker script.3. The code to register the Service Worker in my main entry file.4. A caching strategy in the Service Worker so the app loads instantly and works completely offline (cache first, fallback to network).Please explain where each snippet goes in my project structure. Please base on the Addu nation app.


### AI Hallucinations & Manual Fixes
During the PWA implementation phase, the AI generated a few configuration blind spots that had to be resolved manually:

Path Alias Hallucination (Module not found): The AI provided an import path of '@/components/ServiceWorkerRegistry' which caused a build error. The project was not configured for the @/ path alias.

Fix: Manually updated the import in layout.js to use a relative path: '../components/ServiceWorkerRegistry'.

Missing Layout Integration: The AI generated the ServiceWorkerRegistry component but failed to automatically insert it into the existing layout.js structure alongside the metadata.

Fix: Manually replaced the layout.js code to properly inject the <ServiceWorkerRegistry /> component inside the <body> tag and link the /manifest.json in the metadata.

Port Conflict (EADDRINUSE): The terminal threw a listen EADDRINUSE: address already in use :::3000 error when running the production server.

Fix: Realized the development server (npm run dev) was still running in the background. Manually terminated the process (Ctrl + C) before executing npm run start.

Git CLI Configuration Hurdles: When attempting to push the new PWA branch, Git blocked the commit due to Author identity unknown, followed by a missing upstream branch error.

Fix: Manually set global git config variables (user.email and user.name), and manually linked the local branch to the remote repository using git push --set-upstream origin feature/pwa-ready.

### Screenshots


<img width="1919" height="1079" alt="Image" src="https://github.com/user-attachments/assets/6f316b3f-56ba-46aa-a77c-3a79f3029c26" />
<img width="1919" height="1079" alt="Image" src="https://github.com/user-attachments/assets/8453f36e-7626-4142-bbc0-07c6688f29b1" />
<img width="1919" height="1079" alt="Image" src="https://github.com/user-attachments/assets/96267378-a840-449f-b0c8-4cd6f808d30e" />
<img width="1918" height="1079" alt="Image" src="https://github.com/user-attachments/assets/49c9338c-e873-4205-9487-037452138c48" />
<img width="1919" height="1079" alt="Image" src="https://github.com/user-attachments/assets/4daa3896-cba0-497c-bc68-37c25d123f7c" />
<img width="1919" height="1079" alt="Image" src="https://github.com/user-attachments/assets/2926a5b2-9fcd-403a-8a85-11f0f55c3f36" />
<img width="1919" height="1079" alt="Image" src="https://github.com/user-attachments/assets/cc22ea4f-6407-4317-85fc-70c846b5206a" />
<img width="1902" height="1049" alt="Image" src="https://github.com/user-attachments/assets/c4c8a738-80f6-4d4f-b891-45e62d667825" />
<img width="1919" height="1079" alt="Image" src="https://github.com/user-attachments/assets/5b0b5e8b-012e-4211-9d3a-89887ddc7c71" />
<img width="1919" height="1079" alt="Image" src="https://github.com/user-attachments/assets/d2b5e23d-5f76-46c1-b786-3aaf99ff0029" />
<img width="1919" height="1079" alt="Image" src="https://github.com/user-attachments/assets/031ad18e-d501-4705-a85c-73c7f58bc007" />
<img width="1919" height="1075" alt="Image" src="https://github.com/user-attachments/assets/39ccf370-3a83-4a8c-b59c-7e65c7587800" />
