# 🎨 ChatGPT Prompt Gallery

<p align="center">
  <img src="https://img.shields.io/github/license/senpaivarun2004/ChatGPT-Prompt-Gallery?style=for-the-badge&color=blueviolet" alt="License">
  <img src="https://img.shields.io/github/stars/senpaivarun2004/ChatGPT-Prompt-Gallery?style=for-the-badge&color=ff69b4" alt="Stars">
  <img src="https://img.shields.io/github/forks/senpaivarun2004/ChatGPT-Prompt-Gallery?style=for-the-badge&color=00f2fe" alt="Forks">
  <img src="https://img.shields.io/badge/Made%20With-HTML%20%7C%20CSS%20%7C%20JS-orange?style=for-the-badge" alt="Tech Stack">
</p>

---

**ChatGPT Prompt Gallery** is a beautiful, interactive, and client-side web application designed to help creators discover, organize, and share ChatGPT image generation prompts. Seamlessly upload your AI-generated masterpieces along with their exact prompts, filter through categories, and copy prompts with a single click.

---

## ✨ Features

- 📸 **Visual Showcase:** Display your generated art alongside its exact prompt.
- 📋 **One-Click Copy:** Easily copy prompt text directly to your clipboard.
- 🏷️ **Categorized Navigation:** Quickly filter creations by **Portrait**, **Landscape**, **Product**, **Art**, or **Other**.
- 💾 **Local Persistence:** Your gallery items are saved locally in your browser (`localStorage`), preserving your collection across refreshes.
- ➕ **Dynamic Add & Delete:** Add custom entries via a drag-and-drop image modal, or delete prompts you no longer need.
- 📱 **Fully Responsive:** Sleek, modern, and adaptive UI designed to look stunning on mobile, tablet, and desktop screens.

---

## 🛠️ Technology Stack

This application is built with zero dependencies, keeping it lightweight, fast, and highly customizable:

| Technology | Purpose |
| :--- | :--- |
| **HTML5** | Semantic structure & modal layouts |
| **CSS3** | Modern CSS variables, flexbox, grid, glassmorphism, and smooth transitions |
| **Vanilla JavaScript** | DOM manipulation, `localStorage` synchronization, and file upload parsing (Base64) |

---

## 🚀 Quick Start

Since the ChatGPT Prompt Gallery is a static client-side application, you can run it instantly without any complex setup or installation!

### Option 1: Double-Click (Zero Setup)
1. Clone or download this repository.
2. Navigate to the project folder.
3. Double-click the [index.html](file:///c:/Users/senpq/Projects/GitHub/ChatGPT-Prompt-Gallery/index.html) file to open it directly in your favorite web browser.

### Option 2: Run a Local Server (Recommended)
If you prefer running a local development server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js (serve)
npx serve .
```
Then, open your browser and navigate to `http://localhost:8000` or the port provided.

---

## 📂 Project Structure

```text
├── index.html       # Main application layout and structure
├── styles.css       # Clean, modern CSS styling and responsive design
├── app.js           # Core application logic, local storage, & state management
├── GUIDE.md         # Detailed instructions for custom hardcoding and categories
└── README.md        # Project documentation
```

---

## 🔧 Personalizing the Gallery

You can customize the initial prompts and category configurations to make this project uniquely yours! 

- **Custom Initial Prompts:** You can hardcode your custom prompts inside the `samplePrompts` array in `app.js`.
- **Custom Categories:** Easily add categories by modifying the dropdown and filters in `index.html` and updating the category keys in `app.js`.

For a step-by-step walkthrough on how to do this, check out our comprehensive [Customization Guide](file:///c:/Users/senpq/Projects/GitHub/ChatGPT-Prompt-Gallery/GUIDE.md).

---

## 📄 License

This project is open-source and available under the **MIT License**. Feel free to fork, customize, and share!
