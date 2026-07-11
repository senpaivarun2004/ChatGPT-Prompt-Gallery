# Guide: Replace Sample Prompts with Your Own

This guide shows you how to swap out the default sample prompts with your own images and ChatGPT prompts.

---

## Quick Way: Use the Web UI (No Code)

1. Open `index.html` in your browser
2. Click **+ Add New**
3. Upload your image, paste your prompt, fill in title/author/category
4. Click **Add to Gallery**
5. Repeat for each prompt you want to add
6. Delete the old samples: click each old card → **Delete**

That's it. Your data saves automatically in the browser.

---

## Hardcode Your Prompts in `app.js`

If you want your prompts baked into the code (so they show up for anyone who opens the file), edit `app.js`.

### Step 1: Open `app.js` and find the `samplePrompts` array

```js
const samplePrompts = [
  {
    id: 'sample-1',
    title: 'Cinematic portrait in neon-lit cyberpunk city',
    prompt: 'Create a hyper-realistic cinematic portrait...',
    author: 'PromptCraft',
    category: 'portrait',
    image: null
  },
  // ... more prompts
];
```

### Step 2: Replace with your own prompts

Delete everything inside the array and add your own:

```js
const samplePrompts = [
  {
    id: 'my-prompt-1',
    title: 'YOUR TITLE HERE',
    prompt: 'YOUR FULL CHATGPT PROMPT HERE',
    author: 'YOUR NAME',
    category: 'art',
    image: null
  },
  {
    id: 'my-prompt-2',
    title: 'Another one of my prompts',
    prompt: 'Another detailed prompt for ChatGPT image generation...',
    author: 'YOUR NAME',
    category: 'portrait',
    image: null
  },
  // add as many as you want
];
```

### Step 3: Clear browser data to see changes

After editing `app.js`, the old cached data still shows. To reset:

1. Open browser console (**F12** → **Console** tab)
2. Paste this and press Enter:
   ```js
   localStorage.removeItem('chatgpt_prompt_gallery');
   ```
3. Refresh the page — your new prompts appear

---

## Adding an Image to a Hardcoded Prompt

Images in `samplePrompts` are stored as base64 strings. Here's how to get one:

### Method: Upload via UI, then grab the base64

1. Open `index.html`
2. Click **+ Add New** → upload your image → fill in any title/prompt → click **Add to Gallery**
3. Open console (**F12** → **Console**)
4. Run:
   ```js
   const data = JSON.parse(localStorage.getItem('chatgpt_prompt_gallery'));
   console.log(data[0].image);
   ```
5. Copy the long string it prints (starts with `data:image/png;base64,...`)
6. Open `app.js`, find your prompt, and paste it:
   ```js
   {
     id: 'my-prompt-1',
     title: 'My prompt with image',
     prompt: '...',
     author: 'Me',
     category: 'art',
     image: 'PASTE THE BASE64 STRING HERE'
   }
   ```
7. Clear localStorage again (step 3 above) and refresh

> **Note:** Base64 strings are huge (thousands of characters). Your `app.js` file will get big. That's normal.

---

## Replacing All Samples at Once

To wipe everything and start fresh:

1. Edit `samplePrompts` in `app.js` with your own prompts
2. Open console and run:
   ```js
   localStorage.removeItem('chatgpt_prompt_gallery');
   ```
3. Refresh — only your hardcoded prompts show

---

## Adding a New Category

If none of the existing categories (portrait, landscape, product, art, other) fit:

### In `index.html` — add the filter button:
```html
<!-- find the filters section and add your button -->
<button class="filter-btn" data-filter="mycategory">My Category</button>
```

### In `index.html` — add the dropdown option:
```html
<!-- find the <select id="promptCategory"> and add -->
<option value="mycategory">My Category</option>
```

### In `app.js` — use it in your prompt:
```js
{
  id: 'my-prompt-1',
  title: '...',
  prompt: '...',
  author: 'Me',
  category: 'mycategory',  // matches the button/data-filter value
  image: null
}
```

---

## Prompt Object Reference

| Field      | Type   | Required | Example Values                                      |
|------------|--------|----------|-----------------------------------------------------|
| `id`       | string | Yes      | `'my-prompt-1'`, `'sample-7'`                      |
| `title`    | string | Yes      | `'Neon cyberpunk portrait'`                         |
| `prompt`   | string | Yes      | `'Create a hyper-realistic...'`                     |
| `author`   | string | No       | `'YourName'` (shows "Anonymous" if empty)           |
| `category` | string | Yes      | `'portrait'` `'landscape'` `'product'` `'art'` `'other'` |
| `image`    | string | No       | `null` or `'data:image/png;base64,...'`             |

---

## Tips

- **Test prompts in ChatGPT first** — make sure they produce good results before adding
- **Keep images under 1MB** — localStorage has a ~5MB limit total
- **Use descriptive titles** — they're the first thing people see on cards
- **Unique IDs** — never reuse an ID, use something like `my-prompt-1`, `my-prompt-2`
- **Back up your `app.js`** — if you hardcode lots of prompts with images, keep a copy
