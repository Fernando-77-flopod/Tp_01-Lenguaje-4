document.addEventListener('DOMContentLoaded', function() {
    
    // Obtener referencias a los elementos
    const latitudInput = document.getElementById('latitud');
    const longitudInput = document.getElementById('longitud');
    const btnBuscar = document.getElementById('btnBuscar');
    const btnEjemplo = document.getElementById('btnEjemplo');
    const coordenadasMostradas = document.getElementById('coordenadasMostradas');
    const mapaIframe = document.getElementById('mapaIframe');

    // Función para validar coordenadas
    function validarCoordenadas(lat, lng) {
        // Convertir a número
        const latNum = parseFloat(lat);
        const lngNum = parseFloat(lng);
        
        // Verificar que sean números válidos
        if (isNaN(latNum) || isNaN(lngNum)) {
            return { valido: false, mensaje: '❌ Por favor, ingresa números válidos' };
        }
        
        // Validar rango de latitud (-90 a 90)
        if (latNum < -90 || latNum > 90) {
            return { valido: false, mensaje: '❌ La latitud debe estar entre -90 y 90' };
        }
        
        // Validar rango de longitud (-180 a 180)
        if (lngNum < -180 || lngNum > 180) {
            return { valido: false, mensaje: '❌ La longitud debe estar entre -180 y 180' };
        }
        
        return { valido: true, lat: latNum, lng: lngNum };
    }

    // Función para actualizar el mapa
    function actualizarMapa(lat, lng) {
        // Redondear a 6 decimales para mejor visualización
        const latRedondeada = lat.toFixed(6);
        const lngRedondeada = lng.toFixed(6);
        
        // Mostrar coordenadas en pantalla
        coordenadasMostradas.textContent = `Latitud: ${latRedondeada} | Longitud: ${lngRedondeada}`;
        coordenadasMostradas.className = 'exito';
        
        // Actualizar el iframe de Google Maps
        // Usamos el formato de embed de Google Maps
        const src = `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3284.016757601276!
        2d${lngRedondeada}!3d${latRedondeada}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2sar!4v1234567890`;
        mapaIframe.src = src;
    }

    // Función principal de búsqueda
    function buscarCoordenadas() {
        const lat = latitudInput.value.trim();
        const lng = longitudInput.value.trim();
        
        // Validar que los campos no estén vacíos
        if (lat === '' || lng === '') {
            coordenadasMostradas.textContent = 'Por favor, ingresa ambas coordenadas!!';
            coordenadasMostradas.className = 'error';
            return;
        }
        
        // Validar coordenadas
        const resultado = validarCoordenadas(lat, lng);
        
        if (!resultado.valido) {
            coordenadasMostradas.textContent = resultado.mensaje;
            coordenadasMostradas.className = 'error';
            return;
        }
        
        // Actualizar el mapa con las coordenadas válidas
        actualizarMapa(resultado.lat, resultado.lng);
    }

    // Función para cargar el ejemplo de Buenos Aires
    function cargarEjemplo() {
        latitudInput.value = '-34.6037';
        longitudInput.value = '-58.3816';
        buscarCoordenadas();
    }

    // Eventos
    btnBuscar.addEventListener('click', buscarCoordenadas);
    btnEjemplo.addEventListener('click', cargarEjemplo);
    
    // Permitir búsqueda con Enter
    latitudInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') buscarCoordenadas();
    });
    longitudInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') buscarCoordenadas();
    });

    // Cargar las coordenadas de ejemplo al iniciar
    cargarEjemplo();
});