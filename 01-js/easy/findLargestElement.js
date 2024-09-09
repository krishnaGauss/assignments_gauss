/*
  Write a function `findLargestElement` that takes an array of numbers and returns the largest element.
  Example:
  - Input: [3, 7, 2, 9, 1]
  - Output: 9
*/

function findLargestElement(numbers) {
    let maxm=0;
    for(var i=0; i<numbers.length; i++){
        if(maxm<numbers[i] && maxm>=0){
            maxm=numbers[i];
        }
        else{
            
        }
    }

    return maxm;
}

module.exports = findLargestElement;