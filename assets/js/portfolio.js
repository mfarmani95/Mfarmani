// Keep external links safe and research figures available at their original size.
document.querySelectorAll('a[target="_blank"]').forEach(link => {
  link.rel = 'noopener noreferrer';
});
document.querySelectorAll('.content figure img').forEach(img => {
  if (img.closest('a')) return;
  const link = document.createElement('a');
  link.href = img.getAttribute('src');
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.setAttribute('aria-label', `Open full-size figure: ${img.alt || 'research figure'}`);
  img.before(link);
  link.append(img);
});
