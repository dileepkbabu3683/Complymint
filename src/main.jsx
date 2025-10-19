// main.js - mobile nav toggle and copy-to-clipboard
document.addEventListener('DOMContentLoaded', function () {
  // Set central contact values (optional if already in HTML)
  const topEmail = document.getElementById('topEmail');
  const topPhone = document.getElementById('topPhone');
  if (topEmail) topEmail.textContent = 'info@complymint.eu';
  if (topPhone) topPhone.textContent = '353 - 894533581';

  // Copy helper
  window.copyText = function(selector) {
    const el = document.querySelector(selector);
    if (!el) return alert('Nothing to copy');
    const txt = el.textContent.trim();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(txt)
        .then(() => alert('Copied: ' + txt))
        .catch(() => fallbackCopy(txt));
    } else {
      fallbackCopy(txt);
    }

    function fallbackCopy(text) {
      const area = document.createElement('textarea');
      area.value = text;
      document.body.appendChild(area);
      area.select();
      try {
        document.execCommand('copy');
        alert('Copied: ' + text);
      } catch (e) {
        alert('Copy failed — please copy manually: ' + text);
      } finally {
        document.body.removeChild(area);
      }
    }
  };

  // Mobile nav toggle
  const btn = document.getElementById('hambtn');
  const mobile = document.getElementById('mobileNav');
  if (btn && mobile) {
    btn.addEventListener('click', function() {
      const showing = mobile.classList.toggle('show');
      mobile.setAttribute('aria-hidden', !showing);
      btn.setAttribute('aria-expanded', showing);
    });

    // close when clicking outside
    document.addEventListener('click', function(e) {
      if (!mobile.classList.contains('show')) return;
      if (mobile.contains(e.target) || btn.contains(e.target)) return;
      mobile.classList.remove('show');
      mobile.setAttribute('aria-hidden', 'true');
      btn.setAttribute('aria-expanded', 'false');
    });

    // Close mobile nav when link clicked
    mobile.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      mobile.classList.remove('show');
      mobile.setAttribute('aria-hidden', 'true');
      btn.setAttribute('aria-expanded', 'false');
    }));
  }
});
