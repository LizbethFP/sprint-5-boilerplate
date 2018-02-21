$(document).ready(function() {
  /* VARIABLE GLOBAL DEL CONTENEDOR DONDE APARECERÁN TODOS LOS TEMAS SIN FILTRAR */
  const $allTopicsContainer = $('#all-topics-container');

  /* Imprimir todos los temas del API */
  const addTopics = function(topics) {
    topics.forEach(function(topic) {
      const existingTopic = topic.content;
      const id = topic.id;
      const author = topic.author_name;
      const answerCount = topic.responses_count;

      $allTopicsContainer.append(`<div class="row mt-4">
        <div class="col-6 offset-3 box-shadow">
          <h2 class="col-2 offset-5 font-weight-bold bgr-ltr-spacing">
            <a class="jade-ltr" href="views/specific-topic.html?topic_id=${id}">${existingTopic}</a>
          </h2>
          <p class="col-2 offset-5 mt-3 sm-ltr-spacing dark-ltr">By:
              <span class="ml-2 sm-ltr-spacing dark-ltr" data-id=${id}>${author}</span>
          </p>
          <p class="col-2 offset-5 sm-ltr-spacing dark-ltr">Answers:
                <span class="ml-2 sm-ltr-spacing dark-ltr">${answerCount}</span>
          </p>
        </div>
      </div>`);
    });
  };

    /* BUSCAR COINCIDENCIAS DE TEMAS */
  const searchedTopics = function(topics) {
    let matchingTopics = topics.map((val) => val.content);
    $('#search').autocomplete({
      source: matchingTopics
    });
  };

    /* Función para manejar errores */
  const handleError = function() {
    console.log('Se ha producido un error');
  };


  /* CONSEGUIR TODOS LOS TEMAS */
  $.ajax({
    url: 'https://examen-laboratoria-sprint-5.herokuapp.com/topics',
    // dataType: 'json',
    contentType: 'aplication/json'
  }).done(addTopics)
    .done(searchedTopics)
    .fail(handleError);


  /* CREAR UN TEMA NUEVO AL DAR CLIC EN GUARDAR */
  $('#save-topic').click(function() {
    let $newAuthor = $('#user-name').val();
    let $newTopic = $('#user-message').val();
    $.post('https://examen-laboratoria-sprint-5.herokuapp.com/topics',
      {
        author_name: $newAuthor,
        content: $newTopic
      },
      function(data, status) {
        let firstChild = $allTopicsContainer.eq(0);
        $(firstChild).prepend(`<div class="row mt-4">
          <div class="col-6 offset-3 box-shadow">
            <h2 class="col-2 offset-5 font-weight-bold bgr-ltr-spacing">
              <a class="jade-ltr" href="views/specific-topic.html?topic_id=${data.id}">${data.content}</a>
            </h2>
            <p class="col-2 offset-5 mt-3 sm-ltr-spacing dark-ltr">By:
                <span class="ml-2 sm-ltr-spacing dark-ltr" data-id=${data.id}>${data.author_name}</span>
            </p>
            <p class="col-2 offset-5 sm-ltr-spacing dark-ltr">Answers:
                <span class="ml-2 sm-ltr-spacing dark-ltr"></span>
            </p>
          </div>
        </div>`);


      });
    $('#exampleModal').modal('hide');
    $('#user-name').val('');
    $('#user-message').val('');
  });
});
