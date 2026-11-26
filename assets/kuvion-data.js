/* Kuvion — слой данных: демо-база всего сайта + API-адаптер KuvionData.
   ЕДИНЫЙ ИСТОЧНИК ДЕМО-ДАННЫХ: scripts/kuvion-data/db.js (сборка —
   assemble_db.py -> emit.js -> patch.py -> build_prod.py).
   Боевой бэкенд: контракты и миграция — в шапке ядра KuvionData ниже.
   Править данные здесь нельзя — только через scripts/kuvion-data/. */
"use strict";

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


/* ===== пространство: home ===== */
KuvionData._db.home=(function(){
"use strict";
const _v0={
  id:"interstellar",
  title:"Интерстеллар",
  year:2014,
  type:"Фильм",
  genres:["Фантастика","Драма"],
  rating:8.6,
  poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/85bb955e60e9.jpg",
  wide:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/1290a963615d.jpg",
  wide2:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/ec06a3bbfb4e.jpg",
  wide3:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/2bdc37cad2cd.jpg",
  status:"watched",
  desc:"Команда исследователей отправляется через червоточину в космосе, чтобы найти новый дом для человечества."
};
const _v1={
  id:"dune2",
  title:"Дюна: Часть вторая",
  year:2024,
  type:"Фильм",
  genres:["Фантастика","Приключения"],
  rating:8.5,
  poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/d4500e7dac80.jpg",
  wide:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/12422b422cee.jpg",
  wide2:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/c7f684d95f5b.jpeg",
  wide3:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/4cb1149f3eaf.jpg",
  wide4:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/86e0bf71e647.jpg",
  status:"planned",
  isNew:true,
  desc:"Пол Атрейдес объединяется с Чани и фрименами в войне против дома Харконненов, пытаясь предотвратить ужасное будущее, которое видит только он."
};
const _v2={
  id:"br2049",
  title:"Бегущий по лезвию 2049",
  year:2017,
  type:"Фильм",
  genres:["Фантастика","Нуар"],
  rating:8,
  poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/71b996fefac1.jpg",
  wide:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/9cc1a8a277d3.png",
  wide2:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/de002094f2aa.jpg",
  wide3:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/1662efa80442.jpg",
  desc:"Служащий Лос-Анджелеса К, новый блейд-раннер, раскрывает тайну, спрятанную десятилетиями, способную погрузить мир в хаос."
};
const _v3={
  id:"oppenheimer",
  title:"Оппенгеймер",
  year:2023,
  type:"Фильм",
  genres:["Драма","История"],
  rating:8.3,
  poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/a1fd704339d9.jpg",
  wide:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/9e0a5f93f220.jpg",
  wide2:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/50ec7314ae35.jpg",
  wide3:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/00a2a41bff28.jpg",
  isNew:true,
  desc:"История жизни физика-теоретика Роберта Оппенгеймера, возглавившего разработку атомной бомбы."
};
const _v4={
  id:"aot",
  title:"Атака титанов",
  year:2013,
  type:"Аниме",
  genres:["Экшен","Драма"],
  rating:9,
  poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/9a35191d1d09.jpg",
  wide:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/7e53c74c6dda.jpg",
  wide2:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/5b0f4111e774.jpg",
  status:"watching",
  desc:"Человечество сражается за выживание за огромными стенами, защищающими от гигантских пожирателей людей — титанов."
};
const _v5={
  id:"aotFinal",
  title:"Атака титанов: Финальный сезон",
  year:2023,
  type:"Аниме",
  genres:["Экшен","Драма"],
  rating:9.1,
  poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/bbc4ed32da5c.jpg",
  wide:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/be104465fb7f.jpg",
  isNew:true,
  desc:"Последняя глава истории Эрена Йегера и битвы за судьбу человечества за стенами."
};
const _v6={
  id:"jjk",
  title:"Магическая битва",
  year:2020,
  type:"Аниме",
  genres:["Экшен","Сёнэн"],
  rating:8.6,
  poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/235414089ff8.jpg",
  wide:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/ba2f5e6b7ab4.jpg",
  wide2:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/57827ceaf21f.jpg",
  wide3:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/5ae8fa438c3f.jpg",
  desc:"Школьник Юдзи Итадори проглатывает проклятый палец и становится сосудом для древнего проклятия."
};
const _v7={
  id:"onepiece",
  title:"Ван Пис",
  year:1999,
  type:"Аниме",
  genres:["Приключения","Сёнэн"],
  rating:9,
  poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/136bb118e1b5.jpg",
  wide:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/556492005b92.jpg",
  wide2:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/9019d26a49cf.jpeg",
  wide3:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/e35442129e92.jpg",
  desc:"Мальчишка из резинки Люффи собирает команду пиратов и отправляется за легендарным сокровищем — Ван Пис."
};
const _v8={
  id:"onepieceRed",
  title:"Ван Пис: Фильм Ред",
  year:2022,
  type:"Аниме",
  genres:["Приключения","Экшен"],
  rating:8.5,
  poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/6e4fc8a0fbe9.png",
  desc:"Люффи и его команда отправляются на музыкальный фестиваль, где встречают мировую звезду Уту."
};
const _v9={
  id:"tlou",
  title:"Последние из нас",
  year:2023,
  type:"Сериал",
  genres:["Драма","Хоррор"],
  rating:8.7,
  poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/078136c3e9d7.jpg",
  wide:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/4cc4e52e05d7.jpeg",
  wide2:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/20165b080b81.jpg",
  isNew:true,
  desc:"Через двадцать лет после пандемии контрабандист Джоэл получает задание вывести из города 14-летнюю Элли."
};
const _v10={
  id:"spiderverse",
  title:"Человек-паук: Паутина вселенных",
  year:2023,
  type:"Мультфильм",
  genres:["Экшен","Приключения"],
  rating:8.6,
  poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/401cfa55ea89.jpg",
  wide:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/5d05fbe9bf0c.jpeg",
  wide2:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/d72400ee7d85.jpg",
  wide3:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/62b220e19348.jpg",
  isNew:true,
  desc:"Майлз Моралес отправляется в путешествие по мультивселенной, где встречает команду людей-пауков."
};
const _v11={
  id:"arcane",
  title:"Аркейн",
  year:2021,
  type:"Сериал",
  genres:["Фэнтези","Драма"],
  rating:9,
  poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/2023ce392d04.jpg",
  wide:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/70d04bc79f91.jpg",
  wide2:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/d318f9d998f8.jpg",
  wide3:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/cbeb98a2df01.jpg",
  desc:"История двух сестёр, Вай и Джинкс, на фоне конфликта утопического Пилтовера и подземного Зауна."
};
const _v12={
  id:"arcane2",
  title:"Аркейн: Сезон 2",
  year:2024,
  type:"Сериал",
  genres:["Фэнтези","Драма"],
  rating:9.2,
  poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/5379c8a0c07a.jpg",
  wide:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/81d0d4679ff5.jpg",
  isNew:true,
  desc:"Вай и Джинкс оказываются по разные стороны баррикад, когда Пилтовер и Заун стоят на грани войны."
};
return {
  status:{watching:"Смотрю",planned:"Буду смотреть",watched:"Просмотрено",onhold:"Отложено",dropped:"Брошено"},
  titles:{
    interstellar:_v0,
    dune2:_v1,
    br2049:_v2,
    oppenheimer:_v3,
    aot:_v4,
    aotFinal:_v5,
    jjk:_v6,
    onepiece:_v7,
    onepieceRed:_v8,
    tlou:_v9,
    spiderverse:_v10,
    arcane:_v11,
    arcane2:_v12
  },
  hero:[
    _v1,
    _v2,
    _v0,
    _v4,
    _v9
  ],
  cont:[
    {t:_v4,sub:"4 сезон · Серия 24",pct:78,left:"Осталось 9 мин"},
    {t:_v6,sub:"2 сезон · Серия 18",pct:45,left:"Осталось 22 мин"},
    {t:_v1,sub:"Фильм · 2024",pct:40,left:"Осталось 1 ч 39 мин",img:"wide2"},
    {t:_v9,sub:"1 сезон · Серия 5",pct:12,left:"Осталось 48 мин"},
    {t:_v0,sub:"Фильм · 2014",pct:78,left:"Осталось 31 мин",img:"wide2"},
    {t:_v2,sub:"Фильм · 2017",pct:4,left:"Только начали",img:"wide2"}
  ],
  rows:{
    trend:[
      _v0,
      _v1,
      _v3,
      _v9,
      _v10,
      _v11,
      _v4,
      _v6,
      _v7
    ],
    anime:[
      _v4,
      _v5,
      _v6,
      _v7,
      _v8
    ],
    new:[
      _v1,
      _v12,
      _v10,
      _v3,
      _v9,
      _v5
    ]
  }
};
})();

/* ===== пространство: catalog ===== */
KuvionData._db.catalog=(function(){
"use strict";
return {
  status:{watching:"Смотрю",planned:"Буду смотреть",watched:"Просмотрено",onhold:"Отложено",dropped:"Брошено"},
  titles:{
    interstellar:{
      id:"interstellar",
      title:"Интерстеллар",
      year:2014,
      type:"Фильм",
      genres:["Фантастика","Драма","Приключения"],
      rating:8.6,
      poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/85bb955e60e9.jpg",
      country:["США","Великобритания","Канада"],
      wide:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/1290a963615d.jpg",
      wide2:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/ec06a3bbfb4e.jpg",
      wide3:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/2bdc37cad2cd.jpg",
      status:"watched",
      pop:95,
      added:"2025-08-14",
      desc:"Команда исследователей отправляется через червоточину в космосе, чтобы найти новый дом для человечества."
    },
    dune2:{
      id:"dune2",
      title:"Дюна: Часть вторая",
      year:2024,
      type:"Фильм",
      genres:["Фантастика","Приключения","Драма"],
      rating:8.5,
      poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/d4500e7dac80.jpg",
      country:["США"],
      wide:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/12422b422cee.jpg",
      wide2:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/c7f684d95f5b.jpeg",
      wide3:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/4cb1149f3eaf.jpg",
      wide4:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/86e0bf71e647.jpg",
      status:"planned",
      isNew:true,
      pop:87,
      added:"2026-09-30",
      desc:"Пол Атрейдес объединяется с Чани и фрименами в войне против дома Харконненов, пытаясь предотвратить ужасное будущее, которое видит только он."
    },
    br2049:{
      id:"br2049",
      title:"Бегущий по лезвию 2049",
      year:2017,
      type:"Фильм",
      genres:["Фантастика","Нуар","Детектив"],
      rating:8,
      poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/71b996fefac1.jpg",
      country:["США","Великобритания"],
      wide:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/9cc1a8a277d3.png",
      wide2:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/de002094f2aa.jpg",
      wide3:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/1662efa80442.jpg",
      pop:71,
      added:"2025-11-02",
      desc:"Служащий Лос-Анджелеса К, новый блейд-раннер, раскрывает тайну, спрятанную десятилетиями, способную погрузить мир в хаос."
    },
    oppenheimer:{
      id:"oppenheimer",
      title:"Оппенгеймер",
      year:2023,
      type:"Фильм",
      genres:["Драма","История","Военное"],
      rating:8.3,
      poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/a1fd704339d9.jpg",
      country:["США","Великобритания"],
      wide:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/9e0a5f93f220.jpg",
      isNew:true,
      pop:78,
      added:"2026-08-21",
      desc:"История жизни физика-теоретика Роберта Оппенгеймера, возглавившего разработку атомной бомбы."
    },
    aot:{
      id:"aot",
      title:"Атака титанов",
      year:2013,
      type:"Аниме",
      genres:["Экшен","Драма","Трагедия"],
      rating:9,
      poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/9a35191d1d09.jpg",
      country:["Япония"],
      wide:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/7e53c74c6dda.jpg",
      wide2:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/5b0f4111e774.jpg",
      status:"watching",
      pop:96,
      added:"2025-06-10",
      desc:"Человечество сражается за выживание за огромными стенами, защищающими от гигантских пожирателей людей — титанов."
    },
    aotFinal:{
      id:"aotFinal",
      title:"Атака титанов: Финальный сезон",
      year:2023,
      type:"Аниме",
      genres:["Экшен","Драма","Военное"],
      rating:9.1,
      poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/bbc4ed32da5c.jpg",
      country:["Япония"],
      wide:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/be104465fb7f.jpg",
      isNew:true,
      pop:55,
      added:"2026-07-15",
      desc:"Последняя глава истории Эрена Йегера и битвы за судьбу человечества за стенами."
    },
    jjk:{
      id:"jjk",
      title:"Магическая битва",
      year:2020,
      type:"Аниме",
      genres:["Экшен","Сёнэн","Сверхъестественное"],
      rating:8.6,
      poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/235414089ff8.jpg",
      country:["Япония"],
      wide:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/ba2f5e6b7ab4.jpg",
      ongoing:true,
      pop:88,
      added:"2025-09-18",
      desc:"Школьник Юдзи Итадори проглатывает проклятый палец и становится сосудом для древнего проклятия."
    },
    onepiece:{
      id:"onepiece",
      title:"Ван Пис",
      year:1999,
      type:"Аниме",
      genres:["Приключения","Сёнэн","Комедия"],
      rating:9,
      poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/136bb118e1b5.jpg",
      country:["Япония"],
      wide:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/556492005b92.jpg",
      ongoing:true,
      pop:99,
      added:"2025-05-02",
      desc:"Мальчишка из резинки Люффи собирает команду пиратов и отправляется за легендарным сокровищем — Ван Пис."
    },
    onepieceRed:{
      id:"onepieceRed",
      title:"Ван Пис: Фильм Ред",
      year:2022,
      type:"Аниме",
      genres:["Приключения","Экшен","Музыка"],
      rating:8.5,
      poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/6e4fc8a0fbe9.png",
      country:["Япония"],
      pop:62,
      added:"2025-10-05",
      desc:"Люффи и его команда отправляются на музыкальный фестиваль, где встречают мировую звезду Уту."
    },
    tlou:{
      id:"tlou",
      title:"Последние из нас",
      year:2023,
      type:"Сериал",
      genres:["Драма","Хоррор","Триллер"],
      rating:8.7,
      poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/078136c3e9d7.jpg",
      country:["США","Канада"],
      wide:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/4cc4e52e05d7.jpeg",
      wide2:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/20165b080b81.jpg",
      isNew:true,
      ongoing:true,
      pop:86,
      added:"2026-08-30",
      desc:"Через двадцать лет после пандемии контрабандист Джоэл получает задание вывести из города 14-летнюю Элли."
    },
    spiderverse:{
      id:"spiderverse",
      title:"Человек-паук: Паутина вселенных",
      year:2023,
      type:"Мультфильм",
      genres:["Экшен","Приключения","Комедия"],
      rating:8.6,
      poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/401cfa55ea89.jpg",
      country:["США"],
      wide:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/5d05fbe9bf0c.jpeg",
      isNew:true,
      pop:75,
      added:"2026-06-12",
      desc:"Майлз Моралес отправляется в путешествие по мультивселенной, где встречает команду людей-пауков."
    },
    arcane:{
      id:"arcane",
      title:"Аркейн",
      year:2021,
      type:"Сериал",
      genres:["Фэнтези","Драма","Трагедия"],
      rating:9,
      poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/2023ce392d04.jpg",
      country:["США","Франция"],
      wide:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/70d04bc79f91.jpg",
      pop:68,
      added:"2025-12-01",
      desc:"История двух сестёр, Вай и Джинкс, на фоне конфликта утопического Пилтовера и подземного Зауна."
    },
    arcane2:{
      id:"arcane2",
      title:"Аркейн: Сезон 2",
      year:2024,
      type:"Сериал",
      genres:["Фэнтези","Драма","Экшен"],
      rating:9.2,
      poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/5379c8a0c07a.jpg",
      country:["США","Франция"],
      wide:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/81d0d4679ff5.jpg",
      isNew:true,
      pop:76,
      added:"2026-05-20",
      desc:"Вай и Джинкс оказываются по разные стороны баррикад, когда Пилтовер и Заун стоят на грани войны."
    },
    fmab:{
      id:"fmab",
      title:"Стальной алхимик: Братство",
      year:2009,
      type:"Аниме",
      genres:["Экшен","Фэнтези","Драма","Приключения"],
      rating:9.1,
      poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/0b4034f752c6.jpg",
      country:["Япония"],
      wide:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/463c0adcff57.jpg",
      status:"watched",
      pop:83,
      added:"2025-07-08",
      desc:"Братья Эдвард и Альфонс Элрики ищут философский камень, чтобы вернуть телам первоначальный вид после провалившегося алхимического ритуала."
    },
    demonslayer:{
      id:"demonslayer",
      title:"Клинок, рассекающий демонов",
      year:2019,
      type:"Аниме",
      genres:["Экшен","Сёнэн","Сверхъестественное"],
      rating:8.5,
      poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/debab583d0ba.jpg",
      country:["Япония"],
      wide:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/4e79cf981e25.jpg",
      ongoing:true,
      pop:73,
      added:"2025-09-12",
      desc:"Тандзиро Камадо становится охотником на демонов, чтобы вернуть сестре Нэдзуко, обращённой в демона, человеческий облик."
    },
    yourname:{
      id:"yourname",
      title:"Твоё имя",
      year:2016,
      type:"Аниме",
      genres:["Романтика","Драма","Мистика"],
      rating:8.8,
      poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/0b6a6b5e4164.jpeg",
      country:["Япония"],
      wide:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/609242e7fd78.jpg",
      pop:81,
      added:"2025-10-18",
      desc:"Токи и Мицуха — подростки из разных городов — неожиданно начинают меняться телами и пытаются найти друг друга, пока не стало поздно."
    },
    spirited:{
      id:"spirited",
      title:"Унесённые призраками",
      year:2001,
      type:"Аниме",
      genres:["Фэнтези","Приключения","Сверхъестественное"],
      rating:8.6,
      poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/1bea669ab3af.jpg",
      country:["Япония"],
      pop:80,
      added:"2025-04-15",
      desc:"Девочка Тихиро попадает в мир духов, где родителей превращают в свиней, а вернуть их можно, только работая в купальне богов."
    },
    fireflies:{
      id:"fireflies",
      title:"Могила светлячков",
      year:1988,
      type:"Аниме",
      genres:["Драма","Трагедия","Военное"],
      rating:8.5,
      poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/4ce765f0c314.jpg",
      country:["Япония"],
      pop:57,
      added:"2025-03-20",
      desc:"Сэйта и его младшая сестра Сусэку пытаются выжить в Японии последних месяцев Второй мировой после бомбёжки Кобэ."
    },
    howl:{
      id:"howl",
      title:"Ходячий замок",
      year:2004,
      type:"Аниме",
      genres:["Фэнтези","Романтика","Приключения"],
      rating:8.4,
      poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/fab348fd8713.jpg",
      country:["Япония"],
      pop:65,
      added:"2025-05-27",
      desc:"Заколдованная ведьмой-шляпницей Софи отправляется в странствующий замок чародея Хаула, чтобы снять проклятие."
    },
    mononoke:{
      id:"mononoke",
      title:"Принцесса Мононоке",
      year:1997,
      type:"Аниме",
      genres:["Фэнтези","Приключения","Сверхъестественное"],
      rating:8.6,
      poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/3ff66b83d9c0.jpg",
      country:["Япония"],
      pop:64,
      added:"2025-04-22",
      desc:"Принц Аситака вмешивается в войну между людьми Железного города и духами леса, ища лекарство от собственного проклятия."
    },
    deathnote:{
      id:"deathnote",
      title:"Тетрадь смерти",
      year:2006,
      type:"Аниме",
      genres:["Триллер","Драма","Психологическое","Детектив"],
      rating:8.6,
      poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/dbae99da2de3.jpeg",
      country:["Япония"],
      pop:74,
      added:"2025-06-30",
      desc:"Школьник Лайт Ягами находит тетрадь, убивающую любого, чьё имя в ней записано, и начинает войну умов с детективом Элом."
    },
    bebop:{
      id:"bebop",
      title:"Ковбой Бибоп",
      year:1998,
      type:"Аниме",
      genres:["Экшен","Фантастика","Нуар"],
      rating:8.7,
      poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/9f9b3348ec9e.jpg",
      country:["Япония"],
      pop:61,
      added:"2025-05-11",
      desc:"Экипаж космического корабля «Бибоп» — охотники за головами, перебивающиеся сомнительными заказами и собственным прошлым."
    },
    monster:{
      id:"monster",
      title:"Монстр",
      year:2004,
      type:"Аниме",
      genres:["Триллер","Драма","Психологическое","Детектив"],
      rating:8.8,
      poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/bbf81394593e.jpg",
      country:["Япония"],
      pop:72,
      added:"2025-07-25",
      desc:"Талантливый нейрохирург Кэндзо Тэндма спасает мальчика и годами спустя узнаёт, что вырос тот серийным убийцей."
    },
    psychopass:{
      id:"psychopass",
      title:"Психопаспорт",
      year:2012,
      type:"Аниме",
      genres:["Фантастика","Триллер","Психологическое"],
      rating:8.2,
      poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/139d2fea5700.jpg",
      country:["Япония"],
      pop:58,
      added:"2025-08-05",
      desc:"В обществе, где «цвет преступности» просчитывает система, инспектор Аканэ охотится на тех, кого нельзя судить по закону."
    },
    eva:{
      id:"eva",
      title:"Евангелион",
      year:1995,
      type:"Аниме",
      genres:["Фантастика","Драма","Меха","Психологическое"],
      rating:8.3,
      poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/18cd40b094d3.jpg",
      country:["Япония"],
      pop:67,
      added:"2025-03-02",
      desc:"Подросток Синдзи Икари садится за управление биороботом ЕВА, чтобы защищать Токио-3 от ангелов — и от собственного одиночества."
    },
    naruto:{
      id:"naruto",
      title:"Наруто",
      year:2002,
      type:"Аниме",
      genres:["Экшен","Сёнэн","Приключения"],
      rating:7.9,
      poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/5beeaab7cf76.jpg",
      country:["Япония"],
      pop:70,
      added:"2025-02-14",
      desc:"Шумный юный ниндзя Наруто Узумаки мечтает стать Хокаге — лидером деревни — и вернуть её доверие."
    },
    frieren:{
      id:"frieren",
      title:"Провожающая в последний путь Фрирен",
      year:2023,
      type:"Аниме",
      genres:["Фэнтези","Драма","Приключения","Сэйнэн"],
      rating:9,
      poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/c458046a4f08.jpg",
      country:["Япония"],
      wide:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/c33e95bd7dca.jpeg",
      isNew:true,
      ongoing:true,
      status:"planned",
      pop:91,
      added:"2026-10-12",
      desc:"Эльфийка-магиня Фрирен, пережившая своих товарищей по отряду, отправляется в новое путешествие, чтобы понять людей."
    },
    oshinoko:{
      id:"oshinoko",
      title:"Оши но ко",
      year:2023,
      type:"Аниме",
      genres:["Драма","Музыка","Мистика"],
      rating:8.6,
      poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/7315e1024447.png",
      country:["Япония"],
      isNew:true,
      ongoing:true,
      pop:56,
      added:"2026-09-21",
      desc:"Сияние и тьма шоу-бизнеса: врач-акушер Горо и его падчерица Руби идут к тайне легендарной идола."
    },
    breaking:{
      id:"breaking",
      title:"Во все тяжкие",
      year:2008,
      type:"Сериал",
      genres:["Драма","Криминал","Триллер"],
      rating:9.5,
      poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/895101998087.jpg",
      country:["США"],
      wide:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/00772fbee985.jpg",
      status:"watched",
      pop:97,
      added:"2025-01-25",
      desc:"Школьный учитель химии Уолтер Уайт, узнав о смертельном диагнозе, начинает варить метамфетамин и постепенно превращается в того, кого сам боялся."
    },
    chernobyl:{
      id:"chernobyl",
      title:"Чернобыль",
      year:2019,
      type:"Сериал",
      genres:["Драма","История","Трагедия"],
      rating:9.3,
      poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/9eefa807d02a.jpg",
      country:["США","Великобритания"],
      pop:69,
      added:"2025-04-03",
      desc:"Хроника аварии на Чернобыльской АЭС: от минут до взрыва до суда над виновными и цены лжи."
    },
    dark:{
      id:"dark",
      title:"Тьма",
      year:2017,
      type:"Сериал",
      genres:["Фантастика","Триллер","Мистика"],
      rating:8.5,
      poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/0d1c6d89dfa4.jpg",
      country:["Германия"],
      pop:79,
      added:"2025-06-19",
      desc:"Пропажа детей в немецком городке Виннден раскрывает временную петлю, связывающую четыре семьи и три эпохи."
    },
    stranger:{
      id:"stranger",
      title:"Очень странные дела",
      year:2016,
      type:"Сериал",
      genres:["Фантастика","Хоррор","Детектив"],
      rating:8.6,
      poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/d7aa7aa98ff8.jpg",
      country:["США"],
      ongoing:true,
      status:"watching",
      pop:93,
      added:"2025-05-30",
      desc:"В маленьком американском городке пропадает мальчик, а его друзья находят девочку с телекинезом и портал в Изнанку."
    },
    squid:{
      id:"squid",
      title:"Игра в кальмара",
      year:2021,
      type:"Сериал",
      genres:["Триллер","Драма","Трагедия"],
      rating:7.7,
      poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/d69134429911.jpg",
      country:["Южная Корея"],
      ongoing:true,
      pop:94,
      added:"2025-09-05",
      desc:"Должники играют в детские игры на выживание ради денежного приза, за которым стоят очень богатые зрители."
    },
    hotd:{
      id:"hotd",
      title:"Дом Дракона",
      year:2022,
      type:"Сериал",
      genres:["Фэнтези","Драма","Военное"],
      rating:8.3,
      poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/28853c314411.jpg",
      country:["США","Великобритания"],
      wide:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/072b7e1d7703.jpg",
      ongoing:true,
      pop:82,
      added:"2026-06-28",
      desc:"За двести лет до «Игры престолов» дом Таргариенов рвёт династию на части в танце драконов."
    },
    severance:{
      id:"severance",
      title:"Разделение",
      year:2022,
      type:"Сериал",
      genres:["Фантастика","Триллер","Психологическое"],
      rating:8.7,
      poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/b22e1179a791.jpg",
      country:["США"],
      ongoing:true,
      pop:77,
      added:"2026-07-09",
      desc:"Сотрудники Lumon соглашаются на процедуру, разделяющую сознание на рабочее и личное, — и «внутри» начинают сомневаться."
    },
    inception:{
      id:"inception",
      title:"Начало",
      year:2010,
      type:"Фильм",
      genres:["Фантастика","Триллер","Экшен"],
      rating:8.7,
      poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/f77c053f518d.jpeg",
      country:["США","Великобритания"],
      wide:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/bc8f8c7be2db.jpg",
      pop:90,
      added:"2025-08-11",
      desc:"Команда специалистов по проникновению в сны берётся не украсть идею, а внушить её — на самом глубоком уровне сна."
    },
    darkknight:{
      id:"darkknight",
      title:"Тёмный рыцарь",
      year:2008,
      type:"Фильм",
      genres:["Экшен","Криминал","Детектив"],
      rating:8.9,
      poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/82a5f83fce15.jpg",
      country:["США","Великобритания"],
      pop:92,
      added:"2025-02-28",
      desc:"Бэтмен против Джокера, для которого хаос — философия, и против вопроса, на что готов Готэм ради покоя."
    },
    matrix:{
      id:"matrix",
      title:"Матрица",
      year:1999,
      type:"Фильм",
      genres:["Фантастика","Экшен","Триллер"],
      rating:8.7,
      poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/55b87ebaa5b2.jpg",
      country:["США","Австралия"],
      pop:89,
      added:"2025-01-15",
      desc:"Программист Нео узнаёт, что мир — симуляция, и присоединяется к подполью, воюющему с машинами."
    },
    pulp:{
      id:"pulp",
      title:"Криминальное чтиво",
      year:1994,
      type:"Фильм",
      genres:["Криминал","Драма","Комедия"],
      rating:8.9,
      poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/b015d90fa0de.jpeg",
      country:["США"],
      pop:84,
      added:"2025-03-08",
      desc:"Несколько криминальных историй Лос-Анджелеса сплетаются в один нелинейный рассказ о выборе и бургерах."
    },
    shawshank:{
      id:"shawshank",
      title:"Побег из Шоушенка",
      year:1994,
      type:"Фильм",
      genres:["Драма","Криминал"],
      rating:9.3,
      poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/503afd663b47.jpg",
      country:["США"],
      pop:85,
      added:"2025-02-03",
      desc:"Банкир Энди Дюфрейн, осуждённый за убийство жены, годами хранит надежду в тюрьме Шоушенк."
    },
    martian:{
      id:"martian",
      title:"Марсианин",
      year:2015,
      type:"Фильм",
      genres:["Фантастика","Приключения","Комедия"],
      rating:8,
      poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/9257150c70e5.jpg",
      country:["США","Великобритания"],
      pop:63,
      added:"2025-10-12",
      desc:"Астронавт Марк Уотни, оставленный на Марсе в одиночку, выживает, выращивая картофель и налаживая связь с Землёй."
    },
    coco:{
      id:"coco",
      title:"Тайна Коко",
      year:2017,
      type:"Мультфильм",
      genres:["Фэнтези","Приключения","Музыка"],
      rating:8.4,
      poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/e18e3257cac8.jpg",
      country:["США"],
      wide:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/b151b1662f57.jpg",
      pop:66,
      added:"2025-11-09",
      desc:"Мальчик Мигель попадает в Страну мёртвых и ищет там прапрадеда, чтобы разгадать семейную тайну."
    },
    lionking:{
      id:"lionking",
      title:"Король Лев",
      year:1994,
      type:"Мультфильм",
      genres:["Драма","Приключения","Трагедия"],
      rating:8.5,
      poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/36c3dd5e2997.jpg",
      country:["США"],
      pop:59,
      added:"2025-01-20",
      desc:"Львёнок Симба теряет отца и становится изгнанником, чтобы вернуться и занять своё место на скале."
    },
    walle:{
      id:"walle",
      title:"ВАЛЛ·И",
      year:2008,
      type:"Мультфильм",
      genres:["Фантастика","Романтика","Приключения"],
      rating:8.4,
      poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/a4c63836c432.jpg",
      country:["США"],
      pop:60,
      added:"2025-07-01",
      desc:"Робот-уборщик, оставленный на пустой Земле, влюбляется в робота-разведчика Еву и отправляется за ней в космос."
    },
    conan:{
      id:"conan",
      title:"Детектив Конан",
      year:1996,
      type:"Аниме",
      genres:["Детектив","Комедия","Экшен"],
      rating:7.8,
      poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/ac3d8be922f8.jpg",
      country:["Япония"],
      ongoing:true,
      pop:52,
      added:"2026-02-10",
      desc:"Старшеклассник Синъити Кудо, обращённый таинственным ядом в ребёнка, расследует преступления под именем Конан Эдогава."
    },
    opm:{
      id:"opm",
      title:"Ванпанчмен",
      year:2015,
      type:"Аниме",
      genres:["Экшен","Комедия","Сверхъестественное"],
      rating:8.4,
      poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/22989602a31a.jpg",
      country:["Япония"],
      ongoing:true,
      pop:58,
      added:"2026-03-14",
      desc:"Сайтама, герой ради хобби, положил любого врага одним ударом — и от скуки ищет достойного противника."
    },
    csm:{
      id:"csm",
      title:"Человек-бензопила",
      year:2022,
      type:"Аниме",
      genres:["Экшен","Сверхъестественное","Хоррор"],
      rating:8.5,
      poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/26c985572f2e.jpg",
      country:["Япония"],
      ongoing:true,
      isNew:true,
      pop:63,
      added:"2026-10-07",
      desc:"Дэндзи, живущий в долгах, сливается с демоном-бензопилой Почитой и встаёт в ряды охотников на демонов."
    },
    dandadan:{
      id:"dandadan",
      title:"Дандадан",
      year:2024,
      type:"Аниме",
      genres:["Экшен","Комедия","Романтика"],
      rating:8.6,
      poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/84646f7e875b.jpg",
      country:["Япония"],
      ongoing:true,
      isNew:true,
      pop:60,
      added:"2026-09-30",
      desc:"Скептик Окобун и верящая в духов Момо объединяются против пришельцев и ёкаев, пробудив в себе странные силы."
    },
    solo:{
      id:"solo",
      title:"Поднятие уровня в одиночку",
      year:2024,
      type:"Аниме",
      genres:["Экшен","Фэнтези"],
      rating:8.1,
      poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/dd92af4988a9.jpg",
      country:["Япония"],
      ongoing:true,
      pop:55,
      added:"2026-04-18",
      desc:"Слабейший из охотников Сон Чин У после смерти получает право расти в уровнях — и становится тем, кого боятся ранги S."
    },
    kaiju:{
      id:"kaiju",
      title:"Кайдзю № 8",
      year:2024,
      type:"Аниме",
      genres:["Экшен","Фантастика","Комедия"],
      rating:8.3,
      poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/da192b822591.jpg",
      country:["Япония"],
      ongoing:true,
      pop:54,
      added:"2026-05-06",
      desc:"Уборщик после атак кайдзю Хибино Кафка сам становится кайдзю и, скрывая это, вступает в Силы обороны ради обещания другу."
    },
    rezero:{
      id:"rezero",
      title:"Re:Zero. Жизнь с нуля в альтернативном мире",
      year:2016,
      type:"Аниме",
      genres:["Фэнтези","Драма","Психологическое"],
      rating:8.4,
      poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/d3687f77d518.jpg",
      country:["Япония"],
      ongoing:true,
      isNew:true,
      pop:57,
      added:"2026-10-14",
      desc:"Субару Нацуки переносится в фэнтезийный мир, где после каждой смерти возвращается к контрольной точке — и платит за это рассудком."
    }
  }
};
})();

/* ===== пространство: title ===== */
KuvionData._db.title=(function(){
"use strict";
const _v0={
  id:"interstellar",
  title:"Интерстеллар",
  year:2014,
  type:"Фильм",
  genres:["Фантастика","Драма"],
  rating:8.6,
  poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/85bb955e60e9.jpg",
  wide:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/1290a963615d.jpg",
  wide2:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/ec06a3bbfb4e.jpg",
  wide3:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/2bdc37cad2cd.jpg",
  status:"watched",
  desc:"Команда исследователей отправляется через червоточину в космосе, чтобы найти новый дом для человечества."
};
const _v1={
  id:"dune2",
  title:"Дюна: Часть вторая",
  year:2024,
  type:"Фильм",
  genres:["Фантастика","Приключения"],
  rating:8.5,
  poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/d4500e7dac80.jpg",
  wide:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/12422b422cee.jpg",
  wide2:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/c7f684d95f5b.jpeg",
  wide3:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/4cb1149f3eaf.jpg",
  wide4:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/86e0bf71e647.jpg",
  status:"planned",
  isNew:true,
  desc:"Пол Атрейдес объединяется с Чани и фрименами в войне против дома Харконненов, пытаясь предотвратить ужасное будущее, которое видит только он."
};
const _v2={
  id:"aot",
  title:"Атака титанов",
  year:2013,
  type:"Аниме",
  genres:["Экшен","Драма"],
  rating:9,
  poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/9a35191d1d09.jpg",
  wide:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/7e53c74c6dda.jpg",
  wide2:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/5b0f4111e774.jpg",
  status:"watching",
  desc:"Человечество сражается за выживание за огромными стенами, защищающими от гигантских пожирателей людей — титанов."
};
const _v3={
  id:"aotFinal",
  title:"Атака титанов: Финальный сезон",
  year:2023,
  type:"Аниме",
  genres:["Экшен","Драма"],
  rating:9.1,
  poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/bbc4ed32da5c.jpg",
  wide:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/be104465fb7f.jpg",
  isNew:true,
  desc:"Последняя глава истории Эрена Йегера и битвы за судьбу человечества за стенами."
};
const _v4={
  id:"aotS2",
  title:"Атака титанов 2",
  year:2017,
  type:"Аниме",
  genres:["Экшен","Драма"],
  rating:8.4,
  poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/5d424d8b5adf.jpg",
  desc:"Разведкорпус сталкивается со Зверем-титаном, а внутри стен обнаруживается предатель."
};
const _v5={
  id:"aotS3",
  title:"Атака титанов 3",
  year:2018,
  type:"Аниме",
  genres:["Экшен","Драма"],
  rating:8.7,
  poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/9163ab8366ab.jpg",
  desc:"Разгадка тайны подвала и битва за Шиганшину приводят разведкорпус к морю."
};
const _v6={
  id:"aotOva",
  title:"Атака титанов: Леви",
  year:2014,
  type:"Аниме",
  genres:["Экшен","Драма"],
  rating:7.8,
  poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/7f78ee1abbbd.jpg",
  desc:"OVA-приквел о прошлом Ливая — от трущоб до разведкорпуса."
};
const _v7={
  id:"aotChron",
  title:"Атака титанов: Хроника",
  year:2020,
  type:"Аниме",
  genres:["Экшен","Драма"],
  rating:7.4,
  poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/678d178d0c6e.jpeg",
  desc:"Фильм-пересказ событий первых трёх сезонов одним фильмом."
};
const _v8={
  id:"jjk",
  title:"Магическая битва",
  year:2020,
  type:"Аниме",
  genres:["Экшен","Сёнэн"],
  rating:8.6,
  poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/235414089ff8.jpg",
  wide:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/ba2f5e6b7ab4.jpg",
  desc:"Школьник Юдзи Итадори проглатывает проклятый палец и становится сосудом для древнего проклятия."
};
const _v9={
  id:"onepiece",
  title:"Ван Пис",
  year:1999,
  type:"Аниме",
  genres:["Приключения","Сёнэн"],
  rating:9,
  poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/136bb118e1b5.jpg",
  wide:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/556492005b92.jpg",
  desc:"Мальчишка из резинки Люффи собирает команду пиратов и отправляется за легендарным сокровищем — Ван Пис."
};
const _v10={
  id:"onepieceRed",
  title:"Ван Пис: Фильм Ред",
  year:2022,
  type:"Аниме",
  genres:["Приключения","Экшен"],
  rating:8.5,
  poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/6e4fc8a0fbe9.png",
  desc:"Люффи и его команда отправляются на музыкальный фестиваль, где встречают мировую звезду Уту."
};
const _v11={
  id:"arcane2",
  title:"Аркейн: Сезон 2",
  year:2024,
  type:"Сериал",
  genres:["Фэнтези","Драма"],
  rating:9.2,
  poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/5379c8a0c07a.jpg",
  wide:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/81d0d4679ff5.jpg",
  isNew:true,
  desc:"Вай и Джинкс оказываются по разные стороны баррикад, когда Пилтовер и Заун стоят на грани войны."
};
const _v12={
  id:"demonslayer",
  title:"Клинок, рассекающий демонов",
  year:2019,
  type:"Аниме",
  genres:["Экшен","Сёнэн"],
  rating:8.6,
  poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/ad8da0992638.jpg",
  desc:"Танджиро Камадо становится охотником на демонов, чтобы вернуть сестре человеческий облик."
};
const _v13={
  id:"chainsaw",
  title:"Человек-бензопила",
  year:2022,
  type:"Аниме",
  genres:["Экшен","Комедия"],
  rating:8.5,
  poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/f701ec72af22.jpg",
  desc:"Дэндзи превращает долги и верного пса-демона в новую жизнь охотника на дьяволов."
};
const _v14={
  id:"deathnote",
  title:"Тетрадь смерти",
  year:2006,
  type:"Аниме",
  genres:["Триллер","Драма"],
  rating:9,
  poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/24e5f2b5d82c.jpg",
  desc:"Школьник находит тетрадь, убивающую по имени, и начинает войну характеров с гениальным детективом."
};
return {
  status:{watching:"Смотрю",planned:"Буду смотреть",watched:"Просмотрено",onhold:"Отложено",dropped:"Брошено"},
  titles:{
    interstellar:_v0,
    dune2:_v1,
    br2049:{
      id:"br2049",
      title:"Бегущий по лезвию 2049",
      year:2017,
      type:"Фильм",
      genres:["Фантастика","Нуар"],
      rating:8,
      poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/71b996fefac1.jpg",
      wide:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/9cc1a8a277d3.png",
      wide2:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/de002094f2aa.jpg",
      wide3:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/1662efa80442.jpg",
      desc:"Служащий Лос-Анджелеса К, новый блейд-раннер, раскрывает тайну, спрятанную десятилетиями, способную погрузить мир в хаос."
    },
    oppenheimer:{
      id:"oppenheimer",
      title:"Оппенгеймер",
      year:2023,
      type:"Фильм",
      genres:["Драма","История"],
      rating:8.3,
      poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/a1fd704339d9.jpg",
      wide:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/9e0a5f93f220.jpg",
      isNew:true,
      desc:"История жизни физика-теоретика Роберта Оппенгеймера, возглавившего разработку атомной бомбы."
    },
    aot:_v2,
    aotFinal:_v3,
    aotS2:_v4,
    aotS3:_v5,
    aotOva:_v6,
    aotChron:_v7,
    jjk:_v8,
    onepiece:_v9,
    onepieceRed:_v10,
    tlou:{
      id:"tlou",
      title:"Последние из нас",
      year:2023,
      type:"Сериал",
      genres:["Драма","Хоррор"],
      rating:8.7,
      poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/078136c3e9d7.jpg",
      wide:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/4cc4e52e05d7.jpeg",
      wide2:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/20165b080b81.jpg",
      isNew:true,
      desc:"Через двадцать лет после пандемии контрабандист Джоэл получает задание вывести из города 14-летнюю Элли."
    },
    spiderverse:{
      id:"spiderverse",
      title:"Человек-паук: Паутина вселенных",
      year:2023,
      type:"Мультфильм",
      genres:["Экшен","Приключения"],
      rating:8.6,
      poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/401cfa55ea89.jpg",
      wide:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/5d05fbe9bf0c.jpeg",
      isNew:true,
      desc:"Майлз Моралес отправляется в путешествие по мультивселенной, где встречает команду людей-пауков."
    },
    arcane:{
      id:"arcane",
      title:"Аркейн",
      year:2021,
      type:"Сериал",
      genres:["Фэнтези","Драма"],
      rating:9,
      poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/2023ce392d04.jpg",
      wide:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/70d04bc79f91.jpg",
      desc:"История двух сестёр, Вай и Джинкс, на фоне конфликта утопического Пилтовера и подземного Зауна."
    },
    arcane2:_v11,
    demonslayer:_v12,
    chainsaw:_v13,
    deathnote:_v14
  },
  tp:_v2,
  stills:[
    "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/78bad6d9e0a3.jpg",
    "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/4e0313267f90.jpg",
    "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/b1e6cdd5049b.jpg",
    "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/ba1394a42650.png",
    "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/33f88ffeb2f3.jpg",
    "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/7a2f8fc5973a.jpg",
    "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/7e53c74c6dda.jpg",
    "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/5b0f4111e774.jpg",
    "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/be104465fb7f.jpg"
  ],
  chars:[
    {
      name:"Эрен Йегер",
      role:"Главный герой",
      va:"Юки Кадзи",
      img:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/0f6fbc82685d.png"
    },
    {
      name:"Микаса Аккерман",
      role:"Главная героиня",
      va:"Юи Исикава",
      img:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/e60f7f455999.jpg"
    },
    {
      name:"Армин Арлерт",
      role:"Главный герой",
      va:"Марина Иноуэ",
      img:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/95ee80d02d83.jpg"
    },
    {
      name:"Ливай Аккерман",
      role:"Капитан разведкорпуса",
      va:"Хироси Камия",
      img:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/85df1aec098e.jpg"
    },
    {
      name:"Эрвин Смит",
      role:"Командир разведкорпуса",
      va:"Дайсукэ Оно",
      img:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/6a818aaae139.jpg"
    },
    {
      name:"Ханджи Зое",
      role:"Командир разведкорпуса",
      va:"Роми Пак",
      img:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/c66e31bf5ccc.jpg"
    },
    {
      name:"Райнер Браун",
      role:"Воин Марлии",
      va:"Ёсимаса Хосоя",
      img:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/4af5aa4fb9fd.jpg"
    },
    {
      name:"Хистория Рейсс",
      role:"Королева стен",
      va:"Сиори Миками",
      img:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/d04d2af4b182.jpg"
    },
    {
      name:"Жан Кирштейн",
      role:"Разведкорпус",
      va:"Кисё Танияма",
      img:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/0e25bccf0f82.jpg"
    },
    {
      name:"Конни Спрингер",
      role:"Разведкорпус",
      va:"Хиро Симоно",
      img:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/a2e7e03cdda5.jpeg"
    },
    {
      name:"Саша Блюз",
      role:"Разведкорпус",
      va:"Ю Кобаяси",
      img:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/ba58b77f913e.jpg"
    },
    {
      name:"Энни Леонхарт",
      role:"Воин Марлии",
      va:"Ю Симамура",
      img:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/c87fd28e15d1.jpg"
    },
    {
      name:"Зик Йегер",
      role:"Зверь-титан",
      va:"Такэхито Коясу",
      img:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/56fcaf85d305.jpg"
    },
    {
      name:"Габи Браун",
      role:"Кандидат в воины",
      va:"Нао Тояма",
      img:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/bf1e779d02b7.jpg"
    }
  ],
  castPeople:[
    {
      name:"Тимоти Шаламе",
      role:"Пол Атрейдес",
      img:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/88757a931df1.jpg"
    },
    {
      name:"Зендея",
      role:"Чани",
      img:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/404aa49e0aad.jpg"
    },
    {
      name:"Ребекка Фергюсон",
      role:"Леди Джессика",
      img:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/eeb378efc7b2.jpg"
    },
    {
      name:"Остин Батлер",
      role:"Фейд-Раута",
      img:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/73eb8a5b8e59.jpg"
    },
    {
      name:"Флоренс Пью",
      role:"Принцесса Ирулан",
      img:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/6e84b9aa36cc.jpg"
    },
    {
      name:"Хавьер Бардем",
      role:"Стилгар",
      img:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/e80a84d8315c.jpg"
    },
    {
      name:"Джош Бролин",
      role:"Гурни Халлек",
      img:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/32963b47d534.jpg"
    },
    {
      name:"Стеллан Скарсгард",
      role:"Барон Харконнен",
      img:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/ff5d239c6227.jpg"
    },
    {
      name:"Дэйв Батиста",
      role:"Зверь Раббан",
      img:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/17f5a72a348c.jpg"
    },
    {
      name:"Леа Сейду",
      role:"Леди Марго",
      img:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/9e20ce5d5642.jpg"
    }
  ],
  chronology:[
    {t:_v2,kind:"Сезон 1",current:true},
    {t:_v4,kind:"Сезон 2"},
    {t:_v5,kind:"Сезон 3"},
    {t:_v3,kind:"Сезон 4"},
    {t:_v6,kind:"OVA"},
    {t:_v7,kind:"Фильм"}
  ],
  seasons:[
    {
      n:1,
      year:2013,
      count:25,
      titles:[
        "К падению Шиганшины",
        "В тот день",
        "Первый шаг",
        "Ночь перед контратакой",
        "Рёв",
        "Мир, который увидела девочка",
        "Маленький клинок",
        "Я слышу биение твоего сердца",
        "Куда ведёт ответ",
        "Ответ",
        "Идол",
        "Рана",
        "Уязвимые места",
        "Снова в строю",
        "Особый отряд",
        "Что должно быть сделано",
        "Формирование дальнего рейда",
        "Ответный огонь",
        "Улыбка",
        "Одержимость",
        "Разбор полётов",
        "Разрушенная стена",
        "Судьба разведкорпуса",
        "Милосердие",
        "Стена и ров"
      ]
    },
    {
      n:2,
      year:2017,
      count:12,
      titles:[
        "Зверь-титан",
        "Я снова дома",
        "Юг",
        "Солдат",
        "Ответ",
        "Воин",
        "Закрытая дверь",
        "Внешний край леса",
        "Беглецы",
        "Дети",
        "Погоня",
        "Крик"
      ]
    },
    {
      n:3,
      year:2018,
      count:22,
      titles:[
        "Смута",
        "Гром",
        "Старая история",
        "Доверие",
        "Тень",
        "Нож",
        "Жажда власти",
        "Вне стен",
        "Порядок",
        "Друзья",
        "Ответчик",
        "Ночная битва",
        "Город в тумане",
        "Один против всех",
        "Пламя надежды",
        "Идеальный удар",
        "Герой",
        "Месть",
        "Полночь",
        "Возвращение",
        "Координата",
        "Врата мира"
      ]
    },
    {
      n:4,
      year:2020,
      tag:"Финальный",
      count:28,
      titles:[
        "Другой берег",
        "Дети леса",
        "Стражи стены",
        "Из тени",
        "Объявление войны",
        "Военный совет",
        "Нападение",
        "Удар в спину",
        "Два брата",
        "Прошлое желание",
        "Мошенник",
        "Герои",
        "Узники",
        "Молчание",
        "Одна вина",
        "Выше и дальше",
        "Судьба человечества",
        "Гордый воин",
        "Незваные гости",
        "Воспоминания будущего",
        "От рая до ада",
        "Тысяча жизней",
        "Солнце встаёт",
        "Решение",
        "Грешники",
        "Планы на небеса",
        "Кошмар",
        "К свободе"
      ]
    }
  ],
  similar:[
    _v3,
    _v8,
    _v12,
    _v13,
    _v14,
    _v9,
    _v10
  ],
  popular:[
    _v1,
    _v2,
    _v0,
    _v11
  ]
};
})();

/* ===== пространство: colls ===== */
KuvionData._db.colls=(function(){
"use strict";
return {
  key:"kuvion_colls_v1",
  posters:{
    tlou:"078136c3e9d7.jpg",
    stranger:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/d7aa7aa98ff8.jpg",
    hotd:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/28853c314411.jpg",
    squid:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/d69134429911.jpg",
    dark:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/0d1c6d89dfa4.jpg",
    chernobyl:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/9eefa807d02a.jpg",
    deathnote:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/dbae99da2de3.jpeg",
    psychopass:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/139d2fea5700.jpg",
    interstellar:"85bb955e60e9.jpg",
    dune2:"d4500e7dac80.jpg",
    br2049:"71b996fefac1.jpg",
    martian:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/9257150c70e5.jpg",
    walle:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/a4c63836c432.jpg",
    inception:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/f77c053f518d.jpeg",
    aot:"9a35191d1d09.jpg",
    fmab:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/0b4034f752c6.jpg",
    monster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/bbf81394593e.jpg",
    eva:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/18cd40b094d3.jpg",
    fireflies:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/4ce765f0c314.jpg",
    rezero:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/d3687f77d518.jpg",
    matrix:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/55b87ebaa5b2.jpg",
    darkknight:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/82a5f83fce15.jpg",
    pulp:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/b015d90fa0de.jpeg",
    bebop:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/9f9b3348ec9e.jpg",
    yourname:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/0b6a6b5e4164.jpeg",
    spirited:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/1bea669ab3af.jpg",
    howl:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/fab348fd8713.jpg",
    mononoke:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/3ff66b83d9c0.jpg",
    coco:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/e18e3257cac8.jpg",
    severance:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/b22e1179a791.jpg",
    breaking:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/895101998087.jpg",
    oppenheimer:"a1fd704339d9.jpg"
  },
  demo:[
    {
      id:"c-horror",
      name:"Хоррор, от которого не отвести глаз",
      desc:"Не дешёвые скримеры, а медленное ощущение, что с миром что-то не так. Десять хорроров для ночного марафона — свет можно не выключать, всё равно не поможет.",
      author:"kira",
      likes:341,
      views:5240,
      made:"2026-08-14",
      vis:"public",
      titles:["tlou","stranger","hotd","squid","dark","chernobyl","deathnote","psychopass"]
    },
    {
      id:"c-space",
      name:"Космос: тишина и бесконечность",
      desc:"От камерных драм на корабле до эпопей о судьбах цивилизаций. Смотреть в наушниках, не торопясь и желательно ночью.",
      author:"vega",
      likes:287,
      views:3180,
      made:"2026-09-02",
      vis:"public",
      titles:["interstellar","dune2","br2049","martian","walle","inception"]
    },
    {
      id:"c-punch",
      name:"Аниме, после которого нужно отойти",
      desc:"Тайтлы, что бьют по голове и долго не отпускают: боль, смерть героев и вопросы без ответов. Не для фонового просмотра.",
      author:"tsuki",
      likes:412,
      views:7940,
      made:"2026-07-19",
      vis:"public",
      titles:["aot","fmab","monster","eva","deathnote","psychopass","fireflies","rezero"]
    },
    {
      id:"c-noir",
      name:"Неон, дождь и нуар",
      desc:"Города, которые не спят, детективы с прошлым и синтвейв в кадре. Атмосфера важнее сюжета — и здесь она идеальная.",
      author:"mirror",
      likes:198,
      views:2410,
      made:"2026-10-01",
      vis:"public",
      titles:["br2049","matrix","darkknight","pulp","bebop","psychopass"]
    },
    {
      id:"c-cozy",
      name:"Тёплый вечер: кино для отдыха",
      desc:"Без трагедий и концов света. Истории, после которых на душе спокойно, — как раз под плед и чашку чая.",
      author:"yuki",
      likes:265,
      views:3870,
      made:"2026-09-25",
      vis:"public",
      titles:["yourname","spirited","howl","mononoke","coco","walle"]
    },
    {
      id:"c-detective",
      name:"Детективы, где нельзя моргнуть",
      desc:"Каждая деталь — улика. Загадки, которые честно раскрываются в конце, а не высасываются из пальца.",
      author:"coldcase",
      likes:176,
      views:1960,
      made:"2026-10-11",
      vis:"public",
      titles:["deathnote","monster","dark","severance","breaking","chernobyl"]
    }
  ],
  seed:[
    {
      id:"c-thrillers",
      name:"Психологические триллеры",
      desc:"Мой рабочий список: истории, где напряжение держит не монстр, а человек и его решения. Дополняю по мере находок.",
      author:"danil",
      user:true,
      likes:89,
      views:1240,
      made:"2026-10-20",
      vis:"public",
      titles:["severance","dark","monster","psychopass","breaking","eva"]
    },
    {
      id:"c-ten",
      name:"Заслуженные десятки",
      desc:"Всё, что я оценил на 10 из 10 за время на Kuvion. Список короткий не потому, что я жадный — просто планка высокая.",
      author:"danil",
      user:true,
      likes:143,
      views:2380,
      made:"2026-06-30",
      vis:"public",
      titles:["fmab","oppenheimer","interstellar","breaking","mononoke","aot"]
    },
    {
      id:"c-ghibli",
      name:"Мир Гибли",
      desc:"Кино, в котором хочется жить: замки, духи и леса студии Ghibli. Пересматриваю, когда вокруг слишком шумно.",
      author:"danil",
      user:true,
      likes:67,
      views:940,
      made:"2026-08-30",
      vis:"public",
      titles:["howl","spirited","mononoke","fireflies"]
    },
    {
      id:"c-time",
      name:"Загадки времени",
      desc:"Петли, парадоксы и истории, где время — главный герой. Смотреть внимательно: каждая деталь сработает в финале.",
      author:"danil",
      user:true,
      likes:118,
      views:1670,
      made:"2026-09-21",
      vis:"public",
      titles:["inception","dark","interstellar","yourname","matrix"]
    }
  ]
};
})();

/* ===== пространство: manga ===== */
KuvionData._db.manga=(function(){
"use strict";
return {
  now:"2026-11-05T12:00:00",
  status:{watching:"Читаю",planned:"Буду читать",watched:"Прочитано",onhold:"Отложено",dropped:"Бросил"},
  statusFull:{watching:"Читаю",planned:"Буду читать",watched:"Прочитано",onhold:"Отложено",dropped:"Бросил читать"},
  titles:{
    aot:{
      id:"aot",
      title:"Атака титанов",
      orig:"進撃の巨人 · Shingeki no Kyojin",
      type:"Манга",
      country:"Япония",
      year:2009,
      end:2021,
      pub:"done",
      chapters:139,
      volumes:34,
      cadence:"monthly",
      start:"2009-09-09",
      lastDate:"2021-04-09",
      author:"Хадзиме Исаяма",
      publisher:"Kodansha",
      magazine:"Bessatsu Shōnen Magazine",
      genres:["Экшен","Драма","Тёмное фэнтези"],
      rating:9,
      age:"16+",
      poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/79c6eeb6a0aa.jpg",
      wide:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/c17ef5c6174c.png",
      wide2:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/ea5f2397cce3.jpg",
      pop:96,
      added:"2025-06-10",
      desc:"Человечество ютится за огромными стенами, защищающими от гигантских пожирателей людей — титанов. После падения стены Мария юный Эрен Йегер клянётся уничтожить их всех и вступает в разведкорпус. Впереди — история о свободе, цене войны и тайнах, спрятанных в подвале родного дома."
    },
    onepiece:{
      id:"onepiece",
      title:"Ван Пис",
      orig:"ONE PIECE · Wan Pīsu",
      type:"Манга",
      country:"Япония",
      year:1997,
      end:null,
      pub:"ongoing",
      chapters:1128,
      volumes:107,
      cadence:"weekly",
      start:"1997-07-22",
      lastDate:null,
      author:"Эйитиро Ода",
      publisher:"Shueisha",
      magazine:"Weekly Shōnen Jump",
      genres:["Приключения","Сёнэн","Фэнтези"],
      rating:9.2,
      age:"12+",
      poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/306108982d99.jpg",
      wide:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/050edc41c3fc.png",
      pop:99,
      added:"2025-05-02",
      desc:"Мальчишка с телом из резинки Монки Д. Луффи собирает команду пиратов и отправляется за легендарным сокровищем — Ван Пис, чтобы стать Королём пиратов. Двадцать пять лет приключений, которые переизобрели сёнэн."
    },
    fmab:{
      id:"fmab",
      title:"Стальной алхимик",
      orig:"鋼の錬金術師 · Hagane no Renkinjutsushi",
      type:"Манга",
      country:"Япония",
      year:2001,
      end:2010,
      pub:"done",
      chapters:116,
      volumes:27,
      cadence:"monthly",
      start:"2001-07-12",
      lastDate:"2010-06-11",
      author:"Хирому Аракава",
      publisher:"Square Enix",
      magazine:"Monthly Shōnen Gangan",
      genres:["Экшен","Фэнтези","Драма"],
      rating:9.1,
      age:"16+",
      poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/66da3352847d.jpg",
      pop:88,
      added:"2025-07-08",
      desc:"Братья Эдвард и Альфонс Элрики нарушили главный закон алхимии и дорого заплатили: чтобы вернуть телам прежний вид, они ищут философский камень — и выходят на след государственной тайны целой страны."
    },
    demonslayer:{
      id:"demonslayer",
      title:"Клинок, рассекающий демонов",
      orig:"鬼滅の刃 · Kimetsu no Yaiba",
      type:"Манга",
      country:"Япония",
      year:2016,
      end:2020,
      pub:"done",
      chapters:205,
      volumes:23,
      cadence:"weekly",
      start:"2016-02-15",
      lastDate:"2020-05-18",
      author:"Коёхару Готогэ",
      publisher:"Shueisha",
      magazine:"Weekly Shōnen Jump",
      genres:["Экшен","Сёнэн","Сверхъестественное"],
      rating:8.6,
      age:"16+",
      poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/0096bfaf4a86.jpeg",
      pop:84,
      added:"2025-09-12",
      desc:"Тандзиро Камадо становится охотником на демонов, чтобы вернуть сестре Нэдзуко, обращённой в демона, человеческий облик. Путь наверх — через двенадцать Лун и демона тысячелетней давности."
    },
    jjk:{
      id:"jjk",
      title:"Магическая битва",
      orig:"呪術廻戦 · Jujutsu Kaisen",
      type:"Манга",
      country:"Япония",
      year:2018,
      end:2024,
      pub:"done",
      chapters:271,
      volumes:30,
      cadence:"weekly",
      start:"2018-03-05",
      lastDate:"2024-09-30",
      author:"Гэгэ Акутами",
      publisher:"Shueisha",
      magazine:"Weekly Shōnen Jump",
      genres:["Экшен","Сверхъестественное","Драма"],
      rating:8.7,
      age:"18+",
      poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/5b3078fa95b2.jpg",
      wide:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/e9bba0cbb39a.webp",
      pop:90,
      added:"2025-09-18",
      isNew:true,
      desc:"Школьник Юдзи Итадори проглатывает проклятый палец и становится сосудом для короля проклятий Рёмена Сукуны. Теперь его путь — магический колледж, где учат умирать достойно."
    },
    deathnote:{
      id:"deathnote",
      title:"Тетрадь смерти",
      orig:"DEATH NOTE · Desu Nōto",
      type:"Манга",
      country:"Япония",
      year:2003,
      end:2006,
      pub:"done",
      chapters:108,
      volumes:12,
      cadence:"weekly",
      start:"2003-12-01",
      lastDate:"2006-05-15",
      author:"Цугуми Оба",
      artist:"Такэси Обата",
      publisher:"Shueisha",
      magazine:"Weekly Shōnen Jump",
      genres:["Триллер","Драма","Психологическое"],
      rating:8.9,
      age:"16+",
      poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/8ae63b852f2c.jpg",
      pop:82,
      added:"2025-06-30",
      desc:"Школьник Лайт Ягами находит тетрадь, убивающую любого, чьё имя в ней записано, и начинает войну умов с гениальным детективом Элом. Кто из них правосудие, а кто — преступник?"
    },
    berserk:{
      id:"berserk",
      title:"Берсерк",
      orig:"ベルセルク · Beruseruku",
      type:"Манга",
      country:"Япония",
      year:1989,
      end:null,
      pub:"ongoing",
      chapters:375,
      volumes:42,
      cadence:"monthly",
      start:"1989-08-25",
      lastDate:null,
      author:"Кэнтаро Миура",
      artist:"Кодзи Мори (после 2021)",
      publisher:"Hakusensha",
      magazine:"Young Animal",
      genres:["Экшен","Тёмное фэнтези","Драма"],
      rating:9.4,
      age:"18+",
      poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/8822a7d2f6e1.jpg",
      wide:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/705c0f2c620c.jpg",
      pop:87,
      added:"2025-04-18",
      desc:"Сага о Гатсе — «Чёрном мече», идущем сквозь судьбу, дружбу и предательство в мире, где боги играют людьми. Эпохальная работа Кэнтаро Миуры, продолженная его другом и учеником."
    },
    vagabond:{
      id:"vagabond",
      title:"Странник",
      orig:"バガボンド · Bagabondo",
      type:"Манга",
      country:"Япония",
      year:1998,
      end:2015,
      pub:"hiatus",
      chapters:327,
      volumes:37,
      cadence:"weekly",
      start:"1998-09-03",
      lastDate:"2015-05-21",
      author:"Такэхико Иноуэ",
      publisher:"Kodansha",
      magazine:"Morning",
      genres:["Дзидайгэки","Драма","Экшен"],
      rating:9.2,
      age:"18+",
      poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/a749569c450e.jpeg",
      wide:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/49e646034f12.jpg",
      pop:70,
      added:"2025-05-27",
      desc:"Роман «Мусаси» Эйдзи Ёсикавы, пересказанный языком манги: путь Синдзэна Такэдзо от одичавшего мечника к легендарному Миямото Мусаси. Тридцать лет художник рисует воду, бамбук и тишину поединка."
    },
    csm:{
      id:"csm",
      title:"Человек-бензопила",
      orig:"チェンソーマン · Chensō Man",
      type:"Манга",
      country:"Япония",
      year:2018,
      end:null,
      pub:"ongoing",
      chapters:208,
      volumes:20,
      cadence:"weekly",
      start:"2018-12-03",
      lastDate:null,
      author:"Тацки Фудзимото",
      publisher:"Shueisha",
      magazine:"Shōnen Jump+",
      genres:["Экшен","Комедия","Хоррор"],
      rating:8.8,
      age:"18+",
      poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/3781d6ec1d0b.jpg",
      wide:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/145c065e1413.jpeg",
      pop:91,
      added:"2026-01-15",
      isNew:true,
      desc:"Дэндзи живёт в долгах у якудза и мечтает о простом счастье. Слившись с демоном-бензопилой Почитой, он вступает в отряд истребителей демонов — и узнаёт, что хуже демонов могут быть только люди. Вторая часть выходит сейчас."
    },
    dandadan:{
      id:"dandadan",
      title:"Дандадан",
      orig:"ダンダダン · Dandadan",
      type:"Манга",
      country:"Япония",
      year:2021,
      end:null,
      pub:"ongoing",
      chapters:185,
      volumes:18,
      cadence:"weekly",
      start:"2021-04-06",
      lastDate:null,
      author:"Юкинобу Тацу",
      publisher:"Shueisha",
      magazine:"Shōnen Jump+",
      genres:["Экшен","Комедия","Сверхъестественное"],
      rating:8.7,
      age:"16+",
      poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/07580587b7e9.jpg",
      pop:85,
      added:"2026-02-20",
      isNew:true,
      desc:"Момо верит в духов и не верит в инопланетян, Окарун — наоборот. Спор двух старшеклассников оборачивается встречей и с теми и с другими — и пробуждением скрытых сил у обоих."
    },
    nausicaa:{
      id:"nausicaa",
      title:"Наусикая из Долины Ветров",
      orig:"風の谷のナウシカ · Kaze no Tani no Naushika",
      type:"Манга",
      country:"Япония",
      year:1982,
      end:1994,
      pub:"done",
      chapters:59,
      volumes:7,
      cadence:"monthly",
      start:"1982-02-11",
      lastDate:"1994-03-10",
      author:"Хаяо Миядзаки",
      publisher:"Tokuma Shoten",
      magazine:"Animage",
      genres:["Фантастика","Драма","Приключения"],
      rating:8.9,
      age:"12+",
      poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/76ff46aa0786.jpg",
      pop:66,
      added:"2025-08-05",
      desc:"Принцесса Долины Ветров живёт на отравленной земле, где лес фукай поглощает остатки человечества. Между враждующими королевствами Наусикая ищет путь, на котором людям и природе не нужно уничтожать друг друга. Миядзаки рисовал эту историю двенадцать лет."
    },
    monster:{
      id:"monster",
      title:"Монстр",
      orig:"MONSTER · Monsutā",
      type:"Манга",
      country:"Япония",
      year:1994,
      end:2001,
      pub:"done",
      chapters:162,
      volumes:18,
      cadence:"weekly",
      start:"1994-12-05",
      lastDate:"2001-08-30",
      author:"Наоки Урасава",
      publisher:"Shogakukan",
      magazine:"Big Comic Original",
      genres:["Триллер","Драма","Детектив"],
      rating:9.1,
      age:"18+",
      poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/a864f2ddb669.jpg",
      pop:78,
      added:"2025-07-25",
      desc:"Талантливый нейрохирург Кэндзо Тэнма спасает мальчика вместо мэра — и годы спустя узнаёт, что вырос тот серийным убийцей, рядом с которым меркнут чудовища из учебников психиатрии."
    },
    cb20:{
      id:"cb20",
      title:"20th Century Boys",
      orig:"20世紀少年 · 20 Seiki Shōnen",
      type:"Манга",
      country:"Япония",
      year:1999,
      end:2007,
      pub:"done",
      chapters:249,
      volumes:22,
      cadence:"weekly",
      start:"1999-01-01",
      lastDate:"2007-08-24",
      author:"Наоки Урасава",
      publisher:"Shogakukan",
      magazine:"Big Comic Spirits",
      genres:["Триллер","Детектив","Фантастика"],
      rating:8.9,
      age:"16+",
      poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/49380e77b905.jpg",
      pop:64,
      added:"2025-10-11",
      desc:"Кэндзи когда-то придумал с друзьями «Книгу пророчеств» — сценарий конца света для детской игры. Теперь кто-то воплощает её страницу за страницей, и подпись под всем этим — его собственное детское прозвище."
    },
    kaiju8:{
      id:"kaiju8",
      title:"Кайдзю № 8",
      orig:"怪獣8号 · Kaijū 8-gō",
      type:"Манга",
      country:"Япония",
      year:2020,
      end:2025,
      pub:"done",
      chapters:112,
      volumes:14,
      cadence:"weekly",
      start:"2020-07-15",
      lastDate:"2025-07-18",
      author:"Наоя Мацумото",
      publisher:"Shueisha",
      magazine:"Shōnen Jump+",
      genres:["Экшен","Фантастика","Сёнэн"],
      rating:8.3,
      age:"16+",
      poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/ecc0afaea159.jpg",
      pop:76,
      added:"2025-10-30",
      desc:"Кафка Хибино в 32 года зачищает следы после кайдзю, мечтая вступить в отряд обороны. Когда он сам обращается в монстра, шанс наконец появляется — теперь он оружие, и присвоенный ему номер — восьмой."
    },
    tokyorev:{
      id:"tokyorev",
      title:"Токийские мстители",
      orig:"東京リベンジャーズ · Tōkyō Ribenjāzu",
      type:"Манга",
      country:"Япония",
      year:2017,
      end:2022,
      pub:"done",
      chapters:278,
      volumes:31,
      cadence:"weekly",
      start:"2017-03-01",
      lastDate:"2022-11-16",
      author:"Кэн Вакуи",
      publisher:"Kodansha",
      magazine:"Weekly Shōnen Magazine",
      genres:["Экшен","Драма","Фантастика"],
      rating:8.4,
      age:"16+",
      poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/7dcd042641e8.jpg",
      pop:72,
      added:"2025-09-05",
      desc:"Такэмитчи узнаёт о гибели бывшей девушки и проваливается на двенадцать лет назад — в среднюю школу, где ещё можно спасти Хинату. Но чтобы переписать будущее, придётся вырасти заново."
    },
    fireforce:{
      id:"fireforce",
      title:"Пламенная бригада пожарных",
      orig:"炎炎ノ消防隊 · Enen no Shōbōtai",
      type:"Манга",
      country:"Япония",
      year:2015,
      end:2022,
      pub:"done",
      chapters:304,
      volumes:34,
      cadence:"weekly",
      start:"2015-09-23",
      lastDate:"2022-02-22",
      author:"Ацуси Окубо",
      publisher:"Kodansha",
      magazine:"Weekly Shōnen Magazine",
      genres:["Экшен","Сёнэн","Сверхъестественное"],
      rating:8.2,
      age:"16+",
      poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/96f00771ad46.png",
      pop:60,
      added:"2025-11-02",
      desc:"Мир горит: люди вспыхивают самопроизвольно и превращаются в огненных демонов. Специальные пожарные бригады сражаются с пламенем — Синра Касакабе, «демон» с огнём в ногах, хочет стать героем."
    },
    opm:{
      id:"opm",
      title:"Ван-Панчмен",
      orig:"ワンパンマン · Wanpanman",
      type:"Манга",
      country:"Япония",
      year:2012,
      end:null,
      pub:"ongoing",
      chapters:248,
      volumes:33,
      cadence:"monthly",
      start:"2012-06-14",
      lastDate:null,
      author:"ONE",
      artist:"Юсукэ Мурата",
      publisher:"Shueisha",
      magazine:"Tonari no Young Jump",
      genres:["Экшен","Комедия","Сверхъестественное"],
      rating:8.7,
      age:"16+",
      poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/743806d9698b.jpeg",
      pop:80,
      added:"2025-08-22",
      desc:"Сайтама так много качался, что лысеет и убивает любого врага одним ударом. Быть сильнейшим скучно — и в этом вся драма величайшей пародии на супергероику, которую Юсукэ Мурата рисует с микро-детализацией каждого взмаха кулака."
    },
    slamdunk:{
      id:"slamdunk",
      title:"Слэм-данк",
      orig:"スラムダンク · Suramu Danku",
      type:"Манга",
      country:"Япония",
      year:1990,
      end:1996,
      pub:"done",
      chapters:276,
      volumes:31,
      cadence:"weekly",
      start:"1990-10-01",
      lastDate:"1996-06-17",
      author:"Такэхико Иноуэ",
      publisher:"Shueisha",
      magazine:"Weekly Shōnen Jump",
      genres:["Спорт","Драма","Комедия"],
      rating:9,
      age:"12+",
      poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/7f8dc39f29e0.jpg",
      pop:74,
      added:"2025-05-14",
      desc:"Ханамити Сакураги приходит в баскетбольную секцию ради девушки — и остаётся ради игры. Манга, благодаря которой в Японии выросло целое поколение баскетболистов, до сих пор считается лучшей спортивной мангой."
    },
    solo:{
      id:"solo",
      title:"Соло левеллинг",
      orig:"나 혼자만 레벨업 · Na Honjaman Rebell Up",
      type:"Манхва",
      country:"Южная Корея",
      year:2018,
      end:2021,
      pub:"done",
      chapters:179,
      cadence:"weekly",
      start:"2018-03-04",
      lastDate:"2021-12-30",
      author:"Чхугон",
      artist:"DUBU (Redice Studio)",
      publisher:"Kakao Webtoon",
      magazine:"KakaoPage",
      color:true,
      genres:["Экшен","Фэнтези","Сёнэн"],
      rating:8.9,
      age:"16+",
      poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/b2df6c694eb1.png",
      wide:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/d49ee074dad1.png",
      pop:94,
      added:"2025-06-18",
      desc:"Слабейший охотник Сон Джин-у получает шанс: таинственная Система делает его «игроком» с уровнями и квестами. Пока остальные выживают, он прокачивается — и однажды миру придётся узнать его имя."
    },
    tog:{
      id:"tog",
      title:"Властелин башни",
      orig:"신의 탑 · Sin-ui Tap",
      type:"Манхва",
      country:"Южная Корея",
      year:2010,
      end:null,
      pub:"ongoing",
      chapters:551,
      cadence:"weekly",
      start:"2010-12-30",
      lastDate:null,
      author:"SIU (Ли Джон-хви)",
      publisher:"Naver Webtoon",
      magazine:"Naver Webtoon",
      color:true,
      genres:["Фэнтези","Экшен","Мистика"],
      rating:8.6,
      age:"16+",
      poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/d9cf1f70604e.jpg",
      pop:69,
      added:"2025-07-30",
      desc:"Двадцать пятый Бам входит в Башню, куда допускаются лишь «избранные» — за девушкой, которая для него весь мир. Каждый этаж — испытание, каждый испытание — чья-то игра. Легендарный вебтун SIU, строящий собственную вселенную."
    },
    lookism:{
      id:"lookism",
      title:"Внешность",
      orig:"외모지상주의 · Oemo Jisangjuui",
      type:"Манхва",
      country:"Южная Корея",
      year:2017,
      end:null,
      pub:"ongoing",
      chapters:512,
      cadence:"weekly",
      start:"2017-06-01",
      lastDate:null,
      author:"Пак Тхэ-джун",
      publisher:"Naver Webtoon",
      magazine:"Naver Webtoon",
      color:true,
      genres:["Драма","Комедия","Экшен"],
      rating:8.3,
      age:"16+",
      poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/5c243cc95e73.jpg",
      pop:71,
      added:"2025-09-27",
      desc:"Пэ Хёнсок просыпается в идеальном теле, оставаясь собой и в старом. Две жизни одного человека — и урок о том, как мир судит по обложке. Осторожно: затягивает сильнее, чем кажется по названию."
    },
    gohs:{
      id:"gohs",
      title:"Бог старшей школы",
      orig:"갓 오브 하이 스쿨 · Gat obeu Hai Seukul",
      type:"Манхва",
      country:"Южная Корея",
      year:2011,
      end:2022,
      pub:"done",
      chapters:568,
      cadence:"weekly",
      start:"2011-06-15",
      lastDate:"2022-04-22",
      author:"Пак Ён-чже",
      publisher:"Naver Webtoon",
      magazine:"Naver Webtoon",
      color:true,
      genres:["Экшен","Фэнтези","Боевые искусства"],
      rating:8.1,
      age:"16+",
      poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/9053c28bceb0.jpg",
      pop:58,
      added:"2025-08-14",
      desc:"Турнир «Бог старшей школы» собирает сильнейших школьников Кореи: победителю исполнят любое желание. Джин Мори с хвостом обезьяны и улыбкой чемпиона пришёл победить всех."
    },
    noblesse:{
      id:"noblesse",
      title:"Дворянство",
      orig:"노블레스 · Noseullesseu",
      type:"Манхва",
      country:"Южная Корея",
      year:2007,
      end:2019,
      pub:"done",
      chapters:544,
      cadence:"weekly",
      start:"2007-12-30",
      lastDate:"2019-01-07",
      author:"Сон Чже-хо",
      artist:"Ли Кван-су",
      publisher:"Naver Webtoon",
      magazine:"Naver Webtoon",
      color:true,
      genres:["Экшен","Сверхъестественное","Мистика"],
      rating:8,
      age:"16+",
      poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/249bb1e6158c.jpeg",
      pop:56,
      added:"2025-10-08",
      desc:"Ноблес Райэль просыпается после 820 лет сна и поступает в старшую школу — потому что верный слуга Франкенштейн настоял. Одно из произведений, с которого начался расцвет корейских вебтунов."
    },
    kingsavatar:{
      id:"kingsavatar",
      title:"Повелитель",
      orig:"全职高手 · Quanzhi Gaoshou",
      type:"Маньхуа",
      country:"Китай",
      year:2011,
      end:2014,
      pub:"done",
      chapters:640,
      cadence:"weekly",
      start:"2011-02-20",
      lastDate:"2014-05-30",
      author:"Butterfly Blue",
      publisher:"Qidian",
      magazine:"QQ Comics",
      color:true,
      genres:["Экшен","Спорт","Комедия"],
      rating:8.6,
      age:"12+",
      poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/9e53743a5b13.jpg",
      pop:62,
      added:"2025-11-01",
      desc:"Е Сю — легенда киберспорта, трижды чемпион, уволенный из клуба в одночасье. В интернет-кафе за углом он начинает заново: новый аккаунт, новая гильдия и путь обратно на вершину. Маньхуа по культовому роману о киберспорте."
    }
  }
};
})();

/* ===== пространство: person ===== */
KuvionData._db.person=(function(){
"use strict";
return {
  status:{watching:"Смотрю",planned:"Буду смотреть",completed:"Просмотрено",onhold:"Отложено",dropped:"Брошено"},
  titles:{
    aot:{
      id:"aot",
      title:"Атака титанов",
      year:2013,
      type:"Аниме",
      genres:["Сёнэн","Экшен","Драма"],
      rating:9,
      poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/9a35191d1d09.jpg",
      wide:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/78bad6d9e0a3.jpg",
      wide2:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/4e0313267f90.jpg",
      wide3:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/b1e6cdd5049b.jpg",
      desc:"Человечество сражается за выживание за огромными стенами, защищающими от гигантских пожирателей людей — титанов."
    },
    bnha:{
      id:"bnha",
      title:"Моя геройская академия",
      year:2016,
      type:"Аниме",
      genres:["Сёнэн","Экшен","Комедия"],
      rating:8.1,
      poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/45fac6e210a1.jpg",
      desc:"В мире суперспособностей мальчик без дара поступает в элитную академию героев, чтобы стать лучшим из лучших."
    },
    nanatsu:{
      id:"nanatsu",
      title:"Семь смертных грехов",
      year:2014,
      type:"Аниме",
      genres:["Фэнтези","Приключения"],
      rating:7.8,
      poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/394d89e35fc7.jpeg",
      desc:"Принцесса ищет семерых изгнанных рыцарей — единственных, кто способен спасти королевство от тирании святых рыцарей."
    },
    haikyuu:{
      id:"haikyuu",
      title:"Хайкю!!",
      year:2014,
      type:"Аниме",
      genres:["Спорт","Комедия"],
      rating:8.4,
      poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/058ba569323e.jpg",
      desc:"Невысокий, но прыгучий школьник хочет стать лучшим волейболистом — вопреки росту и насмешкам."
    },
    magi:{
      id:"magi",
      title:"Маги: Лабиринт волшебства",
      year:2012,
      type:"Аниме",
      genres:["Фэнтези","Приключения"],
      rating:8,
      poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/de4c31463f79.jpeg",
      desc:"Юный Аладдин и его друг Али-Баба отправляются покорять подземные лабиринты, скрывающие артефакты древней магии."
    },
    dxd:{
      id:"dxd",
      title:"High School DxD",
      year:2012,
      type:"Аниме",
      genres:["Экшен","Комедия","Фэнтези"],
      rating:7.3,
      poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/34126cd5ed13.jpg",
      desc:"Школьник, убитый на первом свидании, возрождается демоном и вступает в войну трёх сторон за свой город."
    },
    dune2:{
      id:"dune2",
      title:"Дюна: Часть вторая",
      year:2024,
      type:"Фильм",
      genres:["Фантастика","Приключения","Драма"],
      rating:8.5,
      poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/d4500e7dac80.jpg",
      desc:"Пол Атрейдес объединяется с Чани и фрименами в войне против дома Харконненов."
    },
    dune1:{
      id:"dune1",
      title:"Дюна",
      year:2021,
      type:"Фильм",
      genres:["Фантастика","Приключения"],
      rating:8,
      poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/28b659915707.jpg",
      desc:"Наследник благородного дома прибывает на пустынную планету, где его семье уготована ловушка."
    },
    wonka:{
      id:"wonka",
      title:"Вонка",
      year:2023,
      type:"Фильм",
      genres:["Мюзикл","Фэнтези","Комедия"],
      rating:7.8,
      poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/835ae636c8ce.jpg",
      desc:"Юный изобретатель-сладкоежка приезжает в город шоколадных магнатов, чтобы открыть свою лавку."
    },
    cmycn:{
      id:"cmycn",
      title:"Назови меня своим именем",
      year:2017,
      type:"Фильм",
      genres:["Драма","Мелодрама"],
      rating:7.9,
      poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/b0b86425ebf6.jpg",
      desc:"Италия, лето 1983-го: семнадцатилетний Элио и старший научный помощник отца переживают роман, который изменит обоих."
    },
    theking:{
      id:"theking",
      title:"Король",
      year:2019,
      type:"Фильм",
      genres:["Историческая драма","Драма"],
      rating:7.3,
      poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/c2dffa34f3b1.jpg",
      desc:"Принц-наследник, не желавший трона, вынужден принять корону и войну, навязанную ему придворными."
    },
    ladybird:{
      id:"ladybird",
      title:"Леди Бёрд",
      year:2017,
      type:"Фильм",
      genres:["Драма","Комедия"],
      rating:7.4,
      poster:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/4b663937ceaa.jpg",
      desc:"Старшеклассница из Сакраменто мечтает уехать из родного города — и понемногу понимает, что теряет, покидая его."
    }
  },
  persons:{
    seiyuu:{
      name:"Юки Кадзи",
      orig:"梶裕貴 · Kaji Yuki",
      photo:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/6bd882e82d3f.jpg",
      backdrop:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/ad18c000026a.jpg",
      meta:["Сэйю","Родился 3 сентября 1985","Токио, Япония"],
      desc:"Японский сэйю, один из самых узнаваемых голосов своего поколения. Голос Эрена Йегера в «Атаке титанов», Шото Тодороки в «Моей геройской академии» и Мэлодиаса в «Семи смертельных грехах» — роли, сделавшие его имя нарицательным у поклонников аниме во всём мире.",
      facts:[
        ["Дата рождения","3 сентября 1985"],
        ["Место рождения","Токио, Япония"],
        ["Годы активности","2004 — н. в."],
        ["Агентство","независимый (ранее — Vims)"],
        ["Награды","Seiyu Awards — лучший дебют (2009)"],
        ["Известен по","Эрен Йегер · Шото Тодороки · Мэлодиас"]
      ],
      filmTitle:"Озвучивал",
      film:[
        {id:"aot",role:"Эрен Йегер",href:"/title/"},
        {id:"bnha",role:"Шото Тодороки"},
        {id:"nanatsu",role:"Мэлодиас"},
        {id:"haikyuu",role:"Кодзумэ Кэнма"},
        {id:"magi",role:"Али-Баба Салуя"},
        {id:"dxd",role:"Иссэй Хёдо"}
      ],
      chars:[
        {
          name:"Эрен Йегер",
          from:"Атака титанов",
          img:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/0f6fbc82685d.png"
        },
        {
          name:"Шото Тодороки",
          from:"Моя геройская академия",
          img:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/5947df7a6274.png"
        },
        {
          name:"Мэлодиас",
          from:"Семь смертных грехов",
          img:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/b6dc22d2075c.jpg"
        },
        {
          name:"Кодзумэ Кэнма",
          from:"Хайкю!!",
          img:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/d54f2fa69eb9.png"
        },
        {
          name:"Иссэй Хёдо",
          from:"High School DxD",
          img:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/df064805b75d.jpg"
        }
      ],
      photos:[]
    },
    people:{
      name:"Тимоти Шаламе",
      orig:"Timothée Chalamet",
      photo:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/05cfd656a9c3.jpg",
      backdrop:"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/0b7ab76ca7ec.jpg",
      meta:["Актёр","Родился 27 декабря 1995","Нью-Йорк, США"],
      desc:"Американский актёр, одна из главных молодых звёзд Голливуда. Прорывом стала роль Элио в «Назови меня своим именем» — за неё он получил номинацию на «Оскар» в категории «Лучшая мужская роль», став одним из самых молодых номинантов в истории премии.",
      facts:[
        ["Дата рождения","27 декабря 1995"],
        ["Место рождения","Нью-Йорк, США"],
        ["Карьера","Актёр"],
        ["Прорыв","«Назови меня своим именем» (2017)"],
        ["Награды","номинация на «Оскар» — лучшая мужская роль"],
        ["Известен по","Пол Атрейдес · Элио Перлман · Вонка"]
      ],
      filmTitle:"Где снимался",
      film:[
        {id:"dune2",role:"Пол Атрейдес"},
        {id:"dune1",role:"Пол Атрейдес"},
        {id:"wonka",role:"Вонка"},
        {id:"cmycn",role:"Элио Перлман"},
        {id:"theking",role:"Генрих V"},
        {id:"ladybird",role:"Кайл Шайбл"}
      ],
      chars:[],
      photos:[
        "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/f0a61ef25a3c.jpg",
        "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/016f2f81a6a7.jpg",
        "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/5c456fa07dd2.jpg",
        "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/e17fea9fae8a.jpg",
        "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/e98be379da46.jpg",
        "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/b9f75e0177f6.png"
      ]
    }
  }
};
})();

/* одинаковые пространства — алиасы (данные те же) */
KuvionData._db.mylist=KuvionData._db.catalog;
KuvionData._db.collections=KuvionData._db.catalog;
KuvionData._db.collnew=KuvionData._db.catalog;
KuvionData._db.schedule=KuvionData._db.catalog;
KuvionData._db.search=KuvionData._db.home;
KuvionData._db.notifs=KuvionData._db.home;
KuvionData._db.profile=KuvionData._db.catalog;
KuvionData._db.settings=KuvionData._db.catalog;
KuvionData._db.plus=KuvionData._db.home;
