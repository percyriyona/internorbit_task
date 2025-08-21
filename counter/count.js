let timerInterval;
    let paused = false;
    let remainingTime = 0;

    const dateInput = document.getElementById('datePicker');
    const timeInput = document.getElementById('timePicker');
    const toggleBtn = document.getElementById('toggleBtn');

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    function updateCountdownDisplay({ days, hours, minutes, seconds }) {
      daysEl.textContent = days.toString().padStart(2, '0');
      hoursEl.textContent = hours.toString().padStart(2, '0');
      minutesEl.textContent = minutes.toString().padStart(2, '0');
      secondsEl.textContent = seconds.toString().padStart(2, '0');
    }

    function calculateTimeRemaining(targetDate) {
      const now = new Date();
      const diff = targetDate - now;

      if (diff <= 0) return null;

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      remainingTime = diff;
      return { days, hours, minutes, seconds };
    }

    function getTargetDateTime() {
      const dateVal = dateInput.value;
      const timeVal = timeInput.value || "00:00";

      const [year, month, day] = dateVal.split('-');
      const [hours, minutes] = timeVal.split(':');

      const localDate = new Date(
        Number(year),
        Number(month) - 1,
        Number(day),
        Number(hours),
        Number(minutes),
        0,
        0
      );

      return localDate;
    }

    function startTimer() {
      const targetDate = getTargetDateTime();

      if (new Date() >= targetDate) {
        alert("Please select a future date and time!");
        updateCountdownDisplay({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      clearInterval(timerInterval);

      timerInterval = setInterval(() => {
        if (!paused) {
          const remaining = calculateTimeRemaining(targetDate);
          if (remaining) {
            updateCountdownDisplay(remaining);
          } else {
            clearInterval(timerInterval);
            updateCountdownDisplay({ days: 0, hours: 0, minutes: 0, seconds: 0 });
          }
        }
      }, 1000);
    }

    toggleBtn.addEventListener('click', () => {
      paused = !paused;
      toggleBtn.textContent = paused ? 'Resume' : 'Pause';
    });

    dateInput.addEventListener('change', startTimer);
    timeInput.addEventListener('change', startTimer);
    startTimer();