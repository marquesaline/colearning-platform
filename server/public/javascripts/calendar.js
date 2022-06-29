

//<!-- Calendário do container lateral -->
document.addEventListener('DOMContentLoaded', function () {
  var calendarEl = document.getElementById('calendar');
  var calendar = new FullCalendar.Calendar(calendarEl, {
    locale: 'pt-br',
    initialView: 'dayGridMonth',
    showNonCurrentDates: false, //tira os dias do mês anterior do calendário
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
      initialView:'timeGridWeek',
      height: 'auto',
      showNonCurrentDates: false,
     
      views: {
        timeGridWeek: { // name of view
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
      
      
      events: 'conta/json',
      
    });
    calendarMain.render();
    
  
  });