function a(){
    console.log("executando A")
}

function b(){
    console.log("executando B")
}
function c(){
    console.log("executando C")
}

//garante que a execuçao seja sempre sequencial
b()
c()
a()