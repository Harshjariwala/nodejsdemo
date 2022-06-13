// ----------------- LOGIN -----------------
toastr.options = { "preventDuplicates": true }

$('#btn-login').click(function (event) {
  $.ajax({
    type: 'POST',
    url: '/api/auth/login',
    dataType: 'json',
    data: $('#login-form').serialize(),
    success: function (result) {
      localStorage.setItem('secret-token', result.data.token);
      location.href = '/web/user';
    },
    error: function (error) {
      toastr.error(error.responseJSON.message);
    }
  });
});
// ----------------- & LOGIN -----------------

$('body').keypress(function (e) {
  var key = e.which;
  if (key == 13) {
    // The enter key code
    $('input[type = button]').click();
    return false;
  }
});