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
