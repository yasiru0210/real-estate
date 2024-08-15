// Function to navigate to the project detail page with a unique ID
function navigateToProject(projectId) {
    window.location.href = 'project.html?id=' + projectId;
}

// Function to initialize Google Maps
function initMap() {
    // Get the project ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');

    // Fetch project data based on projectId
    const projectData = getProjectData(projectId);

    if (projectData) {
        // Update page content with project details
        document.getElementById('project-title').textContent = projectData.title;
        document.getElementById('project-image').src = projectData.image;
        document.getElementById('project-description').textContent = projectData.description;
        
        // Initialize Google Map
        var location = {lat: projectData.latitude, lng: projectData.longitude};
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            center: location
        });
        var marker = new google.maps.Marker({
            position: location,
            map: map
        });
    }
}

// Simulated function to get project data (replace with real data source)
function getProjectData(projectId) {
    const projects = {
        2: {
            title: "WATAREKA - GREEN STREAM",
            image: "img/img2.jpg",
            description: "Green Stream another extraordinary land project in Wataraka which is positioned in close proximity to major transportation hubs and major cities invite you to embark the vibrant lifestyle in the bustling city, Homagama.",
            latitude: -25.363,
            longitude: 131.044
        },
        1: {
            title: "ARTIGALA - LUSH LIFE",
            image: "img/img1.jpg",
            description: "Welcome to Lush Life, where tranquility meets modern living in the serene surroundings of Hanwalla, in close vicinity of Meepe, Kaduwela and Homagama towns. Nestled amidst lush greenery and scenic landscapes, Lush Life offers a life that flourishes amidst nature's tranquillity.",
            latitude: -26.363,
            longitude: 132.044
        }
        // Add more projects as needed
    };
    return projects[projectId];
}
