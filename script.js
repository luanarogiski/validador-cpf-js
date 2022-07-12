
function validaCPF(cpf) { 

    //console.log(cpf.length);
    if (cpf.length != 9 && cpf.length != 10 && cpf.length != 11) {
        document.querySelector('#error > span').innerText = cpf.replace(/(\d{3})(\d{3})/g, "\$1.\$2.");
        return false;
    } else {

        var numeros = cpf.substring(0, 9); // apenas os numeros do cpf, sem os digitos verificadores
        var digitos = cpf.substring(9); // apenas os 2 digitos verificadores, informados no input

        var soma = 0;

        for (var i = 10; i > 1; i--) {
            soma += numeros.charAt(10 - i) * i; 
        }
        
        // Validação do primeiro dígito
        var primeiroDigitoCalculado = soma % 11 < 2 ? 0 : 11 - (soma % 11); 
        var primeiroDigitoInformado = digitos.charAt(0);
        
        
        if (primeiroDigitoInformado != '' // se eu informei o primeiro digito
            && primeiroDigitoInformado != primeiroDigitoCalculado) { 
            return false; // primeiro digito é diferente do informado, cpf invalido
        }

        console.log(primeiroDigitoInformado + ' é a primeira posição da variável soma');

        soma = 0;
        numeros = cpf.substring(0,9) + primeiroDigitoCalculado; // concatena o primeiro digito para poder calcular o segundo

        for (var k = 11; k > 1; k--) {
            soma += numeros.charAt(11 - k) * k;
        }
         
        // Validação do segundo dígito
        var segundoDigitoCalculado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
        var segundoDigitoInformado = digitos.charAt(1);

        if (segundoDigitoInformado != '' // se eu informei o segundo digito
            && segundoDigitoInformado != segundoDigitoCalculado) {
            return false; // segundo digito é diferente do informado, cpf invalido
        }

        var cpfCompleto = numeros + segundoDigitoCalculado;
        
            document.querySelector('#success > span').innerText = cpfCompleto.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "\$1.\$2.\$3-\$4");
        
            

        

        // tudo certo, cpf é válido
        return true;
    }  
}

function validacao() {
    //console.log('Iniciando validação CPF');
    document.getElementById('success').style.display = 'none';
    document.getElementById('error').style.display = 'none';

     var cpf = document.getElementById('cpf_digitado').value; 
     //console.log(cpf);

     var resultadoValidacao = validaCPF(cpf); 

     if (resultadoValidacao) { 
        document.getElementById('success').style.display = 'block';
     } else {
         document.getElementById('error').style.display = 'block';
     }
}