let app = {
    init: function () {
        this.addEvents();
    },
    addEvents: function () {
        let loadContent = function () {
            fetch("/materia")
                .then(res => res.json())
                .then(data => {
                    let materias = document.getElementsByClassName("materias")[0];

                    materias.innerHTML = data.reduce((cadena, element) => {
                        return cadena +
                            ` <tr>
                                <td class="name">${element.nombre}</td>
                                <td class="uv">${element.uv}</td>
                                <td class="options"> 
                                    <a class="more" href=""> More</a>
                                    <a class="edit" href=""> Edit </a>
                                    <a class="delete" href=""> Delete </a>
                                </td>
                            </tr>`
                    }, "");

                    document.querySelectorAll(".more").forEach(element => {
                        element.addEventListener('click', function (evnt) {
                            evnt.preventDefault();
                            let name = this.parentElement // td
                                .parentElement // tr
                                .getElementsByClassName("name")[0]
                                .innerText;
                            fetch('/materia/' + name)
                                .then(res => res.json())
                                .then(function (data) {
                                    alert(data.descripcion);
                                    console.log(data);
                                });
                        });
                    });


                    document.querySelectorAll(".edit").forEach(element => {
                        element.addEventListener('click', function (evnt) {
                            evnt.preventDefault();
                            var newName = prompt('Ingrese nombre');
                            var newUv = prompt('Ingrese uv');
                            var newMore = prompt('Ingrese More');
                            let name = this.parentElement // td
                                .parentElement // tr
                                .getElementsByClassName("name")[0]
                                .innerText=newName
                                ;
                            let uv = this.parentElement // td
                                .parentElement // tr
                                .getElementsByClassName("uv")[0]
                                .innerText=newUv
                                ;
                            
                            let more = this.parentElement // td
                                .parentElement // tr
                                .getElementsByClassName("descripcion")[0]
                                .innerText=newMore
                                ;
                            fetch('/materia/' + name )
                                .then(res => res.json())
                                .then(function (data) {
                                    console.log(data);
                                });
                        });
                    });

                    document.querySelectorAll(".delete").forEach(element => {
                        element.addEventListener('click', function (evnt) {
                            evnt.preventDefault();
                            let name = this.parentElement // td
                                .parentElement // tr
                                .getElementsByClassName("name")[0]
                                .innerText;

                            fetch('/materia/' + name , 
                                {
                                    method: 'delete',
                                    body: new URLSearchParams(new FormData(form))
                                })
                                .then(res => res.json())
                                .then(function (data) {
                                    
                                    console.log(data);
                                    loadContent();
                                });
                        });
                    });
                });
        }
        let form = document.forms.saveMateria;

        form.addEventListener('submit', function (event) {
            event.preventDefault();
            fetch(form.action, {
                    method: 'POST',
                    body: new URLSearchParams(new FormData(form))
                }).then(res => res.json())
                .then(data => {
                    console.log(data);
                    loadContent();
                });
        });

        loadContent();
    }
};
window.onload = () => app.init();