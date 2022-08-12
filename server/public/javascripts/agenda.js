

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

// Calendário de agenda do usuário
document.addEventListener('DOMContentLoaded', function () {

    // variáveis pra guardar os valores e usar no calendário
    var agendaStart = document.getElementById('agenda-start').value
    var agendaEnd = document.getElementById('agenda-end').value
    var business = document.getElementById('businessHours').value
    var events = document.getElementById('events').value

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

    
    var calendarEl = document.getElementById('calendar-agenda');
    var calendar = new FullCalendar.Calendar(calendarEl, {
    
        locale: 'pt-br',
        initialView: 'timeGridWeek',
        showNonCurrentDates: true, //tira os dias do mês anterior do calendário
        selectable: false,
        selectMirror: true,
        headerToolbar: {
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
            center: 'title',
            left: 'today prev,next'
        },
        validRange: function() {
            return {
                start: agendaStart,
                end: agendaEnd
            }
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
        height: 850,
        now: function (date) {
            var now = Date.now()
            var date = new Date(now)
            return date
        },
        businessHours: JSON.parse(business),
        slotMinTime: '06:00:00',
        events: JSON.parse(events),
        eventClick: function(info) {
            getInfo(info)
            modal.style.display = "block"
            
        },
        views: {
            dayGridMonth: { // name of view
                titleFormat: {
                    year: 'numeric',
                    month: 'long'
                },
                // other view-specific options here
            }
        }
    });
    calendar.render();
    

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
  
