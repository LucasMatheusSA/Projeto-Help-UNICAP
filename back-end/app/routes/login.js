module.exports = function(app,db){
    app.post('/login',(req,res)=>{

const cheerio = require('cheerio');
const request = require('request');

const LINK_UNICAP = 'http://www.unicap.br/PortalGraduacao/'; 

const data = {
    status: 0
}

const object = {
    'rotina': 1,
    'Matricula': req.body.matricula, 
    'Digito': req.body.digito, 
    'Senha': req.body.senha, 
}

request(LINK_UNICAP,function(erro,response,html){
    if(!erro && response.statusCode == 200){
        const telaLogin = cheerio.load(html);
        var linkTelaLogin = telaLogin('form').attr('action');
        

        request.post(LINK_UNICAP + linkTelaLogin ,{form:object},function(erro,response,html){

            if(!erro && response.statusCode == 200){
                res.send(data);// matricula e senha validos 
                
            }else{
                data.status = 2;
                res.send(data); // falha na tela Home
            }
        })
    }else{
        data.status = 1;
        res.send(data); // falha na tela de login
    }
})

    console.log("Request Login");

    })

}