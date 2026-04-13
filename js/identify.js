/* ============================================
   ANT TRACKER - Identify System
   Species database, search, caste selection
   ============================================ */

const AntDatabase = {
    species: [
        {
            id: 'solenopsis-invicta',
            commonName: 'Red Imported Fire Ant',
            scientificName: 'Solenopsis invicta',
            family: 'Formicidae',
            isAnt: true,
            castes: {
                queen: { lifespan: '5-7 years', length: '6-7mm', role: 'Primary reproductive female. Lays up to 1,500 eggs per day. After mating flight, she sheds her wings, digs a founding chamber, and raises her first brood alone.' },
                worker_minor: { lifespan: '1-6 months', length: '2-3mm', role: 'General labor force. Foraging, nursing brood, tunnel construction, food processing, and colony maintenance.' },
                worker_major: { lifespan: '1-6 months', length: '3-4mm', role: 'Soldiers and heavy laborers. Colony defense, breaking down large food items, and structural construction.' },
                drone: { lifespan: '2-5 days after mating', length: '5-6mm', role: 'Winged males whose sole purpose is to mate with virgin queens during nuptial flights. They die shortly after mating.' },
                alate: { lifespan: 'Until founding (~weeks)', length: '6-7mm', role: 'Virgin winged queens. Participate in mating flights, then shed wings and found new colonies independently.' },
                nurse: { lifespan: '1-6 months', length: '2-3mm', role: 'Tend to eggs, larvae, and pupae. Feed larvae processed food, regulate brood chamber temperature and humidity.' },
                forager: { lifespan: '1-6 months', length: '2-4mm', role: 'Scout for food, recruit nestmates via pheromone trails, harvest and transport food back to the colony.' },
                guard: { lifespan: '1-6 months', length: '3-4mm', role: 'Defend nest entrances. Check incoming ants for colony-specific cuticular hydrocarbons. Reject or attack intruders.' }
            },
            info: 'One of the most invasive ant species in the world. Native to South America, now found across the southern United States and beyond. Known for aggressive stinging behavior and rapid colony growth.',
            history: 'Arrived in the United States around the 1930s-1940s through the port of Mobile, Alabama, likely in ship ballast soil from Brazil or Argentina. Has since spread across the entire southern US. Causes billions of dollars in damage annually to agriculture, infrastructure, and wildlife.',
            habitat: 'Open sunny areas — lawns, pastures, parks, roadsides, agricultural fields. Prefers disturbed habitats. Builds distinctive dome-shaped mounds up to 18 inches tall.',
            states: ['TX', 'FL', 'GA', 'AL', 'MS', 'LA', 'SC', 'NC', 'TN', 'AR', 'OK', 'VA', 'MD', 'CA', 'NM', 'AZ'],
            color: { head: '#8B2500', thorax: '#A0522D', gaster: '#4A1000' },
            parasites: [
                { name: 'Phorid Flies (Pseudacteon spp.)', description: 'Parasitic flies that lay eggs inside fire ant workers. Larvae consume the head contents, causing decapitation. Used as biological control agents.' },
                { name: 'Thelohania solenopsae', description: 'A microsporidian pathogen that infects fire ant queens, reducing their egg production by up to 75% and shortening their lifespan.' },
                { name: 'Vairimorpha invictae', description: 'Another microsporidian parasite that infects fire ant colonies, causing reduced brood production and colony weakening.' }
            ]
        },
        {
            id: 'camponotus-pennsylvanicus',
            commonName: 'Black Carpenter Ant',
            scientificName: 'Camponotus pennsylvanicus',
            family: 'Formicidae',
            isAnt: true,
            castes: {
                queen: { lifespan: '10-15 years', length: '13-17mm', role: 'Founding queen establishes colony in moist, decaying wood. Largest ant in North America.' },
                worker_minor: { lifespan: '1-3 years', length: '6-10mm', role: 'Excavate galleries in wood, forage for food, tend brood.' },
                worker_major: { lifespan: '1-3 years', length: '10-13mm', role: 'Colony defense, heavy excavation, large food item processing.' },
                drone: { lifespan: 'Days after mating', length: '10-12mm', role: 'Winged males for mating flights.' },
                alate: { lifespan: 'Until founding', length: '13-17mm', role: 'Virgin queens that participate in spring mating flights.' }
            },
            info: 'Largest ant species in North America. Does not eat wood but excavates it to create nesting galleries. Can cause structural damage to buildings.',
            history: 'Native to North America. Has been documented since early colonial records. Plays an important ecological role in forest decomposition.',
            habitat: 'Dead or decaying wood — fallen logs, tree stumps, structural lumber in buildings. Prefers moist wood. Found in forests, urban areas, and suburban environments.',
            states: ['All eastern US states', 'TX', 'CO', 'ND', 'SD', 'NE', 'KS', 'MN', 'WI', 'IA'],
            color: { head: '#1a1a1a', thorax: '#1a1a1a', gaster: '#0d0d0d' },
            parasites: [
                { name: 'Phorid Flies', description: 'Some phorid fly species parasitize carpenter ants similarly to fire ants.' }
            ]
        },
        {
            id: 'atta-texana',
            commonName: 'Texas Leafcutter Ant',
            scientificName: 'Atta texana',
            family: 'Formicidae',
            isAnt: true,
            castes: {
                queen: { lifespan: '10-20 years', length: '18-22mm', role: 'One of the largest ant queens. Founds colony with a piece of fungus carried from her parent colony.' },
                worker_minor: { lifespan: '2-3 months', length: '2-4mm', role: 'Tend fungus gardens, process leaf fragments, care for brood.' },
                worker_major: { lifespan: '6-12 months', length: '8-14mm', role: 'Cut and carry leaf fragments, defend colony. Massive mandibles for cutting vegetation.' },
                drone: { lifespan: 'Days after mating', length: '12-15mm', role: 'Large winged males for mating swarms.' }
            },
            info: 'Fungus-farming ants that cut leaves to cultivate underground fungus gardens. One colony can strip a small tree overnight. Their underground nests can extend 20+ feet deep.',
            history: 'Native to Texas and Louisiana. One of only two leafcutter species in the United States. Their agriculture predates human farming by about 50 million years.',
            habitat: 'Sandy, well-drained soils in open and semi-open habitats. East Texas, Louisiana. Large mounds with multiple entrance craters.',
            states: ['TX', 'LA'],
            color: { head: '#8B4513', thorax: '#A0522D', gaster: '#6B3410' },
            parasites: [
                { name: 'Phorid Flies', description: 'Multiple phorid species target leafcutter ants, particularly the large foragers carrying leaf fragments.' },
                { name: 'Escovopsis', description: 'A parasitic fungus that attacks the ants\' cultivated fungus gardens, potentially destroying the colony\'s food source.' }
            ]
        },
        {
            id: 'paraponera-clavata',
            commonName: 'Bullet Ant',
            scientificName: 'Paraponera clavata',
            family: 'Formicidae',
            isAnt: true,
            castes: {
                queen: { lifespan: '10-15 years', length: '25-30mm', role: 'Among the largest ant queens. Founds small colonies at the base of trees.' },
                worker_minor: { lifespan: '1-3 years', length: '18-25mm', role: 'All workers are roughly the same size. Forage in tree canopy for nectar and small arthropods.' },
                guard: { lifespan: '1-3 years', length: '18-25mm', role: 'Defend nest entrance. Their sting is rated as the most painful insect sting in the world (4+ on Schmidt Pain Index).' }
            },
            info: 'Has the most painful sting of any insect — described as "waves of burning, throbbing, all-consuming pain" lasting up to 24 hours. Used in coming-of-age rituals by the Sateré-Mawé people of Brazil.',
            history: 'Native to Central and South American rainforests. Named "bullet ant" because the sting feels like being shot. The Sateré-Mawé tribe weaves them into gloves for initiation ceremonies — boys must wear the gloves for 10 minutes.',
            habitat: 'Lowland tropical rainforests. Nests at the base of large trees. Found from Nicaragua to Bolivia and Brazil.',
            states: [],
            color: { head: '#2d1810', thorax: '#3d2015', gaster: '#1a0d08' },
            parasites: [
                { name: 'Phorid Flies', description: 'Some phorid species have been observed parasitizing bullet ants.' }
            ]
        },
        {
            id: 'linepithema-humile',
            commonName: 'Argentine Ant',
            scientificName: 'Linepithema humile',
            family: 'Formicidae',
            isAnt: true,
            castes: {
                queen: { lifespan: '1-2 years', length: '4.5-5mm', role: 'Multiple queens per colony (highly polygyne). Supercolonies can have millions of queens.' },
                worker_minor: { lifespan: '10-12 months', length: '2.2-2.6mm', role: 'Uniform worker caste. Extremely aggressive foragers that displace native ant species.' },
                drone: { lifespan: 'Days', length: '2.5-3mm', role: 'Mate within the nest — no mating flights. This is unusual among ants.' }
            },
            info: 'One of the world\'s most invasive species. Forms massive supercolonies spanning hundreds of miles. A single supercolony stretches 3,700 miles along the Mediterranean coast.',
            history: 'Native to northern Argentina, Uruguay, Paraguay, and southern Brazil. Spread globally through human commerce in the late 19th and early 20th centuries. Has devastated native ant populations worldwide.',
            habitat: 'Moist environments near water sources. Urban areas, gardens, agricultural land. Does not build conspicuous mounds — nests under rocks, in soil, in wall voids.',
            states: ['CA', 'TX', 'FL', 'GA', 'AL', 'LA', 'SC', 'NC', 'HI', 'AZ'],
            color: { head: '#6B5B4F', thorax: '#7B6B5F', gaster: '#5B4B3F' },
            parasites: [
                { name: 'Pseudacteon spp.', description: 'Phorid flies that parasitize Argentine ants, though less studied than fire ant phorid interactions.' }
            ]
        },
        {
            id: 'eciton-burchellii',
            commonName: 'Army Ant',
            scientificName: 'Eciton burchellii',
            family: 'Formicidae',
            isAnt: true,
            castes: {
                queen: { lifespan: '3-5 years', length: '30-50mm', role: 'Massive queen — the largest ant queen in the world. Permanently wingless. Lays 100,000-300,000 eggs in periodic bursts.' },
                worker_minor: { lifespan: '1-3 months', length: '3-5mm', role: 'Massive swarm raids to hunt prey. Form living bridges and bivouacs (nests made of their own bodies).' },
                worker_major: { lifespan: '1-3 months', length: '10-14mm', role: 'Soldiers with massive hook-shaped mandibles. Guard the flanks of raiding columns.' },
                drone: { lifespan: 'Days', length: '15-18mm', role: 'Large winged males that fly to find colonies. Look more like wasps than ants.' }
            },
            info: 'Nomadic ants that don\'t build permanent nests. They form living structures called bivouacs from their own bodies. Swarm raids can involve 200,000+ ants covering the forest floor.',
            history: 'Found throughout Central and South American tropics. Have been the subject of extensive research on collective behavior and swarm intelligence. Their raiding behavior inspired algorithms used in computer science.',
            habitat: 'Tropical and subtropical forests of Central and South America. Nomadic — they move bivouac sites every few days during the nomadic phase.',
            states: [],
            color: { head: '#4A3000', thorax: '#5A3800', gaster: '#3A2000' },
            parasites: []
        },
        {
            id: 'monomorium-minimum',
            commonName: 'Little Black Ant',
            scientificName: 'Monomorium minimum',
            family: 'Formicidae',
            isAnt: true,
            castes: {
                queen: { lifespan: '1 year', length: '4-5mm', role: 'Founds colony alone or with multiple queens. Polygynous species — many colonies have multiple queens.' },
                worker_minor: { lifespan: '1-3 months', length: '1.5-2mm', role: 'One of the smallest household ants. Foragers travel in well-defined trails seeking sweet and greasy foods.' },
                drone: { lifespan: 'Days', length: '2-3mm', role: 'Winged males for mating flights in summer.' },
                alate: { lifespan: 'Until founding', length: '4-5mm', role: 'Virgin queens that swarm in June through August.' }
            },
            info: 'A common household nuisance ant native to North America. Tiny, jet black ants that often form long trails inside homes seeking food. Not aggressive but persistent.',
            history: 'Native to North America. Has been documented as a household pest since colonial times. Their small size allows them to invade through cracks and crevices most other ants cannot penetrate.',
            habitat: 'Found under rocks, in rotting wood, in lawns, and inside walls of homes. Prefers dry environments. Builds small mounds of fine soil.',
            states: ['All US states'],
            color: { head: '#0a0a0a', thorax: '#0a0a0a', gaster: '#000000' },
            parasites: [
                { name: 'Phorid Flies', description: 'Some phorid species attack little black ants similarly to fire ants.' }
            ]
        },
        {
            id: 'tapinoma-sessile',
            commonName: 'Odorous House Ant',
            scientificName: 'Tapinoma sessile',
            family: 'Formicidae',
            isAnt: true,
            castes: {
                queen: { lifespan: '8 months - few years', length: '4-5mm', role: 'Multiple queens per colony. Can establish satellite colonies through budding.' },
                worker_minor: { lifespan: '1-3 months', length: '2.4-3.3mm', role: 'Foragers known for following pheromone trails to sweet foods. When crushed, they emit a distinctive rotten coconut smell.' },
                drone: { lifespan: 'Days', length: '3-4mm', role: 'Winged males for spring mating flights.' }
            },
            info: 'Named for the rotten coconut or blue cheese smell they produce when crushed. One of the most common household ants in North America. Very adaptable to indoor and outdoor environments.',
            history: 'Native to North America. Has expanded its range significantly with human development. Now considered one of the most successful urban-adapted ant species.',
            habitat: 'Extremely versatile — found in homes, gardens, forests, fields, and urban areas. Nests under stones, in soil, in walls, inside potted plants, and in any sheltered location.',
            states: ['All US states'],
            color: { head: '#3a3a3a', thorax: '#3a3a3a', gaster: '#1a1a1a' },
            parasites: []
        },
        {
            id: 'pogonomyrmex-barbatus',
            commonName: 'Red Harvester Ant',
            scientificName: 'Pogonomyrmex barbatus',
            family: 'Formicidae',
            isAnt: true,
            castes: {
                queen: { lifespan: '15-30 years', length: '8-10mm', role: 'One of the longest-lived queens in the ant world. Can survive for decades, founding and maintaining a single colony.' },
                worker_minor: { lifespan: '1 year', length: '5-7mm', role: 'Forage for seeds, store them in underground granaries. Travel up to 100 feet from the nest in foraging columns.' },
                worker_major: { lifespan: '1 year', length: '7-9mm', role: 'Larger workers that defend the colony and process tougher seeds.' },
                drone: { lifespan: 'Days', length: '8-10mm', role: 'Winged males for late summer mating flights.' }
            },
            info: 'Seed-collecting ants that build large mounds in arid regions of the southwestern US. Their sting is extremely painful — rated 3 on the Schmidt Pain Index. Known for their characteristic cleared circles around mounds.',
            history: 'Native to the southwestern United States and Mexico. Important seed dispersers in desert ecosystems. Their long-lived colonies have been studied for decades by researchers tracking colony lifespans.',
            habitat: 'Arid and semi-arid grasslands, deserts, scrublands. Builds large dome mounds with characteristic vegetation-free circles around them.',
            states: ['TX', 'NM', 'AZ', 'OK', 'NV', 'UT', 'CO'],
            color: { head: '#A0211B', thorax: '#B83329', gaster: '#7B1810' },
            parasites: [
                { name: 'Phorid Flies', description: 'Some phorid species target harvester ants.' }
            ]
        },
        {
            id: 'lasius-niger',
            commonName: 'Black Garden Ant',
            scientificName: 'Lasius niger',
            family: 'Formicidae',
            isAnt: true,
            castes: {
                queen: { lifespan: '15-30 years', length: '9mm', role: 'One of the longest-lived insects in the world. Founds colony alone after mating flight.' },
                worker_minor: { lifespan: '1-2 years', length: '3-5mm', role: 'Forage for sugary substances, especially honeydew from aphids. Tend aphid colonies for protection.' },
                drone: { lifespan: 'Days', length: '3.5-4.5mm', role: 'Winged males for summer mating swarms.' },
                alate: { lifespan: 'Until founding', length: '9mm', role: 'Virgin queens that participate in famous "Flying Ant Day" mass swarms.' }
            },
            info: 'The most common garden ant in Europe. Famous for tending aphid "herds" for honeydew. Their queens hold the record for longest-lived insect — one captive queen lived 28 years and 8 months.',
            history: 'Native to Europe and Asia, introduced to North America. Their mating flights known as "Flying Ant Day" are an annual phenomenon in Europe where millions of queens and males take flight simultaneously.',
            habitat: 'Gardens, lawns, parks, forest edges. Builds nests under stones, paving slabs, and in soil. Often found in human environments.',
            states: ['Northeastern US', 'Pacific Northwest'],
            color: { head: '#1a1a1a', thorax: '#2a2a2a', gaster: '#0a0a0a' },
            parasites: [
                { name: 'Phorid Flies', description: 'Various phorid species parasitize Lasius species.' }
            ]
        },
        {
            id: 'tetramorium-immigrans',
            commonName: 'Pavement Ant',
            scientificName: 'Tetramorium immigrans',
            family: 'Formicidae',
            isAnt: true,
            castes: {
                queen: { lifespan: '5-15 years', length: '6-8mm', role: 'Founds colony in pavement cracks. Can have multiple queens per colony.' },
                worker_minor: { lifespan: '1-2 years', length: '2.5-4mm', role: 'Forage in trails, often emerging through pavement cracks. Eat almost anything — sweets, meats, dead insects.' },
                drone: { lifespan: 'Days', length: '4-5mm', role: 'Winged males for spring mating flights.' }
            },
            info: 'Named for their habit of nesting under sidewalks, driveways, and other paved surfaces. Famous for engaging in massive sidewalk wars where thousands of workers from rival colonies battle each other.',
            history: 'Originally from Europe, introduced to North America in the 1700s through ship ballast. Now found across most of the United States. Their territorial battles in spring have been studied by myrmecologists for decades.',
            habitat: 'Under and between paving stones, sidewalks, driveways, building foundations. Also found in lawns and under rocks. Highly adapted to urban environments.',
            states: ['All US states except deep South'],
            color: { head: '#5a4a3a', thorax: '#6a5a4a', gaster: '#3a2a1a' },
            parasites: []
        },
        {
            id: 'crematogaster',
            commonName: 'Acrobat Ant',
            scientificName: 'Crematogaster cerasi',
            family: 'Formicidae',
            isAnt: true,
            castes: {
                queen: { lifespan: '5-10 years', length: '5-6mm', role: 'Founds colonies in wood cavities. Some species are polygynous.' },
                worker_minor: { lifespan: '1-2 years', length: '2.5-4mm', role: 'Famous for raising their heart-shaped gasters over their heads when alarmed — looks like an acrobat. They release defensive chemicals from this position.' },
                drone: { lifespan: 'Days', length: '4-5mm', role: 'Winged males for summer mating flights.' }
            },
            info: 'Named for their distinctive defensive posture — raising their heart-shaped gaster over their head like an acrobat. They have a unique heart-shaped abdomen that distinguishes them from other ants.',
            history: 'Many species worldwide. Common in North American forests. Often nest in old carpenter ant tunnels or in wood damaged by other insects.',
            habitat: 'Dead wood, tree branches, hollow stems, sometimes in homes. Prefer moist or partially decayed wood.',
            states: ['Most US states'],
            color: { head: '#4a3520', thorax: '#5a4530', gaster: '#3a2510' },
            parasites: []
        },
        {
            id: 'oecophylla-smaragdina',
            commonName: 'Asian Weaver Ant',
            scientificName: 'Oecophylla smaragdina',
            family: 'Formicidae',
            isAnt: true,
            castes: {
                queen: { lifespan: '5-8 years', length: '15-20mm', role: 'Founds colony in tree canopy. Workers build her first nest from leaves stitched together with larval silk.' },
                worker_minor: { lifespan: '8-10 weeks', length: '5-6mm', role: 'Care for brood and use larvae as living silk dispensers to weave leaves into nests.' },
                worker_major: { lifespan: '8-10 weeks', length: '8-10mm', role: 'Foragers and defenders. Hunt insects in the tree canopy. Highly aggressive when defending nest territory.' },
                drone: { lifespan: 'Days', length: '7-9mm', role: 'Winged males for canopy mating flights.' }
            },
            info: 'Famous for building nests by weaving leaves together using silk produced by their own larvae. Workers hold leaves in position while others use larvae as living glue guns. One of the most sophisticated examples of tool use in insects.',
            history: 'Found across Southeast Asia, Australia, and parts of Africa. Used as biological pest control in Asian agriculture for over 1,700 years — one of the earliest examples of biological control in human history.',
            habitat: 'Tropical forests and orchards. Nests in tree canopies, often building multiple connected leaf-nests in a single tree.',
            states: [],
            color: { head: '#c97a4a', thorax: '#d68a5a', gaster: '#a85a30' },
            parasites: []
        },
        // NOT ANTS - will trigger warning
        {
            id: 'velvet-ant',
            commonName: 'Velvet Ant (Cow Killer)',
            scientificName: 'Dasymutilla occidentalis',
            family: 'Mutillidae',
            isAnt: false,
            actualType: 'wasp',
            warningMessage: 'The Velvet Ant (Dasymutilla occidentalis) is commonly mistaken for an ant, but is actually a wingless wasp from the family Mutillidae. Despite its fuzzy, ant-like appearance, it is not an ant. Unfortunately Ant Tracker cannot help you with this species.'
        },
        {
            id: 'panda-ant',
            commonName: 'Panda Ant',
            scientificName: 'Euspinolia militaris',
            family: 'Mutillidae',
            isAnt: false,
            actualType: 'wasp',
            warningMessage: 'The Panda Ant (Euspinolia militaris) is commonly mistaken for an ant due to its appearance, but is actually a velvet wasp from the family Mutillidae. Its black and white "panda" coloring is warning coloration for its painful sting. Unfortunately Ant Tracker cannot help you with this species.'
        },
        {
            id: 'termite',
            commonName: 'Termite',
            scientificName: 'Isoptera',
            family: 'Termitoidae',
            isAnt: false,
            actualType: 'termite',
            warningMessage: 'Termites are frequently confused with ants, but they belong to an entirely separate order (Blattodea, related to cockroaches). They have straight antennae (ants have elbowed), a broad waist (ants have a narrow petiole), and equal-length wings. Unfortunately Ant Tracker cannot help you with this species.'
        }
    ],

    search(query) {
        const q = query.toLowerCase();
        return this.species.filter(s =>
            s.commonName.toLowerCase().includes(q) ||
            s.scientificName.toLowerCase().includes(q)
        ).slice(0, 10);
    },

    getById(id) {
        return this.species.find(s => s.id === id);
    }
};

const Identify = {
    selectedSpecies: null,
    selectedCaste: null,

    init() {
        this.bindSearch();
    },

    bindSearch() {
        const input = document.getElementById('species-search');
        const results = document.getElementById('search-results');

        input.addEventListener('input', () => {
            const query = input.value.trim();
            if (query.length < 2) {
                results.classList.remove('active');
                return;
            }

            const matches = AntDatabase.search(query);
            if (matches.length === 0) {
                results.classList.remove('active');
                return;
            }

            results.innerHTML = matches.map(s => `
                <div class="search-result-item" data-id="${s.id}">
                    <div class="common-name">${s.commonName}</div>
                    <div class="scientific-name">${s.scientificName}</div>
                </div>
            `).join('');

            results.classList.add('active');

            results.querySelectorAll('.search-result-item').forEach(item => {
                item.addEventListener('click', () => {
                    const species = AntDatabase.getById(item.dataset.id);
                    this.selectSpecies(species);
                    results.classList.remove('active');
                    input.value = species.commonName;
                });
            });
        });

        // Close results on click outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-wrapper')) {
                results.classList.remove('active');
            }
        });
    },

    selectSpecies(species) {
        this.selectedSpecies = species;
        const warning = document.getElementById('not-ant-warning');
        const content = document.getElementById('species-content');

        // Not an ant check
        if (!species.isAnt) {
            warning.querySelector('#not-ant-message').innerHTML = species.warningMessage;
            warning.classList.add('show');
            content.innerHTML = '';
            return;
        }

        warning.classList.remove('show');
        this.showCasteSelection(species);
    },

    showCasteSelection(species) {
        const content = document.getElementById('species-content');
        const casteNames = {
            queen: { name: 'Queen', role: 'Egg Layer', icon: '&#x1F451;' },
            worker_minor: { name: 'Worker (Minor)', role: 'General Labor', icon: '&#x2692;' },
            worker_major: { name: 'Soldier (Major)', role: 'Defense', icon: '&#x1F6E1;' },
            drone: { name: 'Drone (Male)', role: 'Reproduction', icon: '&#x2642;' },
            alate: { name: 'Virgin Queen', role: 'Future Queen', icon: '&#x1F4AB;' },
            nurse: { name: 'Nurse', role: 'Brood Care', icon: '&#x1F476;' },
            forager: { name: 'Forager', role: 'Food Scout', icon: '&#x1F50D;' },
            guard: { name: 'Guard', role: 'Nest Defense', icon: '&#x1F6E1;' }
        };

        const castes = Object.keys(species.castes).map(key => {
            const info = casteNames[key] || { name: key, role: '', icon: '&#x1F41C;' };
            return `
            <div class="caste-card" data-caste="${key}">
                <div class="caste-icon">${info.icon}</div>
                <div class="caste-name">${info.name}</div>
                <div class="caste-role">${info.role}</div>
            </div>`;
        }).join('');

        content.innerHTML = `
            <h3 style="text-align: center; margin-bottom: 16px; color: var(--text-secondary);">Select Caste — ${species.commonName}</h3>
            <div class="caste-grid">${castes}</div>
            <div id="caste-detail"></div>
        `;

        content.querySelectorAll('.caste-card').forEach(card => {
            card.addEventListener('click', () => {
                content.querySelectorAll('.caste-card').forEach(c => c.classList.remove('active'));
                card.classList.add('active');
                this.showCasteDetail(species, card.dataset.caste);
            });
        });
    },

    showCasteDetail(species, casteKey) {
        this.selectedCaste = casteKey;
        const caste = species.castes[casteKey];
        const detail = document.getElementById('caste-detail');

        const parasiteHtml = species.parasites.length > 0 ?
            `<div class="info-section">
                <h3>Known Parasites</h3>
                <div class="parasite-list">
                    ${species.parasites.map(p => `
                        <div class="parasite-item" onclick="alert('${p.name}: ${p.description.replace(/'/g, "\\'")}')">
                            <span class="parasite-name">${p.name}</span>
                            <span class="parasite-arrow">&#x27A4;</span>
                        </div>
                    `).join('')}
                </div>
            </div>` : '';

        const statesHtml = species.states.length > 0 ?
            `<div class="states-tags">
                ${species.states.map(s => `<span class="state-tag">${s}</span>`).join('')}
            </div>` : '<p style="color: var(--text-muted); font-size: 0.85rem;">Not found in the United States</p>';

        detail.innerHTML = `
        <div class="species-detail" style="margin-top: 24px;">
            <div class="model-viewer" id="ant-model-viewer">
                <div style="text-align: center; color: var(--text-muted);">
                    <div style="font-size: 4rem; margin-bottom: 12px;">&#x1F41C;</div>
                    <p>3D Model Viewer</p>
                    <p style="font-size: 0.8rem;">Rotate: Click + Drag | Zoom: Scroll</p>
                </div>
                <button class="test-sim-btn" onclick="Identify.openSimulation()">Test Simulation</button>
                <div class="model-controls">
                    <button class="active">Rotate</button>
                    <button>Zoom</button>
                    <button>Reset</button>
                </div>
            </div>
            <div class="species-info">
                <div class="info-section">
                    <h3>Identification</h3>
                    <div class="info-row">
                        <span class="info-label">Common Name</span>
                        <span class="info-value">${species.commonName}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Scientific Name</span>
                        <span class="info-value" style="font-style: italic;">${species.scientificName}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Family</span>
                        <span class="info-value">${species.family}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Caste</span>
                        <span class="info-value">${casteKey.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                    </div>
                </div>
                <div class="info-section">
                    <h3>Stats</h3>
                    <div class="info-row">
                        <span class="info-label">Lifespan</span>
                        <span class="info-value">${caste.lifespan}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Length</span>
                        <span class="info-value">${caste.length}</span>
                    </div>
                </div>
                <div class="info-section">
                    <h3>Role</h3>
                    <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.5;">${caste.role}</p>
                </div>
                <div class="info-section">
                    <h3>About This Species</h3>
                    <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.5;">${species.info}</p>
                </div>
                <div class="info-section">
                    <h3>History</h3>
                    <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.5;">${species.history}</p>
                </div>
                <div class="info-section">
                    <h3>Habitat</h3>
                    <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.5;">${species.habitat}</p>
                </div>
                <div class="info-section">
                    <h3>Found In</h3>
                    ${statesHtml}
                </div>
                ${parasiteHtml}
            </div>
        </div>`;

        // Initialize 3D model if Three.js is available
        if (typeof THREE !== 'undefined') {
            AntModelViewer.init('ant-model-viewer', species, casteKey);
        }
    },

    openSimulation() {
        if (!this.selectedSpecies || !this.selectedCaste) return;

        // Create simulation overlay
        const overlay = document.createElement('div');
        overlay.className = 'sim-overlay active';
        overlay.innerHTML = `
        <div class="sim-container">
            <div class="sim-sidebar">
                <h3>Test Simulations</h3>
                <div class="sim-category">
                    <h4>Feeding</h4>
                    <div class="sim-option active" data-sim="eating">Eating (Transparent View)</div>
                    <div class="sim-option" data-sim="sugar-water">Sugar Water</div>
                    <div class="sim-option" data-sim="protein">Protein Processing</div>
                    <div class="sim-option" data-sim="gatorade">Gatorade Test</div>
                </div>
                <div class="sim-category">
                    <h4>Movement</h4>
                    <div class="sim-option" data-sim="walking">Walking</div>
                    <div class="sim-option" data-sim="carrying">Carrying Load</div>
                    <div class="sim-option" data-sim="climbing">Climbing</div>
                    <div class="sim-option" data-sim="running">Running</div>
                </div>
                <div class="sim-category">
                    <h4>Environment</h4>
                    <div class="sim-option" data-sim="rain">Rain</div>
                    <div class="sim-option" data-sim="heat">Extreme Heat</div>
                    <div class="sim-option" data-sim="frost">Frost</div>
                    <div class="sim-option" data-sim="flood">Flooding</div>
                    <div class="sim-option" data-sim="wind">High Wind</div>
                </div>
                <div class="sim-category">
                    <h4>Combat</h4>
                    <div class="sim-option" data-sim="sting">Sting Attack</div>
                    <div class="sim-option" data-sim="defense">Defense Posture</div>
                    <div class="sim-option" data-sim="swarm">Swarm Response</div>
                </div>
                <div class="sim-category">
                    <h4>Communication</h4>
                    <div class="sim-option" data-sim="pheromone">Pheromone Trail</div>
                    <div class="sim-option" data-sim="antenna">Antenna Exchange</div>
                    <div class="sim-option" data-sim="trophallaxis">Trophallaxis</div>
                </div>
            </div>
            <div class="sim-viewport">
                <button class="sim-close">&times;</button>
                <div style="text-align: center; color: var(--text-muted);">
                    <div style="font-size: 4rem; margin-bottom: 16px;">&#x1F41C;</div>
                    <h3 style="margin-bottom: 8px;">${this.selectedSpecies.commonName} — Eating Simulation</h3>
                    <p>3D simulation viewport</p>
                    <p style="font-size: 0.8rem; margin-top: 8px;">Click on chemicals to see their names and functions</p>
                </div>
            </div>
        </div>`;

        document.body.appendChild(overlay);

        // Close button
        overlay.querySelector('.sim-close').addEventListener('click', () => {
            overlay.remove();
        });

        // Simulation option clicks
        overlay.querySelectorAll('.sim-option').forEach(opt => {
            opt.addEventListener('click', () => {
                overlay.querySelectorAll('.sim-option').forEach(o => o.classList.remove('active'));
                opt.classList.add('active');
                const viewport = overlay.querySelector('.sim-viewport div');
                viewport.querySelector('h3').textContent =
                    `${this.selectedSpecies.commonName} — ${opt.textContent} Simulation`;
            });
        });
    }
};
