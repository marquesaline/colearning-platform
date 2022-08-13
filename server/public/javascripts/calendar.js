
//<!-- Calendário do container lateral -->
document.addEventListener('DOMContentLoaded', function () {
  var calendarEl = document.getElementById('calendar');
  var calendar = new FullCalendar.Calendar(calendarEl, {
    locale: 'pt-br',
    initialView: 'dayGridMonth',
    showNonCurrentDates: false, //tira os dias do mês anterior do calendário
    
    now: function (date) {
      var now = Date.now()
      var date = new Date(now)
      return date
    },
    selectable: true,
    headerToolbar: {
      center: 'dayGridMonth',
      end: 'today prev,next'
    }, //{ center: 'dayGridMonth,timeGridWeek' }
    buttonText: {
      today: 'Hoje',
      month: 'Mês',
      prev: '<',
      next: '>'
    },
    slotMinTime: '06:00:00',
    views: {
      dayGridMonth: { // name of view
        titleFormat: {
          year: 'numeric',
          month: 'long'
        },

        // other view-specific options here
      }
    },
  });
  calendar.render();

});
// <!-- Calendário da parte principal -->
document.addEventListener('DOMContentLoaded', function () {
    var eventsToShow = document.getElementById('events').value
    var eventsArray = JSON.parse(eventsToShow)
    
    var modal = document.getElementById("myModal")
    var span = document.getElementsByClassName("close")[0];
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    span.onclick = function() {
        modal.style.display = "none";
    }

    var calendarEl = document.getElementById('calendar-main');
    var calendarMain = new FullCalendar.Calendar(calendarEl, {
      
      locale: 'pt-br',
      
      height: 850,
      showNonCurrentDates: false,
     
      views: {
        dayGridMonth: { // name of view
          titleFormat: {
            year: 'numeric',
            month: 'long'
          },
          slotLabelFormat: {
            hour: 'numeric',
            minute: '2-digit',
            omitZeroMinute: false,
            meridiem: 'short'
         
          },
        }
      },
      
      selectable: true,
      headerToolbar: {
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
        center: 'title',
        left: 'today prev,next'
      },
      buttonText: {
        today: 'Hoje',
        month: 'Mês',
        week: 'Semana',
        list: 'Lista',
        day: 'Dia',
        prev: '<',
        next: '>'
      },
      
      events: JSON.parse(eventsToShow),

      eventClick: function(info) {
        if (info.event.url) {
          getInfo(info)
          modal.style.display = "block"
          info.jsEvent.preventDefault();
          window.open(info.event.url, "_blank")
          return false;
        }
        else {
          getInfo(info)
          modal.style.display = "block"
        }
        
      }
      
    });
    calendarMain.render();
  });


//funções 

function getInfo(info) {
  var nameStudant = document.getElementById('name-studant')
  var emailStudant = document.getElementById('email-studant')
  var telStudant = document.getElementById('tel-studant')
  var dateEvent = document.getElementById('date-event')
  var timeEvent = document.getElementById('time-event')
  var description = document.getElementById('description')
  var urlEvent = document.getElementById('url-event')

  var date = info.event.start
  var hours = date.getHours()
  var minutes = date.getMinutes()
  

  return [
    nameStudant.innerHTML = `Nome do aluno: ${info.event.title}`,
    emailStudant.innerHTML = `Email do aluno: ${info.event.extendedProps.emailAluno}`,
    telStudant.innerHTML = `Telefone do aluno: ${checkInfoNull(info.event.extendedProps.telefoneAluno)}`,
    dateEvent.innerHTML = `Data: ${date.toLocaleDateString('pt-br')}`,
    timeEvent.innerHTML = `Horário: ${hours}:${minutes}`,
    urlEvent.innerHTML = `Link da reunião: ${checkInfoNull(info.event.url)}`,
    description.innerHTML = `Assunto: ${checkInfoNull(info.event.extendedProps.description)}`
  ]
}

function checkInfoNull(info) {
  if(info == null || info == undefined) {
    return [
      "dado não informado"
    ]
  } else {
    return info
  }
}
