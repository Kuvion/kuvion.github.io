/* Kuvion — движок поиска v3.4 (общий для всех страниц).
   Сгенерировано scripts/build_prod.py из однофайловых черновиков download/.
   Правки вносить в черновики, затем пересобрать сборку. */
"use strict";
/* ---------- полноэкранный поиск (v3.4: тайтлы + персоны + подборки) ----
   Единый индекс SDB одинаков на всех страницах макета: фильмы, сериалы
   и аниме из каталога (51) плюс вся манга, манхва и маньхуа (24).
   Поиск понимает:
   • названия — русские и оригинальные («фрирен», «one piece», «berserk»);
   • ссылки Кинопоиска: kinopoisk.ru/film/258687, kinopoisk.ru/series/839458;
   • ссылки Shikimori: shikimori.one/animes/16498, shikimori.one/mangas/23390;
   • голый внешний ID: «16498», «258687»;
   • персоны — демо-набор страницы персоны (Юки Кадзи, Тимоти Шаламе):
     имя, оригинальное написание и род деятельности;
   • подборки — живой список из localStorage «kuvion_colls_v1» (сеяные
     и созданные пользователем) плюс демо-набор других пользователей:
     название и автор.
   Выдача группируется — «Тайтлы» (до 5 строк), «Персоны» (до 2),
   «Подборки» (до 3); счётчик в заголовке группы показывает полное
   число совпадений, а если нашлось больше, липкая строка «Все
   результаты» внизу дропдауна ведёт на полную страницу выдачи
   /search/?q=… Внутренние ID тайтлов нигде не
   показываются и по ним не ищется (служебная штука).
   v3.4 — индикатор загрузки показывается волной: пока идёт запрос,
   по контуру всего блока поиска бежит световая волна, в теле —
   тихая строка «Идёт поиск» и скелетон строк; если по запросу
   ничего не нашлось, второй этап «Расширяем поиск» (редкие и
   неточные совпадения) и только потом пустое состояние — без
   упоминания сторонних площадок в статусах. Enter не ждёт
   загрузки — досрочно дорисовывает выдачу и открывает первый
   результат. Недавние запросы: localStorage «kuvion_sov_recent_v1»,
   максимум шесть. */
const sovInput=$('#sovInput');
function _s(id,title,alt,year,type,genres,rating,poster,kp,shiki,href){
  const manga=/^Ман/.test(type);
  const mid=manga?id.replace(/-m$/,''):'';
  return{id,title,alt,year,type,genres:genres.split('|'),rating,
    poster:/^https?:/.test(poster)?poster:CDN+poster,
    kp:kp||0,shiki:shiki||0,mid,
    href:manga?'/manga/?m='+mid:(href||'')};
}
const SDB=[
_s("interstellar","Интерстеллар","Interstellar",2014,"Фильм","Фантастика|Драма|Приключения",8.6,"85bb955e60e9.jpg",258687,0,""),
_s("dune2","Дюна: Часть вторая","Dune: Part Two",2024,"Фильм","Фантастика|Приключения|Драма",8.5,"d4500e7dac80.jpg",4540126,0,""),
_s("br2049","Бегущий по лезвию 2049","Blade Runner 2049",2017,"Фильм","Фантастика|Нуар|Детектив",8.0,"71b996fefac1.jpg",0,0,""),
_s("oppenheimer","Оппенгеймер","Oppenheimer",2023,"Фильм","Драма|История|Военное",8.3,"a1fd704339d9.jpg",4664634,0,""),
_s("aot","Атака титанов","Shingeki no Kyojin",2013,"Аниме","Экшен|Драма|Трагедия",9.0,"9a35191d1d09.jpg",0,16498,"/title/"),
_s("aotFinal","Атака титанов: Финальный сезон","Shingeki no Kyojin: The Final Season",2023,"Аниме","Экшен|Драма|Военное",9.1,"bbc4ed32da5c.jpg",0,0,""),
_s("jjk","Магическая битва","Jujutsu Kaisen",2020,"Аниме","Экшен|Сёнэн|Сверхъестественное",8.6,"235414089ff8.jpg",0,113415,""),
_s("onepiece","Ван Пис","One Piece",1999,"Аниме","Приключения|Сёнэн|Комедия",9.0,"136bb118e1b5.jpg",0,21,""),
_s("onepieceRed","Ван Пис: Фильм Ред","One Piece Film: Red",2022,"Аниме","Приключения|Экшен|Музыка",8.5,"6e4fc8a0fbe9.png",0,0,""),
_s("tlou","Последние из нас","The Last of Us",2023,"Сериал","Драма|Хоррор|Триллер",8.7,"078136c3e9d7.jpg",839458,0,""),
_s("spiderverse","Человек-паук: Паутина вселенных","Spider-Man: Across the Spider-Verse",2023,"Мультфильм","Экшен|Приключения|Комедия",8.6,"401cfa55ea89.jpg",0,0,""),
_s("arcane","Аркейн","Arcane",2021,"Сериал","Фэнтези|Драма|Трагедия",9.0,"2023ce392d04.jpg",4445150,0,""),
_s("arcane2","Аркейн: Сезон 2","Arcane",2024,"Сериал","Фэнтези|Драма|Экшен",9.2,"5379c8a0c07a.jpg",0,0,""),
_s("fmab","Стальной алхимик: Братство","Fullmetal Alchemist: Brotherhood",2009,"Аниме","Экшен|Фэнтези|Драма|Приключения",9.1,"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/0b4034f752c6.jpg",0,0,""),
_s("demonslayer","Клинок, рассекающий демонов","Kimetsu no Yaiba",2019,"Аниме","Экшен|Сёнэн|Сверхъестественное",8.5,"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/debab583d0ba.jpg",0,0,""),
_s("yourname","Твоё имя","Kimi no Na wa",2016,"Аниме","Романтика|Драма|Мистика",8.8,"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/0b6a6b5e4164.jpeg",0,0,""),
_s("spirited","Унесённые призраками","Sen to Chihiro no Kamikakushi",2001,"Аниме","Фэнтези|Приключения|Сверхъестественное",8.6,"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/1bea669ab3af.jpg",0,0,""),
_s("fireflies","Могила светлячков","Hotaru no Haka",1988,"Аниме","Драма|Трагедия|Военное",8.5,"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/4ce765f0c314.jpg",0,0,""),
_s("howl","Ходячий замок","Howl no Ugoku Shiro",2004,"Аниме","Фэнтези|Романтика|Приключения",8.4,"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/fab348fd8713.jpg",0,0,""),
_s("mononoke","Принцесса Мононоке","Mononoke Hime",1997,"Аниме","Фэнтези|Приключения|Сверхъестественное",8.6,"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/3ff66b83d9c0.jpg",0,0,""),
_s("deathnote","Тетрадь смерти","Death Note",2006,"Аниме","Триллер|Драма|Психологическое|Детектив",8.6,"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/dbae99da2de3.jpeg",0,1535,""),
_s("bebop","Ковбой Бибоп","Cowboy Bebop",1998,"Аниме","Экшен|Фантастика|Нуар",8.7,"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/9f9b3348ec9e.jpg",0,1,""),
_s("monster","Монстр","Monster",2004,"Аниме","Триллер|Драма|Психологическое|Детектив",8.8,"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/bbf81394593e.jpg",0,0,""),
_s("psychopass","Психопаспорт","Psycho-Pass",2012,"Аниме","Фантастика|Триллер|Психологическое",8.2,"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/139d2fea5700.jpg",0,0,""),
_s("eva","Евангелион","Neon Genesis Evangelion",1995,"Аниме","Фантастика|Драма|Меха|Психологическое",8.3,"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/18cd40b094d3.jpg",0,30,""),
_s("naruto","Наруто","Naruto",2002,"Аниме","Экшен|Сёнэн|Приключения",7.9,"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/5beeaab7cf76.jpg",0,20,""),
_s("frieren","Провожающая в последний путь Фрирен","Sousou no Frieren",2023,"Аниме","Фэнтези|Драма|Приключения|Сэйнэн",9.0,"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/c458046a4f08.jpg",0,52991,""),
_s("oshinoko","Оши но ко","Oshi no Ko",2023,"Аниме","Драма|Музыка|Мистика",8.6,"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/7315e1024447.png",0,0,""),
_s("breaking","Во все тяжкие","Breaking Bad",2008,"Сериал","Драма|Криминал|Триллер",9.5,"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/895101998087.jpg",0,0,""),
_s("chernobyl","Чернобыль","Chernobyl",2019,"Сериал","Драма|История|Трагедия",9.3,"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/9eefa807d02a.jpg",0,0,""),
_s("dark","Тьма","Dark",2017,"Сериал","Фантастика|Триллер|Мистика",8.5,"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/0d1c6d89dfa4.jpg",0,0,""),
_s("stranger","Очень странные дела","Stranger Things",2016,"Сериал","Фантастика|Хоррор|Детектив",8.6,"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/d7aa7aa98ff8.jpg",0,0,""),
_s("squid","Игра в кальмара","Squid Game",2021,"Сериал","Триллер|Драма|Трагедия",7.7,"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/d69134429911.jpg",0,0,""),
_s("hotd","Дом Дракона","House of the Dragon",2022,"Сериал","Фэнтези|Драма|Военное",8.3,"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/28853c314411.jpg",0,0,""),
_s("severance","Разделение","Severance",2022,"Сериал","Фантастика|Триллер|Психологическое",8.7,"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/b22e1179a791.jpg",0,0,""),
_s("inception","Начало","Inception",2010,"Фильм","Фантастика|Триллер|Экшен",8.7,"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/f77c053f518d.jpeg",0,0,""),
_s("darkknight","Тёмный рыцарь","The Dark Knight",2008,"Фильм","Экшен|Криминал|Детектив",8.9,"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/82a5f83fce15.jpg",0,0,""),
_s("matrix","Матрица","The Matrix",1999,"Фильм","Фантастика|Экшен|Триллер",8.7,"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/55b87ebaa5b2.jpg",0,0,""),
_s("pulp","Криминальное чтиво","Pulp Fiction",1994,"Фильм","Криминал|Драма|Комедия",8.9,"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/b015d90fa0de.jpeg",0,0,""),
_s("shawshank","Побег из Шоушенка","The Shawshank Redemption",1994,"Фильм","Драма|Криминал",9.3,"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/503afd663b47.jpg",0,0,""),
_s("martian","Марсианин","The Martian",2015,"Фильм","Фантастика|Приключения|Комедия",8.0,"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/9257150c70e5.jpg",0,0,""),
_s("coco","Тайна Коко","Coco",2017,"Мультфильм","Фэнтези|Приключения|Музыка",8.4,"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/e18e3257cac8.jpg",0,0,""),
_s("lionking","Король Лев","The Lion King",1994,"Мультфильм","Драма|Приключения|Трагедия",8.5,"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/36c3dd5e2997.jpg",0,0,""),
_s("walle","ВАЛЛ·И","WALL-E",2008,"Мультфильм","Фантастика|Романтика|Приключения",8.4,"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/a4c63836c432.jpg",0,0,""),
_s("conan","Детектив Конан","Detective Conan",1996,"Аниме","Детектив|Комедия|Экшен",7.8,"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/ac3d8be922f8.jpg",0,235,""),
_s("opm","Ванпанчмен","One Punch Man",2015,"Аниме","Экшен|Комедия|Сверхъестественное",8.4,"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/22989602a31a.jpg",0,0,""),
_s("csm","Человек-бензопила","Chainsaw Man",2022,"Аниме","Экшен|Сверхъестественное|Хоррор",8.5,"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/26c985572f2e.jpg",0,44511,""),
_s("dandadan","Дандадан","Dandadan",2024,"Аниме","Экшен|Комедия|Романтика",8.6,"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/84646f7e875b.jpg",0,0,""),
_s("solo","Поднятие уровня в одиночку","Solo Leveling",2024,"Аниме","Экшен|Фэнтези",8.1,"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/dd92af4988a9.jpg",0,0,""),
_s("kaiju","Кайдзю № 8","Kaiju No. 8",2024,"Аниме","Экшен|Фантастика|Комедия",8.3,"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/da192b822591.jpg",0,0,""),
_s("rezero","Re:Zero. Жизнь с нуля в альтернативном мире","Re:Zero kara Hajimeru Isekai Seikatsu",2016,"Аниме","Фэнтези|Драма|Психологическое",8.4,"https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/d3687f77d518.jpg",0,0,""),
_s("aot-m","Атака титанов","Shingeki no Kyojin",2009,"Манга","Экшен|Драма|Тёмное фэнтези",9.0,"79c6eeb6a0aa.jpg",0,23390,""),
_s("onepiece-m","Ван Пис","Wan Pīsu",1997,"Манга","Приключения|Сёнэн|Фэнтези",9.2,"306108982d99.jpg",0,13,""),
_s("fmab-m","Стальной алхимик","Hagane no Renkinjutsushi",2001,"Манга","Экшен|Фэнтези|Драма",9.1,"66da3352847d.jpg",0,0,""),
_s("demonslayer-m","Клинок, рассекающий демонов","Kimetsu no Yaiba",2016,"Манга","Экшен|Сёнэн|Сверхъестественное",8.6,"0096bfaf4a86.jpeg",0,0,""),
_s("jjk-m","Магическая битва","Jujutsu Kaisen",2018,"Манга","Экшен|Сверхъестественное|Драма",8.7,"5b3078fa95b2.jpg",0,113138,""),
_s("deathnote-m","Тетрадь смерти","Desu Nōto",2003,"Манга","Триллер|Драма|Психологическое",8.9,"8ae63b852f2c.jpg",0,0,""),
_s("berserk","Берсерк","Beruseruku",1989,"Манга","Экшен|Тёмное фэнтези|Драма",9.4,"8822a7d2f6e1.jpg",0,2,""),
_s("vagabond","Странник","Bagabondo · Vagabond",1998,"Манга","Дзидайгэки|Драма|Экшен",9.2,"a749569c450e.jpeg",0,0,""),
_s("csm-m","Человек-бензопила","Chensō Man",2018,"Манга","Экшен|Комедия|Хоррор",8.8,"3781d6ec1d0b.jpg",0,116778,""),
_s("dandadan-m","Дандадан","Dandadan",2021,"Манга","Экшен|Комедия|Сверхъестественное",8.7,"07580587b7e9.jpg",0,0,""),
_s("nausicaa","Наусикая из Долины Ветров","Kaze no Tani no Naushika · Nausicaa of the Valley of the Wind",1982,"Манга","Фантастика|Драма|Приключения",8.9,"76ff46aa0786.jpg",0,0,""),
_s("monster-m","Монстр","Monsutā",1994,"Манга","Триллер|Драма|Детектив",9.1,"a864f2ddb669.jpg",0,0,""),
_s("cb20","20th Century Boys","20 Seiki Shōnen · 20th Century Boys",1999,"Манга","Триллер|Детектив|Фантастика",8.9,"49380e77b905.jpg",0,0,""),
_s("kaiju8","Кайдзю № 8","Kaijū 8-gō",2020,"Манга","Экшен|Фантастика|Сёнэн",8.3,"ecc0afaea159.jpg",0,0,""),
_s("tokyorev","Токийские мстители","Tōkyō Ribenjāzu",2017,"Манга","Экшен|Драма|Фантастика",8.4,"7dcd042641e8.jpg",0,0,""),
_s("fireforce","Пламенная бригада пожарных","Enen no Shōbōtai",2015,"Манга","Экшен|Сёнэн|Сверхъестественное",8.2,"96f00771ad46.png",0,0,""),
_s("opm-m","Ван-Панчмен","Wanpanman",2012,"Манга","Экшен|Комедия|Сверхъестественное",8.7,"743806d9698b.jpeg",0,0,""),
_s("slamdunk","Слэм-данк","Suramu Danku",1990,"Манга","Спорт|Драма|Комедия",9.0,"7f8dc39f29e0.jpg",0,0,""),
_s("solo-m","Соло левеллинг","Na Honjaman Rebell Up · Solo Leveling",2018,"Манхва","Экшен|Фэнтези|Сёнэн",8.9,"b2df6c694eb1.png",0,0,""),
_s("tog","Властелин башни","Sin-ui Tap · Tower of God",2010,"Манхва","Фэнтези|Экшен|Мистика",8.6,"d9cf1f70604e.jpg",0,0,""),
_s("lookism","Внешность","Oemo Jisangjuui · Lookism",2017,"Манхва","Драма|Комедия|Экшен",8.3,"5c243cc95e73.jpg",0,0,""),
_s("gohs","Бог старшей школы","Gat obeu Hai Seukul · The God of High School",2011,"Манхва","Экшен|Фэнтези|Боевые искусства",8.1,"9053c28bceb0.jpg",0,0,""),
_s("noblesse","Дворянство","Noseullesseu · Noblesse",2007,"Манхва","Экшен|Сверхъестественное|Мистика",8.0,"249bb1e6158c.jpeg",0,0,""),
_s("kingsavatar","Повелитель","Quanzhi Gaoshou · The King's Avatar",2011,"Маньхуа","Экшен|Спорт|Комедия",8.6,"9e53743a5b13.jpg",0,0,""),
];
/* «Популярно сейчас» — фиксированный набор id из индекса */
const SDB_POP=['aot','dune2','berserk','interstellar','frieren','arcane2'];
/* персоны: копия демо-набора страницы персоны (/person/);
   roles — число известных ролей для строки метрик */
const SDB_PERSONS=[
  {id:'seiyuu',name:'Юки Кадзи',orig:'Kaji Yuki',role:'Сэйю',roles:6,
   photo:CDN+'6bd882e82d3f.jpg',href:'/person/?mode=seiyuu'},
  {id:'people',name:'Тимоти Шаламе',orig:'Timothée Chalamet',role:'Актёр',roles:6,
   photo:CDN+'05cfd656a9c3.jpg',href:'/person/?mode=people'},
];
/* демо-подборки других пользователей — копия COLL_DEMO со страницы
   подборок (titles — для обложки-коллажа и счётчика; живые подборки
   читаются из localStorage при каждом поиске) */
const SOV_COLLS_DEMO=[
  {id:'c-horror',name:'Хоррор, от которого не отвести глаз',author:'kira',likes:341,
   titles:['tlou','stranger','hotd','squid','dark','chernobyl','deathnote','psychopass']},
  {id:'c-space',name:'Космос: тишина и бесконечность',author:'vega',likes:287,
   titles:['interstellar','dune2','br2049','martian','walle','inception']},
  {id:'c-punch',name:'Аниме, после которого нужно отойти',author:'tsuki',likes:412,
   titles:['aot','fmab','monster','eva','deathnote','psychopass','fireflies','rezero']},
  {id:'c-noir',name:'Неон, дождь и нуар',author:'mirror',likes:198,
   titles:['br2049','matrix','darkknight','pulp','bebop','psychopass']},
  {id:'c-cozy',name:'Тёплый вечер: кино для отдыха',author:'yuki',likes:265,
   titles:['yourname','spirited','howl','mononoke','coco','walle']},
  {id:'c-detective',name:'Детективы, где нельзя моргнуть',author:'coldcase',likes:176,
   titles:['deathnote','monster','dark','severance','breaking','chernobyl']},
];
/* демо-примеры для подсказок */
const SOV_EXAMPLES=[
  {q:'shikimori.one/animes/16498',cap:'ссылка Shikimori'},
  {q:'kinopoisk.ru/film/258687',cap:'ссылка Кинопоиска'},
  {q:'frieren',cap:'оригинальное название'},
  {q:'кадзи',cap:'персона'},
  {q:'хоррор',cap:'подборка'},
];
const sovRecent=(()=>{try{return JSON.parse(localStorage.getItem('kuvion_sov_recent_v1'))||[]}catch(err){return[]}})();
function sovSaveRecent(q){
  q=(q||'').trim();if(!q)return;
  const i=sovRecent.indexOf(q);if(i>-1)sovRecent.splice(i,1);
  sovRecent.unshift(q);if(sovRecent.length>6)sovRecent.length=6;
  try{localStorage.setItem('kuvion_sov_recent_v1',JSON.stringify(sovRecent))}catch(err){}
}
const sovEsc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const sovPlural=(n,one,few,many)=>{const a=n%10,b=n%100;return a===1&&b!==11?one:(a>=2&&a<=4&&(b<10||b>=20)?few:many)};

/* ---------- разбор запроса ---------- */
function sovParse(q){
  const s=q.trim();
  if(!s)return{kind:'empty'};
  let m;
  if(m=s.match(/kinopoisk\.ru\/(film|series)\/(\d+)/i))return{kind:'kp',id:m[2],path:m[1].toLowerCase()+'/'+m[2]};
  if(m=s.match(/shikimori\.(?:one|org)\/(animes|mangas)\/(\d+)/i))return{kind:'shiki',id:m[2],path:m[1].toLowerCase()+'/'+m[2]};
  if(/kinopoisk\.ru|shikimori\.(?:one|org)/i.test(s)){
    return{kind:'badlink',host:/shikimori/i.test(s)?'Shikimori':'Кинопоиска'};
  }
  if(/^\d+$/.test(s))return{kind:'num',id:s};
  return{kind:'text',norm:s.toLowerCase()};
}

/* ---------- поиск по индексу ---------- */
const sovById=id=>SDB.filter(t=>t.id===id);
const sovByExt=(kind,id)=>SDB.filter(t=>kind==='kp'?String(t.kp)===id:String(t.shiki)===id);
function sovByText(p){
  const n=p.norm;
  const score=t=>{
    const ti=t.title.toLowerCase();
    if(n.length<2)return ti.startsWith(n)?4:0;
    const al=(t.alt||'').toLowerCase();
    if(ti===n)return 6;
    if(ti.startsWith(n))return 5;
    if(ti.includes(n))return 4;
    if(al&&al.includes(n))return 3;
    if((t.genres||[]).join(' ').toLowerCase().includes(n)||t.type.toLowerCase().includes(n))return 2;
    return 0;
  };
  return SDB.map(t=>({t,s:score(t)}))
    .filter(x=>x.s>0)
    .sort((a,b)=>b.s-a.s||b.t.rating-a.t.rating)
    .map(x=>x.t);
}
function sovPersByText(p){
  const n=p.norm;
  const score=x=>{
    const nm=x.name.toLowerCase();
    if(n.length<2)return nm.startsWith(n)?4:0;
    const al=(x.orig||'').toLowerCase();
    if(nm===n)return 6;
    if(nm.startsWith(n))return 5;
    if(nm.includes(n))return 4;
    if(al&&al.includes(n))return 3;
    if(x.role.toLowerCase().includes(n))return 2;
    return 0;
  };
  return SDB_PERSONS.map(x=>({x,s:score(x)}))
    .filter(v=>v.s>0)
    .sort((a,b)=>b.s-a.s)
    .map(v=>v.x);
}
/* живые подборки: localStorage (сеяные + созданные) + демо-набор;
   обложка — постер первого тайтла из индекса SDB */
function sovColls(){
  const out=[],seen={};
  try{
    const mine=JSON.parse(localStorage.getItem('kuvion_colls_v1')||'[]');
    if(Array.isArray(mine))mine.forEach(c=>{
      if(!c||!c.id||!c.name)return;
      seen[c.id]=1;
      out.push({id:c.id,name:c.name,author:c.author||'',likes:c.likes||0,
        n:(c.titles||[]).length,tids:c.titles||[]});
    });
  }catch(err){}
  SOV_COLLS_DEMO.forEach(c=>{
    if(seen[c.id])return;
    out.push({id:c.id,name:c.name,author:c.author,likes:c.likes,n:c.titles.length,tids:c.titles});
  });
  return out;
}
function sovCollCover(tids){
  for(let i=0;i<(tids||[]).length;i++){
    const hit=sovById(tids[i]);
    if(hit.length)return hit[0].poster;
  }
  return null;
}
function sovCollsByText(p){
  const n=p.norm;
  const score=c=>{
    const nm=c.name.toLowerCase();
    if(n.length<2)return nm.startsWith(n)?4:0;
    if(nm===n)return 6;
    if(nm.startsWith(n))return 5;
    if(nm.includes(n))return 4;
    if(c.author&&c.author.toLowerCase().includes(n))return 2;
    return 0;
  };
  return sovColls().map(c=>({c,s:score(c)}))
    .filter(v=>v.s>0)
    .sort((a,b)=>b.s-a.s||b.c.likes-a.c.likes)
    .map(v=>v.c);
}

/* ---------- рендер ---------- */
function sovMark(text,n){
  if(!n)return sovEsc(text);
  const i=text.toLowerCase().indexOf(n);
  if(i<0)return sovEsc(text);
  return sovEsc(text.slice(0,i))+'<span class="sr-mark">'+sovEsc(text.slice(i,i+n.length))+'</span>'+sovEsc(text.slice(i+n.length));
}
const SOV_LINK_ICO='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>';
const SOV_ARROW_ICO='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>';
const SOV_HEART_ICO='<svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>';
function srItem(t,n,hit){
  /* на странице манги строки манги открываются в местной карточке */
  const local=(t.mid&&typeof showManga==='function')?1:0;
  const altLine=(n&&n.length>1&&t.alt&&t.alt.toLowerCase().includes(n)&&!t.title.toLowerCase().includes(n))?' · '+sovEsc(t.alt):'';
  return `
  <div class="sr-item${hit?' sr-item--hit':''}" data-srid="${sovEsc(t.mid||t.id)}" data-local="${local}" data-href="${sovEsc(t.href)}" data-title="${sovEsc(t.title)}">
    <img src="${t.poster}" alt="" loading="lazy">
    <div style="min-width:0">
      <p class="sr-title">${sovMark(t.title,n&&n.length>1?n:null)}</p>
      <p class="sr-meta">${t.year} · ${sovEsc(t.type)}${altLine}</p>
    </div>
    <span class="sr-rate" style="color:${ratingColor(t.rating)}">${t.rating.toFixed(1)}</span>
  </div>`;
}
function srPerson(p,n){
  const altLine=(n&&n.length>1&&p.orig&&p.orig.toLowerCase().includes(n)&&!p.name.toLowerCase().includes(n))?' · '+sovEsc(p.orig):'';
  return `
  <div class="sr-item sr-item--person" data-srid="${sovEsc(p.id)}" data-href="${sovEsc(p.href)}" data-title="${sovEsc(p.name)}">
    <img class="sr-photo" src="${p.photo}" alt="" loading="lazy">
    <div style="min-width:0">
      <p class="sr-title">${sovMark(p.name,n&&n.length>1?n:null)}</p>
      <p class="sr-meta">Персона · ${sovEsc(p.role)}${altLine}</p>
    </div>
    <span class="sr-tag">${p.roles} ${sovPlural(p.roles,'роль','роли','ролей')}</span>
  </div>`;
}
function srColl(c,n){
  const cover=sovCollCover(c.tids);
  return `
  <div class="sr-item sr-item--coll" data-srid="${sovEsc(c.id)}" data-href="/collections/?c=${sovEsc(c.id)}" data-title="${sovEsc(c.name)}">
    ${cover?`<img src="${cover}" alt="" loading="lazy">`:'<span class="sr-cover--ph"></span>'}
    <div style="min-width:0">
      <p class="sr-title">${sovMark(c.name,n&&n.length>1?n:null)}</p>
      <p class="sr-meta">Подборка · ${c.n} ${sovPlural(c.n,'тайтл','тайтла','тайтлов')}${c.author?' · '+sovEsc(c.author):''}</p>
    </div>
    <span class="sr-likes">${SOV_HEART_ICO}${c.likes}</span>
  </div>`;
}
function srExact(list,label){
  return `<div class="sr-exact">
    <p class="sre-label">${SOV_LINK_ICO}${label}</p>
    ${list.map(t=>srItem(t,null,true)).join('')}
  </div>`;
}
function srMiss(label,text){
  return `<div class="sr-exact sr-exact--miss">
    <p class="sre-label">${SOV_LINK_ICO}${label}</p>
    <p class="sre-miss">${text}</p>
  </div>`;
}
const sovExamplesHtml=()=>{
  return `<p class="sov-label">Демо-примеры</p>
    <div class="sov-chips">${SOV_EXAMPLES.map(x=>`<button class="sov-chip" data-q="${sovEsc(x.q)}">${sovEsc(x.q)} · ${x.cap}</button>`).join('')}</div>`;
};
/* сколько строк каждой группы показываем в дропдауне: тайтлов 5 —
   при 6 список в видимой части обрезается, а «Персоны»/«Подборки»
   уходят под прокрутку; счётчик в заголовке группы показывает,
   сколько всего совпадений */
const SOV_T_CAP=5,SOV_P_CAP=2,SOV_C_CAP=3;
/* синхронный расчёт выдачи: возвращает html для #sovBody (без записи
   в DOM — им пользуются и спиннер-обёртка, и досрочный Enter) */
function sovFinalHtml(q){
  const p=sovParse(q);
  if(p.kind==='empty'){
    const recents=sovRecent.length?`
      <p class="sov-label">Недавние запросы</p>
      <div class="sov-chips">${sovRecent.map(r=>`<button class="sov-chip" data-q="${sovEsc(r)}">${sovEsc(r)}</button>`).join('')}<button class="sov-chip sov-chip--clear" data-clear="1">очистить</button></div>`:'';
    return `
      ${recents}
      <p class="sov-label">Популярно сейчас</p>
      <div>${SDB_POP.map(id=>SDB.find(t=>t.id===id)).filter(Boolean).map(t=>srItem(t,null,false)).join('')}</div>
      <p class="sov-label">Поиск понимает ID и ссылки</p>
      <div class="sov-chips">${SOV_EXAMPLES.map(x=>`<button class="sov-chip" data-q="${sovEsc(x.q)}">${sovEsc(x.q)} · ${x.cap}</button>`).join('')}</div>
      <p class="sov-hint">Ссылки и ID Кинопоиска и Shikimori открывают тайтл напрямую; в демо-базе распознаны ID известных тайтлов. Персоны ищутся по имени и роли, подборки — по названию и автору.</p>`;
  }
  let html='';
  if(p.kind==='kp'||p.kind==='shiki'){
    const src=p.kind==='kp'?'Кинопоиска':'Shikimori';
    const found=sovByExt(p.kind,p.id);
    html+=found.length
      ?srExact(found,`Ссылка ${src} распознана · ${p.path}`)
      :srMiss(`Ссылка ${src} распознана · ${p.path}`,
        `В демо-базе нет тайтла с таким ID — в реальном сервисе ссылка открыла бы его страницу с ${src}. Попробуйте демо-примеры ниже.`);
  }else if(p.kind==='num'){
    const found=[...sovByExt('kp',p.id),...sovByExt('shiki',p.id)];
    html+=found.length
      ?srExact(found,`Внешний ID · ${p.id}`)
      :srMiss(`Внешний ID · ${p.id}`,
        `Такого ID нет в демо-базе. Это может быть номер с Кинопоиска или Shikimori — вставьте ссылку целиком или попробуйте примеры ниже.`);
  }else if(p.kind==='badlink'){
    html+=srMiss('Ссылка не распознана',
      `Это адрес ${p.host}, но номер тайтла в нём не виден. Нужна ссылка на страницу тайтла: kinopoisk.ru/film/258687 или shikimori.one/animes/16498.`);
  }
  if(p.kind==='text'){
    const titles=sovByText(p);
    const pers=sovPersByText(p);
    const colls=sovCollsByText(p);
    const total=titles.length+pers.length+colls.length;
    let shown=0;
    if(titles.length){
      html+=`<p class="sov-label">Тайтлы · ${titles.length}</p>`
        +titles.slice(0,SOV_T_CAP).map(t=>srItem(t,p.norm)).join('');
      shown+=Math.min(titles.length,SOV_T_CAP);
    }
    if(pers.length){
      html+=`<p class="sov-label">Персоны · ${pers.length}</p>`
        +pers.slice(0,SOV_P_CAP).map(x=>srPerson(x,p.norm)).join('');
      shown+=Math.min(pers.length,SOV_P_CAP);
    }
    if(colls.length){
      html+=`<p class="sov-label">Подборки · ${colls.length}</p>`
        +colls.slice(0,SOV_C_CAP).map(c=>srColl(c,p.norm)).join('');
      shown+=Math.min(colls.length,SOV_C_CAP);
    }
    if(!total&&!html){
      html=`<p class="sov-empty">По запросу «${sovEsc(q)}» ничего не нашлось — попробуйте иначе</p>`;
    }else if(total>shown){
      html+=`<div class="sr-all" data-q="${sovEsc(q)}" role="button" tabindex="0" aria-label="Все результаты по запросу ${sovEsc(q)}">
        <span>Все результаты по запросу «${sovMark(q,q.trim().length>1?q.trim().toLowerCase():null)}»</span>
        <span class="sr-all-n">${total}</span>${SOV_ARROW_ICO}
      </div>`;
    }
  }
  if(/sr-exact--miss|sov-empty/.test(html))html+=sovExamplesHtml();
  if(!html)html='<p class="sov-empty">Ничего не нашлось</p>';
  return html;
}

/* ---------- индикатор загрузки ---------- */
/* Пока идёт запрос, по контуру всего блока поиска бежит световая
   волна — класс is-searching на .sov-panel (CSS: коническая
   градиентная дуга, замаскированная в кольцо по рамке). В теле
   дропдауна — тихая строка статуса и скелетон строк; тяжёлая
   карточка-спиннер из v3.3 убрана. Если по запросу ничего не
   нашлось, показываем второй этап «Расширяем поиск» (редкие и
   неточные совпадения) и только потом честное пустое состояние —
   формулировки нейтральные, без сторонних площадок. SOV_DELAY —
   обычный поиск, SOV_DELAY_EXT — расширенный; в проде на этом месте
   настоящие запросы к бэкенду, код рендера не меняется. Эту же пару
   констант использует страница результатов (/search/). */
const SOV_DELAY=420,SOV_DELAY_EXT=780;
function sovWave(on){
  const p=document.querySelector('.sov-panel');
  if(p)p.classList.toggle('is-searching',!!on);
}
function sovLoadRow(q,ext){
  const qq=(q||'').trim();
  const row='<div class="sov-sk-row"><span class="sov-sk-img"></span><span class="sov-sk-ln"><i></i><i></i></span><span class="sov-sk-side"></span></div>';
  return `<div class="sov-load${ext?' sov-load--ext':''}" role="status">
    <p class="sov-load-line">${ext?'Расширяем поиск':'Идёт поиск'}${qq?' «'+sovEsc(qq)+'»':''}…</p>
    <div class="sov-sk" aria-hidden="true">${row.repeat(3)}</div>
  </div>`;
}
let sovT1=null,sovT2=null,sovSeq=0;
function sovStop(){
  if(sovT1){clearTimeout(sovT1);sovT1=null}
  if(sovT2){clearTimeout(sovT2);sovT2=null}
}
/* поиск с индикатором: пустой запрос рисуется сразу (это не поиск),
   любой другой — волна по контуру + строка статуса → выдача; промах —
   то же + этап «Расширяем поиск» → пустое состояние; поздние вводы
   перезапускают таймеры */
function sovSearch(q){
  sovStop();
  if(sovParse(q).kind==='empty'){sovWave(false);$('#sovBody').innerHTML=sovFinalHtml(q);return}
  const seq=++sovSeq;
  sovWave(true);
  $('#sovBody').innerHTML=sovLoadRow(q,false);
  sovT1=setTimeout(()=>{
    if(seq!==sovSeq)return;
    const html=sovFinalHtml(q);
    if(/sov-empty|sr-exact--miss/.test(html)){
      $('#sovBody').innerHTML=sovLoadRow(q,true);
      sovT2=setTimeout(()=>{if(seq!==sovSeq)return;sovWave(false);$('#sovBody').innerHTML=html},SOV_DELAY_EXT);
    }else{sovWave(false);$('#sovBody').innerHTML=html}
  },SOV_DELAY);
}
/* Enter не ждёт загрузки: досрочно дорисовывает выдачу, чтобы правило
   «Enter — первый результат» работало и во время поиска */
function sovFlush(){
  if(!sovT1&&!sovT2)return;
  sovStop();sovSeq++;sovWave(false);
  $('#sovBody').innerHTML=sovFinalHtml(sovInput.value);
}

/* ---------- открытие / закрытие ---------- */
function openSearch(){
  hidePreview();
  closeStatusMenu();
  $('#searchOverlay').classList.remove('hidden');
  document.body.style.overflow='hidden';
  sovSearch(sovInput.value);
  setTimeout(()=>sovInput.focus(),40);
}
function closeSearch(){
  sovStop();sovSeq++;sovWave(false);
  $('#searchOverlay').classList.add('hidden');
  document.body.style.overflow='';
}
sovInput.addEventListener('input',()=>sovSearch(sovInput.value));
sovInput.addEventListener('keydown',e=>{
  if(e.key==='Enter'){
    sovFlush();
    const first=$('#sovBody .sr-item');
    if(first){sovSaveRecent(sovInput.value);first.click();}
  }
});
$('#sovClose').addEventListener('click',closeSearch);
safeOverlayClose($('#sovBack'),closeSearch);
$('#searchOpen').addEventListener('click',openSearch);
$('#hdrSearchIcon').addEventListener('click',openSearch);
$('#mobSearchBtn').addEventListener('click',openSearch);
/* полная страница результатов: липкая строка внизу дропдауна */
function sovOpenAll(q){
  sovSaveRecent(q);
  location.href='/search/?q='+encodeURIComponent(q);
}
$('#sovBody').addEventListener('click',e=>{
  const chip=e.target.closest('.sov-chip');
  if(chip){
    if(chip.dataset.clear){
      sovRecent.length=0;
      try{localStorage.removeItem('kuvion_sov_recent_v1')}catch(err){}
      sovSearch('');sovInput.focus();return;
    }
    sovInput.value=chip.dataset.q;sovSearch(chip.dataset.q);sovInput.focus();
    return;
  }
  const all=e.target.closest('.sr-all');
  if(all)sovOpenAll(all.dataset.q);
});
$('#sovBody').addEventListener('keydown',e=>{
  if(e.key==='Enter'){
    const all=e.target.closest('.sr-all');
    if(all)sovOpenAll(all.dataset.q);
  }
});
