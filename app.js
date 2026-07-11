const STORAGE_KEY = 'chatgpt_prompt_gallery';

const samplePrompts = [
  {
    id: 'sample-1',
    title: 'Cinematic portrait in neon-lit cyberpunk city',
    prompt: 'Create a hyper-realistic cinematic portrait of a young woman standing in a neon-lit cyberpunk alleyway at night. Rain reflections on wet ground, volumetric fog, teal and magenta color grading, shallow depth of field, 85mm lens look, detailed skin texture, natural lighting from neon signs.',
    author: 'PromptCraft',
    category: 'portrait',
    image: null
  },
  {
    id: 'sample-2',
    title: 'Minimalist Japanese zen garden at golden hour',
    prompt: 'Generate a serene minimalist Japanese zen garden during golden hour. Raked sand patterns, three carefully placed moss-covered rocks, a single cherry blossom tree with petals falling gently, warm golden light casting long shadows, soft bokeh background, peaceful atmosphere, ultra high resolution.',
    author: 'AIVisionary',
    category: 'landscape',
    image: null
  },
  {
    id: 'sample-3',
    title: 'Premium perfume bottle product shot',
    prompt: 'Design a luxury perfume product photography shot. Elegant glass bottle with gold accents on a reflective black surface, dramatic side lighting creating sharp highlights, water droplets on the bottle, dark moody background with subtle purple gradient, commercial advertising quality, 4K resolution.',
    author: 'StudioAI',
    category: 'product',
    image: null
  },
  {
    id: 'sample-4',
    title: 'Abstract fluid art with vibrant colors',
    prompt: 'Create a stunning abstract fluid art piece with vibrant swirling colors. Deep purple, electric blue, hot pink, and gold flowing together in organic patterns, marble-like texture, high contrast, suitable for large format printing, museum quality digital art.',
    author: 'ArtPrompter',
    category: 'art',
    image: null
  },
  {
    id: 'sample-5',
    title: 'Futuristic floating city concept art',
    prompt: 'Generate concept art of a futuristic floating city above clouds at sunset. Massive interconnected platforms with sleek architecture, holographic advertisements, flying vehicles between towers, dramatic orange and purple sky, epic scale, cinematic composition, matte painting style.',
    author: 'Dreamscape',
    category: 'landscape',
    image: null
  },
  {
    id: 'sample-6',
    title: 'Cozy coffee shop interior illustration',
    prompt: 'Illustrate a cozy coffee shop interior on a rainy afternoon. Warm ambient lighting, wooden furniture, bookshelves filled with books, rain streaking down large windows, a steaming cup of latte art on a rustic table, hygge aesthetic, soft warm color palette, detailed interior design.',
    author: 'CozyCreator',
    category: 'other',
    image: null
  }
];

let prompts = [];
let currentFilter = 'all';
let currentDetailId = null;

function loadPrompts() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    prompts = JSON.parse(stored);
  } else {
    prompts = [...samplePrompts];
    savePrompts();
  }
}

function savePrompts() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prompts));
}

function generateId() {
  return 'prompt_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function renderGallery() {
  const gallery = document.getElementById('gallery');
  const emptyState = document.getElementById('emptyState');
  const filtered = currentFilter === 'all'
    ? prompts
    : prompts.filter(p => p.category === currentFilter);

  if (filtered.length === 0) {
    gallery.innerHTML = '';
    emptyState.style.display = 'block';
    return;
  }

  emptyState.style.display = 'none';
  gallery.innerHTML = filtered.map(p => {
    const imageHtml = p.image
      ? `<img class="card-image" src="${p.image}" alt="${p.title}">`
      : `<div class="card-placeholder">No Image</div>`;
    return `
      <div class="prompt-card" data-id="${p.id}">
        ${imageHtml}
        <div class="card-body">
          <div class="card-title">${escapeHtml(p.title)}</div>
          <div class="card-prompt-preview">${escapeHtml(p.prompt)}</div>
          <div class="card-meta">
            <span class="card-author">${escapeHtml(p.author || 'Anonymous')}</span>
            <span class="card-category">${p.category}</span>
          </div>
        </div>
      </div>
    `;
  }).join('');

  gallery.querySelectorAll('.prompt-card').forEach(card => {
    card.addEventListener('click', () => openDetail(card.dataset.id));
  });
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function openModal() {
  document.getElementById('modal').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal').style.display = 'none';
  document.body.style.overflow = '';
  document.getElementById('promptForm').reset();
  document.getElementById('imagePreview').style.display = 'none';
  document.getElementById('dropZone').style.display = 'flex';
}

function openDetail(id) {
  const prompt = prompts.find(p => p.id === id);
  if (!prompt) return;
  currentDetailId = id;

  document.getElementById('detailTitle').textContent = prompt.title;
  document.getElementById('detailPrompt').textContent = prompt.prompt;
  document.getElementById('detailAuthor').textContent = 'By ' + (prompt.author || 'Anonymous');
  document.getElementById('detailCategory').textContent = prompt.category;
  document.getElementById('detailCategory').style.display = prompt.category ? 'inline-block' : 'none';

  const detailImage = document.getElementById('detailImage');
  if (prompt.image) {
    detailImage.src = prompt.image;
    detailImage.style.display = 'block';
  } else {
    detailImage.style.display = 'none';
  }

  document.getElementById('detailModal').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeDetail() {
  document.getElementById('detailModal').style.display = 'none';
  document.body.style.overflow = '';
  currentDetailId = null;
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.getElementById('copyDetailPrompt');
    btn.textContent = 'Copied!';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.textContent = 'Copy Prompt';
      btn.classList.remove('copied');
    }, 2000);
  });
}

function deletePrompt(id) {
  if (!confirm('Are you sure you want to delete this prompt?')) return;
  prompts = prompts.filter(p => p.id !== id);
  savePrompts();
  closeDetail();
  renderGallery();
}

function handleImageUpload(file) {
  if (!file || !file.type.startsWith('image/')) return;

  if (file.size > 1024 * 1024) {
    alert('Image must be under 1MB. Please use a smaller image.');
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    const dataUrl = e.target.result;
    document.getElementById('previewImg').src = dataUrl;
    document.getElementById('imagePreview').style.display = 'block';
    document.getElementById('dropZone').style.display = 'none';
  };
  reader.readAsDataURL(file);
}

document.addEventListener('DOMContentLoaded', function() {
  loadPrompts();
  renderGallery();

  document.getElementById('addNewBtn').addEventListener('click', openModal);
  document.getElementById('closeModal').addEventListener('click', closeModal);
  document.getElementById('closeDetail').addEventListener('click', closeDetail);

  document.getElementById('modal').addEventListener('click', function(e) {
    if (e.target === this) closeModal();
  });

  document.getElementById('detailModal').addEventListener('click', function(e) {
    if (e.target === this) closeDetail();
  });

  const dropZone = document.getElementById('dropZone');
  const fileInput = document.getElementById('promptImage');

  dropZone.addEventListener('click', () => fileInput.click());

  dropZone.addEventListener('dragover', function(e) {
    e.preventDefault();
    this.classList.add('drag-over');
  });

  dropZone.addEventListener('dragleave', function() {
    this.classList.remove('drag-over');
  });

  dropZone.addEventListener('drop', function(e) {
    e.preventDefault();
    this.classList.remove('drag-over');
    if (e.dataTransfer.files.length) {
      handleImageUpload(e.dataTransfer.files[0]);
    }
  });

  fileInput.addEventListener('change', function() {
    if (this.files.length) handleImageUpload(this.files[0]);
  });

  document.getElementById('removeImage').addEventListener('click', function() {
    document.getElementById('imagePreview').style.display = 'none';
    document.getElementById('dropZone').style.display = 'flex';
    document.getElementById('promptImage').value = '';
  });

  document.getElementById('promptForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const title = document.getElementById('promptTitle').value.trim();
    const promptText = document.getElementById('promptText').value.trim();
    const author = document.getElementById('promptAuthor').value.trim();
    const category = document.getElementById('promptCategory').value;
    const previewImg = document.getElementById('previewImg');

    const newPrompt = {
      id: generateId(),
      title,
      prompt: promptText,
      author: author || 'Anonymous',
      category,
      image: previewImg.src || null
    };

    prompts.unshift(newPrompt);
    savePrompts();
    closeModal();
    renderGallery();
  });

  document.getElementById('copyDetailPrompt').addEventListener('click', function() {
    if (currentDetailId) {
      const prompt = prompts.find(p => p.id === currentDetailId);
      if (prompt) copyToClipboard(prompt.prompt);
    }
  });

  document.getElementById('deletePrompt').addEventListener('click', function() {
    if (currentDetailId) deletePrompt(currentDetailId);
  });

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      currentFilter = this.dataset.filter;
      renderGallery();
    });
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      if (document.getElementById('detailModal').style.display === 'flex') closeDetail();
      else if (document.getElementById('modal').style.display === 'flex') closeModal();
    }
  });
});
