/* ============================================
   ANT TRACKER - Feature Modules
   My Colony, Create Project, Tracker, Achievements
   ============================================ */

// ========================================
// MY COLONY
// ========================================
const MyColony = {
    init() {
        // Resume project click
        const resumeBtn = document.getElementById('resume-project');
        if (resumeBtn) {
            resumeBtn.addEventListener('click', () => {
                const id = resumeBtn.dataset.id;
                App.navigateTo('tracker-view', { projectId: id });
            });
        }

        // Project card clicks
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('click', () => {
                const id = card.dataset.id;
                App.navigateTo('tracker-view', { projectId: id });
            });
        });
    }
};

// ========================================
// CREATE PROJECT
// ========================================
const CreateProject = {
    init() {
        const btn = document.getElementById('create-project-btn');
        if (!btn) return;

        btn.addEventListener('click', () => {
            const name = document.getElementById('project-name').value.trim();
            const description = document.getElementById('project-description').value.trim();
            const species = document.getElementById('project-species').value.trim();
            const duration = parseInt(document.getElementById('project-duration').value) || 100;
            const startDate = document.getElementById('project-start').value;
            const location = document.getElementById('project-location').value.trim();
            const visibility = document.getElementById('project-visibility').value;

            if (!name) {
                alert('Please enter a project name.');
                return;
            }

            const project = {
                id: 'proj_' + Date.now(),
                userId: App.currentUser.username,
                name,
                description,
                species,
                duration,
                startDate,
                location,
                visibility,
                status: 'active',
                currentDay: 1,
                queens: 0,
                createdAt: new Date().toISOString(),
                lastAccessed: new Date().toISOString()
            };

            App.saveProject(project);

            // Unlock achievement
            App.unlockAchievement('first-colony', 'Colony Founder', 'Created your first colony project');

            App.navigateTo('tracker-view', { projectId: project.id });
        });
    }
};

// ========================================
// TRACKER VIEW
// ========================================
const TrackerView = {
    project: null,

    init(project) {
        this.project = project;

        // Update last accessed
        project.lastAccessed = new Date().toISOString();
        App.saveProject(project);

        this.loadObservations();
        this.bindForm();
        this.bindFilters();
    },

    bindForm() {
        const form = document.getElementById('observation-form');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const observation = {
                id: 'obs_' + Date.now(),
                day: parseInt(document.getElementById('obs-day').value) || 1,
                time: document.getElementById('obs-time').value,
                weather: document.getElementById('obs-weather').value,
                temp: document.getElementById('obs-temp').value,
                moatStatus: document.getElementById('obs-moat').value,
                population: document.getElementById('obs-population').value,
                queenStatus: document.getElementById('obs-queen').value,
                alertLevel: document.getElementById('obs-alert').value,
                food: document.getElementById('obs-food').value.trim(),
                activity: document.getElementById('obs-activity').value.trim(),
                events: document.getElementById('obs-events').value.trim(),
                creatures: document.getElementById('obs-creatures').value.trim(),
                notes: document.getElementById('obs-notes').value.trim(),
                createdAt: new Date().toISOString()
            };

            App.saveObservation(this.project.id, observation);

            // Update project current day
            if (observation.day > (this.project.currentDay || 0)) {
                this.project.currentDay = observation.day;
                App.saveProject(this.project);
            }

            // Check achievements
            const allObs = App.getObservations(this.project.id);
            if (allObs.length === 1) {
                App.unlockAchievement('first-obs', 'First Observation', 'Logged your first colony observation');
            }
            if (observation.food) {
                App.unlockAchievement('first-feeding', 'First Feeding', 'Fed your colony for the first time');
            }
            if (observation.alertLevel === 'red') {
                App.unlockAchievement('red-alert', 'Red Alert', 'Experienced your first code red situation');
            }
            if (allObs.some(o => o.events && o.events.toLowerCase().includes('war') || o.events && o.events.toLowerCase().includes('battle') || o.events && o.events.toLowerCase().includes('attack'))) {
                App.unlockAchievement('war-veteran', 'War Veteran', 'Colony fought off invaders');
            }
            if (observation.day >= 100) {
                App.unlockAchievement('century', '100 Days', 'Completed a full 100-day observation project');
            }
            if (observation.weather === 'rainy' || observation.weather === 'stormy') {
                App.unlockAchievement('storm-survivor', 'Survived the Storm', 'Colony made it through rain or storm');
            }

            // Reload
            this.loadObservations();
            form.reset();
            document.getElementById('obs-day').value = this.project.currentDay || 1;
            document.getElementById('obs-time').value = new Date().toTimeString().slice(0, 5);
        });
    },

    loadObservations() {
        const observations = App.getObservations(this.project.id);
        const timeline = document.getElementById('observation-timeline');
        const obsCount = document.getElementById('tracker-obs-count');
        const feedCount = document.getElementById('tracker-feedings');

        if (obsCount) obsCount.textContent = observations.length;
        if (feedCount) feedCount.textContent = observations.filter(o => o.food).length;

        // Update health based on latest observation
        if (observations.length > 0) {
            const latest = observations[observations.length - 1];
            const healthEl = document.getElementById('tracker-health');
            const alertEl = document.getElementById('tracker-alert');

            if (healthEl) {
                if (latest.alertLevel === 'red') {
                    healthEl.textContent = 'Critical';
                    healthEl.className = 'stat-value danger';
                } else if (latest.alertLevel === 'yellow') {
                    healthEl.textContent = 'Watch';
                    healthEl.className = 'stat-value warning';
                } else {
                    healthEl.textContent = 'Healthy';
                    healthEl.className = 'stat-value success';
                }
            }

            if (alertEl) {
                if (latest.alertLevel === 'red') {
                    alertEl.textContent = 'RED';
                    alertEl.className = 'stat-value danger';
                } else if (latest.alertLevel === 'yellow') {
                    alertEl.textContent = 'YELLOW';
                    alertEl.className = 'stat-value warning';
                } else {
                    alertEl.textContent = 'Normal';
                    alertEl.className = 'stat-value success';
                }
            }
        }

        if (observations.length === 0) {
            timeline.innerHTML = `
                <div class="empty-state">
                    <h3>No observations yet</h3>
                    <p>Log your first observation above.</p>
                </div>`;
            return;
        }

        // Render timeline entries (newest first)
        timeline.innerHTML = observations.slice().reverse().map(obs => {
            const alertClass = obs.alertLevel === 'red' ? 'alert-red' : obs.alertLevel === 'yellow' ? 'alert-yellow' : '';
            const badgeClass = obs.alertLevel === 'red' ? 'badge-red' : obs.alertLevel === 'yellow' ? 'badge-yellow' : 'badge-normal';

            let body = '';
            if (obs.food) body += `<strong>Food:</strong> ${obs.food}<br>`;
            if (obs.activity) body += `<strong>Activity:</strong> ${obs.activity}<br>`;
            if (obs.events) body += `<strong>Events:</strong> ${obs.events}<br>`;
            if (obs.creatures) body += `<strong>Creatures:</strong> ${obs.creatures}<br>`;
            if (obs.notes) body += `<strong>Notes:</strong> ${obs.notes}<br>`;

            const weatherMap = {
                sunny: 'Sunny', 'partly-cloudy': 'Partly Cloudy', cloudy: 'Cloudy',
                rainy: 'Rainy', stormy: 'Stormy', windy: 'Windy', hot: 'Hot (100+)'
            };

            let meta = [];
            if (obs.weather) meta.push(weatherMap[obs.weather] || obs.weather);
            if (obs.temp) meta.push(`${obs.temp}°F`);
            if (obs.moatStatus) meta.push(`Moat: ${obs.moatStatus}`);
            if (obs.population) meta.push(`Pop: ${obs.population}`);
            if (obs.queenStatus) meta.push(`Queen: ${obs.queenStatus}`);

            return `
            <div class="timeline-entry ${alertClass}" data-alert="${obs.alertLevel || 'normal'}" data-has-food="${obs.food ? 'true' : 'false'}">
                <div class="timeline-date">
                    Day ${obs.day} | ${obs.time || ''} | ${new Date(obs.createdAt).toLocaleDateString()}
                    <span class="badge ${badgeClass}" style="margin-left: 8px;">${obs.alertLevel || 'normal'}</span>
                </div>
                <div style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 8px;">${meta.join(' | ')}</div>
                <div class="timeline-body">${body || '<em style="color: var(--text-muted);">No details recorded</em>'}</div>
            </div>`;
        }).join('');
    },

    bindFilters() {
        document.querySelectorAll('#timeline-filters .quick-q').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('#timeline-filters .quick-q').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const filter = btn.dataset.filter;
                this.filterTimeline(filter);
            });
        });
    },

    filterTimeline(filter) {
        document.querySelectorAll('.timeline-entry').forEach(entry => {
            if (filter === 'all') {
                entry.style.display = '';
            } else if (filter === 'red') {
                entry.style.display = entry.dataset.alert === 'red' ? '' : 'none';
            } else if (filter === 'yellow') {
                entry.style.display = entry.dataset.alert === 'yellow' ? '' : 'none';
            } else if (filter === 'food') {
                entry.style.display = entry.dataset.hasFood === 'true' ? '' : 'none';
            }
        });
    }
};

// ========================================
// ACHIEVEMENTS
// ========================================
const Achievements = {
    allAchievements: [
        { id: 'first-colony', name: 'Colony Founder', description: 'Created your first colony project', icon: '&#x1F3E0;' },
        { id: 'first-obs', name: 'First Observation', description: 'Logged your first colony observation', icon: '&#x1F440;' },
        { id: 'first-feeding', name: 'First Feeding', description: 'Fed your colony for the first time', icon: '&#x1F356;' },
        { id: 'storm-survivor', name: 'Survived the Storm', description: 'Colony made it through rain or storm', icon: '&#x26C8;' },
        { id: 'war-veteran', name: 'War Veteran', description: 'Colony fought off invaders', icon: '&#x2694;' },
        { id: 'red-alert', name: 'Red Alert', description: 'Experienced your first code red situation', icon: '&#x1F6A8;' },
        { id: 'century', name: '100 Days', description: 'Completed a full 100-day observation project', icon: '&#x1F3C6;' },
        { id: 'night-owl', name: 'Night Owl', description: 'Logged an observation after midnight', icon: '&#x1F989;' },
        { id: 'dedicated', name: 'Dedicated Observer', description: 'Logged 30 consecutive days', icon: '&#x1F4C5;' },
        { id: 'scientist', name: 'Citizen Scientist', description: 'Logged 50 total observations', icon: '&#x1F52C;' },
        { id: 'multi-colony', name: 'Colony Empire', description: 'Created 3 or more colony projects', icon: '&#x1F30D;' },
        { id: 'identifier', name: 'Species Expert', description: 'Looked up 10 different species in Identify', icon: '&#x1F4DA;' }
    ],

    init() {
        const grid = document.getElementById('achievements-grid');
        if (!grid) return;

        const unlocked = App.getAchievements();

        grid.innerHTML = this.allAchievements.map(ach => {
            const isUnlocked = unlocked.find(u => u.id === ach.id);
            const unlockedClass = isUnlocked ? '' : 'locked';
            const dateStr = isUnlocked ? new Date(isUnlocked.unlockedAt).toLocaleDateString() : 'Locked';

            return `
            <div class="stat-card ${unlockedClass}" style="${!isUnlocked ? 'opacity: 0.4;' : ''}">
                <div style="font-size: 2rem; margin-bottom: 8px;">${ach.icon}</div>
                <span class="stat-label" style="font-size: 0.9rem; color: var(--text-primary); text-transform: none;">${ach.name}</span>
                <span style="display: block; font-size: 0.75rem; color: var(--text-muted); margin-top: 4px;">${ach.description}</span>
                <span style="display: block; font-size: 0.7rem; color: ${isUnlocked ? 'var(--success)' : 'var(--text-muted)'}; margin-top: 8px;">${dateStr}</span>
            </div>`;
        }).join('');
    }
};
