// ----------------- HEADER LINK ACTIVATION -----------------
const pathname = window.location.pathname;
switch (pathname) {
  case '/web/user':
    $('a[ href="user" ]').addClass('active');
    break;
  default:
    break;
}
// ----------------- & HEADER LINK ACTIVATION -----------------

// ----------------- LOG OUT -----------------
$('#logout-link').on('click', () => {
  $.ajax({
    type: 'GET',
    url: '/api/auth/logout',
    dataType: 'json',
    success: function (result) {
      localStorage.clear();
      toastr.success('Logout successfully');
      window.location.href = "/";
    },
    error: function (error) {
      toastr.error(error);
    }
  });
})
// ----------------- & LOG OUT -----------------