// Immediately export a function that generates a string of random numbers and letters
//still not entirely certain why this helper function doesn't work
 uuid = () => {
  var num = Math.floor((1 + Math.random()) * 0x10000)
  num.toString(16)
  num.substring(1);
  return num
}
module.exports = uuid 
  
