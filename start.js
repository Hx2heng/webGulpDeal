import myGulp from './gulpfile.js';
import del from 'del';


console.log('开始构建任务');
let start = async() => {
    await new Promise(resolve => {
        del(['build/**/*']).then(paths => {
            console.log('完成build文件夹清除');
            resolve();
        });
    })
     myGulp.start('build');
    
    
    
}
start().then(() => {
})
