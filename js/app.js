/* ============================================
   ANT TRACKER - Main Application
   Auth, Sidebar, Page Routing
   ============================================ */

const App = {
    currentUser: null,
    currentPage: null,

    init() {
        this.checkAuth();
        this.bindAuthEvents();
        this.bindSidebarEvents();
    },

    // ========================================
    // AUTHENTICATION
    // ========================================
    checkAuth() {
        const user = localStorage.getItem('anttracker_user');
        if (user) {
            this.currentUser = JSON.parse(user);
            this.showApp();
        } else {
            this.showAuth();
        }
    },

    showAuth() {
        document.getElementById('auth-screen').classList.remove('hidden');
        document.getElementById('main-app').classList.add('hidden');
    },

    showApp() {
        document.getElementById('auth-screen').classList.add('hidden');
        document.getElementById('main-app').classList.remove('hidden');
        document.getElementById('sidebar-username').textContent = this.currentUser.username;
        this.navigateTo('hive-mind');
    },

    bindAuthEvents() {
        // Toggle between sign in and sign up
        document.getElementById('show-signup').addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('signin-form').classList.remove('active');
            document.getElementById('signup-form').classList.add('active');
        });

        document.getElementById('show-signin').addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('signup-form').classList.remove('active');
            document.getElementById('signin-form').classList.add('active');
        });

        // Sign Up
        document.getElementById('signup-btn').addEventListener('click', () => {
            const username = document.getElementById('signup-username').value.trim();
            const email = document.getElementById('signup-email').value.trim();

            if (!username || !email) {
                alert('Please fill in all fields.');
                return;
            }

            // Check if username exists
            const users = JSON.parse(localStorage.getItem('anttracker_users') || '[]');
            if (users.find(u => u.username === username)) {
                alert('Username already taken.');
                return;
            }

            const user = { username, email, createdAt: new Date().toISOString() };
            users.push(user);
            localStorage.setItem('anttracker_users', JSON.stringify(users));
            localStorage.setItem('anttracker_user', JSON.stringify(user));
            this.currentUser = user;
            this.showApp();
        });

        // Sign In
        document.getElementById('signin-btn').addEventListener('click', () => {
            const username = document.getElementById('signin-username').value.trim();

            if (!username) {
                alert('Please enter your username.');
                return;
            }

            const users = JSON.parse(localStorage.getItem('anttracker_users') || '[]');
            const user = users.find(u => u.username === username);

            if (!user) {
                alert('Username not found. Please sign up first.');
                return;
            }

            localStorage.setItem('anttracker_user', JSON.stringify(user));
            this.currentUser = user;
            this.showApp();
        });

        // Allow Enter key to submit
        document.getElementById('signin-username').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') document.getElementById('signin-btn').click();
        });

        document.getElementById('signup-email').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') document.getElementById('signup-btn').click();
        });

        // Logout
        document.getElementById('logout-btn').addEventListener('click', () => {
            localStorage.removeItem('anttracker_user');
            this.currentUser = null;
            this.showAuth();
            // Clear form fields
            document.getElementById('signin-username').value = '';
            document.getElementById('signup-username').value = '';
            document.getElementById('signup-email').value = '';
            // Show sign in form
            document.getElementById('signup-form').classList.remove('active');
            document.getElementById('signin-form').classList.add('active');
        });
    },

    // ========================================
    // SIDEBAR
    // ========================================
    bindSidebarEvents() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebar-overlay');
        const toggle = document.getElementById('sidebar-toggle');
        const close = document.getElementById('sidebar-close');

        toggle.addEventListener('click', () => {
            sidebar.classList.add('open');
            overlay.classList.add('active');
        });

        const closeSidebar = () => {
            sidebar.classList.remove('open');
            overlay.classList.remove('active');
        };

        close.addEventListener('click', closeSidebar);
        overlay.addEventListener('click', closeSidebar);

        // Menu item clicks
        document.querySelectorAll('.menu-item').forEach(item => {
            item.addEventListener('click', () => {
                const page = item.dataset.page;

                // Handle current-tracker shortcut
                if (page === 'current-tracker') {
                    const lastProject = this.getLastProject();
                    if (lastProject) {
                        this.navigateTo('tracker-view', { projectId: lastProject.id });
                    } else {
                        this.navigateTo('create-project');
                    }
                } else {
                    this.navigateTo(page);
                }

                // Update active state
                document.querySelectorAll('.menu-item').forEach(i => i.classList.remove('active'));
                item.classList.add('active');

                closeSidebar();
            });
        });
    },

    // ========================================
    // PAGE ROUTING
    // ========================================
    navigateTo(page, params = {}) {
        this.currentPage = page;
        const content = document.getElementById('content-area');

        switch (page) {
            case 'hive-mind':
                content.innerHTML = Pages.hiveMind();
                HiveMind.init();
                break;
            case 'my-colony':
                content.innerHTML = Pages.myColony();
                MyColony.init();
                break;
            case 'create-project':
                content.innerHTML = Pages.createProject();
                CreateProject.init();
                break;
            case 'current-tracker':
                const lastProj = this.getLastProject();
                if (lastProj) {
                    content.innerHTML = Pages.trackerView(lastProj);
                    TrackerView.init(lastProj);
                } else {
                    content.innerHTML = Pages.createProject();
                    CreateProject.init();
                }
                break;
            case 'tracker-view':
                const proj = this.getProject(params.projectId);
                if (proj) {
                    content.innerHTML = Pages.trackerView(proj);
                    TrackerView.init(proj);
                }
                break;
            case 'identify':
                content.innerHTML = Pages.identify();
                Identify.init();
                break;
            case 'battle-sim':
                content.innerHTML = Pages.battleSim();
                break;
            case 'colony-sim':
                content.innerHTML = Pages.colonySim();
                break;
            case 'map-builder':
                content.innerHTML = Pages.mapBuilder();
                break;
            case 'field-journal':
                content.innerHTML = Pages.fieldJournal();
                break;
            case 'achievements':
                content.innerHTML = Pages.achievements();
                Achievements.init();
                break;
            case 'help':
                content.innerHTML = Pages.help();
                break;
            default:
                content.innerHTML = Pages.hiveMind();
                HiveMind.init();
        }
    },

    // ========================================
    // PROJECT DATA MANAGEMENT
    // ========================================
    getProjects() {
        return JSON.parse(localStorage.getItem('anttracker_projects') || '[]')
            .filter(p => p.userId === this.currentUser?.username);
    },

    getProject(id) {
        return this.getProjects().find(p => p.id === id);
    },

    getLastProject() {
        const projects = this.getProjects();
        if (projects.length === 0) return null;
        return projects.sort((a, b) => new Date(b.lastAccessed) - new Date(a.lastAccessed))[0];
    },

    saveProject(project) {
        const allProjects = JSON.parse(localStorage.getItem('anttracker_projects') || '[]');
        const idx = allProjects.findIndex(p => p.id === project.id);
        if (idx >= 0) {
            allProjects[idx] = project;
        } else {
            allProjects.push(project);
        }
        localStorage.setItem('anttracker_projects', JSON.stringify(allProjects));
    },

    // Observations
    getObservations(projectId) {
        return JSON.parse(localStorage.getItem(`anttracker_obs_${projectId}`) || '[]');
    },

    saveObservation(projectId, observation) {
        const obs = this.getObservations(projectId);
        obs.push(observation);
        localStorage.setItem(`anttracker_obs_${projectId}`, JSON.stringify(obs));
    },

    // Achievements
    getAchievements() {
        return JSON.parse(localStorage.getItem('anttracker_achievements') || '[]');
    },

    unlockAchievement(id, name, description) {
        const achievements = this.getAchievements();
        if (!achievements.find(a => a.id === id)) {
            achievements.push({
                id, name, description,
                unlockedAt: new Date().toISOString()
            });
            localStorage.setItem('anttracker_achievements', JSON.stringify(achievements));
        }
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => App.init());
