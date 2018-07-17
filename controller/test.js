

module.exports = {
  hello(){
    return new Promise(function(resolve,reject){
      setTimeout(function(){
        resolve({a:1000})
      })
    })
  }
}