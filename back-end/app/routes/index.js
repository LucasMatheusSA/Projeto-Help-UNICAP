const check = require ('./check');
const relatorioNotas = require ('./notas');
const login = require('./login')
const livros = require('./livros')

module.exports = function (app, db){
    check(app,db);
    relatorioNotas(app,db);
    login(app,db);
    livros(app,db);
}