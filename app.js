(function(){
  var top=document.getElementById('top'),bg=document.getElementById('burger');
  function zamknij(){top.classList.remove('open');bg.setAttribute('aria-expanded','false');bg.setAttribute('aria-label','Otwórz menu')}
  bg.addEventListener('click',function(){var o=top.classList.toggle('open');bg.setAttribute('aria-expanded',o);bg.setAttribute('aria-label',o?'Zamknij menu':'Otwórz menu')});
  document.querySelectorAll('.menu a').forEach(function(a){a.addEventListener('click',zamknij)});
  var tk=false;function sc(){if(tk)return;tk=true;requestAnimationFrame(function(){top.classList.toggle('sc',window.pageYOffset>40);tk=false})}
  addEventListener('scroll',sc,{passive:true});sc();
  var links=[].slice.call(document.querySelectorAll('.menu a[href^="#"]'));
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){links.forEach(function(l){l.classList.toggle('on',l.getAttribute('href')==='#'+e.target.id)})}})},{rootMargin:'-45% 0px -50% 0px'});
    links.forEach(function(l){var t=document.querySelector(l.getAttribute('href'));if(t)io.observe(t)});
    io.observe(document.getElementById('start'));
    var m=document.getElementById('mapa');
    new IntersectionObserver(function(es,o){if(es[0].isIntersecting){var f=document.createElement('iframe');f.src=m.dataset.src;f.title='Mapa dojazdu do gabinetu';f.loading='lazy';f.referrerPolicy='no-referrer-when-downgrade';m.appendChild(f);o.disconnect()}},{rootMargin:'300px'}).observe(m);
  }
  document.querySelectorAll('[data-tor]').forEach(function(tor){
    var down=false,sx=0,sl=0,moved=false;
    function step(){var k=tor.children[0];return k?k.getBoundingClientRect().width+parseFloat(getComputedStyle(tor).columnGap||0):300}
    tor.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse'||tor.scrollWidth<=tor.clientWidth+2)return;down=true;moved=false;sx=e.clientX;sl=tor.scrollLeft});
    addEventListener('pointermove',function(e){if(!down)return;var dx=e.clientX-sx;if(Math.abs(dx)>4){moved=true;tor.classList.add('drag')}tor.scrollLeft=sl-dx});
    addEventListener('pointerup',function(){if(!down)return;down=false;tor.classList.remove('drag');if(moved){var w=step();tor.scrollTo({left:Math.round(tor.scrollLeft/w)*w,behavior:'smooth'})}setTimeout(function(){moved=false},0)});
    tor.addEventListener('click',function(e){if(moved){e.preventDefault();e.stopPropagation();moved=false}},true);
    tor.addEventListener('dragstart',function(e){e.preventDefault()});
    var nav=document.querySelector('[data-nav="'+tor.id+'"]');
    if(nav){var bs=nav.querySelectorAll('button');
      bs.forEach(function(b){b.addEventListener('click',function(){tor.scrollBy({left:step()*(+b.dataset.k),behavior:'smooth'})})});
      function upd(){bs[0].disabled=tor.scrollLeft<4;bs[1].disabled=tor.scrollLeft+tor.clientWidth>=tor.scrollWidth-4}
      tor.addEventListener('scroll',upd,{passive:true});addEventListener('resize',upd);upd();
    }
  });
  var lb=document.getElementById('lb'),li=lb.querySelector('img'),lp=lb.querySelector('p'),its=[].slice.call(document.querySelectorAll('[data-lb]')),cur=0,last=null;
  function pokaz(i){cur=(i+its.length)%its.length;var b=its[cur];li.src=b.dataset.lb;li.alt=b.querySelector('img').alt;lp.textContent=b.parentNode.querySelector('figcaption').textContent+'  ('+(cur+1)+'/'+its.length+')'}
  function otworz(i){last=document.activeElement;pokaz(i);lb.classList.add('on');document.body.style.overflow='hidden';lb.querySelector('.x').focus()}
  function zam(){lb.classList.remove('on');document.body.style.overflow='';if(last)last.focus()}
  its.forEach(function(b,i){b.addEventListener('click',function(){otworz(i)})});
  lb.querySelector('.x').addEventListener('click',zam);
  lb.querySelector('.pv').addEventListener('click',function(){pokaz(cur-1)});
  lb.querySelector('.nx').addEventListener('click',function(){pokaz(cur+1)});
  lb.addEventListener('click',function(e){if(e.target===lb)zam()});
  var tx=0;lb.addEventListener('touchstart',function(e){tx=e.touches[0].clientX},{passive:true});
  lb.addEventListener('touchend',function(e){var d=e.changedTouches[0].clientX-tx;if(Math.abs(d)>50)pokaz(cur+(d<0?1:-1))});
  document.addEventListener('keydown',function(e){if(lb.classList.contains('on')){if(e.key==='Escape')zam();if(e.key==='ArrowRight')pokaz(cur+1);if(e.key==='ArrowLeft')pokaz(cur-1)}else if(e.key==='Escape')zamknij()});
  var r=document.getElementById('rok');if(r)r.textContent=new Date().getFullYear();
})();
