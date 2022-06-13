import { deleteAjax, postAjax, putAjax } from "./common.js";

var token = localStorage.getItem('secret-token');
var table;

$(document).ready(function () {

  // ----------------- USER VALIDATION AND ON HIDDEN EVENT -----------------
  var validator = $("#user-form").validate({
    rules: {
      firstName: { required: true, },
      lastName: { required: true },
      nickName: { required: true },
      email: { required: true },
      dob: { required: true },
      gender: { required: true },
    },
    messages: {
      firstName: { required: "* This field is required." },
      lastName: { required: "* This field is required." },
      nickName: { required: "* This field is required." },
      email: { required: "* This field is required." },
      dob: { required: "* This field is required." },
      gender: { required: "* This field is required." },
    }
  })

  $("#userModal").on('hidden.bs.modal', function () {
    validator.resetForm();
  });
  // ----------------- & USER VALIDATION AND ON HIDDEN EVENT -----------------

  // ----------------- DATA TABLE FIELDS -----------------
  table = $("#userList").DataTable({
    "autoWidth": false,
    "scrollX": true,
    "order": [[0, 'asc']],
    "processing": true,
    "serverSide": true,
    "serverMethod": 'POST',
    "ordering": false,
    'ajax': {
      'url': '/api/user/all',
      beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', token); },
      data: function (data) {
      },
      error: function (error) {
        toastr.options = { "preventDuplicates": true }
        toastr.error(error.responseJSON.message);
        if (error.responseJSON.message == 'No auth token') { location.href = '/'; }
      }
    },
    "columns": [{
      data: null,
      "defaultContent": "-"
    }, {
      data: null,
      "defaultContent": "-",
      "render": function (data) { if (data.firstName) { return data.firstName; } }
    }, {
      data: null,
      "defaultContent": "-",
      "render": function (data) { if (data.lastName) { return data.lastName; } }
    }, {
      data: null,
      "defaultContent": "-",
      "render": function (data) { if (data.nickName) { return data.nickName; } }
    }, {
      data: null,
      "defaultContent": "-",
      "render": function (data) { if (data.email) { return data.email; } }
    }, {
      data: null,
      "defaultContent": "-",
      "render": function (data) { if (data.dob) { return new Date(data.dob).toDateString(); } }
    }, {
      data: null,
      "defaultContent": "-",
      "render": function (data) { if (data.gender) { return data.gender; } }
    },
    {
      "data": null,
      "render": function (data) {
        return `<a class="btn btn-md btn-outline-primary edit_user_link" id="editCourier" userId=${data._id} href="javascript:void(0)"><i class="fa fa-pencil-alt"></i></a>`;
      }
    },
    {
      "data": null,
      "render": function (data) {
        return `<a class="btn btn-md btn-outline-danger delete_user_link" id="deleteCourier" userId=${data._id} href="javascript:void(0)"><i class="far fa-trash-alt"></i></a>`;
      }
    }],
    "fnRowCallback": function (nRow, aData, iDisplayIndex) {
      var oSettings = table.settings()[0];
      $("td:first", nRow).html(oSettings._iDisplayStart + iDisplayIndex + 1);
      nRow.id = aData.id;
      return nRow;
    }
  });
});
// ----------------- & DATA TABLE FIELDS -----------------

// ----------------- ADD USER -----------------
$(document).on("click", ".new-user", function () {
  $('#user-form')[0].reset();
  $('#add_user').removeClass('hide');
  $('#edit_user').addClass('hide');
  $('#userModal').modal('show');
});

$('#add_user').click(function (event) {
  if ($("#user-form").valid()) {
    let apiPath = '/api/user';
    let message = 'user added successfully';
    let formId = '#user-form';
    let formData = $('#user-form').serialize();
    let modalId = '#userModal';

    postAjax(table, apiPath, message, formId, formData, modalId);
  }
});
// ----------------- & ADD USER -----------------

// ----------------- EDIT USER -----------------
$(document).on("click", ".edit_user_link", function () {

  $('#edit_user').removeClass('hide');
  $('#add_user').addClass('hide');
  $('input#id').attr('name', 'id');
  let value = $(this).attr("userId");

  $.ajax({
    type: 'GET',
    url: `/api/user/${value}`,
    dataType: 'json',
    beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', token); },
    success: function (result) {

      var editData = result.data;

      let date = new Date(editData.dob);
      date = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

      $("#firstName").val(editData.firstName);
      $("#lastName").val(editData.lastName);
      $("#nickName").val(editData.nickName);
      $("#dob").val(date);
      $('#edit_user').attr('userId', editData._id)
      $("#email").val(editData.email);

      if (editData.gender === 'Male') $("#male").attr('checked', true);
      else if (editData.gender === 'Female') $("#female").attr('checked', true);

      $('#userModal').modal('show');
    },
    error: function (error) {
      toastr.options = { "preventDuplicates": true }
      toastr.error(error.responseJSON.message);
    }
  });
})

$(document).on("click", "#edit_user", function () {
  if ($("#user-form").valid()) {
    const userId = $('#edit_user').attr('userId');
    const apiPath = `/api/user/${userId}`;
    const message = 'user updated successfully';
    const formId = '#user-form';
    const modalId = '#userModal';
    const formData = $('#user-form').serialize();

    putAjax(table, apiPath, message, formId, formData, modalId);
  }
});
// ----------------- & EDIT USER -----------------

// ----------------- DELETE USER -----------------
$(document).on("click", ".delete_user_link", function () {
  const id = $(this).attr("userId");
  const apiPath = `/api/user/${id}`;
  const message = 'User deleted successfully';
  deleteAjax(table, apiPath, message);
})
// ----------------- & DELETE USER -----------------