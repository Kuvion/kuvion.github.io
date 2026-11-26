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
        {id:"aot",role:"Эрен Йегер",href:"kuvion-title-v2.html"},
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
