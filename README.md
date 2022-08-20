# CoLearning
Sistema de agendamento para aulas individuais

## Tabela de conteúdos
=================
<!--ts-->
   * [Projeto](#projeto)
      * [Demonstração da aplicação](#demonstração-da-aplicação)
   * [Instalação](#instalação)
      * [Rodando o servidor](#rodando-o-servidor)
      * [Observações](#observações)
<!--te-->
## Projeto

O objetivo da plataforma **CoLearning** é permitir o agendamento de aulas individuais de um aluno com o seu professor.

Através dele o professor poderá: 

- [x] Se cadastrar como usuário
- [x] Criar agendas onde é possível escolher os dias e horários de disponibilidade
- [x] Visualizar e acessar as informações dos agendamentos dos alunos

Já os alunos poderão:
- [x] Visualizar e acessar as agendas criadas pelo professor
- [x] Agendar um horário de acordo com a disponibilidade do professor


O projeto foi realizado durante o curso de Desenvolvimento Web da Digital House. 


### Demonstração da aplicação
---

<img alt="calendario" title="#Calendário" src="/server/public/images/demo/calendario.png" />


## Instalação
Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:

- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org/en/). 

Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

##  Rodando o servidor

```bash
# Clone este repositório
$ git clone <https://github.com/marquesaline/colearning-platform.git>

Acesse a pasta do projeto no terminal/cmd

# Vá para a pasta server
$ cd server

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ nodemon run dev

# O servidor inciará na porta:3000 - acesse <http://localhost:3000>
```

## Observações 

O projeto utiliza um banco de dados remoto, por isso, ao rodar o projeto ele já estará vinculado a ele. 

Caso queira alterar os dados, é possível conectar com outro banco de dados alterando as informações no arquivo `config.json`.

**OBS:** Nesse projeto foi utilizada a biblioteca [FullCalendar](https://fullcalendar.io/). Então, para que os dados sejam mostrados corretamente eles precisam ser armazenados com a nomenclatura esperada pela biblioteca. 



