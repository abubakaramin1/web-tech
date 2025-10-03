var API_BASE = "https://jsonplaceholder.typicode.com/todos";
var allToDos = [];
var nextLocalId = 1001;

function renderList(arr) {
  var list = $("#storiesList");
  list.empty();
  if (!arr || arr.length === 0) {
    list.append('<div>No todos.</div>');
    return;
  }
  for (var i = 0; i < arr.length; i++) {
    var t = arr[i];
    var statusText = t.completed ? "completed" : "pending";
    var row = ''
      + '<div class="todo-item mb-3 border rounded p-3">'
      + '  <div class="d-flex justify-content-between">'
      + '    <div>'
      + '      <div class="todo-title fw-semibold">' + t.title + '</div>'
      + '      <div>Status: <span class="todo-status">' + statusText + '</span></div>'
      + '    </div>'
      + '    <div>'
      + '      <button type="button" class="btn btn-info btn-sm me-2 btn-edit" data-id="' + t.id + '">Edit</button>'
      + '      <button type="button" class="btn btn-danger btn-sm btn-del" data-id="' + t.id + '">Delete</button>'
      + '    </div>'
      + '  </div>'
      + '</div>';
    list.append(row);
  }
}

function seedFromApi() {
  $.ajax({
    url: API_BASE,
    method: "GET",
    dataType: "json",
    success: function (data) {
      allToDos = [];
      for (var i = 0; i < 10 && i < data.length; i++) {
        var item = data[i];
        allToDos.push({
          id: item.id,
          title: item.title,
          completed: !!item.completed
        });
      }
      renderList(allToDos);
    },
    error: function () {
      allToDos = [
        { id: 1, title: "Sample todo A", completed: false },
        { id: 2, title: "Sample todo B", completed: true }
      ];
      renderList(allToDos);
    }
  });
}

function clearForm() {
  $("#createTitle").val("");
  $("#createStatus").val("");
  $("#createBtn").removeAttr("data-id").text("Create");
  $("#clearBtn").hide();
}

function fillFormFromItem(item) {
  $("#createTitle").val(item.title);
  $("#createStatus").val(item.completed ? "completed" : "pending");
  $("#createBtn").text("Update").attr("data-id", item.id);
  $("#clearBtn").show();
}

function createLocal(title, statusText) {
  var completed = (String(statusText).toLowerCase() === "completed");
  var item = {
    id: nextLocalId++,
    title: title,
    completed: completed
  };
  allToDos.unshift(item);
  renderList(allToDos);
}

function updateLocal(id, title, statusText) {
  var completed = (String(statusText).toLowerCase() === "completed");
  id = String(id);
  for (var i = 0; i < allToDos.length; i++) {
    if (String(allToDos[i].id) === id) {
      allToDos[i].title = title;
      allToDos[i].completed = completed;
      break;
    }
  }
  renderList(allToDos);
}

function deleteLocal(id) {
  id = String(id);
  var newList = [];
  for (var i = 0; i < allToDos.length; i++) {
    if (String(allToDos[i].id) !== id) {
      newList.push(allToDos[i]);
    }
  }
  allToDos = newList;
  renderList(allToDos);
}

function onSubmit(e) {
  e.preventDefault();
  var id = $("#createBtn").attr("data-id");
  var title = $.trim($("#createTitle").val());
  var statusText = $.trim($("#createStatus").val()).toLowerCase();
  if (!title) { alert("Title is required."); return; }
  if (statusText !== "completed" && statusText !== "pending") { alert('Status must be "completed" or "pending".'); return; }
  if (id) { updateLocal(id, title, statusText); } else { createLocal(title, statusText); }
  clearForm();
}

function onEditClick() {
  var id = $(this).attr("data-id");
  var found = null;
  for (var i = 0; i < allToDos.length; i++) {
    if (String(allToDos[i].id) === String(id)) { found = allToDos[i]; break; }
  }
  if (found) { fillFormFromItem(found); }
}

function onDeleteClick() {
  var id = $(this).attr("data-id");
  deleteLocal(id);
}

$(document).ready(function () {
  seedFromApi();
  $(document).on("click", ".btn-edit", onEditClick);
  $(document).on("click", ".btn-del", onDeleteClick);
  $("#createForm").on("submit", onSubmit);
  $("#clearBtn").on("click", function () { clearForm(); }).hide();
  $("#refreshBtn").on("click", function () { seedFromApi(); });
});
