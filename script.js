function fetchScores() {
    fetch("score-get.php")
    .then(response => response.json())
    .then(data => {
        displayScores(data);
    })
    .catch(error => console.error('Error:', error));
}

function displayScores(scores) {
    // Sort scores based on score value (highest to lowest)
    scores.sort((a, b) => b.score - a.score);

    var scoreList = document.getElementById("scoreList");
    scoreList.innerHTML = "";

    scores.forEach(score => {
        var listItem = document.createElement("div");
        listItem.textContent = score.name + ": " + score.score + " (Intake: " + score.intake + ")";
        scoreList.appendChild(listItem);
    });
}

document.addEventListener("DOMContentLoaded", function() {
    fetchScores(); // Fetch scores initially when the page loads

    // Fetch scores every 60 seconds
    setInterval(fetchScores, 10000);
});

document.getElementById("scoreForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    var formData = new FormData(this);
    
    fetch("score-store.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        displayScores(data);
        // Clear form fields after successful submission
        document.getElementById("scoreForm").reset();
    })
    .catch(error => console.error('Error:', error));
});
