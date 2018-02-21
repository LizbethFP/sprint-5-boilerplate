$(document).ready(function() {
  /* variable global del id */
  var topicId = getParameterByName('topic_id');

  /* Imprimir el tema según su topic id */
  const getTopic = function() {
    $.ajax({
      url: `http://examen-laboratoria-sprint-5.herokuapp.com/topics/${topicId}`,
      // dataType: 'json',
      contentType: 'aplication/json'
    }).done(showTopic)
      .done(getSpecificAnswer)
      .fail(handleError);
  };

  /* Imprimir el tema del id seleccionado */
  const showTopic = function(topics) {
    const existingTopic = topics.content;
    const author = topics.author_name;
    $('#topic').append(`<div class="box-shadow mt-5"><h2 class="ml-4 bgr-ltr-spacing dark-ltr">${existingTopic}</h2> <br>        <p class="ml-4">By:</p><h2 class="ml-4 sm-ltr-spacing">${author}</h2></div>`);
  };

  /* Obtener las respuestas del topic id encontrado */
  const getSpecificAnswer = function() {
    $.ajax({
      url: `http://examen-laboratoria-sprint-5.herokuapp.com/topics/${topicId}/responses`,
      // dataType: 'json',
      contentType: 'aplication/json'
    }).done(showSpecificAnswers)
      .fail(handleError);
  };
  /* Imprimir todas las respuestas de ese topic id */
  const showSpecificAnswers = function(response) {
    if (response.error === 'Aún no hay respuesta alguna') {
      console.log(response.error);
    } else {
      response.forEach(function(resp) {
        const answerToTopic = resp.content;
        const answerAuthor = resp.author_name;
        $('#answer-div').append(`<div class="box-shadow mt-5 mx-5"><h2 class="ml-4 bgr-ltr-spacing dark-ltr">${answerToTopic}</h2><br><p class="ml-4">By:</p><h2 class="ml-4 sm-ltr-spacing">${answerAuthor}</h2><hr></div>`);
      });
    }
  };

  /* buscar coincidencias de temas */
  const searchedTopics = function(topics) {
    let matchingTopics = topics.map((val) => val.content);
    $('.search').autocomplete({
      source: matchingTopics
    });
  };

  /* Función para manejar errores */
  const handleError = function() {
    console.log('Se ha producido un error');
  };

  getTopic();

  /* publicar respuestas */
  $('#post-answer').click(function() {
  // alert('sí pasa');
    let newAuthor = $('#author').val();
    let newTopic = $('#message').val();
    $.post(`https://examen-laboratoria-sprint-5.herokuapp.com/topics/${topicId}/responses`,
      {
        author_name: newAuthor,
        content: newTopic,
        topic_id: topicId
      },
      // Cuando se logra hacer post exitosamente, se agrega los valores de la data al html
      function(data, status) {
        let firstChild = $('#answer-div').eq(0);
        $(firstChild).prepend(`<div class="box-shadow mt-5 mx-5"><h2 class="ml-4 bgr-ltr-spacing dark-ltr">${data.content}</h2><br><p class="ml-4">By:</p><h2 class="ml-4 sm-ltr-spacing">${data.author_name}</h2><hr></div>`);
        $('#author').val('');
        $('#message').val('');
      });
  });
});
