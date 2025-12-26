// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ========== Theme Toggle Functionality ==========
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    
    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem('dashboard-theme') || 'light';
    htmlElement.setAttribute('data-theme', savedTheme);
    
    // Set the toggle state based on saved theme
    if (savedTheme === 'dark') {
        themeToggle.checked = true;
    }
    
    // Theme toggle event listener
    themeToggle.addEventListener('change', function() {
        if (this.checked) {
            htmlElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('dashboard-theme', 'dark');
        } else {
            htmlElement.setAttribute('data-theme', 'light');
            localStorage.setItem('dashboard-theme', 'light');
        }
    });
    
    // ========== Sidebar Toggle Functionality ==========
    const menuToggle = document.getElementById('menuToggle');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    
    // Toggle sidebar on menu button click
    menuToggle.addEventListener('click', function() {
        sidebar.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when sidebar is open
    });
    
    // Close sidebar on close button click
    sidebarToggle.addEventListener('click', function() {
        sidebar.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(event) {
        const isClickInsideSidebar = sidebar.contains(event.target);
        const isClickOnMenuToggle = menuToggle.contains(event.target);
        
        if (!isClickInsideSidebar && !isClickOnMenuToggle && window.innerWidth <= 992) {
            sidebar.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // ========== Chart Initialization ==========
    // Check if Chart.js is available
    if (typeof Chart !== 'undefined') {
        // Revenue Chart
        const revenueCtx = document.getElementById('revenueChart');
        if (revenueCtx) {
            const revenueChart = new Chart(revenueCtx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    datasets: [{
                        label: 'Revenue',
                        data: [12000, 19000, 15000, 25000, 22000, 30000, 28000, 32000, 30000, 35000, 40000, 45000],
                        borderColor: '#4361ee',
                        backgroundColor: 'rgba(67, 97, 238, 0.1)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4,
                        pointBackgroundColor: '#4361ee',
                        pointRadius: 5,
                        pointHoverRadius: 8
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            mode: 'index',
                            intersect: false,
                            callbacks: {
                                label: function(context) {
                                    return '$' + context.parsed.y.toLocaleString();
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: function(value) {
                                    return '$' + value.toLocaleString();
                                }
                            },
                            grid: {
                                color: 'rgba(0, 0, 0, 0.05)'
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            }
                        }
                    }
                }
            });
        }
        
        // Traffic Chart
        const trafficCtx = document.getElementById('trafficChart');
        if (trafficCtx) {
            const trafficChart = new Chart(trafficCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Direct', 'Social', 'Referral', 'Search', 'Email'],
                    datasets: [{
                        data: [35, 25, 20, 15, 5],
                        backgroundColor: [
                            '#4361ee',
                            '#7209b7',
                            '#4cc9f0',
                            '#4caf50',
                            '#ff9800'
                        ],
                        borderWidth: 0,
                        hoverOffset: 15
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                padding: 20,
                                usePointStyle: true,
                                pointStyle: 'circle'
                            }
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return context.label + ': ' + context.parsed + '%';
                                }
                            }
                        }
                    },
                    cutout: '70%'
                }
            });
        }
    }
    
    // ========== Notification Mark as Read ==========
    const markReadBtn = document.querySelector('.mark-read');
    const notificationItems = document.querySelectorAll('.notification-item.unread');
    const notificationCount = document.querySelector('.notification-count');
    
    if (markReadBtn) {
        markReadBtn.addEventListener('click', function() {
            notificationItems.forEach(item => {
                item.classList.remove('unread');
                item.style.backgroundColor = '';
            });
            
            if (notificationCount) {
                notificationCount.textContent = '0';
                notificationCount.style.display = 'none';
            }
        });
    }
    
    // ========== Active Nav Item Management ==========
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Prevent default if it's not a link with href="#"
            if (this.querySelector('a').getAttribute('href') === '#') {
                e.preventDefault();
            }
            
            // Remove active class from all items
            navItems.forEach(navItem => {
                navItem.classList.remove('active');
            });
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Close sidebar on mobile after selection
            if (window.innerWidth <= 992) {
                sidebar.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });
    
    // ========== Table Row Click Effect ==========
    const tableRows = document.querySelectorAll('table tbody tr');
    
    tableRows.forEach(row => {
        row.addEventListener('click', function() {
            // Add a temporary highlight effect
            this.style.backgroundColor = 'var(--hover-bg)';
            
            setTimeout(() => {
                this.style.backgroundColor = '';
            }, 300);
        });
    });
    
    // ========== Simulate Loading Animation ==========
    function simulateLoading() {
        const statCards = document.querySelectorAll('.stat-card');
        const chartCards = document.querySelectorAll('.chart-card');
        const tableCards = document.querySelectorAll('.table-card');
        const activityCard = document.querySelector('.activity-card');
        
        // Add loading class to elements
        statCards.forEach(card => card.classList.add('loading'));
        chartCards.forEach(card => card.classList.add('loading'));
        tableCards.forEach(card => card.classList.add('loading'));
        if (activityCard) activityCard.classList.add('loading');
        
        // Remove loading class after a delay (simulating data fetch)
        setTimeout(() => {
            statCards.forEach(card => card.classList.remove('loading'));
            chartCards.forEach(card => card.classList.remove('loading'));
            tableCards.forEach(card => card.classList.remove('loading'));
            if (activityCard) activityCard.classList.remove('loading');
        }, 1000);
    }
    
    // Call simulate loading on page load
    simulateLoading();
    
    // ========== Responsive Chart Resizing ==========
    window.addEventListener('resize', function() {
        // In a real application, you would call chart.resize() here
        // For now, we'll just log the resize event
        console.log('Window resized - charts would be redrawn here');
    });
    
    // ========== Search Functionality ==========
    const searchInput = document.querySelector('.header-search input');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            // In a real application, you would filter data here
            // For this demo, we'll just log the search term
            if (searchTerm.length > 2) {
                console.log('Searching for:', searchTerm);
            }
        });
    }
    
    // ========== Initialize Tooltips ==========
    function initTooltips() {
        const tooltipElements = document.querySelectorAll('[data-tooltip]');
        
        tooltipElements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                const tooltipText = this.getAttribute('data-tooltip');
                const tooltip = document.createElement('div');
                tooltip.className = 'tooltip';
                tooltip.textContent = tooltipText;
                document.body.appendChild(tooltip);
                
                const rect = this.getBoundingClientRect();
                tooltip.style.position = 'absolute';
                tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';
                tooltip.style.left = (rect.left + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';
                tooltip.style.opacity = '0';
                
                setTimeout(() => {
                    tooltip.style.opacity = '1';
                    tooltip.style.transition = 'opacity 0.2s ease';
                }, 10);
                
                this._tooltip = tooltip;
            });
            
            element.addEventListener('mouseleave', function() {
                if (this._tooltip) {
                    this._tooltip.style.opacity = '0';
                    setTimeout(() => {
                        if (this._tooltip && this._tooltip.parentNode) {
                            this._tooltip.parentNode.removeChild(this._tooltip);
                        }
                    }, 200);
                }
            });
        });
    }
    
    // Call tooltip initialization
    initTooltips();
    
    // ========== Export Data Functionality ==========
    const exportButtons = document.querySelectorAll('.export-btn');
    
    exportButtons.forEach(button => {
        button.addEventListener('click', function() {
            // In a real application, this would trigger a data export
            alert('Export functionality would be implemented here. This is a demo.');
        });
    });
    
    // ========== Add some dynamic data updates ==========
    function updateStats() {
        // Simulate updating stats every 30 seconds
        setInterval(() => {
            const revenueStat = document.querySelector('.stat-card:nth-child(1) .stat-info h3');
            const ordersStat = document.querySelector('.stat-card:nth-child(2) .stat-info h3');
            
            if (revenueStat) {
                const currentRevenue = parseInt(revenueStat.textContent.replace('$', '').replace(',', ''));
                const randomChange = Math.floor(Math.random() * 500) - 250; // Random change between -250 and +250
                const newRevenue = Math.max(0, currentRevenue + randomChange);
                revenueStat.textContent = '$' + newRevenue.toLocaleString();
            }
            
            if (ordersStat) {
                const currentOrders = parseInt(ordersStat.textContent.replace(',', ''));
                const randomChange = Math.floor(Math.random() * 20) - 10; // Random change between -10 and +10
                const newOrders = Math.max(0, currentOrders + randomChange);
                ordersStat.textContent = newOrders.toLocaleString();
            }
        }, 30000); // Update every 30 seconds
    }
    
    // Call update stats function
    updateStats();
});

// ========== Add CSS for loading animation ==========
const loadingStyles = document.createElement('style');
loadingStyles.textContent = `
    .loading {
        position: relative;
        overflow: hidden;
    }
    
    .loading::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
        animation: loadingShimmer 1.5s infinite;
    }
    
    @keyframes loadingShimmer {
        0% {
            transform: translateX(-100%);
        }
        100% {
            transform: translateX(100%);
        }
    }
    
    .tooltip {
        position: absolute;
        background-color: var(--card-bg);
        color: var(--text-color);
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 0.85rem;
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        white-space: nowrap;
        pointer-events: none;
        border: 1px solid var(--border-color);
    }
    
    [data-theme="dark"] .loading::after {
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.05), transparent);
    }
`;
document.head.appendChild(loadingStyles);