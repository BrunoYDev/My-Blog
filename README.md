# Bruno's Digital Lair - A Y2K-Inspired Blog

<img width="1647" height="1004" alt="{C53E50D1-1E62-41FC-8984-2283B1D2B29A}" src="https://github.com/user-attachments/assets/59165318-5f0b-4d49-aba1-6ee7d0e5d9c0" />


Welcome to my personal blog, a digital playground built as a love letter to the creative, chaotic, and wonderfully personal web of the late 90s and early 2000s.

**Live Demo:** [**https://brunorgarciablog.vercel.app/**](https://brunorgarciablog.vercel.app/)

---

## 🚀 About This Project

This project is a fully functional, modern web application that embraces the Y2K aesthetics. As a backend-focused developer born in 2003, I wanted to explore frontend technologies while creating a space that rebels against today's templated, uniform web design. This blog is a testament to an era where every website had its own unique soul.

It serves as my personal devlog, diary and a place to share my interests in technology, sci-fi, classic gaming, and music.

## ✨ Key Features

* **✍️ MDX-Powered Blog:** Posts are written in MDX, allowing for a rich mix of Markdown and custom React components within the content.
* **🎛️ Git-based CMS:** Content is managed visually through **Keystatic**, which commits changes directly to the GitHub repository via a user-friendly admin panel.
* **🗂️ Dynamic Content Archives:** Fully functional and paginated archives for both **Tags** and **Dates**, allowing for easy content discovery.
* **📄 Multi-level Pagination:** Custom pagination components implemented for the main blog, guestbook, and all tag archive pages.
* **📖 Full-stack Guestbook ("Shoutbox"):** Visitors can leave public messages, which are stored and retrieved from a Supabase (PostgreSQL) database.
* **📈 Custom Visitor Counter:** A dual-purpose counter built with Vercel KV (Redis) to track both total unique visitors and unique daily visitors.
* **👾 Custom BSOD 404 Page:** A "Blue Screen of Death"-themed 404 page for a nostalgic error-handling experience.
* **📱 Fully Responsive Design:** Custom CSS ensures the retro aesthetic adapts perfectly to mobile devices, with features like a hamburger menu for navigation.
* **🎨 Advanced Styling:** Features custom animated borders, pixel fonts, GIF dividers, and a hand-crafted Y2K theme.

## 🛠️ Tech Stack

This project is built with a modern, performant, and scalable tech stack:

* **Framework:** Next.js 14 (App Router)
* **Language:** TypeScript
* **UI:** React
* **Content & CMS:** **Keystatic** (Git-based) & MDX with `rehype-pretty-code`
* **Database (Guestbook):** Supabase (PostgreSQL)
* **KV Store (Counter):** Vercel KV (Upstash Redis)
* **Styling:** CSS Modules
* **Deployment:** Vercel

## ⚙️ Running Locally

To get a local copy up and running, follow these simple steps.

### Prerequisites

* Node.js (v18 or later)
* npm
* A Vercel account (for environment variables)

### Installation

1.  Clone the repo:
    ```sh
    git clone https://github.com/BrunoYDev/My-Blog.git
    ```
2.  Navigate to the project directory:
    ```sh
    cd My-Blog
    ```
3.  Install NPM packages:
    ```sh
    npm install
    ```
4.  Set up your environment variables. You'll need to connect this project to your own Supabase and Vercel KV instances. Create a file named `.env.local` in the root and add the following variables:
    ```env
    # Supabase
    NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
    NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY

    # Vercel KV (Redis)
    KV_URL=YOUR_KV_URL
    KV_REST_API_URL=YOUR_KV_REST_API_URL
    KV_REST_API_TOKEN=YOUR_KV_REST_API_TOKEN
    KV_REST_API_READ_ONLY_TOKEN=YOUR_KV_REST_API_READ_ONLY_TOKEN
    
    # Keystatic (for GitHub auth on the deployed site)
    KEYSTATIC_SECRET=CREATE_A_RANDOM_SECRET_STRING
    KEYSTATIC_GITHUB_CLIENT_ID=YOUR_GITHUB_OAUTH_APP_CLIENT_ID
    KEYSTATIC_GITHUB_CLIENT_SECRET=YOUR_GITHUB_OAUTH_APP_CLIENT_SECRET
    ```
    *You can get these values from your Vercel, Supabase, and GitHub project dashboards.*

5.  Run the development server:
    ```sh
    npm run dev
    ```
    The site will be available at `http://localhost:3000`.

6.  Access the CMS by navigating to `http://localhost:3000/keystatic`.

## 📞 Contact

Bruno R Garcia - [**Linkedin**](https://www.linkedin.com/in/brunogarciaydev/)
