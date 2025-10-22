document.addEventListener('DOMContentLoaded', function() {
    // Current date and selected date
    let currentDate = new Date();
    let selectedDate = null;
    
    // DOM Elements
    const currentMonthElement = document.getElementById('current-month');
    const calendarDays = document.getElementById('calendar-days');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    const timeSlotsContainer = document.getElementById('time-slots');
    const selectedDateElement = document.getElementById('selected-date');
    
    // Available time slots (in a real app, this would come from your backend)
    const availableTimes = [
        '09:00', '10:00', '11:00', '12:00', '15:00', '16:00', '17:00', '18:00'
    ];
    
    // Booked appointments (in a real app, this would come from your backend)
    const bookedAppointments = {
        // Format: 'YYYY-MM-DD': ['10:00', '14:00', ...]
        '2024-10-25': ['10:00', '15:00'],
        '2024-10-26': ['11:00', '16:00']
    };
    
    // Initialize the calendar
    function initCalendar() {
        renderCalendar();
        setupEventListeners();
    }
    
    // Render the calendar
    function renderCalendar() {
        // Set the month and year in the header
        const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        currentMonthElement.textContent = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
        
        // Clear previous days
        calendarDays.innerHTML = '';
        
        // Get the first day of the month and the number of days in the month
        const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
        const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
        const daysInPrevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
        
        // Adjust for Monday as the first day of the week
        const firstDayIndex = firstDay === 0 ? 6 : firstDay - 1;
        
        // Add days from the previous month
        for (let i = firstDayIndex; i > 0; i--) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('day', 'past');
            dayElement.textContent = daysInPrevMonth - i + 1;
            calendarDays.appendChild(dayElement);
        }
        
        // Add days of the current month
        const today = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();
        
        for (let i = 1; i <= daysInMonth; i++) {
            const dayElement = document.createElement('div');
            const dayDate = new Date(currentYear, currentMonth, i);
            const formattedDate = formatDate(dayDate);
            
            // Check if it's today
            const isToday = i === today.getDate() && 
                           currentMonth === today.getMonth() && 
                           currentYear === today.getFullYear();
            
            // Check if it's in the past
            const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
            const isPast = dayDate < todayStart;
            
            // Check if it's booked (in a real app, this would check against your database)
            const isBooked = Math.random() > 0.7; // 30% chance of being booked for demo
            
            // Set classes based on the day's status
            dayElement.classList.add('day');
            if (isToday) dayElement.classList.add('today');
            if (isPast) dayElement.classList.add('past');
            if (isBooked) dayElement.classList.add('booked');
            if (!isPast && !isBooked) dayElement.classList.add('available');
            
            // Set the date as a data attribute for reference
            dayElement.dataset.date = formattedDate;
            dayElement.textContent = i;
            
            // Add click event for available days
            if (!isPast && !isBooked) {
                dayElement.addEventListener('click', () => selectDay(dayDate));
            }
            
            calendarDays.appendChild(dayElement);
        }
        
        // Add days from the next month to complete the grid
        const totalDays = firstDayIndex + daysInMonth;
        const remainingCells = totalDays <= 35 ? 35 - totalDays : 42 - totalDays;
        
        for (let i = 1; i <= remainingCells; i++) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('day', 'past');
            dayElement.textContent = i;
            calendarDays.appendChild(dayElement);
        }
    }
    
    // Render time slots for the selected date
    function renderTimeSlots(date) {
        if (!date) {
            timeSlotsContainer.innerHTML = '';
            selectedDateElement.textContent = 'Selecciona una fecha para ver los horarios disponibles';
            return;
        }
        
        const formattedDate = formatDate(date);
        const dayOfWeek = date.getDay();
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6; // Sunday (0) or Saturday (6)
        
        // Update the selected date text
        const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
        const formatter = new Intl.DateTimeFormat('es-ES', options);
        const formattedDateText = formatter.format(date);
        selectedDateElement.textContent = `Horarios disponibles para el ${formattedDateText.charAt(0).toUpperCase() + formattedDateText.slice(1)}`;
        
        // Clear previous time slots
        timeSlotsContainer.innerHTML = '';
        
        // In a real app, you would fetch available time slots from your backend
        // For this demo, we'll use predefined time slots with some random availability
        
        // Different time slots for weekends
        const weekendTimes = ['10:00', '11:00', '12:00', '16:00', '17:00'];
        const weekdayTimes = availableTimes;
        const timesToShow = isWeekend ? weekendTimes : weekdayTimes;
        
        // Get booked times for this date (in a real app, from your database)
        const bookedTimes = bookedAppointments[formattedDate] || [];
        
        // Create time slot elements
        timesToShow.forEach(time => {
            const isBooked = bookedTimes.includes(time) || Math.random() > 0.8; // 20% chance of being booked for demo
            
            const timeSlot = document.createElement('div');
            timeSlot.classList.add('time-slot');
            timeSlot.textContent = time;
            
            if (isBooked) {
                timeSlot.classList.add('booked');
            } else {
                timeSlot.classList.add('available');
                timeSlot.addEventListener('click', () => selectTime(time));
            }
            
            timeSlotsContainer.appendChild(timeSlot);
        });
    }
    
    // Select a day
    function selectDay(date) {
        // Remove selected class from all days
        document.querySelectorAll('.day').forEach(day => {
            day.classList.remove('selected');
        });
        
        // Add selected class to the clicked day
        const formattedDate = formatDate(date);
        const selectedDay = document.querySelector(`.day[data-date="${formattedDate}"]`);
        if (selectedDay) {
            selectedDay.classList.add('selected');
        }
        
        selectedDate = date;
        renderTimeSlots(date);
    }
    
    // Select a time (in a real app, this would initiate the booking process)
    function selectTime(time) {
        // Remove selected class from all time slots
        document.querySelectorAll('.time-slot').forEach(slot => {
            slot.classList.remove('selected');
        });
        
        // Add selected class to the clicked time slot
        const selectedSlot = Array.from(timeSlotsContainer.children).find(
            slot => slot.textContent === time && slot.classList.contains('available')
        );
        
        if (selectedSlot) {
            selectedSlot.classList.add('selected');
            
            // In a real app, you would show a booking form or confirmation here
            console.log(`Selected date: ${formatDate(selectedDate)} at ${time}`);
        }
    }
    
    // Format date as YYYY-MM-DD
    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    
    // Navigate to the next month
    function nextMonth() {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
        renderTimeSlots(selectedDate);
    }
    
    // Navigate to the previous month
    function prevMonth() {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
        renderTimeSlots(selectedDate);
    }
    
    // Set up event listeners
    function setupEventListeners() {
        // Month navigation
        prevMonthBtn.addEventListener('click', prevMonth);
        nextMonthBtn.addEventListener('click', nextMonth);
    }
    
    // Initialize the calendar
    initCalendar();
});
