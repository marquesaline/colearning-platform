
//<!-- Calendário do container lateral -->
document.addEventListener('DOMContentLoaded', function () {
  var calendarEl = document.getElementById('calendar');
  var calendar = new FullCalendar.Calendar(calendarEl, {
    locale: 'pt-br',
    initialView: 'dayGridMonth',
    showNonCurrentDates: false, //tira os dias do mês anterior do calendário
    themeSystem: String,
    default: 'standard',
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

          // other view-specific options here
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
          title: 'Mon, Tue',
          daysOfWeek: [ '1', '2' ], //dias da semana
          startRecur: '2022-06-01', //data de início da recorrência
          endRecur:'2022-07-31', //data final da recorrência
          startTime: '10:45:00', //hora de início
          endTime: '12:45:00' // hora final
        }
      ],

     
    });
    calendarMain.render();

  });