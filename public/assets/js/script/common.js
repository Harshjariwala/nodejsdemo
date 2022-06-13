toastr.options = { "preventDuplicates": true }

var token = localStorage.getItem('secret-token');

function postAjax(table, apiPath, message, formId, formData, modalId) {

  $.ajax({
    type: 'POST',
    url: apiPath,
    dataType: 'json',
    data: formData,
    beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', token); },
    success: function (result) {
      $(formId)[0].reset();
      toastr.success(message);
      $(modalId).modal('hide');
      table.ajax.reload();
    },
    error: function (error) {
      toastr.error(error.responseJSON.message);
    }
  });
}

function putAjax(table, apiPath, message, formId, formData, modalId) {

  $.ajax({
    type: 'PUT',
    url: apiPath,
    dataType: 'json',
    data: formData,
    beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', token); },
    success: function (result) {
      $(formId)[0].reset();
      toastr.success(message);
      $(modalId).modal('hide');
      table.ajax.reload();
    },
    error: function (error) {
      toastr.error(error.responseJSON.message);
    }
  });
}

function deleteAjax(table, apiPath, message) {
  swal({
    title: "Are you sure?",
    text: "Do you want to delete this record?",
    icon: "error",
    buttons: [true, "Delete"],
  })
  .then((willDelete) => {
    if (willDelete) {
      $.ajax({
        type: 'DELETE',
        url: apiPath,
        dataType: 'json',
        beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', token); },
        success: function () {
          table.ajax.reload();
          toastr.success(message);
        },
        error: function (error) {
          toastr.error(error.responseJSON.message);
        }
      });
      return true;
    }
  });
  return false;
}

export { postAjax, putAjax, deleteAjax };