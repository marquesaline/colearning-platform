document.addEventListener('DOMContentLoaded', function () {

    // variáveis pra guardar os valores e usar no calendário
    var end = document.getElementById('agenda-end').value
    var businessHours = document.getElementById('businessHours').value
    console.log(businessHours)
    var events = document.getElementById('events').value
   
    //modal pra agendar
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

    //calendário de exibição pra agendamento
    var calendarEl = document.getElementById('calendar-agendamento');
    var calendar = new FullCalendar.Calendar(calendarEl, {
    
        locale: 'pt-br',
        initialView: 'dayGridMonth',
        showNonCurrentDates: true, //tira os dias do mês anterior do calendário
        selectable: true,
        selectMirror: true,
        headerToolbar: {
            center: 'dayGridMonth',
            end: 'today prev,next'
        }, //{ center: 'dayGridMonth,timeGridWeek' }
        buttonText: {
            today: 'Hoje',
            prev: '<',
            next: '>'
        },
        height: 650,
        now: function (date) {
            var now = Date.now()
            var date = new Date(now)
            return date
        },
        select: function(start) {
            var dateSelect = start.start
            var startInput = document.getElementById('start')
            

            return [
                startInput.valueAsDate = dateSelect,
                modal.style.display = "block"
            ]

            
        },
        validRange: function(nowDate) {
            return {
              start: nowDate,
              end: end
            };
        },
        businessHours: {businessHours},
    
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