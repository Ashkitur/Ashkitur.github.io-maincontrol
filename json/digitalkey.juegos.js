const juegos = [
  {
    "id": 1,
    "nombre": "Beyond Two Souls",
    "precio": 7500,
    "stock": true,
    "disponibilidad": "Solo online",
    "portada": "img\\ImagenesJuegos\\ImagenesCaratulas\\BTS.jpg",
    "descripcion": "Thriller psicológico con actuaciones de Elliot Page y Willem Dafoe, ambientado en un misterio sobrenatural.",
    "plataformas": [
      "PC"
    ],
    "imagenes": [
      "img\\ImagenesJuegos\\ImagenesExtras\\BEYONDTWOSOULS\\beyond1.jpg",
      "img\\ImagenesJuegos\\ImagenesExtras\\BEYONDTWOSOULS\\beyond2.jpg",
      "img\\ImagenesJuegos\\ImagenesExtras\\BEYONDTWOSOULS\\beyond3.jpg"
    ],
    "resenas": {
      "comentarios": [
        {
          "usuario": "Ashley",
          "texto": "Me gusta mucho, lo volveria a jugar",
          "calificacion": 5
        },
        {
          "usuario": "Mathw",
          "texto": "No me gusto, lo borre",
          "calificacion": 2
        }
      ]
    }
  },
  {
    "id": 2,
    "nombre": "Club Penguin: Elite Penguin Force",
    "precio": 2700,
    "stock": true,
    "disponibilidad": "Solo online",
    "portada": "img\\ImagenesJuegos\\ImagenesCaratulas\\CP.jpg",
    "descripcion": "Juego de aventuras para Nintendo DS basado en el popular mundo de Club Penguin.",
    "plataformas": [
      "NintendoSwitch"
    ],
    "imagenes": [
      "img\\ImagenesJuegos\\ImagenesExtras\\CLUBPENGUIN\\CP1.jpg",
      "img\\ImagenesJuegos\\ImagenesExtras\\CLUBPENGUIN\\CP2.jpg",
      "img\\ImagenesJuegos\\ImagenesExtras\\CLUBPENGUIN\\CP3.jpg"
    ],
    "resenas": {
      "comentarios": [
        {
          "usuario": "Eduardo",
          "texto": "Ta pichudo",
          "calificacion": 4
        }
      ]
    }
  },
  {
    "id": 3,
    "nombre": "Grand Theft Auto V (GTA 5)",
    "precio": 15000,
    "stock": true,
    "disponibilidad": "Solo online",
    "portada": "img\\ImagenesJuegos\\ImagenesCaratulas\\GTA5.jpg",
    "descripcion": "Aclamado juego de acción y mundo abierto ambientado en Los Santos, con modo campaña y GTA Online.",
    "plataformas": [
      "PC"
    ],
    "imagenes": [
      "img\\ImagenesJuegos\\ImagenesExtras\\GTA5\\GTA51.png",
      "img\\ImagenesJuegos\\ImagenesExtras\\GTA5\\GTA52.png",
      "img\\ImagenesJuegos\\ImagenesExtras\\GTA5\\GTA53.png"
    ],
    "resenas": {
      "comentarios": [
        {
          "usuario": "Harold",
          "texto": "No puedo pasarme las motos",
          "calificacion": 3
        },
        {
          "usuario": "Caleb Picado",
          "texto": "Ninini tengo todas las armas y carros",
          "calificacion": 5
        }
      ]
    }
  },
  {
    "id": 4,
    "nombre": "Grand Theft Auto VI (GTA 6)",
    "precio": 40000,
    "stock": true,
    "disponibilidad": "Solo online",
    "portada": "img\\ImagenesJuegos\\ImagenesCaratulas\\GTA6.jpg",
    "descripcion": "GTA 6 narra la historia de la pareja criminal Lucía y Jason, quienes, tras un robo fallido, se ven envueltos en una conspiración criminal que se extiende por el estado de Leonida. Obligados a depender el uno del otro, deben navegar en el oscuro lado de lo que se conoce como el \"lugar más soleado de América\", parodiando la cultura de los influencers y la tecnología moderna de la década de 2020, para sobrevivir",
    "plataformas": [
      "PlayStation"
    ],
    "imagenes": [
      "img\\ImagenesJuegos\\ImagenesExtras\\GTA6\\GTA61.png",
      "img\\ImagenesJuegos\\ImagenesExtras\\GTA6\\GTA62.png",
      "img\\ImagenesJuegos\\ImagenesExtras\\GTA6\\GTA63.png"
    ],
    "resenas": {
      "comentarios": [
        {
          "usuario": "Saul Ramirez",
          "texto": "Ta medio mid, mejor heavy rain",
          "calificacion": 3
        },
        {
          "usuario": "Pablo",
          "texto": "Umineko",
          "calificacion": 1
        }
      ]
    }
  },
  {
    "id": 5,
    "nombre": "Halo (The Master Chief Collection)",
    "precio": 25000,
    "stock": true,
    "disponibilidad": "Solo online",
    "portada": "img\\ImagenesJuegos\\ImagenesCaratulas\\Halo.png",
    "descripcion": "Colección remasterizada del icónico héroe Master Chief, incluye varios juegos de la saga.",
    "plataformas": [
      "Xbox",
      "PC"
    ],
    "imagenes": [
      "img\\ImagenesJuegos\\ImagenesExtras\\HALO\\halo1.jpg",
      "img\\ImagenesJuegos\\ImagenesExtras\\HALO\\halo2.jpg",
      "img\\ImagenesJuegos\\ImagenesExtras\\HALO\\halo3.jpg"
    ],
    "resenas": {
      "comentarios": [
        {
          "usuario": "Harold",
          "texto": "Me encanta",
          "calificacion": 5
        },
        {
          "usuario": "Caleb",
          "texto": "No me gusta que el jefe tenga ropa",
          "calificacion": 4
        }
      ]
    }
  },
  {
    "id": 6,
    "nombre": "Super Mario Odyssey",
    "precio": 23000,
    "stock": true,
    "disponibilidad": "Solo online",
    "portada": "img\\ImagenesJuegos\\ImagenesCaratulas\\MARIOODYSSEY.jpg",
    "descripcion": "Aventura 3D global de Mario donde recorre distintos reinos acompañado de Cappy.",
    "plataformas": [
      "NintendoSwitch"
    ],
    "imagenes": [
      "img\\ImagenesJuegos\\ImagenesExtras\\MARIOODYSSEY\\MARIO1.jpg",
      "img\\ImagenesJuegos\\ImagenesExtras\\MARIOODYSSEY\\MARIO2.jpg",
      "img\\ImagenesJuegos\\ImagenesExtras\\MARIOODYSSEY\\MARIO3.jpg"
    ],
    "resenas": {
      "comentarios": [
        {
          "usuario": "Pedrito",
          "texto": "Pedazo juego",
          "calificacion": 5
        },
        {
          "usuario": "Carolina",
          "texto": "Toda a bowser",
          "calificacion": 4
        }
      ]
    }
  },
  {
    "id": 7,
    "nombre": "Hades",
    "precio": 7000,
    "stock": true,
    "disponibilidad": "Solo online",
    "portada": "img\\ImagenesJuegos\\ImagenesCaratulas\\Hades.jpg",
    "descripcion": "El jugador controla a Zagreus, el príncipe del Inframundo, que busca escapar del reino para alejarse de su padre sin amor, Hades, y llegar hasta su madre Perséfone en el mundo mortal .",
    "plataformas": [
      "PC",
      "Xbox",
      "NintendoSwitch"
    ],
    "imagenes": [
      "img\\ImagenesJuegos\\ImagenesExtras\\Hades\\Hades1.png",
      "img\\ImagenesJuegos\\ImagenesExtras\\Hades\\Hades2.png",
      "img\\ImagenesJuegos\\ImagenesExtras\\Hades\\Hades3.png"
    ],
    "resenas": {
      "comentarios": [
        {
          "usuario": "Daniel",
          "texto": "esta peaaak",
          "calificacion": 4
        }
      ]
    }
  },
  {
    "id": 8,
    "nombre": "Life Is Strange",
    "precio": 40000,
    "stock": true,
    "disponibilidad": "Solo online",
    "portada": "img\\ImagenesJuegos\\ImagenesCaratulas\\LifeIsStrange.jpg",
    "descripcion": "\"Life is Strange\" es un videojuego episódico de aventura gráfica que narra la historia de Maxine Caulfield, una estudiante de fotografía que descubre que puede retroceder en el tiempo. El juego se centra en la relación de Max con su amiga Chloe y en la investigación de la desaparición de una estudiante llamada Rachel Amber en el pueblo ficticio de Arcadia Bay, Oregón. Las decisiones que toma el jugador tienen consecuencias en la historia y pueden cambiar el destino de los personajes y el mundo que les rodea.",
    "plataformas": [
      "PC",
      "PlayStation"
    ],
    "imagenes": [
      "img\\ImagenesJuegos\\ImagenesExtras\\LIS\\lis1.png",
      "img\\ImagenesJuegos\\ImagenesExtras\\LIS\\lis2.png",
      "img\\ImagenesJuegos\\ImagenesExtras\\LIS\\lis3.png"
    ],
    "resenas": {
      "comentarios": [
        {
          "usuario": "Ashley",
          "texto": "Se me olvido poner la mitad de imagenes de los juegos que disque prepare",
          "calificacion": 4
        },
        {
          "usuario": "Eduardo",
          "texto": "Si me di cuenta cuando los estaba disque colocando en el json",
          "calificacion": 5
        },
        {
          "usuario": "Ashley",
          "texto": "Porta a mi",
          "calificacion": 3
        },
        {
          "usuario": "Eduardo",
          "texto": "Por eso se le sale un tendon",
          "calificacion": 2
        }
      ]
    }
  },
  {
    "id": 9,
    "nombre": "Mario Kart World",
    "precio": 39000,
    "stock": true,
    "disponibilidad": "Solo online",
    "portada": "img\\ImagenesJuegos\\ImagenesCaratulas\\MARIOKARTWORLD.jpg",
    "descripcion": "¡Lánzate a la carretera con Mario y sus amigos! Conduce a toda mecha por circuitos que abarcan un vasto mundo en el que todo está conectado. Recorre verdes llanuras, bulliciosas ciudades, grandes extensiones de agua, vetustos volcanes y un montón de lugares más... ¡junto con las zonas que lo unen todo! ¡En exclusiva para Nintendo Switch 2!",
    "plataformas": [
      "NintendoSwitch"
    ],
    "imagenes": [
      "img\\ImagenesJuegos\\ImagenesExtras\\MARIOKARTWORLD\\62f8f07d3eb0c9e90f7e4211cb73189a.jpg",
      "img\\ImagenesJuegos\\ImagenesExtras\\MARIOKARTWORLD\\06228e61ac1e27bf9170b917ae085ef6.jpg",
      "img\\ImagenesJuegos\\ImagenesExtras\\MARIOKARTWORLD\\cd064c5deb40d0faa4af8abdace07ecf.jpg"
    ],
    "resenas": {
      "comentarios": [
        {
          "usuario": "Eduardo",
          "texto": "Las imagenes no tienen nombres xd",
          "calificacion": 5
        }
      ]
    }
  },
  {
    "id": 10,
    "nombre": "Peak",
    "precio": 3400,
    "stock": true,
    "disponibilidad": "Solo online",
    "portada": "img\\ImagenesJuegos\\ImagenesCaratulas\\Peak.jpg",
    "descripcion": "\"Peak\" (PEAK) es un videojuego cooperativo de escalada donde los jugadores deben ascender una montaña en una isla misteriosa, superando obstáculos y peligros como el hambre, las lesiones y el terreno cambiante, en un intento por ser rescatados. El juego, desarrollado por Aggro Crab y Landfall, se caracteriza por su jugabilidad que requiere trabajo en equipo, comunicación y estrategias para sobrevivir, todo ello envuelto en un estilo visual de low-poly y con un toque cómico y absurdo.",
    "plataformas": [
      "PC"
    ],
    "imagenes": [
      "img\\ImagenesJuegos\\ImagenesExtras\\Peak\\Peak1.png",
      "img\\ImagenesJuegos\\ImagenesExtras\\Peak\\Peak2.png",
      "img\\ImagenesJuegos\\ImagenesExtras\\Peak\\Peak3.png"
    ],
    "resenas": {
      "comentarios": [
        {
          "usuario": "Ash",
          "texto": "La pelada de Kristel no se lo quiere comprar",
          "calificacion": 4
        }
      ]
    }
  },
  {
    "id": 11,
    "nombre": "Pokemon Purpura",
    "precio": 39000,
    "stock": true,
    "disponibilidad": "Solo online",
    "portada": "img\\ImagenesJuegos\\ImagenesCaratulas\\POKEMONPURPURA.jpg",
    "descripcion": "En Pokémon Violet conocerás al profesor Turo. Tu amiga Mencía es una Entrenadora Pokémon consumada y será tu confiable guía durante tus aventuras. Es el director de la academia. Como acabas de unirte a la academia, te enseñará todo lo que debes saber acerca de ella.",
    "plataformas": [
      "NintendoSwitch"
    ],
    "imagenes": [
      "img\\ImagenesJuegos\\ImagenesExtras\\POKEMONPURPURA\\PURPURA1.jpg",
      "img\\ImagenesJuegos\\ImagenesExtras\\POKEMONPURPURA\\PURPURA2.jpg",
      "img\\ImagenesJuegos\\ImagenesExtras\\POKEMONPURPURA\\PURPURA3.jpg"
    ],
    "resenas": {
      "comentarios": [
        {
          "usuario": "Hola",
          "texto": "Ya no se me ocurre que poner",
          "calificacion": 5
        }
      ]
    }
  },
  {
    "id": 12,
    "nombre": "Signalis",
    "precio": 7500,
    "stock": true,
    "disponibilidad": "Solo online",
    "portada": "img\\ImagenesJuegos\\ImagenesCaratulas\\Signalis.jpg",
    "descripcion": "Signalis es un juego de terror y supervivencia retrofuturista donde la Replica Elster despierta en una nave estrellada en un planeta desconocido y emprende un viaje a través de instalaciones sombrías en busca de su pareja perdida",
    "plataformas": [
      "PC"
    ],
    "imagenes": [
      "img\\ImagenesJuegos\\ImagenesExtras\\SIGNALIS\\signalis1.jpg",
      "img\\ImagenesJuegos\\ImagenesExtras\\SIGNALIS\\signalis2.jpg",
      "img\\ImagenesJuegos\\ImagenesExtras\\SIGNALIS\\signalis3.jpg"
    ],
    "resenas": {
      "comentarios": [
        {
          "usuario": "Ashley",
          "texto": "Ni cristo conoce esta vara",
          "calificacion": 4
        }
      ]
    }
  },
  {
    "id": 13,
    "nombre": "The Legend Of Zelda Breath of the Wild",
    "precio": 30000,
    "stock": true,
    "disponibilidad": "Solo online",
    "portada": "img\\ImagenesJuegos\\ImagenesCaratulas\\ZELDA.jpg",
    "descripcion": "En The Legend of Zelda: Breath of the Wild, Link despierta tras 100 años en un letargo sin recuerdos y debe explorar el vasto reino de Hyrule para recuperar su memoria y derrotar a Calamity Ganon, el mal que amenaza con destruir el mundo.",
    "plataformas": [
      "NintendoSwitch"
    ],
    "imagenes": [
      "img\\ImagenesJuegos\\ImagenesExtras\\ZELDA\\ZELDA1.jpg",
      "img\\ImagenesJuegos\\ImagenesExtras\\ZELDA\\ZELDA2.jpg",
      "img\\ImagenesJuegos\\ImagenesExtras\\ZELDA\\ZELDA3.jpg"
    ],
    "resenas": {
      "comentarios": [
        {
          "usuario": "Eduardo",
          "texto": "Lo podria jugar para siempre y nunca cansarme",
          "calificacion": 5
        }
      ]
    }
  },
  {
    "id": 14,
    "nombre": "Hollow Knight SilkSong",
    "precio": 30000,
    "stock": true,
    "disponibilidad": "Solo online",
    "portada": "img\\ImagenesJuegos\\ImagenesCaratulas\\SILKSONG.jpg",
    "descripcion": "En Hollow Knight: Silksong, los jugadores controlan a Hornet, quien es capturada y llevada al reino de Pharloom, un lugar \"embrujado por la seda y la canción\". Desde allí, Hornet emprende una peregrinación mortal, luchando contra una variedad de enemigos y bestias, descubriendo nuevos poderes y desentrañando misterios ancestrales mientras asciende hacia la cima del reino.",
    "plataformas": [
      "NintendoSwitch",
      "PC",
      "Xbox"
    ],
    "imagenes": [
      "img\\ImagenesJuegos\\ImagenesExtras\\SILKSONG\\5b9fc087bf001df7fb88a35abee918a1.jpg",
      "img\\ImagenesJuegos\\ImagenesExtras\\SILKSONG\\172cffcfeb9b7ec8f3a3a29564450ec1.jpg",
      "img\\ImagenesJuegos\\ImagenesExtras\\SILKSONG\\SILSONG3.jpg"
    ],
    "resenas": {
      "comentarios": []
    }
  },
  {
    "id": 15,
    "nombre": "ResidentEvilRE",
    "precio": 24000,
    "stock": true,
    "disponibilidad": "Solo online",
    "portada": "img\\ImagenesJuegos\\ImagenesCaratulas\\ResidentEvilRE.jpg",
    "descripcion": "un videojuego de Capcom que es una reimaginación del juego de 2005. El juego pone al agente del Servicio Secreto Leon S. Kennedy en una misión para rescatar a la hija del presidente de EE. UU. de una secta en una zona rural de España, con una historia actualizada, gráficos mejorados y jugabilidad modernizada.",
    "plataformas": [
      "PlayStation",
      "PC"
    ],
    "imagenes": [
      "img\\ImagenesJuegos\\ImagenesExtras\\RE4\\REMAKE1.jpg",
      "img\\ImagenesJuegos\\ImagenesExtras\\RE4\\REMAKE2.jpg",
      "img\\ImagenesJuegos\\ImagenesExtras\\RE4\\REMAKE3.jpg"
    ],
    "resenas": {
      "comentarios": []
    }
  }
];
