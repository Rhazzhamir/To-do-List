document.addEventListener('DOMContentLoaded', function() {
    const AddTodo = document.querySelector("#AddTodo");

    function saveTodos(todos) {
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function getTodos() {
        const todosString = localStorage.getItem('todos');
        return todosString ? JSON.parse(todosString) : [];
    }

    function renderTodos() {
        const todos = getTodos();
        let Todo_main = document.querySelector('.Todo_main');
        Todo_main.innerHTML = '';

        todos.forEach(todo => {
            let List = document.createElement("div");
            List.classList.add('List');
            Todo_main.appendChild(List);
            
            let wrapper = document.createElement('div');
            wrapper.classList.add('checkbox-wrapper-12');
            
            let cbxDiv = document.createElement('div');
            cbxDiv.classList.add('cbx');
            
            let input = document.createElement('input');
            input.classList.add('cbx-product');
            input.type = 'checkbox';
            input.id = 'cbx-12';
            
            let label = document.createElement('label');
            label.htmlFor = 'cbx-12';
            
            let svg1 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg1.setAttribute('fill', 'none');
            svg1.setAttribute('viewBox', '0 0 15 14');
            svg1.setAttribute('height', '14');
            svg1.setAttribute('width', '15');
            
            let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', 'M2 8.36364L6.23077 12L13 2');
            
            svg1.appendChild(path);
            
            cbxDiv.appendChild(input);
            cbxDiv.appendChild(label);
            cbxDiv.appendChild(svg1);
            
            let svg2 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg2.setAttribute('version', '1.1');
            svg2.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
            
            let defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
            let filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
            filter.id = 'goo-12';
            
            let feGaussianBlur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur');
            feGaussianBlur.setAttribute('result', 'blur');
            feGaussianBlur.setAttribute('stdDeviation', '4');
            feGaussianBlur.setAttribute('in', 'SourceGraphic');
            
            let feColorMatrix = document.createElementNS('http://www.w3.org/2000/svg', 'feColorMatrix');
            feColorMatrix.setAttribute('result', 'goo-12');
            feColorMatrix.setAttribute('values', '1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7');
            feColorMatrix.setAttribute('mode', 'matrix');
            feColorMatrix.setAttribute('in', 'blur');
            
            let feBlend = document.createElementNS('http://www.w3.org/2000/svg', 'feBlend');
            feBlend.setAttribute('in2', 'goo-12');
            feBlend.setAttribute('in', 'SourceGraphic');
            
            filter.appendChild(feGaussianBlur);
            filter.appendChild(feColorMatrix);
            filter.appendChild(feBlend);
            defs.appendChild(filter);
            svg2.appendChild(defs);
            
            wrapper.appendChild(cbxDiv);
            wrapper.appendChild(svg2);
            
            List.appendChild(wrapper);
            
            let Title_list = document.createElement('p');
            Title_list.classList.add('Title_list');
            Title_list.textContent = todo.title;
            List.appendChild(Title_list);
            
            let btnList = document.createElement('div');
            btnList.classList.add('btnList');
            
            let bi_eye_button = document.createElement('button');
            bi_eye_button.id = 'bi-eye';
            bi_eye_button.type = 'button';
            bi_eye_button.setAttribute('data-bs-toggle', 'modal');
            bi_eye_button.setAttribute('data-bs-target', '#biEyeModal');
            
            let icon_eye = document.createElement('i');
            icon_eye.classList.add('bi', 'bi-eye');
            bi_eye_button.appendChild(icon_eye);
            
            btnList.appendChild(bi_eye_button);
            
            let bi_trash_button = document.createElement('button');
            bi_trash_button.classList.add('bi-trashs');
            bi_trash_button.type = 'button';
            bi_trash_button.style.border = 'none'
            bi_trash_button.style.background = 'none'
            
            btnList.appendChild(bi_trash_button);
            
            let icon_trash = document.createElement('i');
            icon_trash.classList.add('bi', 'bi-trash');
            bi_trash_button.appendChild(icon_trash);
            
            List.appendChild(btnList);

            bi_eye_button.addEventListener('click', function() {
                const biEyeModal_Title = document.querySelector('#biEyeModal_Title');
                biEyeModal_Title.innerHTML = todo.title;

                const description_view = document.querySelector("#description_view");
                description_view.innerHTML = todo.description;

                const deadline_view = document.querySelector('#deadline_view');
                deadline_view.innerHTML = todo.deadline;
            });
        });
    }

    renderTodos();

    AddTodo.addEventListener('click', function(e) {
        e.preventDefault();

        const todo_title = document.querySelector('#todo_title').value;
        const todo_description = document.querySelector("#todo_description").value;
        const todo_deadline = document.querySelector('#todo_deadline').value;
        if(todo_title === "" || todo_description === "" || todo_deadline === ""){
            alert('Please fill out all fields.');
            return;
        } else {
            alert("Added successfully");
        }

        const newTodo = {
            title: todo_title,
            description: todo_description,
            deadline: todo_deadline
        };

        const todos = getTodos();

        todos.push(newTodo);

        saveTodos(todos);

        renderTodos();

        clear_Data_Input();
    });

    document.querySelector('.Todo_main').addEventListener('click', function(e) {
        if (e.target && e.target.closest('.bi-trashs')) {
            const trashButton = e.target.closest('.bi-trashs');
            const todoItem = trashButton.closest('.List');
            const todoTitle = todoItem.querySelector('.Title_list').textContent;

            let todos = getTodos();

            todos = todos.filter(todo => todo.title !== todoTitle);

            saveTodos(todos);

            if (todoItem) {
                todoItem.remove();
                alert('Todo item deleted');
            }
        }
    });
});

function clear_Data_Input(){
    const todo_title = document.querySelector('#todo_title');
    const todo_description = document.querySelector("#todo_description")
    const todo_deadline = document.querySelector('#todo_deadline');
    todo_title.value = "";
    todo_description.value = "";
    todo_deadline.value = "";
}
