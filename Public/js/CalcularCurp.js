function calcularCURP() {
    const nombre = document.getElementById('nombre').value.trim().toUpperCase();
    const apellidoP = document.getElementById('apellidoP').value.trim().toUpperCase();
    const apellidoM = document.getElementById('apellidoM').value.trim().toUpperCase();
    const fechaNacimiento = document.getElementById('fechaNacimiento').value;
    const genero = document.getElementById('genero').value;
    const estado = document.getElementById('estado').value;

    if (!nombre || !apellidoP || !apellidoM || !fechaNacimiento || !genero || !estado) {
        document.getElementById('resultado').innerText = 'Por favor, completa todos los campos.';
        return;
    }

    // Procesar fecha de nacimiento
    const fecha = fechaNacimiento.split('-');
    const anio = fecha[0].slice(2); // Últimos dos dígitos del año
    const mes = fecha[1];
    const dia = fecha[2];

    // Obtener la primera vocal interna del apellido paterno
    const primeraVocal = apellidoP.slice(1).match(/[AEIOU]/)?.[0] || '';
    
    // Obtener consonantes internas
    const consonanteP = apellidoP.slice(1).match(/[^AEIOU]/)?.[0] || 'X';
    const consonanteM = apellidoM.slice(1).match(/[^AEIOU]/)?.[0] || 'X';
    const consonanteN = nombre.slice(1).match(/[^AEIOU]/)?.[0] || 'X';

    // Generar CURP base
    const curpBase = `${apellidoP[0]}${primeraVocal}${apellidoM[0] || 'X'}${nombre[0]}${anio}${mes}${dia}${genero}${estado}${consonanteP}${consonanteM}${consonanteN}`;

    // Número de homonimia
    const numeroHomonimia = 'A'; // Cambiado de '0' a 'A'

    // Calcular dígito verificador
    const digitoVerificador = calcularDigitoVerificador(curpBase + numeroHomonimia);

    // CURP completo
    const curpCompleto = `${curpBase}${numeroHomonimia}${digitoVerificador}`;

    // Mostrar el resultado
    document.getElementById('resultado').innerText = `Tu CURP es: ${curpCompleto}`;
}

// Función para calcular el dígito verificador
function calcularDigitoVerificador(curp) {
    const caracteres = '0123456789ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';
    let suma = 0;

    for (let i = 0; i < curp.length; i++) {
        suma += caracteres.indexOf(curp[i]) * (18 - i);
    }

    const residuo = suma % 10;
    return residuo === 0 ? '0' : (10 - residuo).toString();
}
