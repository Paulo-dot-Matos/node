console.log('Before');
getUser(1, (user) => {
  getRepositories(user.gitHubUsername, (repos) => {
    getCommits(repos[0], (commits) => {
      console.log(commits);
    })
  })
});


//Promise-based approach
getUser(1)
    .then(user => getRepositories(user.gitHubUsername))
    .then(repos => getCommits(repos[0]))
    .then(commit => console.log(commit))
    .catch(err => console.log('Error: ' + err.message)) // basta este errorhandler para apanhar kk erro k venha dos then acima.

// Async and await approch
async function displayCommits(){
    try{
        const user = await getUser(1);
       const repos = await getRepositories(user.gitHubUsername);
        const commites = await getCommits(repos[0]);
        console.log(commites)
   } catch(err){
        console.log(err)
    }
} 

displayCommits()

console.log('After');

function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Reading a user from a database...');
            resolve({ id: id, gitHubUsername: 'paulo' });
          }, 2000);
    });
  
}

function getRepositories(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Reading a user from a database...');
            //resolve(['repo1', 'repo2', 'repo3']);
            reject(new Error('Could not get the repoo...'))
          }, 2000);
    });
}

function getCommits(repo, callback) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Reading a user from a database...');
            resolve(['commit']);
          }, 2000);
    });
}