// Course data - Easy to modify and add new courses
const courses = [
    {
        id: 1,
        title: "Badminton Stringing Fundamentals",
        icon: "fas fa-certificate",
        description: "Master the basics of badminton racket stringing with professional techniques and precision.",
        objective: "Learn proper tension control, stringing patterns, and string selection for optimal badminton performance. Understand different string types and their characteristics.",
        duration: "6 hours per session",
        days: "5 days (Intensive)",
        price: "RM 3000",
        exam: "Yes",
        status: "available",
        maxStudents: 20,
        currentStudents: 8,
        prerequisites: "None - Beginner friendly",
        includes: "All materials, certificate, practice racket"
    },
    {
        id: 2,
        title: "Coming Soon",
        icon: "fas fa-table-tennis",
        description: "Advanced tennis racket stringing techniques for professional-level performance optimization.",
        objective: "Master tennis-specific stringing methods, tension variations for different playing styles, and advanced customization techniques used by professionals.",
        duration: "4 hours per session",
        days: "3 days (Weekdays)",
        price: "RM 650",
        status: "coming-soon",
        maxStudents: 10,
        currentStudents: 6,
        prerequisites: "Basic stringing knowledge recommended",
        includes: "Premium strings, tools practice, certification"
    },
    {
        id: 3,
        title: "Coming Soon",
        icon: "fas fa-certificate",
        description: "Comprehensive certification program for aspiring professional stringers.",
        objective: "Complete training program covering both badminton and tennis stringing, business aspects, and international standards certification.",
        duration: "6 hours per session",
        days: "5 days (Intensive)",
        price: "RM 1,200",
        status: "coming-soon",
        maxStudents: 8,
        currentStudents: 0,
        prerequisites: "Completed basic courses or equivalent experience",
        includes: "International certification, business toolkit, ongoing support"
    }
];

// Function to render courses
function renderCourses() {
    const coursesGrid = document.getElementById('courses-grid');
    const noCourses = document.getElementById('no-courses');
    
    // Filter available courses (you can modify this logic)
    const availableCourses = courses.filter(course => course.status !== 'hidden');
    
    if (availableCourses.length === 0) {
        coursesGrid.style.display = 'none';
        noCourses.style.display = 'block';
        return;
    }
    
    coursesGrid.style.display = 'grid';
    noCourses.style.display = 'none';
    
    coursesGrid.innerHTML = availableCourses.map(course => `
        <div class="course-card" onclick="openModal(${course.id})">
            <div class="course-status status-${course.status}">
                ${course.status === 'available' ? 'Available' : 
                  course.status === 'coming-soon' ? 'Coming Soon' : 'Full'}
            </div>
            <div class="course-header">
                <i class="${course.icon} course-icon"></i>
                <h3 class="course-title">${course.title}</h3>
            </div>
            <p class="course-description">${course.description}</p>
            <div class="course-details">
                <div class="detail-item">
                    <i class="fas fa-clock"></i>
                    <span>${course.duration}</span>
                </div>
                <div class="detail-item">
                    <i class="fas fa-calendar"></i>
                    <span>${course.days}</span>
                </div>
                <div class="detail-item">
                    <i class="fas fa-users"></i>
                    <span>${course.currentStudents}/${course.maxStudents} enrolled</span>
                </div>
                <div class="detail-item">
                    <i class="fas fa-tag"></i>
                    <span class="price">${course.price}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Function to open modal with course details
function openModal(courseId) {
    const course = courses.find(c => c.id === courseId);
    if (!course) return;
    
    const modal = document.getElementById('course-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDetails = document.getElementById('modal-details');
    const registerBtn = document.getElementById('register-btn');
    
    modalTitle.textContent = course.title;
    
    modalDetails.innerHTML = `
        <div class="detail-section">
            <h4><i class="fas fa-bullseye"></i> Objective</h4>
            <p>${course.objective}</p>
        </div>
        <div class="detail-section">
            <h4><i class="fas fa-clock"></i> Duration & Schedule</h4>
            <p><strong>Duration:</strong> ${course.duration}<br>
               <strong>Total Days:</strong> ${course.days}</p>
        </div>
        <div class="detail-section">
            <h4><i class="fas fa-tag"></i> Pricing</h4>
            <p><strong>Course Fee:</strong> ${course.price}<br>
               <strong>Includes:</strong> ${course.includes}</p>
        </div>
        <div class="detail-section">
            <h4><i class="fas fa-info-circle"></i> Additional Information</h4>
            <p><strong>Prerequisites:</strong> ${course.prerequisites}<br>
               <strong>Class Size:</strong> ${course.currentStudents}/${course.maxStudents} students<br>
               <strong>Status:</strong> ${course.status.charAt(0).toUpperCase() + course.status.slice(1).replace('-', ' ')}</p>
        </div>
    `;
    
    // Update register button based on course status
    if (course.status === 'available' && course.currentStudents < course.maxStudents) {
        registerBtn.disabled = false;
        registerBtn.textContent = 'Register Now';
    } else if (course.status === 'coming-soon') {
        registerBtn.disabled = true;
        registerBtn.textContent = 'Coming Soon';
    } else if (course.currentStudents >= course.maxStudents) {
        registerBtn.disabled = true;
        registerBtn.textContent = 'Class Full';
    }
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Function to close modal
function closeModal() {
    const modal = document.getElementById('course-modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Function to handle course registration
function registerCourse() {
    // Here you can integrate with Google Forms or your registration system
    alert('Registration feature will be integrated with Google Forms or your preferred registration system.');
Example: window.open('https://docs.google.com/forms/d/e/1FAIpQLScPvYhPa3JH5-AfWSQ8FxmuNn8y9nKhcvXFhTCY4FbQ6RPKtA/viewform?usp=header');
}

// Close modal when clicking outside
document.getElementById('course-modal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    renderCourses();
});

// Easy way to add new courses - just add to the courses array above
// Example of how to add a new course:
/*
courses.push({
    id: 4,
    title: "New Course Title",
    icon: "fas fa-icon-name",
    description: "Course description",
    objective: "Learning objectives",
    duration: "X hours per session",
    days: "X days",
    price: "RM XXX",
    status: "available", // available, coming-soon, full
    maxStudents: 10,
    currentStudents: 0,
    prerequisites: "Prerequisites if any",
    includes: "What's included in the course"
});
*/