let button = document.querySelector("#submit");
let input = document.querySelector("#inputs");

button.onclick = function() {
    let data = input.value;
    data = data.split("\n").filter(val => val != "").join("\n")
    console.log(data)

    let lines = data.split("\n");
    let terms = {};
    for (let i = 0; i < lines.length; i += 2) {
        terms[lines[i]] = lines[i + 1];
    }
    console.log(JSON.stringify(terms, null, 2))
}