console.log('before');

getUser(1,getRepositories);

console.log('after');

function getRepositories(userName){
    getRepositoriesAsync(userName.gitHubUserName, getRepos);
  //console.log(userName.gitHubUserName);
}
function getRepos(repos){
    getCommits(repos, (commit) => {
        console.log(repos[0] + ' commits: ' + commit);
    })
}
/*
const user = getUser(1);
console.log(user);
o user é undefined pk a função getUser tem um time out que é realizado asincronament.
nodejs é asincrono por defeito.

Tres métodos para lidar cm isto
- CallBacks -> nested functions hell.
- Promises
- Async/Wait
*/

function getUser(id, callback){
    setTimeout(()=>{
        console.log('reading user from db...');
       callback({id: id, gitHubUserName: 'paulo'});    
    },2000);
}

function getRepositoriesAsync(userName, callback) {
    setTimeout(()=>{
        console.log('reading user from db repo...');
        callback(['repo1','repo2','repo3']);
    },2000);
}

function getCommits(repo, callback) {
    setTimeout(()=>{
        console.log('reading user from db commit...');
        callback(['commit1','commit2','commit3']);
    },2000);
}






