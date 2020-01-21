module.exports = function(app,db){
    app.post('/livros',(req,res)=>{

const cheerio = require('cheerio');
const request = require('request');

const LINK_BIBLIOTECA = 'https://www1.unicap.br/pergamum3/Pergamum/biblioteca_s/php/login_usu.php'; 
const LINK_BIBLIOTECAa = 'https://www1.unicap.br/pergamum3/Pergamum/biblioteca_s/php/sessao.php?nomepessoa2=VICTOR+VASCONCELOS+VIANA&codigointeiro2=2016151454&codigoreduzido2=2016151454&flag='; 

const data = {
    livros:[],
	status: 0
}


const object = {
    'flag': 'index.php',
    'login': req.body.matricula,
    'password': req.body.senha,
    'button': 'Acessar',
    'numero_mestre':'', 
    'ifsp_categ': '',
    'lab_com_solicitacao':'',
}

request.post(LINK_BIBLIOTECA,{form:object},function(erro,response,html){
    if(!erro && response.statusCode == 200){
        const telaHome = cheerio.load(html);
        console.log('====================================');
        console.log(telaHome.html());
        console.log('====================================');
        // request.post(LINK_UNICAP + linkTelaLogin ,{form:object},function(erro,response,html){

        //     if(!erro && response.statusCode == 200){

        //         const telaLogin = cheerio.load(html);
        //         var linkTelaNotas = telaLogin('form').attr('action');

        //         request.post(LINK_UNICAP + linkTelaNotas , {form:{'rotina':23}},function(erro,response,html){

        //             if(!erro && response.statusCode == 200){
        //                 const telaNotas = cheerio.load(html);
        //                 telaNotas('td').each((i,el)=>{
        //                     if(i < 5){
        //                         data.dados.push(telaNotas(el).html());
        //                     }else{
        //                         if(telaNotas(el).html().indexOf("&#xA0;") == -1){
        //                             notas.push(telaNotas(el).html());
        //                         }
        //                     }
        //                 })
        //                 for(var i = 0 ; i < notas.length ; i = i + 8){
        //                     data.notas.push(
        //                         {
        //                             cod: notas[i],
        //                             mat: notas[i + 1],
        //                             turma: notas[i + 2],
        //                             gq1: notas[i + 3],
        //                             gq2: notas[i + 4],
        //                             final: notas[i + 5],
        //                             media: notas[i + 6],
        //                         }
        //                     )
        //                 }

		// 				res.send(data);

        //             }else{
		// 				data.status = 1;
        //                 res.send(data); // falha na tela de notas 
        //             }
        //         })
        //     }else{
        //         data.status = 1;
        //         res.send(data); // falha na tela Home
        //     }
        // })
        res.send(data); 
    }else{
        data.status = 2;
        res.send(data); // falha na tela de login
    }
})

    console.log("Request Livros");

    })

}