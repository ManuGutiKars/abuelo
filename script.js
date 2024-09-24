// Lista de hermanos
const hermanos = ["Jose", "Marilo", "Antonio", "Manolo"];


// Variables globales para mes y año actuales
let fechaActual = new Date();
let mesActual = fechaActual.getMonth();
let añoActual = fechaActual.getFullYear();

// Función para obtener el número de la semana
function obtenerNumeroSemana(fecha) {
    const primerDiaDelAño = new Date(fecha.getFullYear(), 0, 1);
    const numeroDias = Math.floor((fecha - primerDiaDelAño) / (24 * 60 * 60 * 1000));
    return Math.ceil((numeroDias + primerDiaDelAño.getDay() + 1) / 7);
}

// Función para formatear la fecha
function formatearFecha(fecha) {
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const año = fecha.getFullYear();
    return `${dia}/${mes}/${año}`;
}

// Función para encontrar el primer lunes del mes
function obtenerPrimerLunes(mes, año) {
    const primerDia = new Date(año, mes, 1);
    const diaSemana = primerDia.getDay(); // 0 = domingo, 1 = lunes, ..., 6 = sábado

    // Si el primer día es lunes, lo usamos. Si no, encontramos el siguiente lunes.
    const primerLunes = primerDia;
    if (diaSemana !== 1) {
        const diferencia = (diaSemana === 0) ? 1 : 8 - diaSemana; // Si es domingo, mover 1 día; si no, ajustar
        primerLunes.setDate(primerDia.getDate() + diferencia);
    }
    return primerLunes;
}

// Función para generar el calendario del mes actual
function generarCalendario(mes, año) {
    const calendario = document.getElementById("calendar-body");
    calendario.innerHTML = ''; // Limpiar contenido anterior

    // Obtener el primer lunes del mes
    const primerLunes = obtenerPrimerLunes(mes, año);
    let semanaActual = obtenerNumeroSemana(primerLunes);

    // Actualizar la vista del mes actual
    document.getElementById("current-month").textContent = 
        primerLunes.toLocaleString('es-ES', { month: 'long', year: 'numeric' });

    // Generar las semanas del mes
    for (let i = 0; i < 6; i++) {  // Hasta 6 semanas (puede haber hasta 6 semanas dependiendo del mes)
        const fechaInicioSemana = new Date(primerLunes);
        fechaInicioSemana.setDate(primerLunes.getDate() + (i * 7));

        // Si el mes de la semana actual es diferente del mes original, dejamos de mostrar semanas
        if (fechaInicioSemana.getMonth() !== mes && i !== 0) {
            break;
        }

        const fechaFinSemana = new Date(fechaInicioSemana);
        fechaFinSemana.setDate(fechaInicioSemana.getDate() + 6); // Sumar 6 días para obtener la fecha final

        const hermanoResponsable = hermanos[(semanaActual - 1) % hermanos.length];
        const fila = document.createElement("tr");

        // Crear celdas para la fila
        const celdaSemana = document.createElement("td");
        const celdaFechaInicio = document.createElement("td");
        const celdaFechaFin = document.createElement("td"); // Celda para la fecha de finalización
        const celdaHermano = document.createElement("td");

        celdaSemana.textContent = `Semana ${semanaActual}`;
        celdaFechaInicio.textContent = formatearFecha(fechaInicioSemana);
        celdaFechaFin.textContent = formatearFecha(fechaFinSemana); // Mostrar la fecha de fin
        celdaHermano.textContent = hermanoResponsable;

        // Añadir las celdas a la fila
        fila.appendChild(celdaSemana);
        fila.appendChild(celdaFechaInicio);
        fila.appendChild(celdaFechaFin); // Añadir la celda de fecha de finalización
        fila.appendChild(celdaHermano);

        // Añadir la fila al cuerpo de la tabla
        calendario.appendChild(fila);

        // Aumentar el número de semana y rotar el hermano
        semanaActual++;
    }
}

// Función para navegar al mes anterior
document.getElementById("prev-month").addEventListener("click", function() {
    mesActual--;
    if (mesActual < 0) {
        mesActual = 11;
        añoActual--;
    }
    generarCalendario(mesActual, añoActual);
});

// Función para navegar al mes siguiente
document.getElementById("next-month").addEventListener("click", function() {
    mesActual++;
    if (mesActual > 11) {
        mesActual = 0;
        añoActual++;
    }
    generarCalendario(mesActual, añoActual);
});

// Inicializar el calendario con el mes actual
generarCalendario(mesActual, añoActual);
