document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTask');
    const taskList = document.getElementById('taskList');
    const taskCount = document.getElementById('taskCount');
    const clearCompletedButton = document.getElementById('clearCompleted');
    const filterButtons = document.querySelectorAll('.filter-btn');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function renderTasks() {
        taskList.innerHTML = '';
        let activeTasks = 0;

        tasks.forEach((task, index) => {
            if (!task.completed) activeTasks++;

            const li = document.createElement('li');
            li.className = 'task-item';
            li.classList.toggle('completed', task.completed);
            li.innerHTML = `
                <input type="checkbox" id="task-${index}" class="task-checkbox" ${task.completed ? 'checked' : ''}>
                <label for="task-${index}" class="task-text">${task.text}</label>
                <button class="delete-btn" data-index="${index}">Delete</button>
            `;
            taskList.appendChild(li);

            // Add animation class after a short delay
            setTimeout(() => {
                li.style.opacity = '1';
                li.style.transform = 'translateY(0)';
            }, 50);
        });

        taskCount.textContent = `${activeTasks} task${activeTasks !== 1 ? 's' : ''} left`;
        updateFilterButtons();
    }

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            tasks.push({ text: taskText, completed: false });
            saveTasks();
            renderTasks();
            taskInput.value = '';

            // Animate the new task
            const newTask = taskList.lastElementChild;
            newTask.style.opacity = '0';
            newTask.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                newTask.style.opacity = '1';
                newTask.style.transform = 'translateY(0)';
            }, 50);
        }
    }

    function toggleComplete(index) {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    }

    function deleteTask(index) {
        const taskElement = taskList.children[index];
        taskElement.style.opacity = '0';
        taskElement.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        }, 300);
    }

    function clearCompleted() {
        tasks = tasks.filter(task => !task.completed);
        saveTasks();
        renderTasks();
    }

    function filterTasks(filter) {
        const allTasks = taskList.querySelectorAll('.task-item');
        allTasks.forEach(task => {
            switch(filter) {
                case 'all':
                    task.style.display = '';
                    break;
                case 'active':
                    task.style.display = task.classList.contains('completed') ? 'none' : '';
                    break;
                case 'completed':
                    task.style.display = task.classList.contains('completed') ? '' : 'none';
                    break;
            }
        });
    }

    function updateFilterButtons() {
        const activeFilter = document.querySelector('.filter-btn.active').id.replace('Tasks', '');
        filterTasks(activeFilter);
    }

    addTaskButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    taskList.addEventListener('click', (e) => {
        if (e.target.type === 'checkbox') {
            const index = parseInt(e.target.id.split('-')[1]);
            toggleComplete(index);
        } else if (e.target.classList.contains('delete-btn')) {
            const index = parseInt(e.target.dataset.index);
            deleteTask(index);
        }
    });

    clearCompletedButton.addEventListener('click', clearCompleted);

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterTasks(button.id.replace('Tasks', ''));
        });
    });

    renderTasks();
});