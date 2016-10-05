//in
var dictionary = ['car', 'cat', 'shazbot', 'a', 'dog', 'giraffe'];
var licensePlates = ['1234rac', 'r43234ac324242352345252', 'r43234atc324242352345252', '43a565fgirfe', 'o43g23d'];

//setup
var refTree = {};

//util
var stringSort = function(str) {
    return str.split('').sort().join('');
}

//Build up ref tree
//n = dictionarySize
//O(n log n + max word length)
dictionary.forEach(function(word) {
    var key = stringSort(word.toLowerCase());
    var currentNode = refTree;
    for (var i = 0; i < key.length; i++) {
        var nextChar = key.charAt(i);
        if (!currentNode[nextChar]) {
            currentNode[nextChar] = {};
        }
        currentNode = currentNode[nextChar];
    }
    if (!currentNode.value) {
        currentNode.value = word;
    }
});

console.log(JSON.stringify(refTree, null, 2));

//Search the tree for all license plates
var results = licensePlates.map(function(licensePlate) {
    var licensePlateKey = stringSort(licensePlate.replace(/[^a-z]/gi, '').toLowerCase());
    var currentNode = refTree;
    for (var i = 0; i < licensePlateKey.length; i++) {
        var nextChar = licensePlateKey.charAt(i);
        if (currentNode[nextChar]) {
            currentNode = currentNode[nextChar];
        }
        else {
            //dead end
            return null;
        }
    }
    //TODO: BFS for .value starting at current node
    //Must have a value or would have hit dead end
    return currentNode.value;
});

console.log(results);
