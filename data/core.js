/* ===== KVUION-DATA · ядро слоя данных v1 =====================================
   ЕДИНЫЙ ИСТОЧНИК ДЕМО-ДАННЫХ ВСЕГО САЙТА — scripts/kuvion-data/db.js
   (в продакшене — /assets/kuvion-data.js). Этот блок одинаков на всех
   страницах и генерируется автоматически: править вручную нельзя.
   Обновление данных: правка db.js → python3 scripts/kuvion-data/patch.py
   → пересборка продакшена (scripts/build_prod.py).

   КАК УСТРОЕН СЛОЙ
   1. Демо-режим (сейчас): все тестовые данные лежат в базе db.js,
      сгруппированы по страницам (пространства: home, catalog, title,
      manga, mylist, collections, collnew, schedule, search, notifs,
      person, profile, settings, plus, colls). Страница читает своё
      пространство синхронно: KuvionData.page('home').
   2. Боевой режим (когда появится бэкенд): в объекте api ниже меняются
      тела методов — снимок базы заменяется на запросы, например:
        home(){ return fetch('/api/home').then(r=>r.json()) }
      КОНТРАКТ ответа каждого метода = структура соответствующего
      пространства в db.js (поля, типы, вложенность — см. db.js).
   3. Точка подключения на страницах помечена комментарием
      «данные страницы — из единого слоя kuvion-data»: синхронное чтение
      KuvionData.page(...) заменяется на
      KuvionData.api.<страница>().then(данные => { ...инициализация... })
      и страница рисуется из ответа. Сама база db.js после этого не
      нужна — файл kuvion-data.js становится тонким клиентом API.

   ЧТО УЖЕ В БАЗЕ, А ЧТО ПРИБЫВАЕТ ПОЗЖЕ
   В базe: вселенные тайтлов (главная, каталог, манга, персона, тайтл),
   статусы, hero/ряды главной, персоны, данные страницы тайтла, общие
   демо-подборки. Остаются в страницах до следующих раундов: поисковый
   индекс (едет вместе с движком поиска в kuvion-search.js), списки
   «Моего списка», сетка расписания, источники плеера, лента
   уведомлений, данные профиля, тарифы Kuvion+, демо-комментарии —
   формат у всех тот же, перенос в базу добавляет пространство в db.js
   и ни одной правки в остальных страницах. */
window.KuvionData=(function(){
"use strict";
const api={
  home:()=>resolve('home'),
  catalog:()=>resolve('catalog'),
  title:()=>resolve('title'),
  manga:()=>resolve('manga'),
  mylist:()=>resolve('mylist'),
  collections:()=>resolve('collections'),
  collnew:()=>resolve('collnew'),
  schedule:()=>resolve('schedule'),
  search:()=>resolve('search'),
  notifs:()=>resolve('notifs'),
  person:()=>resolve('person'),
  profile:()=>resolve('profile'),
  settings:()=>resolve('settings'),
  plus:()=>resolve('plus'),
  colls:()=>resolve('colls')
};
function resolve(key){
  return new Promise((ok,fail)=>{try{ok(page(key))}catch(e){fail(e)}});
}
/* Снимок пространства: страницы получают копию и не могут испортить базу,
   а общие объекты (tp === titles.aot, тайтлы в нескольких рядах)
   сохраняют идентичность ссылок — как в исходных данных. */
function deepClone(x,memo){
  if(Array.isArray(x)){
    if(memo.has(x))return memo.get(x);
    const a=[];memo.set(x,a);
    for(let i=0;i<x.length;i++)a[i]=deepClone(x[i],memo);
    return a;
  }
  if(x&&typeof x==='object'){
    if(memo.has(x))return memo.get(x);
    const o={};memo.set(x,o);
    for(const k of Object.keys(x))o[k]=deepClone(x[k],memo);
    return o;
  }
  return x;
}
function page(key){
  const db=(window.KuvionData&&window.KuvionData._db)||{};
  if(!(key in db))throw new Error('KuvionData: в базе нет пространства «'+key+'»');
  return deepClone(db[key],new Map());
}
return {api,page,version:'1.0 · демо-база',_db:{}};
})();
