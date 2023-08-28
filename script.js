$(document).ready(function(){
  var date_input = $('input[name="date"]');
  var container = $('.bootstrap-iso form').length > 0 ? $('.bootstrap-iso form').parent() : "body";
  date_input.datepicker({
    format: 'mm/dd/yyyy',
    container: container,
    todayHighlight: true,
    autoclose: true,
  });

  // Event handler for form submission
  $('#reservation-form').on('submit', function(e) {
    e.preventDefault();
    var formData = {
      firstName: $('#firstName').val(),
      lastName: $('#lastName').val(),
      date: $('#date').val(),
      time: $('#time').val()
    };

    // We use localStorage instead of writing to an external file
    var existingReservations = JSON.parse(localStorage.getItem('reservations')) || [];

    // Check if the same reservation already exists
    var reservationExists = existingReservations.some(function(reservation) {
      return (
        reservation.firstName === formData.firstName &&
        reservation.lastName === formData.lastName &&
        reservation.date === formData.date &&
        reservation.time === formData.time
      );
    });

    if (reservationExists) {
      alert('This reservation has already been made.');
    } else {
      // Add the new reservation to the list
      existingReservations.push(formData);

      // Store the updated list in localStorage
      localStorage.setItem('reservations', JSON.stringify(existingReservations));

      // Provide feedback to the user
      alert('Reservation successful!');

   
    }
  });
});