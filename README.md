# Desafio Sharenergy-2023-01

Projeto fullstack

## 🚀 Começando

Essas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local para fins de desenvolvimento e teste.

Consulte **[Implantação](#-implanta%C3%A7%C3%A3o)** para saber como implantar o projeto.

<details>
  <summary><strong>👨‍💻 Tecnologias Utilizadas</strong></summary><br />
 
 * TypeScript
 * Node.js com framework Express
 * React.js
 * MongoDB
 * Tailwind CSS
 * Material-UI
 * Docker
 
 
 <details/>


### 📋 Pré-requisitos

Orientações específicas deste projeto

```
Banco de dados: MongoDB

Este projeto utiliza container docker para rodar, lembre-se de instalar o docker caso não tenha.

Lembre-se: este projeto está utilizando as portas "3001", "27017", "5173".

Apos clonar o repositório: Entre na branch "Windson-Donizeti-Macedo"

```

### 🔧 Instalação

Uma série de exemplos passo-a-passo que informam o que você deve executar para ter um ambiente de desenvolvimento em execução.


```
1 - Instale as dependências (npm install)
2 - Entre no diretorio do backend: "cd .\backend\"
3 - Rode os serviços shareenergy e shareenergy_db com o comando "docker-compose up -d"
4 - Entre no container docker para rodar a aplicação backend: "docker exec -it shareenergy bash" e execute o comando "npm run dev" apos isso,
instale as dependências dentro do container docker (npm install)
5 - configure as duas variaveis de ambiente em um arquivo .env:
SHAREENERGY_PASSWORD=sh@r3n3rgy
SECRET=0917B13A9091915D54B6336F45909539CCE452B3661B21F386418A257883B30A

6 - Para rodar a aplicação web: Entreno diretório cd .\frontend\ e execute o comando "npm run dev"
```
