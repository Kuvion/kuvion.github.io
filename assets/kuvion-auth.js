/* Kuvion — авторизация v3 (общий для всех страниц).
   Сгенерировано scripts/build_prod.py из однофайловых черновиков download/.
   Правки вносить в черновики, затем пересобрать сборку. */
"use strict";
/* ---------- авторизация ---------- */
const validEmail=v=>/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
/* скролл-лок: пока модалка открыта, страница под ней не листается */
function lockScroll(on){document.body.style.overflow=on?'hidden':'';}

/* пилюля вкладок «течёт» от кнопки к кнопке — та же анимация, что у
   сортировки комментариев и «Новые / Популярные» в подборках */
function authGlide(btn){
  const seg=$('#authTabs');
  let g=seg.querySelector('.seg-glider');
  if(!g){
    g=document.createElement('i');
    g.className='seg-glider';g.setAttribute('aria-hidden','true');
    seg.appendChild(g);seg.classList.add('has-glider');
  }
  const b=btn||seg.querySelector('button.is-on');
  if(!b)return;
  const prev=Number(g.dataset.x)||0,x=b.offsetLeft,w=b.offsetWidth;
  /* асимметрия скругления в сторону движения — пилюля «растекается» */
  g.style.borderRadius=x>=prev?'8px 11px 11px 8px':'11px 8px 8px 11px';
  g.style.transform='translateX('+x+'px)';
  g.style.width=w+'px';
  g.dataset.x=x;
  clearTimeout(g._t);
  g._t=setTimeout(()=>{g.style.borderRadius='9px';},360);
}

function openAuth(mode){
  hidePreview();
  closeStatusMenu();
  setAuthTab(mode||'login',true);
  $('#authModal').classList.remove('hidden');
  lockScroll(true);
  /* глайдер ставим после показа модалки: пока display:none,
     у кнопок нулевая геометрия */
  setTimeout(()=>authGlide(),40);
  const first=mode==='register'?$('#regEmail'):$('#loginEmail');
  setTimeout(()=>first&&first.focus(),60);
}
const closeAuth=()=>{$('#authModal').classList.add('hidden');lockScroll(false);};

let regStep=1;
const REG_LABELS={1:'Шаг 1 из 3 · Email',2:'Шаг 2 из 3 · Пароль',3:'Шаг 3 из 3 · Никнейм'};
const REG_BTNS={1:'Далее',2:'Далее',3:'Создать аккаунт'};
function regGo(step,silent){
  regStep=step;
  $$('#regForm .reg-step').forEach(f=>f.classList.toggle('is-off',Number(f.dataset.rstep)!==step));
  $$('#regSteps .auth-step').forEach((s,i)=>{
    s.classList.toggle('is-cur',i===step-1);
    s.classList.toggle('is-done',i<step-1);
  });
  $('#regStepLabel').textContent=REG_LABELS[step];
  $('#regSubmit').textContent=REG_BTNS[step];
  $('#regBack').style.visibility=step===1?'hidden':'visible';
  const first=$(`#regForm .reg-step[data-rstep="${step}"] input`);
  if(first&&!silent)setTimeout(()=>first.focus(),40);
}
function setAuthTab(mode,silent){
  const btn=$(`#authTabs button[data-atab="${mode}"]`);
  $$('#authTabs button').forEach(b=>{
    const on=b===btn;
    b.classList.toggle('is-on',on);
    b.setAttribute('aria-selected',on?'true':'false');
  });
  const lp=$('#loginPanel'),rp=$('#registerPanel');
  lp.classList.toggle('is-off',mode!=='login');
  rp.classList.toggle('is-off',mode==='login');
  $('#authSub').textContent=mode==='login'
    ?'Войдите, чтобы синхронизировать список и прогресс'
    :'Три шага — и Kuvion запомнит ваши списки и прогресс';
  if(mode==='register')regGo(1,silent);
  if(!silent)authGlide(btn);
}

$('#authClose').addEventListener('click',closeAuth);
safeOverlayClose($('#authModal'),closeAuth);
$$('#authTabs button').forEach(b=>b.addEventListener('click',()=>setAuthTab(b.dataset.atab)));
$('#toRegister').addEventListener('click',()=>setAuthTab('register'));
$('#regBack').addEventListener('click',()=>{if(regStep>1)regGo(regStep-1);else setAuthTab('login');});

/* глаз: показать/скрыть пароль */
$$('.af-eye').forEach(btn=>btn.addEventListener('click',()=>{
  const input=document.getElementById(btn.dataset.eye);
  if(!input)return;
  const show=input.type==='password';
  input.type=show?'text':'password';
  btn.classList.toggle('is-on',show);
  btn.setAttribute('aria-label',show?'Скрыть пароль':'Показать пароль');
  input.focus({preventScroll:true});
}));

$('#loginForm').addEventListener('submit',e=>{
  e.preventDefault();
  const okE=validEmail($('#loginEmail').value);
  const okP=$('#loginPass').value.length>0;
  $('#lfEmail').classList.toggle('has-err',!okE);
  $('#lfPass').classList.toggle('has-err',!okP);
  if(okE&&okP){
    closeAuth();setUser('user');
    toast('С возвращением! (демо-вход)');
  }
});
$('#forgotBtn').addEventListener('click',()=>toast('Восстановление пароля — в разработке'));

$('#regForm').addEventListener('submit',e=>{
  e.preventDefault();
  if(regStep===1){
    const ok=validEmail($('#regEmail').value);
    $('#rfEmail').classList.toggle('has-err',!ok);
    if(ok)regGo(2);
  }else if(regStep===2){
    const p=$('#regPass').value,p2=$('#regPass2').value;
    const okP=p.length>=6,okM=p2===p;
    $('#rfPass').classList.toggle('has-err',!okP);
    $('#rfPass2').classList.toggle('has-err',!okM);
    if(okP&&okM)regGo(3);
  }else{
    const ok=$('#regName').value.trim().length>=2;
    $('#rfName').classList.toggle('has-err',!ok);
    if(ok){
      closeAuth();setUser('user');
      toast('Аккаунт создан — добро пожаловать! (демо)');
    }
  }
});
[$('#googleLogin'),$('#googleReg')].forEach(b=>b.addEventListener('click',()=>{
  closeAuth();setUser('user');
  toast('Демо: вошли через Google');
}));

