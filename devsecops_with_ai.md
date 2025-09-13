# Projet DevSecOps & IA – PwC

Ce projet intègre **LiteLLM**, une application cliente, un **dashboard de sécurité**, et **n8n** afin de démontrer un flux complet **DevSecOps & Intelligence Artificielle** pour PwC.  
Il est conçu pour être lancé soit via **Docker**, soit en **local** sur la machine.

## Table des matières
- [Installation et démarrage du projet](#installation-et-démarrage-du-projet)
  - [1. Lancer LiteLLM](#1-lancer-litellm)
    - [Option 1 : Lancer avec Docker](#option-1--lancer-avec-docker)
    - [Option 2 : Lancer en local (sans Docker)](#option-2--lancer-en-local-sans-docker)
  - [2. Lancer l’application client](#2-lancer-lapplication-client)
  - [3. Lancer le dashboard sécurité](#3-lancer-le-dashboard-sécurité)
  - [4. Lancer n8n](#4-lancer-n8n)

## Installation et démarrage du projet

### 1. Lancer LiteLLM
LiteLLM peut être lancé de deux manières :  
- **Option 1 : via Docker (recommandé)**  
- **Option 2 : en local sur la machine PwC**

#### Option 1 : Lancer avec Docker
> Cette option est la plus simple et rapide pour déployer LiteLLM.

1. Assurez-vous d’être dans le répertoire du projet où se trouve le fichier `docker-compose.yml`.
2. Lancez la commande suivante :
   ```bash
   docker-compose up -d --build
   ```
LiteLLM sera disponible sur :  
👉 http://localhost:4000

#### Option 2 : Lancer en local (sans Docker)
Cette méthode est utile si vous souhaitez démarrer LiteLLM directement sur votre PC PwC sans conteneurisation.

1. Installer LiteLLM via pip :
   ```bash
   pip install litellm
   ```

2. Démarrer le serveur LiteLLM avec un modèle  
   Exemple avec le modèle ollama/llama2 :
   ```bash
   litellm --model ollama/llama2
   ```

3. Vérifier l’accès à l’API LiteLLM  
   Accédez à : http://localhost:4000

⚠️ **Remarque importante** :  
Pour utiliser un modèle Ollama, vous devez installer Ollama au préalable.

### 2. Lancer l’application client
Cette application permet d’interagir avec LiteLLM via une interface web.

1. Accédez au dossier du projet :
   ```bash
   cd prompt_Interface/
   cd frontend/
   ```

2. Lancez l’application :
   ```bash
   npm start
   ```

L’application sera disponible sur http://localhost:3000.  
Cette étape fonctionne avec LiteLLM lancé via Docker ou en local.

### 3. Lancer le dashboard sécurité
Le dashboard permet de visualiser les flux et la sécurité des appels IA.

1. Accédez au répertoire dédié :
   ```bash
   cd prompt_Interface/
   cd frontend/
   cd ai-flow-guard/
   ```

2. Démarrez le dashboard :
   ```bash
   npm run dev
   ```

Dashboard disponible sur http://localhost:5173.

### 4. Lancer n8n
n8n est utilisé pour l’orchestration et l’automatisation des workflows.

1. Lancez n8n via Git Bash :
   ```bash
   n8n
   ```

2. Accédez à l’interface web de n8n :  
   👉 http://localhost:5678

3. Importez votre workflow dans n8n.

4. Exécutez le workflow pour orchestrer vos tâches.

