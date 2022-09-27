//FilmesdoMomento
function execFilmesPopulares() {
    let xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.onload = exibeFilmesPop;
    xhr.open('GET', 'https://api.themoviedb.org/3/movie/popular?api_key=0e3049e1ed7add499dce2af14c06f64f&language=pt-BR&page=1', true);
    xhr.send();
}

function exibeFilmesPop() {
    let divTela = document.getElementById('box-filmes-pop');
    let texto = '';
    //monta texto
    let dados = this.response;
    for (i = 0; i < 12; i++) {
        let filmes = dados.results[i];
        let data = new Date(filmes.release_date);
        texto = texto + `
        <div class="card" style="width: 18rem; margin-bottom: 10px;">
        <img src="https://image.tmdb.org/t/p/w500/${filmes.poster_path}" class="card-img-top" alt="...">
        <div class="card-body" style="text-align: justify;"">
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
    divTela.innerHTML = texto;
}

//ùltimosLançamentos
function execUltimosFilmes() {
    let xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.onload = exibeUltimosFilmes;
    xhr.open('GET', 'https://api.themoviedb.org/3/movie/upcoming?api_key=0e3049e1ed7add499dce2af14c06f64f&language=pt-BR&page=1', true);
    xhr.send();
}
function exibeUltimosFilmes() {
    let divTela = document.getElementById('ultimosfilmes');
    let texto = '';
    //monta texto
    let dados = this.response;
    for (i = 0; i < 12; i++) {
        let filmes = dados.results[i];
        let data = new Date(filmes.release_date);
        texto = texto + `
        <div class="card" style="width: 18rem; margin-bottom: 10px;">
        <img src="https://image.tmdb.org/t/p/w500/${filmes.poster_path}" class="card-img-top" alt="...">
        <div class="card-body" style="text-align: justify;">
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
    divTela.innerHTML = texto;
}

//FilmesMaisProcurados
function execFilmesProcurados() {
    let xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.onload = exibeFilmesProcurados;
    xhr.open('GET', 'https://api.themoviedb.org/3/movie/top_rated?api_key=0e3049e1ed7add499dce2af14c06f64f&language=pt-BR&page=1', true);
    xhr.send();
}
function exibeFilmesProcurados() {
    let divTela = document.getElementById('filmes-cinema');
    let texto = '';
    //monta texto
    let dados = this.response;
    for (i = 0; i < 12; i++) {
        let filmes = dados.results[i];
        let data = new Date(filmes.release_date);
        texto = texto + `
        <div class="card" style="width: 18rem; margin-bottom: 10px;">
        <img src="https://image.tmdb.org/t/p/w500/${filmes.poster_path}" class="card-img-top" alt="...">
        <div class="card-body" style="text-align: justify;">
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
    divTela.innerHTML = texto;
}

//document.getElementById('btnPesquisa').addEventListener('click', pesquisarFilmes);

function pesquisarFilmes() {
    let xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    let texto = document.getElementById("txtPesquisa").value;
    xhr.open('GET', `https://api.themoviedb.org/3/search/movie?api_key=0e3049e1ed7add499dce2af14c06f64f&query=${texto}&language=pt-BR`, true);
    xhr.send();

    if(!texto){
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
        texto2 +=  `
        <div class="card" style="width: 18rem; margin-bottom: 10px;">
        <img src="https://image.tmdb.org/t/p/w500/${filmes.poster_path}" class="card-img-top" alt="...">
        <div class="card-body" style="text-align: justify;">
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

function iniciarTela(){
    execFilmesProcurados();
    execFilmesPopulares();
    execUltimosFilmes();
}

iniciarTela();