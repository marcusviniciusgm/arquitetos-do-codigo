function addTask() {
    var taskInput = document.getElementById("taskInput");
    var taskText = taskInput.value.trim();
    var deadlineInput = document.getElementById("taskDeadline");
    var deadlineTime = deadlineInput.value;

    if (taskText !== "" && deadlineTime !== "") {
        var taskList = document.getElementById("taskList");

        var li = document.createElement("li");

        var span = document.createElement("span");
        span.textContent = taskText;

        var deadlineSpan = document.createElement("span");
        deadlineSpan.className = "deadline";
        deadlineSpan.textContent = `Prazo: ${deadlineTime}`;

        var deleteButton = document.createElement("span");
        deleteButton.textContent = "❌";
        deleteButton.className = "delete";

        var completeButton = document.createElement("span");
        completeButton.textContent = "✔️";
        completeButton.className = "complete";

        var rightDiv = document.createElement("div");
        rightDiv.className = "right";

        deleteButton.onclick = function(event) {
            event.stopPropagation();
            li.remove();
        };

        completeButton.onclick = function(event) {
            event.stopPropagation();
            li.classList.toggle("completed");

            if (li.classList.contains("completed")) {
                taskList.insertBefore(li, taskList.firstChild);
            }
        };

        rightDiv.appendChild(deadlineSpan);
        rightDiv.appendChild(completeButton);
        rightDiv.appendChild(deleteButton);

        li.appendChild(span);
        li.appendChild(rightDiv);

        taskList.appendChild(li);

        var deadlineDate = new Date();
        var [hours, minutes] = deadlineTime.split(":");
        deadlineDate.setHours(hours, minutes, 0, 0);

        function checkDeadline() {
            var now = new Date();

            if (!li.classList.contains("completed")) {
                if (now > deadlineDate) {
                    li.classList.add("overdue");
                    deadlineSpan.textContent = `Prazo expirado! (${deadlineTime})`;
                    completeButton.style.display = "none";
                } else {
                    var remainingTime = deadlineDate - now;
                    var remainingMinutes = Math.floor(remainingTime / 60000);
                    deadlineSpan.textContent = `Prazo: ${deadlineTime} (${remainingMinutes} min restantes)`;
                    completeButton.style.display = "inline-block";
                }
            }
        }

        setInterval(checkDeadline, 0);

        taskInput.value = "";
        deadlineInput.value = "";
    } else {
        alert("Por favor, insira uma tarefa e um prazo.");
    }
}