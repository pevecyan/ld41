const fs = require('fs');

const excluded = ['Loader.js'];

let paths = [];

getPaths('./Game');


let output = [];


paths.forEach(p=>{
    let file = fs.readFileSync(p, {encoding:'utf8'});
    let order = parseInt(file.substring(0,3).replace('//',''));
    if (isNaN(order)) order = 10;
    output.push({data:file, order});
})

output = output.sort((a,b)=>a.order-b.order).map(a=>a.data).join('\n');

fs.writeFileSync('./Game/Loader.js', `${output}`)

//function appendScript(path,location='head'){let node = document.createElement('script');node.setAttribute('src',path);node.setAttribute('defer','');document[location].appendChild(node);}${paths.join('')}appendScript("./Game/Main.js","head");

function getPaths(path){
    let files = fs.readdirSync(path);
    files.forEach(f=>{
        if (excluded.indexOf(f) == -1 ){
            if (f.endsWith('.js')) {
                paths.push(path+'/'+f);
            } else {
                getPaths(path+'/'+f);
            }
        }
        
    })
}