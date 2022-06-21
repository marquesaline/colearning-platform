//const alunos = require("../data/alunos.json");
const fs = require("fs");
const path = require("path");


//helper
const helper = {};

helper.read = filename =>
  fs.readFileSync(path.join(__dirname, `../data/${filename}`), "utf-8");

helper.write = (filename, data) =>
  fs.writeFileSync(
    path.join(__dirname, `../data/${filename}`),
    JSON.stringify(data, null, 2),
    "utf-8"
  );

  const getAlunos = () => JSON.parse(helper.read('alunos.json'))
  const getAlunoId = id => getAlunos().find(aluno => aluno.id == id)

// controller

const controller = {
  index: (req, res) => {
    res.render("aluno-index", { title: "Dashboard Admin" });
  },

  lista: async(req, res) => {
    const alunos = await getAlunos()
    res.render(`alunos`,{
      title: 'Lista de Alunos',
      alunos
    })
  },

  
  add: async(req, res) => {
    const aluno = await getAlunoId(req.params.id)
    res.json(aluno)
    //res.render("criar-usuarios", { title: "adicionar usuarios" });
  },
  
  create: async(req, res) => {
    const  alunoNovo = await {
      id: alunos[alunos.length - 1].id + 1,
      ...req.body,
    };
    const alunosAtualizados = [...alunos, alunoNovo];
    fs.writeFileSync(
      path.join(__dirname, "../data/alunos.json"),
      JSON.stringify(alunosAtualizados),
      "utf-8"
    );
    
    res.render("sucesso", {
      title: `Aluno ${alunoNovo.nome} adicionado com sucesso!`,
    });
  },

  edit: async(req, res) => {
    const aluno = await getAlunoId(req.params.id)
    res.render(`aluno-editar`,{
      title: 'Editar aluno',
      aluno
    })
  },
  update: async(req, res) => {
    const aluno = await getAlunoId(req.params.id)
    res.render(`aluno-editar`,{
      title: 'Update aluno',
      aluno
    })
  },
  
  delete: async(req, res) => {
    const aluno = await getAlunoId(req.params.id)
    res.json(aluno)
    //res.send(`alunos ${req.params.id}`);
  },
  id: async(req, res) => {
    const aluno = await getAlunoId(req.params.id)
    res.render(`aluno`,{
      title: `Aluno ${aluno.nome}`,
      aluno
    })
  },
};
module.exports = controller; /*elton*/
