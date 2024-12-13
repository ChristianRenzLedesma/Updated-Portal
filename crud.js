let students = JSON.parse(localStorage.getItem('students')) || [];

let saveData = () => localStorage.setItem('students', JSON.stringify(students));

$(document).ready(function () {
  let stringData = localStorage.getItem('students');
  students = JSON.parse(stringData) || [];
  Table();
});

$("#profileImage").change(function () {
  if (this.files && this.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      $('#profilePreview').attr('src', e.target.result);
    }
    reader.readAsDataURL(this.files[0]);
  }
});

function Table() {
  let $studentsTable = $("tbody");
  $studentsTable.html("");
  if (students.length === 0) {
    $studentsTable.append('<tr><td colspan="9">No Data found.</td></tr>');
  } else {
    for (let i = 0; i < students.length; i++) {
      let student = students[i];
      let studentRows = `<tr>
                        <td>${i + 1}</td>
                        <td><img src="${student.profile}" alt="Profile Picture" width="50" height="50" style="border-radius: 50%;"></td>
                        <td>${student.subject}</td>
                        <td>${student.name}</td>
                        <td>${student.age}</td>
                        <td>${student.grade}</td>
                        <td>${student.Instructor}</td>
                        <td>${student.course}</td>
                        <td class="upde">
                            <button class="btn btn-warning update" data-index="${i}"><ion-icon name="create-outline"></ion-icon></button>
                            <button class="btn btn-danger delete" data-index="${i}"><ion-icon name="trash-outline"></ion-icon></button>
                        </td>
                        </tr>`;
      $studentsTable.append(studentRows);
    }

    updateDelete();
  }
}

function updateDelete() {
  $(".update").each(function () {
    $(".update").click(function () {
      let index = $(this).data("index");
      let student = students[index];
      $('#profilePreview').attr('src', student.profile);
      $('#subject').val(student.subject);
      $('#name').val(student.name);
      $('#age').val(student.age);
      $('#grade').val(student.grade);
      $('#instructor').val(student.Instructor);
      $('#course').val(student.course);
      $('#submit').data('editing', index);
    });
  });

  $(".delete").each(function () {
    $(".delete").click(function () {
      let index = $(this).data("index");
      students.splice(index, 1);
      saveData();
      Table();
    });
  });
}

$("#submit").click(function () {
  let profile = $('#profilePreview').attr('src');
  let subject = $('#subject').val();
  let name = $('#name').val();
  let age = $('#age').val();
  let grade = $('#grade').val();
  let Instructor = $('#instructor').val();
  let course = $('#course').val();

  let student = {
    profile: profile,
    subject: subject,
    name: name,
    age: age,
    grade: grade,
    Instructor: Instructor,
    course: course,
  };

  let editingIndex = $(this).data('editing');

  if (editingIndex !== undefined) {
    students[editingIndex] = student;
    $(this).removeData('editing');
  } else {
    students.push(student);
  }
  saveData();
  Table();

  $('#profilePreview').attr('src', '');
  $('#subject').val('');
  $('#name').val('');
  $('#age').val('');
  $('#grade').val('');
  $('#instructor').val('');
  $('#course').val('');

});


