

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
// <!-- Calendário da parte principal -->
document.addEventListener('DOMContentLoaded', function () {
    
    var calendarEl = document.getElementById('calendar-main');
    var calendarMain = new FullCalendar.Calendar(calendarEl, {
      
      locale: 'pt-br',
      initialView:'dayGridMonth',
      height: 'auto',
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
        left: 'title',
        center: '',
        right: 'today prev,next'
      },
      buttonText: {
        today: 'Hoje',
        month: 'Mês',
        prev: '<',
        next: '>'
      },
      
      
      events: [
          {
              id: 1,
              idAgenda: 4,
              idUser: 1,
              allDay: false,
              title: "Exemplo de Aula",
              start: "2022-06-23T10:00:00",
              end: "2022-06-23T11:00:00"
      
          },
          {
              id: 2,
              extendedProps: {
                idAgenda: 3,
                idUser: 1,
              },
              allDay: false,
              title: "Exemplo de Aula2",
              start: "2022-06-24T10:00:00",
              end: "2022-06-24T11:30:00"
          },
          {
              id: 3,
              extendedProps: {
                
                idAgenda: 2,
                idUser: 1,
              },
              allDay: false,
              title: "Exemplo de Aula3",
              start: "2022-06-27T15:00:00",
              end: "2022-06-27T16:30:00"
          },
          {
              id_event: 4,
              extendedProps: {
                idAgenda: 1,
                idUser: 1,
              },
             
              allDay: false,
              title: "Exemplo de Aula4",
              start: "2022-06-29T10:00:00",
              end: "2022-06-29T11:30:00"
          }, 
          {
              id: 5,
              extendedProps: {
                idAgenda: 1,
                idUser: 1,
              },
              
              allDay: false,
              title: "Exemplo de Aula4",
              start: "2022-07-01T10:00:00",
              end: "2022-07-01T11:30:00"
          },
          {
              id: 6,
              extendedProps: {
                idAgenda: 1,
                idUser: 1,
              },
              allDay: false,
              title: "Exemplo de Aula4",
              start: "2022-07-02T10:00:00",
              end: "2022-07-02T11:30:00"
          }, 
          {
              id: 7,
              extendedProps: {
                idAgenda: 1,
                idUser: 1,
              },
              allDay: false,
              title: "Exemplo de Aula4",
              start: "2022-08-02T13:00:00",
              end: "2022-08-02T13:30:00"
          }, 
          {
              id: 9,
              extendedProps: {
                idAgenda: 1,
                idUser: 1,
              },
              allDay: false,
              title: "Exemplo de Aula4",
              start: "2022-07-15T10:00:00",
              end: "2022-07-15T11:30:00"
          }, 
          {
            "id": 14,
            "extendedProps": {
              "userId": 1,
              "agendaId": 2,
              "emailAluno": "email@teste.com"
            },
            "title": "Teste duracao",
            "start": "2022-07-20T09:00:00",
            "end": "2022-07-20",
            "allDay": false
          }
        ],
        eventClassNames: function(arg) {
          if (arg.event.extendedProps.idAgenda == 1) {
            return [ 'agenda1' ]
          } else {
            return [ '.notAgenda1']
          }
        }
      
    });
    calendarMain.render();
    var events = calendarMain.getEvents()
    filterCalendar(events)
    
  
  });


  function filterCalendar(events) {
    

    events.map(function (event) {
      if(event.extendedProps.idAgenda == 1) {
        // console.log(event)
      }
    })
  }