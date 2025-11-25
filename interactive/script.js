// interactive/script.js
(function(){
  const body = document.documentElement;
  const copyBtn = document.getElementById('copyLink');
  const toggleBtn = document.getElementById('toggleTheme');
  const downloadPdf = document.getElementById('downloadPdf');

  // Theme toggle (persist in localStorage)
  const themeKey = 'qr_interactive_theme';
  function setTheme(t){
    if(t === 'dark') body.setAttribute('data-theme','dark');
    else body.removeAttribute('data-theme');
    localStorage.setItem(themeKey, t);
    toggleBtn.textContent = t === 'dark' ? 'Toggle Light' : 'Toggle Dark';
  }
  const saved = localStorage.getItem(themeKey) || 'light';
  setTheme(saved);
  toggleBtn.addEventListener('click', ()=> setTheme(document.documentElement.getAttribute('data-theme') ? 'light' : 'dark'));

  // Copy page URL
  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      copyBtn.textContent = 'Link Copied ✓';
      setTimeout(()=> copyBtn.textContent = 'Copy Page Link', 1600);
    } catch (e) {
      alert('Copy failed — please copy manually');
    }
  });

  // Lightbox
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightbox-img');
  const lbCaption = document.querySelector('.lb-caption');
  const lbClose = document.querySelector('.lb-close');

  document.querySelectorAll('.thumb img').forEach(img=>{
    img.addEventListener('click', ()=>{
      const src = img.dataset.full || img.src;
      lbImg.src = src;
      lbCaption.textContent = img.alt || img.closest('figure').querySelector('figcaption').textContent;
      lightbox.style.display = 'flex';
      lightbox.setAttribute('aria-hidden','false');
    });
  });

  function closeLightbox(){ lightbox.style.display='none'; lightbox.setAttribute('aria-hidden','true'); lbImg.src=''; }
  lbClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e)=> { if(e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e)=> { if(e.key === 'Escape') closeLightbox(); });

  // If PDF not found, disable download gracefully (optional)
  fetch(downloadPdf.href, {method:'HEAD'}).then(r=>{
    if(!r.ok){ downloadPdf.classList.add('outline'); downloadPdf.textContent = 'PDF not found'; downloadPdf.removeAttribute('href'); }
  }).catch(()=>{ /* ignore network errors */ });

})();
