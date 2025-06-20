const membersData = [
    {
        id: 'clement',
        name: 'Clement',
        location: 'PREMIER STAR BC CENTRE',
        city: 'Kuala Lumpur',
        state: 'Kuala Lumpur',
        contact: '+60122726166',
        address: 'Boustead Parking Building 9th Floor, Lorong Ceylon, Bukit Ceylon, Kuala Lumpur 50200',
        businessHours: {
            'Monday - Friday': '3:00 PM – 11:00 PM',
            'Saturday': '3:00 PM – 11:00 PM', 
            'Sunday': '12:00 PM – 7:00 PM'
        },
        specialties: ['Professional Stringing', 'Racket Maintenance', 'Equipment Consultation'],
        certification: 'USRSA Certified',
        mapPosition: { top: '42%', left: '35%' } // KL position
    },
    {
        id: 'yang',
        name: 'Yang',
        location: 'SK PRO Stringing Studio',
        city: 'Batu Pahat',
        state: 'Johor',
        contact: '+6011-2751 0939',
        address: 'No. 95-3, Jalan Rahmat, 83000 Batu Pahat, Johor',
        businessHours: {
            'Monday - Saturday': '11:00 AM – 7:00 PM',
            'Sunday': '1:00 PM – 7:00 PM'
        },
        specialties: ['Professional Stringing', 'String Analysis', 'Performance Optimization'],
        certification: 'USRSA Certified',
        mapPosition: { top: '72%', left: '40%' } // Johor position
    },
    {
        id: 'yk',
        name: 'YK',
        location: 'Tingkat Satu Badminton 一楼羽球社',
        city: 'Petaling Jaya',
        state: 'Selangor',
        contact: '+60163083764',
        address: '26A, Jalan SS 21/62, Damansara Utama, 47400 Petaling Jaya, Selangor',
        businessHours: {
            'Tuesday - Friday': '10:00 AM – 2:00 PM, 4:00 PM – 8:00 PM',
            'Saturday': '10:00 AM – 6:00 PM',
            'Sunday': '12:00 PM – 6:00 PM'
        },
        specialties: ['Professional Stringing', 'Racket Customization', 'Technical Advice'],
        certification: 'USRSA Certified',
        mapPosition: { top: '40%', left: '33%' } // Selangor position
    },
    {
        id: 'kenneth',
        name: 'Kenneth Hwang',
        location: 'KENNETH SPORTS',
        city: 'Bintulu',
        state: 'Sarawak',
        contact: '+6016-8161289',
        address: 'Lot 4018, No. 359, Ground Floor Bintulu Town District, Parkcity Commerce Square, Phase 5, Jalan Kambar Burin, 97000 Bintulu, Sarawak',
        businessHours: {
            'Monday - Saturday': '10:00 AM – 6:00 PM',
            'Sunday': 'Closed'
        },
        specialties: ['Professional Stringing', 'Sports Equipment', 'String Consultation'],
        certification: 'USRSA Certified',
        mapPosition: { top: '45%', left: '70%' } // Sarawak Bintulu position
    },
    {
        id: 'hong',
        name: 'Hong',
        location: 'Mega Sports Limbang｜Buaya Shop',
        city: 'Limbang',
        state: 'Sarawak',
        contact: '+60 17-818 9188',
        address: 'Lot 1002& 1003, first floor limbang plaza 98700 Limbang, Sarawak',
        businessHours: {
            'Monday - Sunday': '10:00 AM – 6:00 PM'
        },
        specialties: ['Professional Stringing', 'Sports Retail', 'Equipment Services'],
        certification: 'USRSA Certified',
        mapPosition: { top: '35%', left: '72%' } // Sarawak Limbang position
    }
];

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    setupEventListeners();
});

function initializePage() {
    updateStats();
    populateMembers();
    
}

function updateStats() {
    const totalMembers = membersData.length;
    const totalLocations = membersData.length;
    const totalStates = [...new Set(membersData.map(member => member.state))].length;
    
    document.getElementById('totalMembers').textContent = totalMembers;
    document.getElementById('totalLocations').textContent = totalLocations;
    document.getElementById('totalStates').textContent = totalStates;
}

function populateMembers() {
    const membersGrid = document.getElementById('membersGrid');
    membersGrid.innerHTML = '';
    
    membersData.forEach(member => {
        const memberCard = createMemberCard(member);
        membersGrid.appendChild(memberCard);
    });
}

function createMemberCard(member) {
    const card = document.createElement('div');
    card.className = 'member-card';
    card.onclick = () => openMemberModal(member);
    
    const initials = member.name.split(' ').map(n => n[0]).join('').toUpperCase();
    
    card.innerHTML = `
        <div class="member-header">
            <div class="member-avatar">${initials}</div>
            <div class="member-info">
                <h3>${member.name} <span class="certified-badge"><i class="fas fa-certificate"></i> USRSA CERTIFIED</span></h3>
                <div class="location-name">${member.location}</div>
            </div>
        </div>
        <div class="member-details">
            <div class="detail-item">
                <i class="fas fa-map-marker-alt"></i>
                <span>${member.city}, ${member.state}</span>
            </div>
            <div class="detail-item">
                <i class="fas fa-phone"></i>
                <span>${member.contact}</span>
            </div>
            <div class="detail-item">
                <i class="fas fa-clock"></i>
                <span>${getMainBusinessHours(member.businessHours)}</span>
            </div>
        </div>
        <div class="contact-actions">
            <a href="tel:${member.contact.replace(/\s/g, '')}" class="contact-btn">
                <i class="fas fa-phone"></i>
                Call
            </a>
            <a href="https://wa.me/${member.contact.replace(/[\s+-]/g, '')}" class="contact-btn whatsapp-btn" target="_blank">
                <i class="fab fa-whatsapp"></i>
                WhatsApp
            </a>
        </div>
    `;
    
    return card;
}

function getMainBusinessHours(businessHours) {
    const firstEntry = Object.entries(businessHours)[0];
    return `${firstEntry[0]}: ${firstEntry[1]}`;
}


function setupEventListeners() {
    // Close modal when clicking outside
    document.getElementById('memberModal').addEventListener('click', function(e) {
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
    
    // Handle window resize to reposition markers
    window.addEventListener('resize', function() {
        setupMapMarkers();
    });

    const floatingContact = document.getElementById('floatingContact');
    const floatingMenu = document.getElementById('floatingMenu');
    
    floatingContact.addEventListener('click', function() {
        floatingMenu.classList.toggle('active');
    });
    
    // Close floating menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!floatingContact.contains(e.target) && !floatingMenu.contains(e.target)) {
            floatingMenu.classList.remove('active');
        }
    });
}

function openMemberModal(member) {
    const modal = document.getElementById('memberModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    modalTitle.textContent = `${member.name} - ${member.location}`;
    
    modalBody.innerHTML = `
        <div class="modal-detail-item">
            <h4><i class="fas fa-certificate"></i> Certification</h4>
            <p>${member.certification}</p>
        </div>
        
        <div class="modal-detail-item">
            <h4><i class="fas fa-map-marker-alt"></i> Location</h4>
            <p>${member.location}<br>
            ${member.address}</p>
        </div>
        
        <div class="modal-detail-item">
            <h4><i class="fas fa-phone"></i> Contact Information</h4>
            <p>${member.contact}</p>
        </div>
        
        <div class="modal-detail-item">
            <h4><i class="fas fa-clock"></i> Business Hours</h4>
            ${Object.entries(member.businessHours).map(([day, hours]) => 
                `<p><strong>${day}:</strong> ${hours}</p>`
            ).join('')}
        </div>
        
        <div class="modal-detail-item">
            <h4><i class="fas fa-star"></i> Specialties</h4>
            <p>${member.specialties.join(' • ')}</p>
        </div>
        
        <div class="modal-contact-actions">
            <a href="tel:${member.contact.replace(/\s/g, '')}" class="modal-contact-btn">
                <i class="fas fa-phone"></i>
                Call Now
            </a>
            <a href="https://wa.me/${member.contact.replace(/[\s+-]/g, '')}" class="modal-contact-btn modal-whatsapp-btn" target="_blank">
                <i class="fab fa-whatsapp"></i>
                WhatsApp
            </a>
            <a href="https://maps.google.com/?q=${encodeURIComponent(member.address)}" class="modal-contact-btn" target="_blank">
                <i class="fas fa-map"></i>
                Directions
            </a>
        </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeModal() {
    const modal = document.getElementById('memberModal');
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
}

// Utility function to format phone numbers for WhatsApp
function formatPhoneForWhatsApp(phone) {
    // Remove all non-digit characters except +
    let formatted = phone.replace(/[^\d+]/g, '');
    
    // Ensure it starts with country code
    if (formatted.startsWith('60')) {
        formatted = '+' + formatted;
    } else if (!formatted.startsWith('+60')) {
        formatted = '+60' + formatted.replace(/^0/, '');
    }
    
    return formatted;
}

// Function to add new member (for easy maintenance)
function addMember(memberData) {
    membersData.push(memberData);
    initializePage();
}

// Function to remove member (for easy maintenance)
function removeMember(memberId) {
    const index = membersData.findIndex(member => member.id === memberId);
    if (index > -1) {
        membersData.splice(index, 1);
        initializePage();
    }
}

// Add to setupEventListeners function
function setupEventListeners() {
    // Existing code...
    
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    const clearSearch = document.getElementById('clearSearch');
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        clearSearch.style.display = searchTerm ? 'block' : 'none';
        filterMembers(searchTerm);
    });
    
    clearSearch.addEventListener('click', function() {
        searchInput.value = '';
        this.style.display = 'none';
        filterMembers('');
    });
    
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.dataset.filter;
            filterMembersByState(filterValue);
        });
    });
}

function filterMembers(searchTerm) {
    const memberCards = document.querySelectorAll('.member-card');
    
    memberCards.forEach(card => {
        const memberData = card.textContent.toLowerCase();
        if (memberData.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function filterMembersByState(state) {
    const memberCards = document.querySelectorAll('.member-card');
    
    memberCards.forEach((card, index) => {
        const member = membersData[index];
        if (state === 'all' || member.state === state) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}


// Export functions for external use (if needed)
window.MSRSF = {
    addMember,
    removeMember,
    membersData,
    openMemberModal,
    closeModal
};