document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar-main');
    var calendarMain = new FullCalendar.Calendar(calendarEl, {
      
      locale: 'pt-br',
      initialView:'listMonth',
      height: 'auto',
     
      
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
      
      events: [
         
        {
          title: 'Mon, Tue',
          daysOfWeek: [ '1', '2' ],
          startRecur: '2022-06-01',
          endRecur:'2022-07-31',
          startTime: '10:45:00',
          endTime: '12:45:00'
        }
      ],

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
    calendarMain.render();

  });