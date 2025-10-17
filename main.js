(function initTheme(){
      const saved = localStorage.getItem('theme');
      if(saved){ document.body.setAttribute('data-theme', saved); }
      else { document.body.setAttribute('data-theme','dark'); }
    })();

    const themeBtn = document.getElementById('themeToggle');
    themeBtn?.addEventListener('click', ()=>{
      const current = document.body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      document.body.setAttribute('data-theme', current);
      localStorage.setItem('theme', current);
      themeBtn.textContent = current === 'light' ? '🌞 Theme' : '🌙 Theme';
    });

    // Mobile menu toggle
    const menuBtn = document.querySelector('.menu-toggle');
    const links = document.getElementById('navLinks');
    menuBtn?.addEventListener('click', ()=>{
      const open = links.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', open ? 'true':'false');
    });
    // Close menu on link click (mobile)
    links?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
      links.classList.remove('open');
      menuBtn?.setAttribute('aria-expanded','false');
    }));

    // Contact form (no backend) — opens prefilled email
    document.getElementById('contactForm')?.addEventListener('submit', (e)=>{
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      const mailto = `mailto:hello@example.com?subject=Portfolio%20Contact%20from%20${encodeURIComponent(name)}&body=${encodeURIComponent(message + '\n\nFrom: ' + name + ' <' + email + '>')}`;
      window.location.href = mailto;
    });

    // Active link highlighting on scroll
    const sections = ['skills','education','certifications','projects','contact'];
    const observer = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        const id = entry.target.getAttribute('id');
        const link = document.querySelector(`.nav-links a[href="#${id}"]`);
        if(link){
          if(entry.isIntersecting){
            document.querySelectorAll('.nav-links a').forEach(a=>a.classList.remove('active'));
            link.classList.add('active');
          }
        }
      });
    },{threshold:.35});
    sections.forEach(id=>{
      const el = document.getElementById(id);
      if(el) observer.observe(el);
    });

    // Year
    document.getElementById('year').textContent = new Date().getFullYear();