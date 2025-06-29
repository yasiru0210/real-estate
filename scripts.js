// Enhanced navigation function with smooth transitions
function navigateToProject(projectId) {
    // Add loading state
    document.body.style.cursor = 'wait';
    
    // Navigate to project page
    window.location.href = 'project.html?id=' + projectId;
}

// Enhanced project data with more details
function getProjectData(projectId) {
    const projects = {
        1: {
            title: "ARTIGALA - LUSH LIFE",
            image: "img/img1.jpg",
            description: "Welcome to Lush Life, where tranquility meets modern living in the serene surroundings of Hanwella, in close vicinity of Meepe, Kaduwela and Homagama towns. Nestled amidst lush greenery and scenic landscapes, Lush Life offers a life that flourishes amidst nature's tranquillity. This premium residential development features carefully planned plots with modern infrastructure, ensuring a perfect blend of comfort and sustainability.",
            latitude: 6.8211,
            longitude: 80.0844,
            location: "Hanwella, Near Kaduwela",
            type: "Residential",
            area: "25 Acres",
            plotSizes: "10-20 Perches",
            status: "Available",
            features: [
                { icon: "fas fa-road", text: "Paved Internal Roads" },
                { icon: "fas fa-lightbulb", text: "Street Lighting" },
                { icon: "fas fa-tint", text: "Water Supply" },
                { icon: "fas fa-bolt", text: "Electricity Connection" },
                { icon: "fas fa-shield-alt", text: "24/7 Security" },
                { icon: "fas fa-tree", text: "Landscaped Gardens" }
            ],
            amenities: [
                { icon: "fas fa-swimming-pool", text: "Swimming Pool" },
                { icon: "fas fa-dumbbell", text: "Fitness Center" },
                { icon: "fas fa-child", text: "Children's Park" },
                { icon: "fas fa-car", text: "Parking" },
                { icon: "fas fa-store", text: "Shopping Center" },
                { icon: "fas fa-hospital", text: "Medical Center" }
            ],
            landmarks: [
                { icon: "fas fa-graduation-cap", name: "International School", distance: "2 km" },
                { icon: "fas fa-hospital", name: "General Hospital", distance: "3 km" },
                { icon: "fas fa-shopping-cart", name: "Shopping Mall", distance: "5 km" },
                { icon: "fas fa-train", name: "Railway Station", distance: "4 km" }
            ]
        },
        2: {
            title: "WATAREKA - GREEN STREAM",
            image: "img/img2.jpg",
            description: "Green Stream another extraordinary land project in Wataraka which is positioned in close proximity to major transportation hubs and major cities invite you to embark the vibrant lifestyle in the bustling city, Homagama. This strategic location offers excellent connectivity to Colombo and other major cities, making it an ideal choice for both residential and commercial investments. The project features modern infrastructure with eco-friendly design principles.",
            latitude: 6.8648,
            longitude: 80.0037,
            location: "Wataraka, Near Homagama",
            type: "Mixed Development",
            area: "35 Acres",
            plotSizes: "8-25 Perches",
            status: "New Launch",
            features: [
                { icon: "fas fa-road", text: "Wide Access Roads" },
                { icon: "fas fa-wifi", text: "Fiber Optic Ready" },
                { icon: "fas fa-recycle", text: "Waste Management" },
                { icon: "fas fa-bolt", text: "Underground Utilities" },
                { icon: "fas fa-camera", text: "CCTV Surveillance" },
                { icon: "fas fa-leaf", text: "Green Spaces" }
            ],
            amenities: [
                { icon: "fas fa-building", text: "Community Center" },
                { icon: "fas fa-basketball-ball", text: "Sports Complex" },
                { icon: "fas fa-seedling", text: "Organic Garden" },
                { icon: "fas fa-bus", text: "Transport Hub" },
                { icon: "fas fa-utensils", text: "Food Court" },
                { icon: "fas fa-clinic-medical", text: "Clinic" }
            ],
            landmarks: [
                { icon: "fas fa-university", name: "University Campus", distance: "1.5 km" },
                { icon: "fas fa-bus", name: "Bus Terminal", distance: "1 km" },
                { icon: "fas fa-building", name: "Government Office", distance: "2.5 km" },
                { icon: "fas fa-gas-pump", name: "Fuel Station", distance: "800 m" }
            ]
        }
    };
    return projects[projectId];
}

// Enhanced Google Maps initialization
function initMap() {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');
    const projectData = getProjectData(projectId);

    if (projectData) {
        // Update page content
        updateProjectContent(projectData);
        
        // Initialize Google Map with enhanced styling
        const location = { lat: projectData.latitude, lng: projectData.longitude };
        const map = new google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            center: location,
            styles: [
                {
                    featureType: 'all',
                    elementType: 'geometry.fill',
                    stylers: [{ weight: '2.00' }]
                },
                {
                    featureType: 'all',
                    elementType: 'geometry.stroke',
                    stylers: [{ color: '#9c9c9c' }]
                },
                {
                    featureType: 'all',
                    elementType: 'labels.text',
                    stylers: [{ visibility: 'on' }]
                }
            ]
        });

        // Custom marker
        const marker = new google.maps.Marker({
            position: location,
            map: map,
            title: projectData.title,
            icon: {
                url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="20" cy="20" r="18" fill="#2563eb" stroke="white" stroke-width="4"/>
                        <circle cx="20" cy="20" r="8" fill="white"/>
                    </svg>
                `),
                scaledSize: new google.maps.Size(40, 40),
                anchor: new google.maps.Point(20, 20)
            }
        });

        // Info window
        const infoWindow = new google.maps.InfoWindow({
            content: `
                <div style="padding: 10px; max-width: 200px;">
                    <h3 style="margin: 0 0 8px 0; color: #2563eb;">${projectData.title}</h3>
                    <p style="margin: 0; color: #64748b; font-size: 14px;">${projectData.location}</p>
                </div>
            `
        });

        marker.addListener('click', () => {
            infoWindow.open(map, marker);
        });
    }
}

// Function to update project content dynamically
function updateProjectContent(projectData) {
    // Update basic information
    document.getElementById('project-title').textContent = projectData.title;
    document.getElementById('project-hero-img').src = projectData.image;
    document.getElementById('project-hero-img').alt = projectData.title;
    document.getElementById('project-location').querySelector('span').textContent = projectData.location;
    document.getElementById('project-description').textContent = projectData.description;
    document.getElementById('breadcrumb-title').textContent = projectData.title;
    
    // Update project information
    document.getElementById('project-type').textContent = projectData.type;
    document.getElementById('project-area').textContent = projectData.area;
    document.getElementById('project-plots').textContent = projectData.plotSizes;
    document.getElementById('project-status').textContent = projectData.status;
    
    // Update features
    const featuresContainer = document.getElementById('project-features');
    featuresContainer.innerHTML = '';
    projectData.features.forEach(feature => {
        const featureElement = document.createElement('div');
        featureElement.className = 'feature-item';
        featureElement.innerHTML = `
            <i class="${feature.icon}"></i>
            <span>${feature.text}</span>
        `;
        featuresContainer.appendChild(featureElement);
    });
    
    // Update amenities
    const amenitiesContainer = document.getElementById('project-amenities');
    amenitiesContainer.innerHTML = '';
    projectData.amenities.forEach(amenity => {
        const amenityElement = document.createElement('div');
        amenityElement.className = 'amenity-item';
        amenityElement.innerHTML = `
            <i class="${amenity.icon}"></i>
            <span>${amenity.text}</span>
        `;
        amenitiesContainer.appendChild(amenityElement);
    });
    
    // Update nearby landmarks
    const landmarksContainer = document.getElementById('nearby-places');
    landmarksContainer.innerHTML = '';
    projectData.landmarks.forEach(landmark => {
        const landmarkElement = document.createElement('div');
        landmarkElement.className = 'landmark-item';
        landmarkElement.innerHTML = `
            <div class="landmark-icon">
                <i class="${landmark.icon}"></i>
            </div>
            <div class="landmark-info">
                <h4>${landmark.name}</h4>
                <p>${landmark.distance} away</p>
            </div>
        `;
        landmarksContainer.appendChild(landmarkElement);
    });
}

// Enhanced mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const icon = this.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = 'none';
            }
        });
    }
    
    // Form submission handling
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Show success message (in a real application, you would send this to a server)
            alert('Thank you for your inquiry! We will contact you soon.');
            this.reset();
        });
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.project-card, .feature-card, .project-description-card, .project-features-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Contact button functionality
document.addEventListener('DOMContentLoaded', function() {
    const callButton = document.querySelector('.contact-card .btn-primary');
    const emailButton = document.querySelector('.contact-card .btn-secondary');
    
    if (callButton) {
        callButton.addEventListener('click', function() {
            window.location.href = 'tel:+94112345678';
        });
    }
    
    if (emailButton) {
        emailButton.addEventListener('click', function() {
            window.location.href = 'mailto:info@abcland.lk?subject=Inquiry about Project';
        });
    }
});

// Hero CTA button functionality
document.addEventListener('DOMContentLoaded', function() {
    const exploreButton = document.querySelector('.hero-cta .btn-primary');
    const contactButton = document.querySelector('.hero-cta .btn-secondary');
    
    if (exploreButton) {
        exploreButton.addEventListener('click', function() {
            document.getElementById('projects').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
    
    if (contactButton) {
        contactButton.addEventListener('click', function() {
            document.getElementById('contact').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
});