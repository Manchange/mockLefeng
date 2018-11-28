var db=require("./mysql.js");
function getBrand(app){
    app.get("/getBrand",function(req,res){
        console.log(1)
        res.append("Access-Control-Allow-Origin","*");
      db.connect("select * from brand",[],function(error,data){
        console.log(data);
        res.send(data);
      });
    });
};
module.exports= {
    getBrand
}