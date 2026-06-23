document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.querySelector("#contacto");

    if (formulario) {
        formulario.addEventListener("submit", (e) => {
            e.preventDefault(); /

            // Bootstrap custom 
            if (!formulario.checkValidity()) {
                formulario.classList.add('was-validated');
                return;
            }

            // Captura de datos de los casilleros del formulario
            const nombreInput = document.querySelector("#nombre");
            const emailInput = document.querySelector("#email");
            const tipoPielSelect = document.querySelector("#tipoPiel");
            const consultaTextArea = document.querySelector("#consulta");
            
        
            const interesesMarcados = [];
            document.querySelectorAll(".interes-checkbox:checked").forEach(checkbox => {
                interesMarcados.push(checkbox.value);
            });

           
            const nuevoSuscriptor = {
                nombre: nombreInput.value.trim(),
                email: emailInput.value.trim().toLowerCase(),
                tipoPiel: tipoPielSelect.value,
                intereses: interesesMarcados,
                consulta: consultaTextArea.value.trim(),
                fechaRegistro: new Date().toLocaleDateString()
            };

            
            let listaSuscriptores = JSON.parse(localStorage.getItem("suscriptores_cerave")) || [];

          
            const yaExiste = listaSuscriptores.some(s => s.email === nuevoSuscriptor.email);

            if (yaExiste) {
                alert("¡Aviso! Este correo electrónico ya se encuentra registrado en nuestro newsletter.");
            } else {
                
                listaSuscriptores.push(nuevoSuscriptor);
                
                
                localStorage.setItem("suscriptores_cerave", JSON.stringify(listaSuscriptores));

                alert(`¡Gracias por sumarte, ${nuevoSuscriptor.nombre}! Tu registro fue exitoso.`);
                
                formulario.reset();
                formulario.classList.remove('was-validated');

              
                window.location.href = "agradecimiento.html";
            }
        });
    }
});