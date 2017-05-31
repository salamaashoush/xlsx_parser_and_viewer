const router = require('express').Router();
const xlsx = require('node-xlsx');
module.exports = function (app) {

    app.use('/', router);
};

//= =======================================
// Test Routes
//= =======================================
router.route('/')
    .get((req, res, next) => {
        res.render('form');
    })
    .post((req,res,next)=>{
        let file = req.files['file'][0];
        console.log(file);
        let obj = xlsx.parse(process.cwd()+'/'+file.path);
        res.json(obj);

    });
router.route('/edit')
.get((req,res,next)=>{
    res.render('editor');
 });

router.get('/file',(req,res,next)=>{
    let workbook = xlsx.parse(process.cwd()+'/public/test.xlsx');
    data=workbook[0].data;
    for (var i = 0; i < data.length; i++) {
        if (data[i].length == 0 ) {
            data.splice(i, 1);
            i--;
        }
    }
    data.splice(0,2);

    res.json(data);
})
