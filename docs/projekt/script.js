fetch("header.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("header-placeholder").innerHTML = data;
  });

  function filterProjects(category) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    const projects = document.querySelectorAll('.movie_card');
    projects.forEach(project => {
        if (category === 'all' || project.getAttribute('data-category') === category) {
            project.classList.remove('hidden');
        } else {
            project.classList.add('hidden');
        }
    });
}

