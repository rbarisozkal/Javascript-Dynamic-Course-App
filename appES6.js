

class Course{
    constructor(title,instructor,image){
        this.courseID=Math.floor(Math.random()*100000);
        this.title=title;
        this.instructor=instructor;
        this.image=image;
    }
    
}
class UI{
    addCourseToList(course){

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
        <td><a href="#" data-id="${course.courseID}" class="btn btn-warning btn-sm delete">Delete</a></td>

    </tr>
    
    `;
    list.innerHTML+=html;
    }
    clearControls(){
        const title=document.getElementById('title').value='';
        const instructor=document.getElementById('instructor').value='';
        const image=document.getElementById('image').value='';
    }
    deleteCourse(target){
        if(target.classList.contains('delete')){
            target.parentElement.parentElement.remove();
            return true;
        }
    }
    showAlert(text,className){
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
}
class Storage{
    static getCourses(){
        let courses;
        if(localStorage.getItem('courses')===null){
            courses=[];
        }
        else{
            courses=JSON.parse(localStorage.getItem('courses'));
        }
        return courses;
    }
    static displaycCourses(){
        const courses=Storage.getCourses();
        courses.forEach(course => {
            const ui=new UI();
            ui.addCourseToList(course);
        });
    }
    static setCourses(course){
        const courses=Storage.getCourses();
        courses.push(course);
        localStorage.setItem('courses',JSON.stringify(courses));
    }
    static deleteCourses(e){
        if(e.classList.contains('delete')){
            const id = e.getAttribute('data-id');
            const courses=Storage.getCourses();
            courses.forEach((course,index)=>{
                if(course.courseID==id){
                    courses.splice(index,1);
                }
            });
            localStorage.setItem('courses',JSON.stringify(courses));
        }
    }
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

            //SAVE TO LOCAL STORAGE
            Storage.setCourses(course);


            ui.clearControls();
            ui.showAlert('The course has been added to list','success')
        }
        
            e.preventDefault();
    });
    document.getElementById('courseList').addEventListener('click',function(e){
        const ui= new UI();
        if(ui.deleteCourse(e.target)){
            Storage.deleteCourses(e.target);
            ui.showAlert('Selected course has been deleted','warning');
        }
        //DELETE COURSE FROM LOCAL STORAGE
        
        
    });
    document.addEventListener('DOMContentLoaded',Storage.displaycCourses);










