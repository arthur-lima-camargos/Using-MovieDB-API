const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});

let value = params.iddofilme;

//Pesquisa
function pesquisarFilmes() {
    let xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    let texto = document.getElementById("txtPesquisa").value;
    xhr.open('GET', `https://api.themoviedb.org/3/search/movie?api_key=0e3049e1ed7add499dce2af14c06f64f&query=${texto}&language=pt-BR`, true);
    xhr.send();

    if (!texto) {
        alert("Digite algo para efetuar a busca!");
        return;
    }
    xhr.onload = exibePesquisa;
}

function exibePesquisa() {
    let dados = this.response;
    let divTela1 = document.getElementById('resultado1');
    let divTela2 = document.getElementById('resultado2');
    let texto1 = `
        <div class="col-md-12 form-group" style="margin: 20px 0px; font-style: italic; display: flex; width: 20rem;">
            <h3 class="titulo">Resultado da Pesquisa:</h1>
        </div>
    `
    divTela1.innerHTML = texto1;
    divTela2.innerHTML = "";
    //monta texto
    let texto2 = ``;
    for (i = 0; i < dados.results.length; i++) {
        let filmes = dados.results[i];
        let data = new Date(filmes.release_date);
        texto2 += `
        <div class="card" style="width: 18rem;">
        <img src="https://image.tmdb.org/t/p/w500/${filmes.poster_path}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title"><b>${filmes.title}</b></h5>
          <p class="card-text"><b>Sinopse:</b> ${filmes.overview}</p>
          <p class="lancamento-filme"><b>Lançamento: </b>${data.toLocaleDateString()}</p>
          <p class="avaliacao"><b>Avaliação:</b> ${filmes.vote_average}</p>
          <a href='detalhes.html?iddofilme=${filmes.id}' target="_blank" class="btn btn-primary">Saiba mais...</a>
        </div>
        </div>            
        `;
    }
    //preenche a div com o texto HTML
    divTela2.innerHTML = texto2;
}

//Exibe Detalhes

function execDetalhe() {
    let xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.onload = exibeDetalhe;
    xhr.open('GET', `https://api.themoviedb.org/3/movie/${value}?api_key=0e3049e1ed7add499dce2af14c06f64f&language=pt-BR&append_to_response=videos,reviews`, true);
    xhr.send();
}

function exibeDetalhe() {
    let divTela = document.getElementById('telaResultado');
    let texto = '';
    //monta texto
    let dados = this.response;
    let data = new Date(dados.release_date);
    texto = texto + `
    <div class="row">
            <div class="col-sm-6">
                <div class="card">
                    <div class="card-body">
                        <img src="https://image.tmdb.org/t/p/w500/${dados.poster_path}" class="imgCard" alt="...">
                    </div>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="card">
                    <div class="card-body">
                        <iframe width="280" height="350"src="https://www.youtube.com/embed/${dados.videos.results[0].key}"title="YouTube video player" frameborder="0"allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"allowfullscreen></iframe>
                        <h5 class="card-title"><b>${dados.title}</b></h5>
                        <p class="card-text" id="textDet"><b>Sinopse:</b> ${dados.overview}</p>
                        <p class="lancamento-filme" id="textDet"><b>Lançamento: </b>${data.toLocaleDateString()}</p>
                        <p class="gen" id="textDet"><b>Gênero:</b> ${dados.genres[1].name}</p>
                        <p class="avaliacao" id="textDet"><b>Avaliação:</b> ${dados.vote_average}</p>
                        <p class="card-text" id="textDet"><b>Duração:</b> ${dados.runtime} minutos</p>
                    </div>
                </div>
            </div>
        </div>
    </div>   
    `;
    divTela.innerHTML = texto;
}

function iniciarTela() {
    execDetalhe();
}

iniciarTela();