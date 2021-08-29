function Course(title,instructor,image) {
    this.title=title;
    this.instructor=instructor;
    this.image=image;
}


//UI CONSTRUCTOR
function UI() {
    
}
UI.prototype.addCourseToList=function (course) {
    const list=document.getElementById('courseList');
    var html=`
    <tr>
        <td>
         <img src="img/${course.image}.jpg">
        </td>
        <td>
         ${course.title}
        </td>
        <td>
         ${course.instructor}
        </td>
        <td><a href="#" class="btn btn-warning btn-sm delete">Delete</a></td>

    </tr>
    
    `;
    list.innerHTML+=html;
}
UI.prototype.clearControls=function () {
    const title=document.getElementById('title').value='';
    const instructor=document.getElementById('instructor').value='';
    const image=document.getElementById('image').value='';
}
UI.prototype.deleteCourse=function(target){
    if(target.classList.contains('delete')){
        target.parentElement.parentElement.remove();
    }
}
UI.prototype.showAlert=function(text,className){
    var alert=`
        <div class="alert alert-${className}">
            ${text}
        </div>
    `;
    const row = document.querySelector('.row');

    //beforeBegin, afterBegin, beforeEnd, afterEnd
    row.insertAdjacentHTML('beforeBegin',alert);
    setTimeout(() => {
        document.querySelector('.alert').remove();
    }, 4000);
}

document.getElementById('newCourse').addEventListener('submit',function (e) {
const title=document.getElementById('title').value;
const instructor=document.getElementById('instructor').value;
const image=document.getElementById('image').value;

const course= new Course(title,instructor,image);
// create ui
const ui= new UI();

if(title=='' || instructor=='' || image==""){
    ui.showAlert('Please fill every blanks!','danger');
}else{
    ui.addCourseToList(course);
    ui.clearControls();
    ui.showAlert('The course has been added to list','success')
}

    e.preventDefault();
});
document.getElementById('courseList').addEventListener('click',function(e){
    const ui= new UI();
    ui.deleteCourse(e.target);
    ui.showAlert('Selected course has been deleted','warning');
    
});



















