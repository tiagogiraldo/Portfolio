---
title: "Cómo instalar Gemma3 en Google Colab."
excerpt: "Proceso de instalación de Gemma3 con la api de ollama en Google Colab"
coverImage: "/images/snipets/20250331_ollama/ollama.png"
date: "2025-03-31T00:00:00.0000"
author:
  name: Santiago Giraldo
  picture: "/images/authors/Sgiraldo.jpeg"
ogImage:
  url: "/images/snipets/20250331_ollama/ollama.png"
---

# Python | Gemma3 | LLM | ollama | Colab


1. Definir una gpu en el notebook.

2. Actualizar el linux de la máquina virtual, instalar pcutils e instalar la api de ollama

```python
!sudo apt update
!sudo apt install -y pciutils
!curl -fsSL https://ollama.com/install.sh | sh
```

3. Crear una función server para que no se bloque el código cuando se utilice:

```python

import threading
import subprocess
import time

def run_ollama_serve():
    Try:
        subprocess.Popen(["ollama", "serve"])
    except Exception as e:
        print(f"Error starting Ollama: {e}")

thread = threading.Thread(target=run_ollama_serve)
thread.start()
time.sleep(5)  # Allow service to initialize

```

4. Se descarga Gemma3:
```python
!ollama run gemma3:1b
```

Seleccioné el modelo de 1 billón de parámetros.  Sí se elimina el “:1b”  de la instrucción se descarga por defecto el modelo de 4 billones de parámetros.

5. Se instala langchain para ollama:

```python
!pip install langchain-ollama
```

6. Para validar si el modelo funciona se escribe la siguiente función:

```python
from langchain_core.prompts import ChatPromptTemplate
from langchain_ollama.llms import OllamaLLM
from IPython.display import Markdown
template = """
  Question{question}
  Answer: Let's think step by step.
  """
prompt = ChatPromptTemplate.from_template(template)
model = OllamaLLM(model="gemma3:1b")
chain = prompt | model
display(Markdown(chain.invoke({"question": "What is the meaning of life according to the Dead Milkmen?"})))
```

**Tech stack:** Python · LLM ·  Ollam · Langchain  ·  AI 