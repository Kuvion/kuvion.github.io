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
