module.exports = function(app,db){
    app.post('/check',(req,res)=>{
        res.send('Ativo')
        console.log("Request teste Ativo");
    })

}