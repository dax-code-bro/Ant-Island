/* ============================================
   ANT TRACKER - Page Templates
   ============================================ */

const Pages = {

    // ========================================
    // HIVE MIND AI ASSISTANT
    // ========================================
    hiveMind() {
        return `
        <div class="page hivemind-container">
            <div class="hivemind-header">
                <div class="hivemind-logo" id="hivemind-logo">
                    <div class="hivemind-logo-ring">
                        <span style="font-size: 18px;">HM</span>
                        <div class="march-ant"></div>
                        <div class="march-ant"></div>
                        <div class="march-ant"></div>
                        <div class="march-ant"></div>
                        <div class="march-ant"></div>
                        <div class="march-ant"></div>
                        <div class="march-ant"></div>
                        <div class="march-ant"></div>
                    </div>
                </div>
                <div class="hivemind-title">
                    <h2>Hive Mind</h2>
                    <div class="hivemind-status" id="hivemind-status">
                        <div class="status-dot"></div>
                        <span>Online</span>
                    </div>
                </div>
            </div>

            <div class="quick-questions">
                <button class="quick-q" data-q="Why are my ants carrying brood to the surface?">Brood on surface?</button>
                <button class="quick-q" data-q="How do I identify a queen ant?">Identify a queen</button>
                <button class="quick-q" data-q="What should I feed my fire ant colony?">Feeding tips</button>
                <button class="quick-q" data-q="How can I tell if my colony is healthy?">Colony health check</button>
                <button class="quick-q" data-q="What are the signs of a colony evacuation?">Evacuation signs</button>
            </div>

            <div class="hivemind-messages" id="hivemind-messages">
                <div class="message ai">
                    <div class="message-avatar">HM</div>
                    <div class="message-content">
                        Hello
                    </div>
                </div>
            </div>

            <div class="hivemind-input">
                <input type="text" id="hivemind-input" placeholder="Ask Hive Mind anything about your colony...">
                <button id="hivemind-send">Send</button>
            </div>
        </div>`;
    },

    // ========================================
    // MY COLONY
    // ========================================
    myColony() {
        const projects = App.getProjects();
        const lastProject = App.getLastProject();

        let resumeHtml = '';
        if (lastProject) {
            resumeHtml = `
            <div class="card resume-card" style="margin-bottom: 24px; cursor: pointer; border-color: var(--accent);" id="resume-project" data-id="${lastProject.id}">
                <div class="card-header">
                    <span class="card-title">Resume Project</span>
                    <span class="badge badge-normal">Active</span>
                </div>
                <h3 style="font-size: 1.2rem; margin-bottom: 8px;">${lastProject.name}</h3>
                <p style="color: var(--text-secondary); font-size: 0.85rem;">${lastProject.description || 'No description'}</p>
                <div style="display: flex; gap: 16px; margin-top: 12px; font-size: 0.8rem; color: var(--text-muted);">
                    <span>Species: ${lastProject.species || 'Unknown'}</span>
                    <span>Day ${lastProject.currentDay || 1} of ${lastProject.duration || 100}</span>
                </div>
            </div>`;
        }

        let projectsHtml = '';
        if (projects.length === 0) {
            projectsHtml = `
            <div class="empty-state">
                <div class="empty-state-icon">&#x1F41C;</div>
                <h3>No Colony Projects Yet</h3>
                <p>Create your first colony project to start tracking.</p>
                <button class="btn btn-primary" style="margin-top: 16px;" onclick="App.navigateTo('create-project')">Create New Colony</button>
            </div>`;
        } else {
            projectsHtml = projects.map(p => `
            <div class="card project-card" style="cursor: pointer; margin-bottom: 12px;" data-id="${p.id}">
                <div class="card-header">
                    <span class="card-title">${p.name}</span>
                    <span class="badge ${p.status === 'active' ? 'badge-normal' : 'badge-yellow'}">${p.status || 'active'}</span>
                </div>
                <p style="color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 8px;">${p.description || ''}</p>
                <div style="display: flex; gap: 16px; font-size: 0.8rem; color: var(--text-muted);">
                    <span>${p.species || 'Unknown species'}</span>
                    <span>Started: ${new Date(p.createdAt).toLocaleDateString()}</span>
                    <span>Day ${p.currentDay || 1}</span>
                </div>
            </div>`).join('');
        }

        return `
        <div class="page">
            <div class="page-header">
                <h1>My Colony</h1>
                <p>Your colony projects and experiments</p>
            </div>
            ${resumeHtml}
            <h2 style="font-size: 1.1rem; margin-bottom: 16px; color: var(--text-secondary);">All Projects</h2>
            ${projectsHtml}
        </div>`;
    },

    // ========================================
    // CREATE NEW COLONY PROJECT
    // ========================================
    createProject() {
        return `
        <div class="page" style="max-width: 600px;">
            <div class="page-header">
                <h1>Create New Colony Project</h1>
                <p>Set up a new colony observation project</p>
            </div>
            <div class="card">
                <div class="form-group">
                    <label for="project-name">Project Name *</label>
                    <input type="text" id="project-name" placeholder="e.g. Ant Island, Behemoth Watch">
                </div>
                <div class="form-group">
                    <label for="project-description">Description</label>
                    <textarea id="project-description" rows="3" placeholder="What is this experiment about?"></textarea>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="project-species">Species</label>
                        <input type="text" id="project-species" placeholder="e.g. Red Imported Fire Ant">
                    </div>
                    <div class="form-group">
                        <label for="project-duration">Duration (days)</label>
                        <input type="number" id="project-duration" value="100" min="1" max="365">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="project-start">Start Date</label>
                        <input type="date" id="project-start" value="${new Date().toISOString().split('T')[0]}">
                    </div>
                    <div class="form-group">
                        <label for="project-location">Location</label>
                        <input type="text" id="project-location" placeholder="e.g. Backyard, Indoor setup">
                    </div>
                </div>
                <div class="form-group">
                    <label for="project-visibility">Visibility</label>
                    <select id="project-visibility">
                        <option value="private">Private - Only you can see</option>
                        <option value="public">Public - Anyone can view</option>
                    </select>
                </div>
                <div style="display: flex; gap: 12px; margin-top: 24px;">
                    <button class="btn btn-primary" id="create-project-btn">Create Project</button>
                    <button class="btn btn-secondary" onclick="App.navigateTo('my-colony')">Cancel</button>
                </div>
            </div>
        </div>`;
    },

    // ========================================
    // TRACKER VIEW (Daily Observation Log)
    // ========================================
    trackerView(project) {
        return `
        <div class="page">
            <div class="page-header">
                <h1>${project.name}</h1>
                <p>Day ${project.currentDay || 1} of ${project.duration || 100} | ${project.species || 'Unknown species'}</p>
            </div>

            <!-- Colony Health Dashboard -->
            <div class="stats-grid" style="margin-bottom: 32px;">
                <div class="stat-card">
                    <span class="stat-label">Current Day</span>
                    <span class="stat-value">${project.currentDay || 1}</span>
                </div>
                <div class="stat-card">
                    <span class="stat-label">Observations</span>
                    <span class="stat-value" id="tracker-obs-count">0</span>
                </div>
                <div class="stat-card">
                    <span class="stat-label">Colony Health</span>
                    <span class="stat-value success" id="tracker-health">Healthy</span>
                </div>
                <div class="stat-card">
                    <span class="stat-label">Queens</span>
                    <span class="stat-value">${project.queens || '?'}</span>
                </div>
                <div class="stat-card">
                    <span class="stat-label">Alert Level</span>
                    <span class="stat-value success" id="tracker-alert">Normal</span>
                </div>
                <div class="stat-card">
                    <span class="stat-label">Feedings</span>
                    <span class="stat-value" id="tracker-feedings">0</span>
                </div>
            </div>

            <!-- New Observation Form -->
            <div class="card" style="margin-bottom: 24px;">
                <h2 class="card-title" style="margin-bottom: 16px;">New Observation</h2>
                <form id="observation-form">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="obs-day">Day #</label>
                            <input type="number" id="obs-day" min="1" max="${project.duration || 100}" value="${project.currentDay || 1}">
                        </div>
                        <div class="form-group">
                            <label for="obs-time">Time</label>
                            <input type="time" id="obs-time" value="${new Date().toTimeString().slice(0, 5)}">
                        </div>
                        <div class="form-group">
                            <label for="obs-weather">Weather</label>
                            <select id="obs-weather">
                                <option value="">-- Select --</option>
                                <option value="sunny">Sunny</option>
                                <option value="partly-cloudy">Partly Cloudy</option>
                                <option value="cloudy">Cloudy</option>
                                <option value="rainy">Rainy</option>
                                <option value="stormy">Stormy</option>
                                <option value="windy">Windy</option>
                                <option value="hot">Hot (100+)</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="obs-temp">Temp (F)</label>
                            <input type="number" id="obs-temp" placeholder="e.g. 95">
                        </div>
                        <div class="form-group">
                            <label for="obs-moat">Moat Status</label>
                            <select id="obs-moat">
                                <option value="">-- Select --</option>
                                <option value="full">Full</option>
                                <option value="good">Good</option>
                                <option value="low">Low</option>
                                <option value="dry">Dry / Critical</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="obs-population">Population</label>
                            <select id="obs-population">
                                <option value="">-- Select --</option>
                                <option value="few">Few (under 50)</option>
                                <option value="small">Small (50-200)</option>
                                <option value="medium">Medium (200-500)</option>
                                <option value="large">Large (500-1000)</option>
                                <option value="huge">Huge (1000+)</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="obs-queen">Queen Status</label>
                            <select id="obs-queen">
                                <option value="">-- Select --</option>
                                <option value="underground">Underground (Safe)</option>
                                <option value="surface">On Surface (Warning)</option>
                                <option value="missing">Missing / Unknown</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="obs-alert">Alert Level</label>
                            <select id="obs-alert">
                                <option value="normal">Normal</option>
                                <option value="yellow">Yellow - Watch</option>
                                <option value="red">Red - Critical</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="obs-food">Food Given</label>
                        <input type="text" id="obs-food" placeholder="e.g. Turkey, Snickers, sugar water">
                    </div>
                    <div class="form-group">
                        <label for="obs-activity">Mound Activity</label>
                        <textarea id="obs-activity" rows="2" placeholder="New tunnels, expansion, construction..."></textarea>
                    </div>
                    <div class="form-group">
                        <label for="obs-events">Notable Events</label>
                        <textarea id="obs-events" rows="3" placeholder="Battles, queen sightings, bridge tests, new species..."></textarea>
                    </div>
                    <div class="form-group">
                        <label for="obs-creatures">Other Creatures</label>
                        <input type="text" id="obs-creatures" placeholder="e.g. June bugs, grey ants, phorid fly">
                    </div>
                    <div class="form-group">
                        <label for="obs-notes">General Notes</label>
                        <textarea id="obs-notes" rows="2" placeholder="Anything else..."></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary">Save Observation</button>
                </form>
            </div>

            <!-- Timeline -->
            <h2 style="font-size: 1.2rem; margin-bottom: 16px;">Timeline</h2>
            <div id="timeline-filters" style="display: flex; gap: 8px; margin-bottom: 16px;">
                <button class="quick-q active" data-filter="all">All</button>
                <button class="quick-q" data-filter="red">Red Alerts</button>
                <button class="quick-q" data-filter="yellow">Warnings</button>
                <button class="quick-q" data-filter="food">Feedings</button>
            </div>
            <div class="timeline" id="observation-timeline">
                <div class="empty-state">
                    <h3>No observations yet</h3>
                    <p>Log your first observation above.</p>
                </div>
            </div>
        </div>`;
    },

    // ========================================
    // IDENTIFY
    // ========================================
    identify() {
        return `
        <div class="page">
            <div class="identify-search">
                <h2>Identify</h2>
                <p>Search for any ant species to view 3D models, stats, and detailed information</p>
                <div class="search-wrapper">
                    <div class="search-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                    </div>
                    <input type="text" id="species-search" placeholder="Search ant species...">
                    <div class="search-results" id="search-results"></div>
                </div>
            </div>
            <div class="not-ant-warning" id="not-ant-warning">
                <h3>Not an Ant</h3>
                <p id="not-ant-message"></p>
            </div>
            <div id="species-content"></div>
        </div>`;
    },

    // ========================================
    // BATTLE SIMULATOR
    // ========================================
    battleSim() {
        return `
        <div class="page">
            <div class="page-header">
                <h1>Battle Simulator</h1>
                <p>Pick two species and watch them fight. See how different ants match up against each other.</p>
            </div>
            <div class="card" style="text-align: center; padding: 60px;">
                <div style="font-size: 3rem; margin-bottom: 16px;">&#x2694;</div>
                <h3 style="margin-bottom: 8px;">Coming Soon</h3>
                <p style="color: var(--text-secondary);">The Battle Simulator is being built. Choose two ant species and watch them fight in real-time 3D.</p>
            </div>
        </div>`;
    },

    // ========================================
    // COLONY SIMULATOR
    // ========================================
    colonySim() {
        return `
        <div class="page">
            <div class="page-header">
                <h1>Colony Simulator</h1>
                <p>Build a virtual ant colony from scratch. Place a queen, add workers, choose terrain, and watch it grow.</p>
            </div>
            <div class="card" style="text-align: center; padding: 60px;">
                <div style="font-size: 3rem; margin-bottom: 16px;">&#x1F3D7;</div>
                <h3 style="margin-bottom: 8px;">Coming Soon</h3>
                <p style="color: var(--text-secondary);">Build and grow your own virtual colony with AI-driven ant behavior.</p>
            </div>
        </div>`;
    },

    // ========================================
    // MAP BUILDER
    // ========================================
    mapBuilder() {
        return `
        <div class="page">
            <div class="page-header">
                <h1>Map Builder</h1>
                <p>Draw your yard layout, mark colony locations, trails, and food sources.</p>
            </div>
            <div class="card" style="text-align: center; padding: 60px;">
                <div style="font-size: 3rem; margin-bottom: 16px;">&#x1F5FA;</div>
                <h3 style="margin-bottom: 8px;">Coming Soon</h3>
                <p style="color: var(--text-secondary);">Create detailed maps of your colony territory and track changes over time.</p>
            </div>
        </div>`;
    },

    // ========================================
    // FIELD JOURNAL
    // ========================================
    fieldJournal() {
        return `
        <div class="page">
            <div class="page-header">
                <h1>Field Journal</h1>
                <p>Sketch, annotate photos, and record voice memos for quick observations.</p>
            </div>
            <div class="card" style="text-align: center; padding: 60px;">
                <div style="font-size: 3rem; margin-bottom: 16px;">&#x1F4D3;</div>
                <h3 style="margin-bottom: 8px;">Coming Soon</h3>
                <p style="color: var(--text-secondary);">A digital field notebook with drawing tools and photo annotations.</p>
            </div>
        </div>`;
    },

    // ========================================
    // ACHIEVEMENTS
    // ========================================
    achievements() {
        return `
        <div class="page">
            <div class="page-header">
                <h1>Achievements</h1>
                <p>Track your milestones and earn badges for your colony experiments</p>
            </div>
            <div class="stats-grid" id="achievements-grid"></div>
        </div>`;
    },

    // ========================================
    // HELP
    // ========================================
    help() {
        return `
        <div class="page" style="max-width: 700px;">
            <div class="page-header">
                <h1>Help</h1>
                <p>Troubleshooting and technical support for Ant Tracker</p>
            </div>
            <p style="color: var(--text-secondary); margin-bottom: 24px;">
                For ant and colony questions, use <a href="#" onclick="App.navigateTo('hive-mind'); return false;">Hive Mind AI</a>.
                This section helps with app-related issues.
            </p>
            <div class="help-topics">
                <div class="card" style="margin-bottom: 12px; cursor: pointer;" onclick="this.querySelector('.help-answer').classList.toggle('hidden')">
                    <h3 style="font-size: 1rem;">3D models won't load</h3>
                    <div class="help-answer hidden" style="margin-top: 12px; color: var(--text-secondary); font-size: 0.9rem;">
                        <p><strong>Step 1:</strong> Make sure you're using a modern browser (Chrome, Firefox, Edge, Safari).</p>
                        <p><strong>Step 2:</strong> Check that WebGL is enabled. Go to your browser settings and search for "WebGL" or "hardware acceleration".</p>
                        <p><strong>Step 3:</strong> Try clearing your browser cache and reloading the page.</p>
                        <p><strong>Step 4:</strong> If on mobile, make sure your device supports WebGL 2.0.</p>
                    </div>
                </div>
                <div class="card" style="margin-bottom: 12px; cursor: pointer;" onclick="this.querySelector('.help-answer').classList.toggle('hidden')">
                    <h3 style="font-size: 1rem;">My project data disappeared</h3>
                    <div class="help-answer hidden" style="margin-top: 12px; color: var(--text-secondary); font-size: 0.9rem;">
                        <p><strong>Step 1:</strong> Make sure you're signed in with the same username you used when creating the project.</p>
                        <p><strong>Step 2:</strong> Check if you cleared your browser data recently. Ant Tracker stores data locally.</p>
                        <p><strong>Step 3:</strong> Try a different browser to see if the data exists there.</p>
                    </div>
                </div>
                <div class="card" style="margin-bottom: 12px; cursor: pointer;" onclick="this.querySelector('.help-answer').classList.toggle('hidden')">
                    <h3 style="font-size: 1rem;">Species search returns wrong results</h3>
                    <div class="help-answer hidden" style="margin-top: 12px; color: var(--text-secondary); font-size: 0.9rem;">
                        <p><strong>Step 1:</strong> Try using the scientific name instead of the common name.</p>
                        <p><strong>Step 2:</strong> Use Hive Mind AI to identify your ant - describe what it looks like and it will find the right species for you.</p>
                        <p><strong>Step 3:</strong> Check for typos in your search query.</p>
                    </div>
                </div>
                <div class="card" style="margin-bottom: 12px; cursor: pointer;" onclick="this.querySelector('.help-answer').classList.toggle('hidden')">
                    <h3 style="font-size: 1rem;">Simulation is running slowly</h3>
                    <div class="help-answer hidden" style="margin-top: 12px; color: var(--text-secondary); font-size: 0.9rem;">
                        <p><strong>Step 1:</strong> Close other browser tabs to free up memory.</p>
                        <p><strong>Step 2:</strong> Make sure hardware acceleration is enabled in your browser settings.</p>
                        <p><strong>Step 3:</strong> Try reducing the simulation quality in settings.</p>
                        <p><strong>Step 4:</strong> Update your browser to the latest version.</p>
                    </div>
                </div>
                <div class="card" style="margin-bottom: 12px; cursor: pointer;" onclick="this.querySelector('.help-answer').classList.toggle('hidden')">
                    <h3 style="font-size: 1rem;">How do I export my data?</h3>
                    <div class="help-answer hidden" style="margin-top: 12px; color: var(--text-secondary); font-size: 0.9rem;">
                        <p><strong>Step 1:</strong> Go to My Colony and select the project you want to export.</p>
                        <p><strong>Step 2:</strong> Click the settings icon on the project page.</p>
                        <p><strong>Step 3:</strong> Select "Export Data" to download your observations as a JSON file.</p>
                    </div>
                </div>
            </div>
        </div>`;
    }
};
