document.addEventListener('DOMContentLoaded', function () {

    // variáveis pra guardar os valores e usar no calendário
    var end = document.getElementById('agenda-end').value
    var businessHours = document.getElementById('businessHours').value
   
    var events = document.getElementById('events').value
  

    //modal pra agendar
    var modal = document.getElementById("myModal")
    var span = document.getElementsByClassName("close")[0];
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none"
        }
    }
    span.onclick = function() {
        modal.style.display = "none"
    }

    //calendário de exibição pra agendamento
    var calendarEl = document.getElementById('calendar-agendamento');
    var calendar = new FullCalendar.Calendar(calendarEl, {
    
        locale: 'pt-br',
        initialView: 'timeGridWeek',
        showNonCurrentDates: true, //tira os dias do mês anterior do calendário
        selectable: true,
        selectMirror: true,
        headerToolbar: {
           
            end: 'today prev,next'
        }, //{ center: 'dayGridMonth,timeGridWeek' }
        buttonText: {
            today: 'Hoje',
            prev: '<',
            next: '>'
        },
        height: 'auto',
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
        businessHours: JSON.parse(businessHours),
        selectConstraint: "businessHours",
        slotMinTime: '06:00:00',

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
    calendar.render()

})

// funções

function getTime() {
    var date = document.getElementById("start").value
    var time = document.getElementById("startTime").value
    var dateTime = moment(`${date}T${time}`)
    dateTime = new Date(dateTime)

    var currentDate = new Date()

    //verifica se a hora do agendamento é anterior a atual
    if(dateTime.getFullYear() == currentDate.getFullYear() 
        && dateTime.getMonth() == currentDate.getMonth()
        && dateTime.getDate() == currentDate.getDate()) {
        
            if(dateTime.getHours() <= currentDate.getHours() ) {
                console.log("Hora inválida")
                return [
                    document.getElementById("startTime").style.borderColor = "red",
                    document.getElementById("submit").disabled = true
                ]
            } else {
                return document.getElementById("submit").disabled = false
            }
    } else {
        getBusinessHours(time, dateTime)
        // checar se tem eventos no mesmo horário
        getEvents()
            
    }
  

} 

//verifica se é horário de trabalho na agenda
function getBusinessHours(time, dateTime) {
    var businessHours = JSON.parse(document.getElementById('businessHours').value)
    for(i = 0; i < businessHours.length; i++) {
        for(j = 0; j < businessHours[i].daysOfWeek.length; j++) {
            if(businessHours[i].daysOfWeek[j] == dateTime.getDay()) {   
                //conferir se está dentro do horário de trabalho no dia                 
                if(businessHours[i].startTime > time 
                    || businessHours[i].endTime < time) {
                        return showAlert(true)
                } else {
                    return showAlert(false)
                }
                
            }
        }
    }
}
function getStartValue() {
    var startInput = document.getElementById('start')
    console.log(startInput.value)
}

// validação de eventos na mesma data e horário
function getEvents() {
    var events = JSON.parse(document.getElementById('events').value)
    
    var date = moment(document.getElementById("start").value).format("YYYY-MM-DD")
    var time = document.getElementById("startTime").value

    for(let i = 0; i < events.length; i++) {
       if(events[i].start == date) {
        // verifica tem evento agendado no mesmo horário
         if(events[i].startTime == time 
            || (time > events[i].startTime && time < events[i].endTime)) {
            return showAlert(true) 
         }else {
            return showAlert(false)
         }
       }
    }
}

// função pra exibir mensagem de alerta se for verdadeiro
function showAlert(boolean) {
    if(boolean) {
        document.getElementById("submit").disabled = true,
        document.getElementById("startTime").style.borderColor = "red",
        document.getElementById("alert").style.display = "block"
    } else {
        document.getElementById("submit").disabled = false,
        document.getElementById("startTime").style.borderColor = "black",
        document.getElementById("alert").style.display = "none"
    }
}