module.exports = function(app,db){
    app.post('/notas',(req,res)=>{

const cheerio = require('cheerio');
const request = require('request');

const LINK_UNICAP = 'http://www.unicap.br/PortalGraduacao/'; 


const data = {
	notas: [],
	dados:[],
	status: 0
}

const notas = [];


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

                const telaLogin = cheerio.load(html);
                var linkTelaNotas = telaLogin('form').attr('action');

                request.post(LINK_UNICAP + linkTelaNotas , {form:{'rotina':23}},function(erro,response,html){

                    if(!erro && response.statusCode == 200){
                        const telaNotas = cheerio.load(html);
                        telaNotas('td').each((i,el)=>{
                            if(i < 5){
                                data.dados.push(telaNotas(el).html());
                            }else{
                                if(telaNotas(el).html().indexOf("&#xA0;") == -1){
                                    notas.push(telaNotas(el).html());
                                }
                            }
                        })
                        for(var i = 0 ; i < notas.length ; i = i + 9){
                            data.notas.push(
                                {
                                    cod: notas[i],
                                    mat: notas[i + 1],
                                    turma: notas[i + 2],
                                    gq1: notas[i + 3],
                                    gq2: notas[i + 4],
                                    final: notas[i + 5],
                                    media: notas[i + 6],
                                }
                            )
                        }
                        console.log(data);
						res.send(data);

                    }else{
						data.status = 1;
                        res.send(data); // falha na tela de notas 
                    }
                })
            }else{
                data.status = 1;
                res.send(data); // falha na tela Home
            }
        })
    }else{
        data.status = 2;
        res.send(data); // falha na tela de login
    }
})

    console.log("Request Notas");

    })

}