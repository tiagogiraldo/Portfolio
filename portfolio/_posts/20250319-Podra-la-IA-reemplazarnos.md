---
title: "Podrá la IA reemplazarnos"
excerpt: "Ensayo sobre los posibles efectos de la IA en trabajos de cuello blanco"
coverImage: "/images/posts/20250319_post/20250319_blog_image.png"
date: "2025-03-19T00:00:00.0000"
author:
  name: Santiago Giraldo
  picture: "/images/authors/Sgiraldo.jpeg"
ogImage:
  url: "/images/posts/20250319_post/20250319_blog_image.png"
---

# ¿Podrá la IA reemplazarnos?

## ¿La IA afectará nuestros trabajos?

Hace poco conversaba con una amiga sobre los efectos e implicaciones de los avances en la Inteligencia Artificial  (IA) en los negocios no relacionados con tecnología.  Después de conversar un rato sobre nuestras experiencias, llegamos a una conclusión, y es que, el principal punto en donde un negocio no tecnológico se verá beneficiado (o afectado) será en el campo de la productividad.  Aunque lo anterior es una verdad de perogrullo, y es algo que se lee en todos lados, no es tan claro cuando se refieren a labores o profesiones de “cuello blanco” o “de oficinas”,  como  por ejemplo, entender cómo una persona que se especializa en leer y digitar facturas de proveedores en un ERP, puede ser reemplazada por una aplicación de IA.

La conversación surgió porque le mostré unos experimentos que hice con la api de [_*Perplexity*_](https://www.perplexity.ai/hub/blog/introducing-the-sonar-pro-api).  Esta api es un tipo de programa que llaman IA [_*“razonadora”*_](https://sebastianraschka.com/blog/2025/understanding-reasoning-llms.html), es decir, es un modelo capaz de resolver cuestiones complejas, o realizar análisis sobre diversas situaciones según las instrucciones y datos de entrada.  

Los ejercicios surgieron porque quería practicar escribiendo prompts o instrucciones para desarrollar con esta api.  Como no tenía un problema en particular, se me ocurrió que podría simular una actividad de un analista de una empresa de empleos o de gestión humana, como la de revisar la experiencia de una persona basado en su hoja de vida y evaluar la pertinencia de éste para un cargo en específico.  Para los ensayos desarrollé unos prompts que permitieran evaluar sí la persona en cuestión serviría o  no para unas ofertas, tal y como lo hace un profesional en éste campo.  En total hice 5 experimentos:

* El primero debía escribir un resumen del CV en un par de párrafos como máximo.

* El segundo debía extraer datos del CV en un formato JSON según unas pautas predefinidas.

* El tercer experimento debía evaluar la pertinencia de un candidato para un cargo.  Para éste ensayo, el postulante propuesto es adecuado o no para el puesto.  Por lo que se esperaba que la respuesta del modelo fuese negativa.

* El cuarto ensayo, evaluaría también si el perfil del candidato se ajustaba al cargo, pero está vez con un perfil conveniente para el cargo.  Además de evaluar el perfil de la persona para esa oferta, quise cambiar el lenguaje de la postulación de inglés al español y valorar las capacidades multilingües del modelo.

* El quinto experimento, quise repetir el mismo ejercicio anterior, pero ésta vez considerando la localización de la oferta de trabajo y la localización del postulante.

El diseño de estos ensayos obedecieron más a mi curiosidad, que a un diseño estadístico.  Buscaba más que todo, programar la api de tal manera que el modelo realizara unas acciones basados en los prompts que yo iba desarrollando por aprendizaje y gusto.  

## Primer Experimento - Resumen del CV

Con el primer experimento me pregunté: ¿Bueno, y sí yo le ingreso un documento como dato de entrada, el modelo qué información me devuelve?  ¿Éste es capaz de realizar un resumen del CV?  Para hacer esto tomé una hoja de vida de alguien que respeto y admiro, con un CV más que extenso, tanto en experiencia como en otras actividades como publicaciones y logros académicos.  La persona en cuestión es Maureen O'Hara, gran economista financiera y con una hoja de vida disponible en Internet.   El resultado fue positivo, efectivamente resumió el contenido de forma aceptable, tal y como se puede ver en la siguiente imagen:

`
Here is a concise summary of the key information from Maureen O'Hara's curriculum vitae: Maureen O'Hara is the Robert W. Purcell Professor of Finance at Cornell University's Johnson Graduate School of Management. She holds a Ph.D. in Finance from Northwestern University and has received honorary doctorates from three European universities. Her research focuses on market microstructure, and she has authored numerous influential publications in this field, including the book "Market Microstructure Theory". She has served as president of several major finance associations, including the American Finance Association. O'Hara has received many awards 
and honors for her research and teaching, including multiple Smith'
`

En general el resúmen parece estar bien, solo que al final trunca un nombre, en lugar de escribir “Smith” debió escribir “Smith Breeden Prize”.  La razón de ésta omisión se debe a la cantidad de tokens parametrizados en la instrucción que era de máximo 200.   Una vez modifiqué el valor, lo aumenté a 500, fue mejor el resultado:



`Maureen O'Hara is a prominent financial economist and professor at Cornell University. Key points about her background and career include`

`1. Current position: Robert W. Purcell Professor of Finance at Cornell University's Johnson Graduate School of Management.`

`2. Education: Ph.D. in Finance from Northwestern University, M.A. in Economics from Northwestern, and B.S. in Economics from the University of Illinois.`

`3. Research focus: Market microstructure, with recent work on ETFs, liquidity in corporate bond markets, and corporate governance in banks.`

`4. Authored numerous journal articles and books, including the influential "Market Microstructure Theory."`

`5. Held leadership positions in major finance associations, including President of the American Finance Association.`

`6. Received multiple awards and honors for her research and teaching.`

`7. Served on corporate and advisory boards, including TIAA and the National Bureau of Economic Research.`

`8. Extensive publication record covering various aspects of financial markets, trading, and regulation.`

`9. Active in professional activities, including editorial roles for top finance journals.`



Esta vez el resultado se fue mejor, solo que con un pequeño detalle, devolvió una lista y no un párrafo.  La respuesta cambió su forma de resumir, es decir, pasó de un párrafo a una lista.  Esto se puede  considerar como algo menor, pero es importante tener en cuenta este tipo de detalles en el momento de buscar reproducibilidad en los procedimientos.  De todas formas, el resumen es aceptable basado en el texto original. 

También la selección del máximo número de tokens, dependerá de la respuesta que se busque, especificar un número más alto puede significar mayores costos, mientras que un menor número podría dar respuestas incompletas.  Por lo que encontrar un número que haga un balance entre el costo y efectividad es importante en el momento de diseñar un producto con este tipo de herramientas.


## Segundo experimento - NER con la api 

El segundo experimento, trataba de algo más técnico, y era hacer lo que en Procesamiento de Lenguaje Natural (NLP) llaman Reconocimiento de Entidades Nombradas ([_*NER*_](https://www.ibm.com/think/topics/named-entity-recognition)).  Ésta es una técnica para extraer datos característicos de un párrafo o texto con unos objetivos específicos definidos por quien realiza el reconocimiento de las entidades.

Por ejemplo para un texto como éste: “Mi nombre es Juan Peréz y tengo 25 años.  Nací en Jardín, Antioquia, Colombia”.  Uno podría extraer el nombre de la persona: “Juan Peréz”, la edad: 25, el lugar de nacimiento: “Jardín”, el departamento: “Antioquia”  y país: “Colombia” desde el texto.   Normalmente, al menos yo, utilizo un módulo de Python llamada Spacy, que permite mediante una serie de pasos y procesos extraer estas características.  Éste módulo no es tampoco infalible, y a veces es engorroso de programar según lo que se esté buscando extraer de un documento.  

Aunque algunos no recomiendan emplear estos modelos para hallar entidades nombradas porque subutilizan el programa, pueden ser muy eficientes y, dada la comoditización de estas herramientas, depronto desarrollar un prompt puede ser más eficaz que desarrollar un código para hacer un NER desde un punto de vista costo-beneficio. De todas formas, creo que sí puede ser muy interesante ver si es posible sí a través de una api como la de Perplexity se puede extraer información sin mayores complicaciones.  

Para tener una estructura de datos coherente y organizada, decidí que la forma debía ser algo parecido a un diccionario de Python, y creo que la más óptima sería estructurar las entidades nombradas como un json.  El resultado de éste ejercicio se muestra a continuación:

```
Successfully parsed JSON:
{
  "name": "Maureen O'Hara",
  "summary": "Maureen O'Hara is a distinguished finance professor and researcher with extensive experience in market microstructure, financial regulation, and corporate governance. She has held prominent positions at Cornell University and other institutions, authored influential books and research papers, and received numerous awards for her contributions to financial economics. O'Hara has served as president of major finance associations and held board positions at financial firms and organizations. Her expertise spans areas such as high-frequency trading, cryptocurrency markets, and corporate bond trading.",
  "experience": [
    {
      "company": "Cornell University",
      "position": "Robert W. Purcell Professor of Finance and Professor of Economics",
      "duration": "1979 - current"
    },
    {
      "company": "University of Technology Sydney",
      "position": "Professor of Finance",
      "duration": "2016 - 2021"
    },
    {
      "company": "University of Paris-Dauphine",
      "position": "Visiting Professor of Finance",
      "duration": "2006"
    },
    {
      "company": "Hong Kong University of Science and Technology",
      "position": "Visiting Professor of Finance",
      "duration": "2000"
    },
    {
      "company": "University of New South Wales",
      "position": "Visiting Professor of Finance",
      "duration": "1996"
    },
    {
      "company": "London Business School",
      "position": "Visiting Professor of Finance",
      "duration": "1994, 1995"
    },
    {
      "company": "University of Cambridge",
      "position": "Overseas Fellow, Churchill College",
      "duration": "1993-1994"
    },
    {
      "company": "University of California, Los Angeles",
      "position": "Visiting Associate Professor of Finance",
      "duration": "1985-1986"
    }
  ],
  "city": "Ithaca",
  "country": "United States",
  "current_job": "Robert W. Purcell Professor of Finance and Professor of Economics at Cornell University",
  "employers": [
    "Cornell University",
    "University of Technology Sydney",
    "University of Paris-Dauphine",
    "Hong Kong University of Science and Technology",
    "University of New South Wales",
    "London Business School",
    "University of Cambridge",
    "University of California, Los Angeles"
  ],
  "keywords": [
    "Finance",
    "Market Microstructure",
    "Financial Regulation",
    "Corporate Governance",
    "High-Frequency Trading",
    "Cryptocurrency",
    "Corporate Bond Trading",
    "Asset Pricing",
    "Financial Markets",
    "Banking"
  ],
  "education": [
    {
      "degree": "Ph.D.",
      "field": "Finance",
      "institution": "Kellogg Graduate School of Management, Northwestern University",
      "year": "1979"
    },
    {
      "degree": "M.A.",
      "field": "Economics",
      "institution": "Northwestern University",
      "year": "1976"
    },
    {
      "degree": "B.S.",
      "field": "Economics",
      "institution": "University of Illinois",
      "year": "1975"
    }
  ],
  "awards": [
    "Quant Researcher of the Year, Journal of Portfolio Management, 2023",
    "James R. Vertin Award, CFA Institute, 2020",
    "Fellow, American Finance Association, 2002",
    "FMA Fellow, Financial Management Association, 2000",
    "Distinguished Scholar Award, Eastern Finance Association, 2013",
    "Smith-Breeden Prize for Distinguished Paper in the Journal of Finance, 2003, 2002, 2000",
    "William F. Sharpe Award for Scholarship in Financial Research, 2016",
    "Peter L. Bernstein Award for the Best Article published in the Institutional Investor Journals, 2017"
  ]
}
```

Como puede verse de los datos de salida, la estructura puede servir para alimentar una base de datos relacional o NoSQL.  Sí yo por ejemplo recibo día a día cientos de aplicaciones, y no tengo automatizado el proceso como pasa en muchos departamentos o áreas de gestión humana, automatizar las tareas de esta forma puede ser un avance importante en temas de productividad, y seguramente a un menor costo.

## Tercer experimento - Pertinencia de una persona para un cargo basado en su CV - Rechazo del CV. 

Con el tercer experimento quería saber sí al pasarle un archivo (estructura) json y una oferta de trabajo como datos de entrada, el modelo es capaz de analizar la pertinencia de la persona para ese puesto.  De este ensayo se espera que la recomendación sea negativa, pues el perfil de la persona (que se utilizó) no es apto para la oferta laboral propuesta, pues está sobrecalificada y tiene una experiencia muy diferente a la requerida.

Como datos de entrada en la descripción del trabajo se puso el título de la oferta que me hizo este intermediario, me inventé una descripción acorde a ese título, y como fuente del texto de la hoja de vida, usé el json obtenido anteriormente para la profesora de economía.  


{
  job_title = "Auxiliar de ventas en panadería",
  job_description = 
    """
      Responsabilidades:
      - Atender a los clientes y procesar ventas
      - Mantener el área de ventas limpia y organizada
      - Ayudar en la preparación y presentación de productos
      - Manejar transacciones en efectivo y con tarjeta
      - Trabajar en horarios flexibles, incluyendo mañanas tempranas y fines de semana

      Requisitos:
        - Experiencia previa en ventas o atención al cliente (preferible)
        - Habilidades matemáticas básicas
        - Excelentes habilidades de comunicación en español
        - Capacidad para trabajar en equipo
        - Actitud positiva y orientada al servicio
    """
}

Hay varios problemas en esta descripción, los nombres de las variables están en inglés, pero el contenido está en español.  Lo hice a propósito, pero no revistió mayor problema.  El programa identificó perfectamente el contenido.  Se le instruyó para que tomara estos datos de entrada junto con la CV  en formato json para que escribiera un análisis de la pertinencia de la persona para ese cargo.  El resultado es el siguiente:


`Based on the provided information about Maureen O'Hara and the requirements for the "Auxiliar de ventas en panadería" position, I can provide the following assessment:`

`1. Relevant work experience: The candidate has no relevant experience in retail sales or bakery work. Her extensive  background is in finance and academia.`

`2. Required skills:`
`  - Customer service: No evident experience`
`  - Basic math skills: Likely strong given her finance background`
`  - Teamwork: Possibly developed through academic collaborations`
`  - Positive attitude: Unable to assess from given information`

`3. Language proficiency:`
`  No information provided about Spanish language skills, which are crucial for this role.`

`4. Education and qualifications:`
`  The candidate is highly overqualified with a Ph.D. in Finance and multiple professorships.`

`5. Additional beneficial skills:`
`  Her background in finance might be useful for handling transactions and managing inventory, but is largely irrelevant for this position.`


`Strengths:`
  `- Highly educated and likely possesses strong analytical skills`
  `- Probably has excellent mathematical abilities`

`Weaknesses:`
`  - No relevant experience in retail or food service`
`  - Overqualified for the position`
`  - Unknown Spanish language proficiency`
`  - Career focus entirely different from the required role`


`Recommendation:`
`Maureen O'Hara is not suitable for the position of "Auxiliar de ventas en panadería". Her background in high-level finance and academia does not align with the requirements of an entry-level bakery sales position. The role requires specific skills in customer service, retail sales, and potentially food handling, none of which are evident in her profile. Additionally, her overqualification might lead to dissatisfaction in this role.`

`Suitability rating: 1/10`

`The extremely low rating is due to the complete mismatch between the candidate's profile and the job requirements, as well as the lack of relevant experience and unknown Spanish language skills, which are crucial for this position in a Spanish-speaking environment.`


Sorprendentemente rechaza a esta persona para el cargo, evalúa su experiencia con respecto a los requerimientos, tiene en consideración las credenciales académicas y los requisitos para el cargo, y analiza si la persona puede o no ejecutar el trabajo dado que el CV está escrito en inglés, y la propuesta laboral en español.  El resultado, como es de esperarse con los avances en desarrollos de la IA generativa, el algoritmo hizo una evaluación adecuada. 

Un aspecto interesante es la calificación que le da a la persona, eso no se le pidió en el prompt y lo agregó como parte de su análisis.  Para mi esto es un problema pues es un análisis subjetivo, y no tiene unas reglas o criterios de puntuación que le permitan a uno decir que está bien o no esa calificación.   Resultados como estos deberían ser evaluados en el momento de desarrollar un proceso como este.


## Cuarto experimento - Pertinencia de una persona para un cargo basado en su CV - Aceptación del CV. 

Para este experimento, busqué que hubiera una concordancia entre el postulante y el perfil del cargo.  Pero además, hice una variación en el lenguaje de la respuesta.  Se esperaba un resultado positivo y además en español, pues en el ensayo anterior la respuesta dada por el modelo estaba en inglés.  Para este experimento, en lugar de agregar un súper CV, me inventé uno que fuera más sencillo y acorde con la experiencia requerida en el perfil de la oferta:

```
applicant_data = """
{
    "name": "Maria González",
    "experience": [
        {
            "position": "Cajera",
            "company": "Supermercado Local",
            "duration": "2 años"
        },
        {
            "position": "Asistente de Cafetería",
            "company": "Café del Barrio",
            "duration": "1 año"
        }
    ],
    "education": "Bachillerato completo",
    "skills": ["Atención al cliente", "Manejo de caja", "Trabajo en equipo"],
    "languages": ["Español (nativo)"],
    "availability": "Flexible, incluyendo fines de semana"
}
"""
```


Ejecutando entonces el nuevo código, se produce esta respuesta:


`Evaluación del candidato Maria González para el puesto de Auxiliar `
`de ventas en panadería:`

`1. Experiencia laboral relevante:`
`Maria tiene experiencia relevante como cajera en un supermercado y asistente de cafetería, lo cual es beneficioso para el puesto de auxiliar de ventas en panadería. Su experiencia en atención al cliente y manejo de caja es directamente aplicable[1][2].`

`2. Habilidades requeridas:`
`Las habilidades de Maria en atención al cliente, manejo de caja y trabajo en equipo se alinean bien con los requisitos del puesto[2].`

`3. Dominio del idioma:`
`Maria es hablante nativa de español, lo cual cumple con el requisito de excelentes habilidades de comunicación en español[2].`

`4. Educación y cualificaciones:`
`Maria ha completado el bachillerato, lo cual es suficiente para este puesto[2].`

`5. Habilidades adicionales beneficiosas:`
`Su experiencia en cafetería podría ser útil para ayudar en la preparación y presentación de productos de panadería[1].`

`Fortalezas:`
`  - Experiencia relevante en atención al cliente y manejo de caja`
`  - Habilidades alineadas con los requisitos del puesto`
`  - Dominio nativo del español`
`  - Disponibilidad flexible, incluyendo fines de semana`

`Debilidades:`
`  - No se menciona experiencia específica en panadería`
`  - No se indican habilidades matemáticas explícitamente`

`Recomendación:`
`Maria González parece ser una candidata adecuada para el puesto de Auxiliar de ventas en panadería. Su experiencia en atención al cliente, manejo de caja y trabajo en cafetería la preparan bien para las responsabilidades del puesto. Su disponibilidad flexible es un punto a favor, considerando los horarios requeridos.`

`Calificación de idoneidad: 8/10`

`Maria tiene una base sólida para el puesto, aunque podría beneficiarse de una breve capacitación específica en productos de panadería. Se recomienda considerarla para una entrevista y posiblemente una prueba práctica para evaluar sus habilidades en un entorno de panadería.`


Lo anterior prueba que una IA generativa, es capaz de discernir, basado en sus datos de entrada y parámetros dados  en las instrucciones que el candidato si cumple con los requisitos del cargo.  Devuelve un resumen en español como se le pidió en el código, y además le agrega una calificación, algo que no considero correcto por lo expuesto anteriormente.


## Quinto experimento - Pertinencia de una persona para un cargo basado en su CV  y en la localización de la oferta y la residencia del postulante. 

Con este último ejercicio quería agregarle algo al código que permitiera evaluar la localización geográfica tanto de la oferta como la residencia de quien se postula para ese cargo.  El modelo debería ser capaz de discernir que ambas localizaciones son diferentes, y con base en eso dar una respuesta acorde con dicha situación.

Para poder recrear esta situación cree una nueva oferta y un cv en formato json distinto a los usados anteriormente.   También hice una pequeña modificación en las instrucciones que de manera explícita considerara los aspectos geográficos de la oferta y la residencia del que aplica a ésta.  A continuación muestro los datos de entrada:

`job_title = "Barman en Club en Bogotá"`
`job_description = """`
`Responsabilidades:`
`  - Preparar y servir bebidas alcohólicas y no alcohólicas en un ambiente de club nocturno`
`  - Mantener el área del bar limpia y organizada`
`  - Manejar transacciones en efectivo y con tarjeta`
`  - Verificar la identificación de los clientes para asegurar el cumplimiento de la edad legal para beber`
`  - Trabajar en horarios nocturnos y fines de semana`
`  - Mantener un inventario preciso de las existencias del bar`

`Requisitos:`
`  - Experiencia previa como barman o en servicios de bar (preferible)`
`  - Conocimiento de cócteles clásicos y modernos`
`  - Excelentes habilidades de comunicación en español`
`  - Capacidad para trabajar en un ambiente de ritmo rápido`
`  - Actitud positiva y orientada al servicio al cliente`
`  - Disponibilidad para trabajar en horarios nocturnos y fines de semana en Bogotá"""`

```
applicant_data = """
{
    "name": "Pedro Pérez",
    "residence": "Cartagena, Colombia",
    "experience": [
        {
            "position": "Barman",
            "company": "La Cervecería",
            "location": "Cartagena, Colombia",
            "duration": "2 años"
        },
        {
            "position": "Asistente de Catering",
            "company": "Eventos Elegantes",
            "location": "Medellín, Colombia",
            "duration": "1 año"
        },
        {
            "position": "Mesero",
            "company": "Restaurante El Sabor",
            "location": "Bogotá, Colombia",
            "duration": "1 año y 6 meses"
        }
    ],
    "education": "Curso de Bartender Profesional, Escuela de Coctelería de Bogotá",
    "skills": ["Preparación de cócteles", "Atención al cliente", "Manejo de caja", "Trabajo en equipo"],
    "languages": ["Español (nativo)", "Inglés (básico)"],
    "availability": "Disponible para horarios nocturnos y fines de semana"
}
"""
```

La respuesta dada por el modelo en éste experimento fue:


`Evaluación del candidato Pedro Pérez para el puesto de Barman en Club en Bogotá:`

`1. Experiencia laboral relevante:`
`Pedro tiene 2 años de experiencia como barman, lo cual es directamente relevante para el puesto. También cuenta con experiencia en catering y como mesero, que aportan habilidades transferibles al trabajo de barman.`

`2. Habilidades requeridas:`
`El candidato posee habilidades clave como preparación de cócteles, atención al cliente, manejo de caja y trabajo en equipo, que son esenciales para el puesto.`

`3. Dominio del idioma:`
`Pedro es nativo en español, lo cual cumple con el requisito de excelentes habilidades de comunicación en español.`

`4. Educación y cualificaciones:`
`Ha completado un Curso de Bartender Profesional, lo que demuestra formación específica en el área.`

`5. Habilidades adicionales beneficiosas:`
`Su experiencia en catering podría ser útil para eventos especiales en el club.`

`6. Ubicación:`
`Pedro reside actualmente en Cartagena, lo que podría ser un inconveniente para un trabajo en Bogotá.`

`Fortalezas:`
`  - Experiencia relevante como barman`
`  - Formación específica en bartending`
`  - Habilidades clave para el puesto`
`  - Disponibilidad para horarios nocturnos y fines de semana`

`Debilidades:`
`  - Reside en una ciudad diferente a la del trabajo`
`  - Nivel básico de inglés (aunque no es un requisito explícito)`

`Recomendación:`
`Pedro Pérez parece ser un candidato adecuado para el puesto de Barman en Club en Bogotá. Su experiencia, formación y habilidades se alinean bien con los requisitos del puesto. Sin embargo, su ubicación actual en Cartagena podría ser un obstáculo significativo.`

`Calificación de idoneidad: 7/10`

`La calificación refleja sus cualificaciones sólidas, pero se ve afectada por la cuestión `
`de la ubicación. Si Pedro está dispuesto a reubicarse a Bogotá, podría ser un excelente candidato para el puesto.`


El modelo reconoce que el personaje evaluado puede realizar este trabajo, y además concluye que vive en un lugar diferente a la localización de la vacante ofrecida.  

Aquí considero importante resaltar un hecho, el cargo solo menciona el lugar de la oferta en la descripción del mismo, no hay una instrucción directa que en la que se mencione que es en Bogotá, caso contrario para el postulante que tiene declarada de forma explícita que vive en Cartagena, con un ingrediente adicional, en su experiencia y estudios agregué que la persona había estudiado en Bogotá y había trabajado en otras ciudades diferentes a las de la oferta y la residencia.  Esto me parece muy interesante, porque es una situación que normalmente notaría un analista dedicado a esto, y es más difícil que lo haga un programa.


## Reflexiones sobre los experimentos

Con estos ensayos, traté de emular unas tareas que hace un analista de gestión humana.  Los experimentos, si bien no fueron exhaustivos, si muestran con diversos casos las capacidades de estos modelos razonadores.  No hubo entrenamiento ni fine tuning de ningún tipo, por lo que se utilizó el modelo de forma directa e inmediata, y esto tiene un valor importante en el momento de evaluar la factibilidad y puesta en producción de automatizaciones de tareas en un negocio, pues disminuye las barreras de entrada para la aplicación de estos programas.

Estos ejercicios pueden dar una intuición de cómo pueden ser automatizadas tareas en el día a día de los negocios.  Esto se puede extrapolar a muchas áreas de trabajos administrativos.  Es claro que para poder poner esto en práctica de forma masiva hay que realizar muchas más pruebas, pero la puesta en producción no es tan difícil como se podría pensar en un principio, resultando en una mejora en la productividad significativa en donde se apliquen estas tecnologías de manera adecuada.

Es importante también resaltar que existen muchos puestos de trabajos que hacen este tipo de tareas de forma continuada por personas dedicadas casi que exclusivamente a labores de este tipo, y eso puede tener consecuencias indeseadas en términos de menor contratación laboral, si se implementan soluciones relacionadas con lo escrito en el blog.  Y son cuestiones que los políticos de turno no toman con la serenidad y análisis suficientes.  Esto lo digo porque el progreso no lo detiene uno, normalmente es orgánico, y viene de una forma desapercibida para los individuos, quienes no se dan cuenta de lo que les està sucediendo hasta que pasa, como la rana que es hervida lentamente en una cacerola sin darse cuenta que la están cocinando. Es necesario entonces una reflexión profunda y propuestas políticas económicas sobre los posibles impactos que permitan el avance de todos, replantear trabajos y replantear capacidades de las personas que se quedan atrás como consecuencia de estos avances tecnológicos.  


El código se encuentra disponible en la siguiente dirección: [_*Notebook*_](https://github.com/tiagogiraldo/blog_posts/blob/main/20250319_post/20250319_Blog_CV_Analyst.ipynb)

Para poder replicar el notebook es necesario estar suscrito a la api para poder acceder a las credenciales que permitan el uso de la misma.





