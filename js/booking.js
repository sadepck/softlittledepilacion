document.addEventListener('DOMContentLoaded', function() {
    // Current date and selected date
    let currentDate = new Date();
    let selectedDate = new Date();
    let selectedService = '';
    let selectedTime = '';
    
    // DOM Elements
    const currentMonthElement = document.getElementById('current-month');
    const calendarDays = document.getElementById('calendar-days');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    const timeSlotsContainer = document.getElementById('time-slots');
    const selectedDateText = document.getElementById('selected-date-text');
    const bookingSteps = document.querySelectorAll('.booking-step');
    const serviceOptions = document.querySelectorAll('.service-option');
    const nextStepButtons = document.querySelectorAll('.next-step');
    const prevStepButtons = document.querySelectorAll('.prev-step');
    const bookingForm = document.getElementById('booking-form');
    const summaryService = document.getElementById('summary-service');
    const summaryDate = document.getElementById('summary-date');
    const summaryTime = document.getElementById('summary-time');
    
    // Available time slots (in a real app, this would come from your backend)
    const availableTimes = [
        '09:00', '10:00', '11:00', '12:00', '15:00', '16:00', '17:00', '18:00'
    ];
    
    // Booked appointments (in a real app, this would come from your backend)
    const bookedAppointments = {
        // Format: 'YYYY-MM-DD': ['10:00', '14:00', ...]
    };
    
    // Service details
    const services = {
        'depilacion-definitiva': 'Depilación Definitiva',
        'perfilado-cejas': 'Perfilado de Cejas',
        'lifting-pestanas': 'Lifting de Pestañas'
    };
    
    // Initialize the calendar
    function initCalendar() {
        renderCalendar();
        renderTimeSlots();
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
            dayElement.classList.add('day', 'disabled');
            dayElement.textContent = daysInPrevMonth - i + 1;
            calendarDays.appendChild(dayElement);
        }
        
        // Add days of the current month
        const today = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();
        
        for (let i = 1; i <= daysInMonth; i++) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('day');
            dayElement.textContent = i;
            
            // Check if it's today
            if (i === today.getDate() && 
                currentMonth === today.getMonth() && 
                currentYear === today.getFullYear()) {
                dayElement.classList.add('today');
            }
            
            // Check if it's selected
            if (i === selectedDate.getDate() && 
                currentMonth === selectedDate.getMonth() && 
                currentYear === selectedDate.getFullYear()) {
                dayElement.classList.add('selected');
            }
            
            // Check if it's in the past
            const dayDate = new Date(currentYear, currentMonth, i);
            const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
            
            if (dayDate < todayStart) {
                dayElement.classList.add('disabled');
            } else {
                // Add click event for selectable days
                dayElement.addEventListener('click', () => selectDay(i));
            }
            
            calendarDays.appendChild(dayElement);
        }
        
        // Add days from the next month to complete the grid
        const totalDays = firstDayIndex + daysInMonth;
        const remainingCells = totalDays <= 35 ? 35 - totalDays : 42 - totalDays;
        
        for (let i = 1; i <= remainingCells; i++) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('day', 'disabled');
            dayElement.textContent = i;
            calendarDays.appendChild(dayElement);
        }
        
        // Update the selected date text
        updateSelectedDateText();
    }
    
    // Render time slots
    function renderTimeSlots() {
        timeSlotsContainer.innerHTML = '';
        
        // Format the selected date as YYYY-MM-DD for checking booked appointments
        const formattedDate = formatDate(selectedDate);
        const bookedTimes = bookedAppointments[formattedDate] || [];
        
        availableTimes.forEach(time => {
            const timeSlot = document.createElement('div');
            timeSlot.classList.add('time-slot');
            timeSlot.textContent = time;
            
            // Check if the time slot is booked
            if (bookedTimes.includes(time)) {
                timeSlot.classList.add('booked');
                timeSlot.title = 'Este horario no está disponible';
            } else {
                timeSlot.addEventListener('click', () => selectTime(time));
            }
            
            timeSlotsContainer.appendChild(timeSlot);
        });
        
        // Enable/disable the next button based on selection
        const nextButton = document.querySelector('#step-3 .next-step');
        if (nextButton) {
            nextButton.disabled = !selectedTime;
        }
    }
    
    // Select a day
    function selectDay(day) {
        selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        selectedTime = ''; // Reset selected time when changing the date
        renderCalendar();
        renderTimeSlots();
    }
    
    // Select a time
    function selectTime(time) {
        // Remove selected class from all time slots
        document.querySelectorAll('.time-slot').forEach(slot => {
            slot.classList.remove('selected');
        });
        
        // Add selected class to the clicked time slot
        const selectedSlot = Array.from(timeSlotsContainer.children).find(
            slot => slot.textContent === time && !slot.classList.contains('booked')
        );
        
        if (selectedSlot) {
            selectedSlot.classList.add('selected');
            selectedTime = time;
            
            // Enable the next button
            const nextButton = document.querySelector('#step-3 .next-step');
            if (nextButton) {
                nextButton.disabled = false;
            }
        }
    }
    
    // Update the selected date text
    function updateSelectedDateText() {
        const options = { 
            weekday: 'long', 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric' 
        };
        
        // Format the date in Spanish
        const formatter = new Intl.DateTimeFormat('es-ES', options);
        const formattedDate = formatter.format(selectedDate);
        
        // Capitalize the first letter
        selectedDateText.textContent = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
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
    }
    
    // Navigate to the previous month
    function prevMonth() {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    }
    
    // Show a specific step
    function showStep(stepNumber) {
        bookingSteps.forEach(step => step.classList.remove('active'));
        document.getElementById(`step-${stepNumber}`).classList.add('active');
        
        // Update the summary in the last step
        if (stepNumber === 4) {
            updateSummary();
        }
    }
    
    // Update the booking summary
    function updateSummary() {
        if (selectedService && selectedDate && selectedTime) {
            const formattedDate = new Intl.DateTimeFormat('es-ES', { 
                weekday: 'long', 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric' 
            }).format(selectedDate);
            
            summaryService.textContent = services[selectedService] || selectedService;
            summaryDate.textContent = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
            summaryTime.textContent = selectedTime;
        }
    }
    
    // Set up event listeners
    function setupEventListeners() {
        // Month navigation
        prevMonthBtn.addEventListener('click', prevMonth);
        nextMonthBtn.addEventListener('click', nextMonth);
        
        // Service selection
        serviceOptions.forEach(option => {
            option.addEventListener('click', () => {
                // Remove selected class from all options
                serviceOptions.forEach(opt => opt.classList.remove('selected'));
                
                // Add selected class to the clicked option
                option.classList.add('selected');
                selectedService = option.getAttribute('data-service');
                
                // Enable the next button
                const nextButton = document.querySelector('#step-1 .next-step');
                if (nextButton) {
                    nextButton.disabled = false;
                }
            });
        });
        
        // Next step buttons
        nextStepButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const nextStep = button.getAttribute('data-next');
                if (nextStep) {
                    showStep(parseInt(nextStep));
                    
                    // Scroll to the top of the booking section
                    document.getElementById('reservas').scrollIntoView({ 
                        behavior: 'smooth' 
                    });
                }
            });
        });
        
        // Previous step buttons
        prevStepButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const prevStep = button.getAttribute('data-prev');
                if (prevStep) {
                    showStep(parseInt(prevStep));
                    
                    // Scroll to the top of the booking section
                    document.getElementById('reservas').scrollIntoView({ 
                        behavior: 'smooth' 
                    });
                }
            });
        });
        
        // Form submission
        if (bookingForm) {
            bookingForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // In a real app, you would send the form data to your server here
                const formData = new FormData(bookingForm);
                const formObject = {};
                
                for (let [key, value] of formData.entries()) {
                    formObject[key] = value;
                }
                
                // Add booking details to the form data
                formObject.service = services[selectedService] || selectedService;
                formObject.date = selectedDate;
                formObject.time = selectedTime;
                
                console.log('Form submitted:', formObject);
                
                // Show success message (in a real app, you would handle the server response)
                alert('¡Reserva realizada con éxito! Te hemos enviado un correo de confirmación.');
                
                // Reset the form and go back to the first step
                bookingForm.reset();
                showStep(1);
                
                // Reset selections
                selectedService = '';
                selectedTime = '';
                selectedDate = new Date();
                
                // Re-render the calendar and time slots
                renderCalendar();
                renderTimeSlots();
                
                // Reset service selection
                serviceOptions.forEach(opt => opt.classList.remove('selected'));
                
                // Scroll to the top of the booking section
                document.getElementById('reservas').scrollIntoView({ 
                    behavior: 'smooth' 
                });
            });
        }
    }
    
    // Initialize the booking system
    initCalendar();
});
