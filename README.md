# CoLearning
Sistema de agendamento para aulas individuais

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

---

## Documentação 

Para instalar todas as dependências é necessário escrever o comando`npm install` no terminal dentro da pasta raiz do projeto.

Para rodar o servidor e visualizar o projeto basta colocar o comando `npm run dev` no terminal.

O projeto utiliza um banco de dados remoto, por isso, ao rodar o projeto ele já estará vinculado a ele. 

Caso queira alterar os dados, é possível conectar com outro banco de dados alterando as informações no arquivo `config.json`.

**OBS:** Nesse projeto foi utilizada a biblioteca `FullCalendar`. Então, para que os dados sejam mostrados corretamente eles precisam ser armazenados com a nomenclatura esperada pela biblioteca. 



