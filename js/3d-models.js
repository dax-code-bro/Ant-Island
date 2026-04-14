/* ============================================
   ANT TRACKER - Realistic 3D Ant Model Viewer
   Built with Three.js
   ============================================ */

const AntModelViewer = {
    scenes: {},

    init(containerId, species, casteKey) {
        const container = document.getElementById(containerId);
        if (!container) return;

        // Clean up previous scene if exists
        if (this.scenes[containerId]) {
            const old = this.scenes[containerId];
            old.renderer.dispose();
            old.scene.clear();
        }

        // Clear container
        container.innerHTML = '';
        container.style.position = 'relative';

        // Add Test Simulation button
        const simBtn = document.createElement('button');
        simBtn.className = 'test-sim-btn';
        simBtn.textContent = 'Test Simulation';
        simBtn.onclick = () => Identify.openSimulation();
        container.appendChild(simBtn);

        // Add hint text
        const hint = document.createElement('div');
        hint.style.cssText = 'position: absolute; bottom: 8px; left: 8px; color: rgba(255,255,255,0.5); font-size: 0.7rem; pointer-events: none; z-index: 5;';
        hint.textContent = 'Drag to rotate • Scroll to zoom';
        container.appendChild(hint);

        // ============ SCENE SETUP ============
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x181818);
        scene.fog = new THREE.Fog(0x181818, 10, 25);

        const width = container.clientWidth;
        const height = container.clientHeight;
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        camera.position.set(3, 2.5, 7);
        camera.lookAt(0, 0, 0);

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: "high-performance"
        });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.outputEncoding = THREE.sRGBEncoding;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.1;
        container.appendChild(renderer.domElement);

        // ============ STUDIO LIGHTING ============
        // Ambient base light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.25);
        scene.add(ambientLight);

        // Key light (main light from upper right)
        const keyLight = new THREE.DirectionalLight(0xfff5e6, 1.2);
        keyLight.position.set(6, 10, 6);
        keyLight.castShadow = true;
        keyLight.shadow.mapSize.width = 2048;
        keyLight.shadow.mapSize.height = 2048;
        keyLight.shadow.camera.near = 0.1;
        keyLight.shadow.camera.far = 30;
        keyLight.shadow.camera.left = -10;
        keyLight.shadow.camera.right = 10;
        keyLight.shadow.camera.top = 10;
        keyLight.shadow.camera.bottom = -10;
        keyLight.shadow.bias = -0.0001;
        scene.add(keyLight);

        // Fill light (cool blue from opposite side)
        const fillLight = new THREE.DirectionalLight(0x88aaff, 0.5);
        fillLight.position.set(-6, 4, -3);
        scene.add(fillLight);

        // Rim light (warm from behind for outline)
        const rimLight = new THREE.DirectionalLight(0xffaa66, 0.8);
        rimLight.position.set(0, 3, -8);
        scene.add(rimLight);

        // Bottom bounce light
        const bottomLight = new THREE.DirectionalLight(0xffeecc, 0.2);
        bottomLight.position.set(0, -5, 2);
        scene.add(bottomLight);

        // ============ BUILD THE ANT ============
        const ant = this.buildRealisticAnt(species, casteKey);
        scene.add(ant);

        // ============ GROUND SHADOW ============
        const groundGeo = new THREE.PlaneGeometry(30, 30);
        const groundMat = new THREE.ShadowMaterial({ opacity: 0.4 });
        const ground = new THREE.Mesh(groundGeo, groundMat);
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = -1.4;
        ground.receiveShadow = true;
        scene.add(ground);

        // ============ INTERACTION ============
        let isDragging = false;
        let prevX = 0;
        let prevY = 0;
        let rotY = 0.5;
        let rotX = -0.2;
        ant.rotation.y = rotY;
        ant.rotation.x = rotX;
        let autoRotate = true;

        const onPointerDown = (e) => {
            isDragging = true;
            autoRotate = false;
            const point = e.touches ? e.touches[0] : e;
            prevX = point.clientX;
            prevY = point.clientY;
        };

        const onPointerMove = (e) => {
            if (!isDragging) return;
            if (e.touches) e.preventDefault();
            const point = e.touches ? e.touches[0] : e;
            const dx = point.clientX - prevX;
            const dy = point.clientY - prevY;
            rotY += dx * 0.012;
            rotX += dy * 0.012;
            rotX = Math.max(-1.3, Math.min(1.3, rotX));
            ant.rotation.y = rotY;
            ant.rotation.x = rotX;
            prevX = point.clientX;
            prevY = point.clientY;
        };

        const onPointerUp = () => isDragging = false;

        renderer.domElement.addEventListener('mousedown', onPointerDown);
        window.addEventListener('mousemove', onPointerMove);
        window.addEventListener('mouseup', onPointerUp);
        renderer.domElement.addEventListener('touchstart', onPointerDown, { passive: false });
        renderer.domElement.addEventListener('touchmove', onPointerMove, { passive: false });
        renderer.domElement.addEventListener('touchend', onPointerUp);

        renderer.domElement.addEventListener('wheel', (e) => {
            e.preventDefault();
            const dist = camera.position.length();
            const newDist = Math.max(3.5, Math.min(15, dist + e.deltaY * 0.005));
            camera.position.normalize().multiplyScalar(newDist);
        }, { passive: false });

        // ============ ANIMATION LOOP ============
        const animate = () => {
            requestAnimationFrame(animate);
            if (!isDragging && autoRotate) {
                rotY += 0.004;
                ant.rotation.y = rotY;
            }
            renderer.render(scene, camera);
        };
        animate();

        // ============ CONTROLS UI ============
        const controls = document.createElement('div');
        controls.className = 'model-controls';
        controls.innerHTML = `
            <button id="ctrl-reset">Reset View</button>
            <button id="ctrl-rotate">Auto-Rotate</button>
        `;
        container.appendChild(controls);

        controls.querySelector('#ctrl-reset').onclick = () => {
            rotX = -0.2;
            rotY = 0.5;
            ant.rotation.set(rotX, rotY, 0);
            camera.position.set(3, 2.5, 7);
        };
        controls.querySelector('#ctrl-rotate').onclick = () => {
            autoRotate = !autoRotate;
        };

        // Store for cleanup
        this.scenes[containerId] = { scene, renderer, camera, ant };

        // Resize handler
        const resizeHandler = () => {
            if (!container.clientWidth) return;
            const w = container.clientWidth;
            const h = container.clientHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        };
        window.addEventListener('resize', resizeHandler);
    },

    // ========================================
    // BUILD REALISTIC ANT MODEL
    // ========================================
    buildRealisticAnt(species, casteKey) {
        const ant = new THREE.Group();
        const colors = species.color || { head: '#8B2500', thorax: '#A0522D', gaster: '#4A1000' };

        // Caste-specific size modifiers
        const sizeMods = {
            queen: { body: 1.6, gaster: 2.2, head: 1.35, leg: 1.1 },
            worker_minor: { body: 1.0, gaster: 1.0, head: 1.0, leg: 1.0 },
            worker_major: { body: 1.35, gaster: 1.15, head: 1.65, leg: 1.1 },
            soldier: { body: 1.35, gaster: 1.15, head: 1.7, leg: 1.1 },
            drone: { body: 1.25, gaster: 1.3, head: 0.85, leg: 1.0 },
            alate: { body: 1.5, gaster: 1.7, head: 1.25, leg: 1.05 },
            nurse: { body: 1.0, gaster: 1.05, head: 1.0, leg: 1.0 },
            forager: { body: 1.0, gaster: 1.0, head: 1.0, leg: 1.05 },
            guard: { body: 1.25, gaster: 1.05, head: 1.4, leg: 1.05 }
        };
        const mod = sizeMods[casteKey] || sizeMods.worker_minor;

        // ============ MATERIALS ============
        // Use MeshStandardMaterial for PBR rendering
        const headMat = new THREE.MeshStandardMaterial({
            color: colors.head,
            roughness: 0.35,
            metalness: 0.15,
            envMapIntensity: 1.0
        });
        const thoraxMat = new THREE.MeshStandardMaterial({
            color: colors.thorax,
            roughness: 0.4,
            metalness: 0.12
        });
        const gasterMat = new THREE.MeshStandardMaterial({
            color: colors.gaster,
            roughness: 0.25,
            metalness: 0.2
        });
        const legMat = new THREE.MeshStandardMaterial({
            color: this.darkenColor(colors.gaster, 0.7),
            roughness: 0.5,
            metalness: 0.1
        });
        const eyeMat = new THREE.MeshStandardMaterial({
            color: 0x050505,
            roughness: 0.05,
            metalness: 0.3
        });
        const eyeHighlight = new THREE.MeshBasicMaterial({ color: 0xaaaaaa });
        const mandibleMat = new THREE.MeshStandardMaterial({
            color: this.darkenColor(colors.head, 0.6),
            roughness: 0.3,
            metalness: 0.25
        });
        const wingMat = new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.25,
            roughness: 0.0,
            metalness: 0.0,
            transmission: 0.9,
            thickness: 0.1,
            side: THREE.DoubleSide
        });

        // ============ HEAD ============
        const headGroup = new THREE.Group();
        const headSize = 0.55 * mod.head;
        const headGeo = new THREE.SphereGeometry(headSize, 48, 48);
        // Slightly flatten and elongate
        headGeo.scale(1.15, 0.95, 0.95);
        const head = new THREE.Mesh(headGeo, headMat);
        head.castShadow = true;
        head.receiveShadow = true;
        headGroup.add(head);
        headGroup.position.set(1.6, 0.25, 0);
        ant.add(headGroup);

        // Compound eyes (large, multifaceted look using subdivided spheres)
        const eyeRadius = 0.13 * mod.head;
        const eyeGeo = new THREE.SphereGeometry(eyeRadius, 24, 24);
        const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
        leftEye.position.set(0.32, 0.1, 0.42);
        leftEye.scale.set(1.0, 1.2, 0.85);
        headGroup.add(leftEye);

        const rightEye = new THREE.Mesh(eyeGeo, eyeMat);
        rightEye.position.set(0.32, 0.1, -0.42);
        rightEye.scale.set(1.0, 1.2, 0.85);
        headGroup.add(rightEye);

        // Eye highlights for shiny look
        const highlightGeo = new THREE.SphereGeometry(0.025 * mod.head, 8, 8);
        const leftHL = new THREE.Mesh(highlightGeo, eyeHighlight);
        leftHL.position.set(0.42, 0.18, 0.5);
        headGroup.add(leftHL);
        const rightHL = new THREE.Mesh(highlightGeo, eyeHighlight);
        rightHL.position.set(0.42, 0.18, -0.5);
        headGroup.add(rightHL);

        // Mandibles - curved blades
        const mandibleGroup = new THREE.Group();
        const createMandible = (side) => {
            const points = [];
            for (let i = 0; i <= 10; i++) {
                const t = i / 10;
                points.push(new THREE.Vector3(
                    t * 0.55,
                    -t * 0.15,
                    side * (0.15 + Math.sin(t * 1.5) * 0.18)
                ));
            }
            const curve = new THREE.CatmullRomCurve3(points);
            const tubeGeo = new THREE.TubeGeometry(curve, 16, 0.045 * mod.head, 12, false);
            const mandible = new THREE.Mesh(tubeGeo, mandibleMat);
            mandible.castShadow = true;
            return mandible;
        };
        mandibleGroup.add(createMandible(1));
        mandibleGroup.add(createMandible(-1));
        mandibleGroup.position.set(0.6, -0.05, 0);
        headGroup.add(mandibleGroup);

        // Antennae - elbowed (scape and funiculus)
        const createAntenna = (side) => {
            const antennaGroup = new THREE.Group();

            // Scape (long first segment)
            const scapeGeo = new THREE.CylinderGeometry(0.028, 0.035, 0.75, 12);
            const scape = new THREE.Mesh(scapeGeo, headMat);
            scape.position.set(0.3, 0.2, 0);
            scape.rotation.z = -Math.PI / 3.5;
            scape.rotation.x = side * 0.4;
            antennaGroup.add(scape);

            // Elbow joint
            const elbowGeo = new THREE.SphereGeometry(0.04, 12, 12);
            const elbow = new THREE.Mesh(elbowGeo, headMat);
            elbow.position.set(0.62, 0.55, side * 0.3);
            antennaGroup.add(elbow);

            // Funiculus (segmented antenna)
            for (let i = 0; i < 7; i++) {
                const segSize = 0.05 - i * 0.003;
                const segGeo = new THREE.CylinderGeometry(segSize, segSize + 0.002, 0.085, 8);
                const seg = new THREE.Mesh(segGeo, headMat);
                seg.position.set(
                    0.65 + i * 0.04,
                    0.65 + i * 0.06,
                    side * (0.35 + i * 0.04)
                );
                seg.rotation.z = -Math.PI / 8;
                seg.rotation.x = side * 0.5;
                antennaGroup.add(seg);
            }

            // Club tip (slightly thicker last segment)
            const clubGeo = new THREE.SphereGeometry(0.05, 12, 12);
            const club = new THREE.Mesh(clubGeo, headMat);
            club.position.set(0.95, 1.05, side * 0.65);
            club.scale.set(1, 1.5, 1);
            antennaGroup.add(club);

            return antennaGroup;
        };
        headGroup.add(createAntenna(1));
        headGroup.add(createAntenna(-1));

        // ============ THORAX (Mesosoma) ============
        // Made of 3 fused segments: pronotum, mesonotum, propodeum
        const thoraxGroup = new THREE.Group();

        // Pronotum (front)
        const pronotumGeo = new THREE.SphereGeometry(0.42 * mod.body, 32, 32);
        pronotumGeo.scale(1.1, 1.0, 1.0);
        const pronotum = new THREE.Mesh(pronotumGeo, thoraxMat);
        pronotum.position.set(0.4, 0.15, 0);
        pronotum.castShadow = true;
        pronotum.receiveShadow = true;
        thoraxGroup.add(pronotum);

        // Mesonotum (middle - slightly raised)
        const mesonotumGeo = new THREE.SphereGeometry(0.4 * mod.body, 32, 32);
        mesonotumGeo.scale(1.0, 1.1, 0.95);
        const mesonotum = new THREE.Mesh(mesonotumGeo, thoraxMat);
        mesonotum.position.set(-0.05, 0.2, 0);
        mesonotum.castShadow = true;
        mesonotum.receiveShadow = true;
        thoraxGroup.add(mesonotum);

        // Propodeum (rear)
        const propodeumGeo = new THREE.SphereGeometry(0.38 * mod.body, 32, 32);
        propodeumGeo.scale(0.95, 1.0, 0.9);
        const propodeum = new THREE.Mesh(propodeumGeo, thoraxMat);
        propodeum.position.set(-0.45, 0.1, 0);
        propodeum.castShadow = true;
        propodeum.receiveShadow = true;
        thoraxGroup.add(propodeum);

        ant.add(thoraxGroup);

        // ============ PETIOLE (waist) ============
        // Two nodes for some species
        const petioleGroup = new THREE.Group();

        const node1Geo = new THREE.SphereGeometry(0.18, 20, 20);
        const node1 = new THREE.Mesh(node1Geo, thoraxMat);
        node1.position.set(-0.85, 0.05, 0);
        node1.scale.set(0.85, 1.1, 0.85);
        node1.castShadow = true;
        petioleGroup.add(node1);

        const node2Geo = new THREE.SphereGeometry(0.16, 20, 20);
        const node2 = new THREE.Mesh(node2Geo, thoraxMat);
        node2.position.set(-1.1, 0.0, 0);
        node2.scale.set(0.9, 1.0, 0.9);
        node2.castShadow = true;
        petioleGroup.add(node2);

        ant.add(petioleGroup);

        // ============ GASTER (abdomen) ============
        const gasterSize = 0.7 * mod.gaster;
        const gasterGeo = new THREE.SphereGeometry(gasterSize, 48, 48);
        gasterGeo.scale(1.4, 1.0, 1.0);
        const gaster = new THREE.Mesh(gasterGeo, gasterMat);
        gaster.position.set(-1.95, -0.05, 0);
        gaster.castShadow = true;
        gaster.receiveShadow = true;
        ant.add(gaster);

        // Subtle segmentation lines on gaster (using rings)
        for (let i = 1; i < 5; i++) {
            const ringRadius = gasterSize * Math.sqrt(1 - Math.pow((i / 5) - 0.3, 2) * 1.2);
            const ringGeo = new THREE.TorusGeometry(ringRadius * 0.95, 0.012, 8, 32);
            const ring = new THREE.Mesh(ringGeo, gasterMat);
            ring.position.set(-1.95 + (gasterSize * 1.4) * (0.1 - i * 0.18), -0.05, 0);
            ring.rotation.y = Math.PI / 2;
            ant.add(ring);
        }

        // Stinger
        const stingerGeo = new THREE.ConeGeometry(0.05, 0.35, 12);
        const stinger = new THREE.Mesh(stingerGeo, mandibleMat);
        stinger.position.set(-2.95, -0.05, 0);
        stinger.rotation.z = Math.PI / 2;
        stinger.castShadow = true;
        ant.add(stinger);

        // ============ LEGS (3 pairs) ============
        const legPositions = [
            { x: 0.6, z: 0.5, angleZ: -0.5, angleX: 0 },    // Front L
            { x: 0.6, z: -0.5, angleZ: -0.5, angleX: 0 },   // Front R
            { x: 0.0, z: 0.55, angleZ: 0, angleX: 0 },      // Middle L
            { x: 0.0, z: -0.55, angleZ: 0, angleX: 0 },     // Middle R
            { x: -0.55, z: 0.5, angleZ: 0.4, angleX: 0 },   // Back L
            { x: -0.55, z: -0.5, angleZ: 0.4, angleX: 0 }   // Back R
        ];

        legPositions.forEach((pos, i) => {
            this.buildDetailedLeg(ant, legMat, pos, mod.leg, i % 2 === 0 ? 1 : -1);
        });

        // ============ WINGS (drones and alates) ============
        if (casteKey === 'drone' || casteKey === 'alate') {
            const createWing = (side, isHind) => {
                const points = [
                    new THREE.Vector3(0, 0, 0),
                    new THREE.Vector3(0.5, 0.1, side * 0.3),
                    new THREE.Vector3(1.2, 0.05, side * 0.5),
                    new THREE.Vector3(1.8, -0.05, side * 0.4),
                    new THREE.Vector3(2.0, -0.15, side * 0.2),
                    new THREE.Vector3(1.5, -0.15, side * 0.1),
                    new THREE.Vector3(0.7, -0.1, side * 0.05),
                    new THREE.Vector3(0, 0, 0)
                ];
                const shape = new THREE.Shape();
                shape.moveTo(0, 0);
                shape.bezierCurveTo(0.5, 0.4, 1.5, 0.4, 2.0, 0);
                shape.bezierCurveTo(1.5, -0.4, 0.5, -0.4, 0, 0);

                const wingGeo = new THREE.ShapeGeometry(shape);
                const wing = new THREE.Mesh(wingGeo, wingMat);
                wing.position.set(0.2, 0.65, side * 0.3);
                wing.rotation.x = -Math.PI / 2;
                wing.rotation.z = side * 0.3;
                if (isHind) {
                    wing.scale.set(0.7, 0.7, 0.7);
                    wing.position.x -= 0.3;
                }
                return wing;
            };

            ant.add(createWing(1, false));
            ant.add(createWing(-1, false));
            ant.add(createWing(1, true));
            ant.add(createWing(-1, true));
        }

        // Final scaling and positioning
        ant.scale.set(0.65, 0.65, 0.65);
        ant.position.y = -0.3;

        return ant;
    },

    buildDetailedLeg(parent, material, pos, legMod, sideMul) {
        const sideMul2 = pos.z > 0 ? 1 : -1;
        const legGroup = new THREE.Group();

        // Coxa (hip joint)
        const coxaGeo = new THREE.SphereGeometry(0.085, 12, 12);
        const coxa = new THREE.Mesh(coxaGeo, material);
        coxa.position.set(pos.x, 0.0, pos.z);
        coxa.castShadow = true;
        legGroup.add(coxa);

        // Trochanter (small joint)
        const trochGeo = new THREE.SphereGeometry(0.05, 8, 8);
        const troch = new THREE.Mesh(trochGeo, material);
        troch.position.set(pos.x + 0.05, -0.1, pos.z + sideMul2 * 0.18);
        legGroup.add(troch);

        // Femur (upper leg) - thick, slightly curved
        const femurLen = 0.7 * legMod;
        const femurGeo = new THREE.CylinderGeometry(0.05, 0.06, femurLen, 12);
        const femur = new THREE.Mesh(femurGeo, material);
        femur.position.set(
            pos.x + pos.angleZ * 0.15,
            -0.05,
            pos.z + sideMul2 * (femurLen * 0.4)
        );
        femur.rotation.x = sideMul2 * 0.65;
        femur.rotation.z = pos.angleZ * 0.6;
        femur.castShadow = true;
        legGroup.add(femur);

        // Knee
        const kneeGeo = new THREE.SphereGeometry(0.06, 12, 12);
        const knee = new THREE.Mesh(kneeGeo, material);
        knee.position.set(
            pos.x + pos.angleZ * 0.3,
            -0.4,
            pos.z + sideMul2 * (femurLen * 0.85)
        );
        knee.castShadow = true;
        legGroup.add(knee);

        // Tibia (lower leg) - thinner, angles down
        const tibiaLen = 0.75 * legMod;
        const tibiaGeo = new THREE.CylinderGeometry(0.035, 0.045, tibiaLen, 10);
        const tibia = new THREE.Mesh(tibiaGeo, material);
        tibia.position.set(
            pos.x + pos.angleZ * 0.35,
            -0.85,
            pos.z + sideMul2 * (femurLen * 0.95)
        );
        tibia.rotation.x = sideMul2 * 0.15;
        tibia.castShadow = true;
        legGroup.add(tibia);

        // Tarsus segments (foot)
        for (let i = 0; i < 4; i++) {
            const tarsusGeo = new THREE.CylinderGeometry(0.022 - i * 0.003, 0.025 - i * 0.003, 0.07, 8);
            const tarsus = new THREE.Mesh(tarsusGeo, material);
            tarsus.position.set(
                pos.x + pos.angleZ * 0.4 + i * 0.01,
                -1.25 - i * 0.05,
                pos.z + sideMul2 * (femurLen * 1.0 + i * 0.02)
            );
            tarsus.rotation.x = sideMul2 * 0.3;
            legGroup.add(tarsus);
        }

        // Tarsal claws (tiny)
        const clawGeo = new THREE.ConeGeometry(0.018, 0.05, 6);
        const claw = new THREE.Mesh(clawGeo, material);
        claw.position.set(
            pos.x + pos.angleZ * 0.4 + 0.05,
            -1.5,
            pos.z + sideMul2 * (femurLen * 1.05 + 0.08)
        );
        claw.rotation.z = Math.PI;
        legGroup.add(claw);

        parent.add(legGroup);
    },

    darkenColor(hex, factor) {
        const c = new THREE.Color(hex);
        c.r *= factor;
        c.g *= factor;
        c.b *= factor;
        return '#' + c.getHexString();
    }
};
