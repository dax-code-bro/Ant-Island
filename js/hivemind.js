/* ============================================
   ANT TRACKER - Hive Mind AI Assistant
   ============================================ */

const HiveMind = {
    isThinking: false,

    init() {
        this.bindEvents();
    },

    bindEvents() {
        const input = document.getElementById('hivemind-input');
        const sendBtn = document.getElementById('hivemind-send');

        sendBtn.addEventListener('click', () => this.sendMessage());
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });

        // Quick questions
        document.querySelectorAll('.quick-q').forEach(btn => {
            btn.addEventListener('click', () => {
                const q = btn.dataset.q;
                if (q) {
                    input.value = q;
                    this.sendMessage();
                }
            });
        });
    },

    sendMessage() {
        const input = document.getElementById('hivemind-input');
        const message = input.value.trim();
        if (!message || this.isThinking) return;

        // Add user message
        this.addMessage(message, 'user');
        input.value = '';

        // Show thinking state
        this.setThinking(true);

        // Generate response
        setTimeout(() => {
            const response = this.generateResponse(message);
            this.addMessage(response, 'ai');
            this.setThinking(false);
        }, 1500 + Math.random() * 2000);
    },

    addMessage(text, type) {
        const container = document.getElementById('hivemind-messages');
        const avatar = type === 'ai' ? 'HM' : (App.currentUser?.username?.[0]?.toUpperCase() || 'U');

        const disclaimer = type === 'ai' ?
            '<div class="message-disclaimer">This is an AI assistant and AI can make mistakes.</div>' : '';

        const div = document.createElement('div');
        div.className = `message ${type}`;
        div.innerHTML = `
            <div class="message-avatar">${avatar}</div>
            <div class="message-content">
                ${text}
                ${disclaimer}
            </div>
        `;
        container.appendChild(div);
        container.scrollTop = container.scrollHeight;
    },

    setThinking(thinking) {
        this.isThinking = thinking;
        const logo = document.getElementById('hivemind-logo');
        const status = document.getElementById('hivemind-status');
        const sendBtn = document.getElementById('hivemind-send');

        if (thinking) {
            logo.classList.add('thinking');
            status.classList.add('thinking');
            status.querySelector('span').textContent = 'Researching...';
            sendBtn.disabled = true;
        } else {
            logo.classList.remove('thinking');
            status.classList.remove('thinking');
            status.querySelector('span').textContent = 'Online';
            sendBtn.disabled = false;
        }
    },

    generateResponse(question) {
        const q = question.toLowerCase();

        // Ant knowledge base - extensive researched responses
        if (q.includes('queen') && (q.includes('identify') || q.includes('tell') || q.includes('how'))) {
            return `<strong>How to Identify a Queen Ant:</strong><br><br>
                Queens are significantly larger than workers — often 2-3x the size. Key features to look for:<br><br>
                <strong>1. Size:</strong> Queens are the largest ants in the colony. A fire ant queen is about 6-7mm compared to workers at 2-4mm.<br><br>
                <strong>2. Thorax (midsection):</strong> Queens have a larger, more robust thorax because it originally housed flight muscles. Look for wing scars — small marks where wings used to attach.<br><br>
                <strong>3. Gaster (abdomen):</strong> Much larger and more swollen than workers, especially when she's actively laying eggs (physogastric).<br><br>
                <strong>4. Behavior:</strong> Queens are rarely on the surface. If you see one above ground, something unusual is happening — either she's founding a new colony, being evacuated, or has been rejected.<br><br>
                <strong>5. Wing scars:</strong> After mating flights, queens shed their wings. The scars on the thorax are a definitive identification mark.`;
        }

        if (q.includes('brood') && q.includes('surface')) {
            return `<strong>Why Ants Carry Brood to the Surface:</strong><br><br>
                This can mean several things depending on context:<br><br>
                <strong>Normal reasons:</strong><br>
                - <strong>Temperature regulation:</strong> Moving brood closer to warm surface soil for faster development<br>
                - <strong>Housekeeping:</strong> Removing dead or deformed larvae (you'll see misshapen, shriveled white objects)<br><br>
                <strong>Warning signs:</strong><br>
                - <strong>Flooding:</strong> Underground chambers are waterlogged and they're rescuing brood<br>
                - <strong>Evacuation:</strong> If many ants are carrying healthy-looking brood in one direction, the colony is relocating<br>
                - <strong>Mold/disease:</strong> Infected brood being removed to prevent spread<br><br>
                <strong>How to tell the difference:</strong> One ant carrying one deformed larva = housekeeping (normal). Streams of ants all carrying healthy brood in the same direction = evacuation (investigate immediately).`;
        }

        if (q.includes('feed') || q.includes('food') || q.includes('eat')) {
            return `<strong>Feeding Your Fire Ant Colony:</strong><br><br>
                Fire ants need two types of nutrition:<br><br>
                <strong>Protein (for queens and larvae):</strong><br>
                - Turkey, chicken, or meat scraps<br>
                - Dead insects (free and natural)<br>
                - Scrambled egg pieces<br>
                - Snickers bars (peanuts provide protein + fats queens need for egg production)<br><br>
                <strong>Sugar/Carbs (for worker energy):</strong><br>
                - Sugar water in a bottle cap (best option — easy to consume and share via trophallaxis)<br>
                - Honey drops<br>
                - Fruit pieces<br>
                - Bread<br><br>
                <strong>Feeding schedule:</strong> Once daily is ideal. One small protein source + one sugar source. Don't overfeed — watch how fast they clear it. If food is still there next day, give less.<br><br>
                <strong>Placement:</strong> Near the mound but not on it. Let them find it and establish foraging trails.`;
        }

        if (q.includes('healthy') || q.includes('health')) {
            return `<strong>Signs of a Healthy Colony:</strong><br><br>
                <strong>Positive indicators:</strong><br>
                - Active surface foraging during appropriate temperatures<br>
                - Organized trail formation between food and nest<br>
                - Aggressive mound defense when disturbed (workers pour out with gasters raised)<br>
                - Visible construction activity (fresh soil deposits on mound)<br>
                - Multiple ant sizes present (minor workers, major workers)<br>
                - Queen(s) safely underground<br><br>
                <strong>Warning signs:</strong><br>
                - No surface activity during normally active hours<br>
                - Dead ants piling up<br>
                - Brood being evacuated to the surface<br>
                - Queen visible on surface<br>
                - Workers carrying brood away from the colony<br>
                - No defensive response when mound is gently disturbed<br><br>
                <strong>Quick health check:</strong> Gently poke the mound. Workers should emerge defensively within seconds. If nothing comes out, investigate further.`;
        }

        if (q.includes('evacuat') || q.includes('leaving') || q.includes('abandon')) {
            return `<strong>Signs of Colony Evacuation:</strong><br><br>
                <strong>CODE RED indicators:</strong><br>
                - Organized one-way traffic carrying brood (white eggs/larvae) away from the mound<br>
                - Queen visible on the surface — she should NEVER be above ground in normal conditions<br>
                - Mass movement toward water's edge or colony perimeter<br>
                - Dead ants piling up in large numbers<br>
                - Colony abandoning the mound entirely — no defensive response when poked<br><br>
                <strong>NOT an evacuation (don't panic):</strong><br>
                - Ants exploring walls or perimeter without carrying anything<br>
                - Two-way traffic (ants going AND coming back)<br>
                - Scouts testing the water's edge and turning back<br>
                - Ants on the surface communicating (antenna touching)<br>
                - A few dead ants — that's normal attrition<br><br>
                <strong>The key distinction:</strong> Evacuating ants carry brood and move with purpose in one direction. Exploring ants wander, stop, turn around, and return to the colony.`;
        }

        if (q.includes('phorid') || q.includes('parasit') || q.includes('fly')) {
            return `<strong>Phorid Flies — The Fire Ant's Nemesis:</strong><br><br>
                Phorid flies (family Phoridae) are parasitic flies that specifically target fire ants.<br><br>
                <strong>How to identify them:</strong><br>
                - Very small — about 1-2mm<br>
                - They hover directly over individual ants or ant trails<br>
                - Ants react with a distinctive defensive posture: head raised, gaster (stinger) raised<br><br>
                <strong>What they do:</strong><br>
                - Female phorid flies inject a single egg into a fire ant's body<br>
                - The larva migrates to the ant's head<br>
                - It consumes the contents of the head, eventually causing it to fall off<br>
                - A new fly emerges from the detached head<br><br>
                <strong>Colony impact:</strong><br>
                - One fly can only parasitize one ant at a time<br>
                - The bigger threat is behavioral — fire ants reduce foraging when phorid flies are present<br>
                - This suppresses colony growth over time<br><br>
                <strong>What to do:</strong> A few phorid flies won't destroy a colony. If you see many, yellow sticky traps nearby can reduce numbers. Never use insecticide near the colony.`;
        }

        if (q.includes('rain') || q.includes('flood') || q.includes('water') || q.includes('storm')) {
            return `<strong>Fire Ants and Water/Flooding:</strong><br><br>
                Fire ants have remarkable flood survival strategies:<br><br>
                <strong>Raft formation:</strong> When flooding occurs, fire ants link their bodies together to form living rafts that float on water. Workers on the outside trap air bubbles in their exoskeletons. The queen and brood are placed in the center for protection. These rafts can survive for weeks.<br><br>
                <strong>Before a storm:</strong><br>
                - Ants can sense barometric pressure drops — they know rain is coming<br>
                - Workers seal tunnel entrances with soil to prevent water infiltration<br>
                - Surface activity decreases dramatically<br>
                - Brood may be moved to higher chambers<br><br>
                <strong>After a storm:</strong><br>
                - Workers open new tunnel entrances<br>
                - Damaged tunnels are repaired — expect heavy construction activity<br>
                - Fresh soil deposits appear on the mound surface<br>
                - Foraging resumes once conditions stabilize<br><br>
                <strong>For your moat:</strong> Rain helps refill it naturally, but heavy rain could overflow onto the island and flood their tunnels. Monitor water levels after storms.`;
        }

        // Default response for unmatched questions
        return `That's a great question. Based on my research:<br><br>
            ${this.getGeneralResponse(question)}<br><br>
            If you need more specific information, try describing what you're seeing in detail — behavior, size, color, location — and I can give you a more targeted answer. You can also use the <strong>Identify</strong> feature to look up specific species.`;
    },

    getGeneralResponse(question) {
        const topics = [
            'Fire ants (Solenopsis invicta) are one of the most studied ant species due to their invasive nature and complex social structure.',
            'Colony behavior is driven by chemical communication — pheromones control nearly every aspect of ant society from foraging to defense.',
            'A healthy fire ant colony can contain 100,000 to 500,000 workers, with queens living up to 7 years and producing millions of eggs in their lifetime.',
            'Fire ants are native to South America but have spread across the southern United States, parts of Asia, and Australia.',
            'The colony operates as a superorganism — individual ants follow simple rules, but the collective behavior that emerges is remarkably complex and adaptive.'
        ];
        return topics[Math.floor(Math.random() * topics.length)];
    }
};
