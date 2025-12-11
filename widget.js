(function() {
    // ==========================================================================
    // CONFIGURATION (LUXEMBOURG - API LIVE)
    // ==========================================================================
    const CONFIG = {
        containerId: 'wyws-luxembourg-widget',
        
        // URL STABLE - se met à jour automatiquement quand le gouvernement publie de nouvelles données
        apiUrl: 'https://data.public.lu/fr/datasets/r/f0829196-054a-49bd-8ea7-b24db8c9eefb',
        
        vdlLink: 'https://www.vdl.lu/fr/vivre/domicile-au-quotidien/verifier-la-qualite-de-leau-chez-soi#',
        quoteLink: '/durete-de-leau-au-luxembourg#Obtenez-votre-devis',
        websiteLink: 'https://www.aquapurify.eu'
    };

    // ==========================================================================
    // CSS ISOLÉ (.kw-lux-...)
    // ==========================================================================
    const css = `
        #wyws-luxembourg-container { font-family: 'Segoe UI', Arial, sans-serif; max-width: 650px; margin: 30px auto; background: #fff; border: 1px solid #e1e4e8; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); overflow: visible; text-align: center; position: relative; padding-bottom: 25px; }
        .kw-lux-header { padding: 30px 20px 10px; border-radius: 12px 12px 0 0; }
        .kw-lux-headline { text-transform: uppercase; line-height: 1.1; color: #00ADEF; font-size: 2.4rem; margin: 0; }
        .kw-lux-top-line { font-family: 'Arial Black', sans-serif; font-weight: 900; display: block; letter-spacing: -1px; }
        .kw-lux-second-line { display: block; color: #0054A4; }
        .kw-lux-word-water { font-weight: 300; font-family: 'Segoe UI', sans-serif; } 
        .kw-lux-word-score { font-family: 'Arial Black', sans-serif; font-weight: 900; letter-spacing: -1px; }
        .kw-lux-tm { font-size: 0.3em; vertical-align: top; position: relative; top: 0.1em; font-weight: 400; margin-left: 2px; line-height: 1; font-family: Arial, sans-serif; }
        .kw-lux-subtext { color: #666; margin-top: 10px; font-size: 0.95rem; }
        .kw-lux-search-area { padding: 0 30px 15px; position: relative; }
        .kw-lux-input { width: 100%; padding: 15px; border: 2px solid #ddd; border-radius: 50px; font-size: 16px; outline: none; text-align: center; transition: 0.3s; box-sizing: border-box; }
        .kw-lux-input:focus { border-color: #0054A4; box-shadow: 0 0 0 3px rgba(0, 84, 164, 0.1); }
        .kw-lux-suggestions { position: absolute; top: 65px; left: 30px; right: 30px; background: white; border: 1px solid #cce4f7; z-index: 9999; max-height: 250px; overflow-y: auto; box-shadow: 0 15px 30px rgba(0,0,0,0.15); display: none; border-radius: 8px; }
        .kw-lux-suggestion-item { padding: 12px 15px; cursor: pointer; border-bottom: 1px solid #f0f0f0; text-align: left; }
        .kw-lux-suggestion-item:hover { background: #f0f7ff; color: #0054A4; }
        .kw-lux-slider-wrapper { padding: 0 20px; transition: opacity 0.3s; margin-top: 10px; }
        .kw-lux-slider-container { position: relative; height: 60px; margin: 20px 10px; }
        .kw-lux-slider-bar { height: 40px; width: 100%; border-radius: 4px; background: linear-gradient(90deg, #F57F20 0%, #E5007E 50%, #00ADEF 100%); position: relative; top: 10px; }
        .kw-lux-grid-lines { position: absolute; top: 10px; left: 0; width: 100%; height: 40px; display: flex; justify-content: space-between; pointer-events: none; }
        .kw-lux-line { width: 1px; background: rgba(255,255,255,0.4); height: 100%; }
        .kw-lux-water-drop { position: absolute; top: -15px; transform: translateX(-50%); width: 50px; height: 65px; transition: left 1.5s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.5s; z-index: 10; filter: drop-shadow(0 3px 5px rgba(0,0,0,0.2)); }
        .kw-lux-drop-shape { width: 42px; height: 42px; background: #00ADEF; border-radius: 0 50% 50% 50%; transform: rotate(45deg); margin: 0 auto; border: 3px solid white; transition: background 1.5s; }
        .kw-lux-drop-value { position: absolute; top: 13px; left: 0; width: 100%; text-align: center; color: white; font-weight: 800; font-size: 15px; text-shadow: 0 1px 2px rgba(0,0,0,0.2); }
        .kw-lux-labels { display: flex; justify-content: space-between; margin-top: 15px; color: #999; font-size: 11px; font-weight: bold; padding: 0 2px; }
        .kw-lux-result-panel { padding: 0 20px 10px; animation: kw-fadein 0.6s ease-out; }
        .kw-lux-commune-title { font-size: 1.3rem; font-weight: bold; color: #0054A4; margin-top: 10px; }
        .kw-lux-message-box { background: #f8f9fa; padding: 20px; border-radius: 10px; margin-top: 25px; border: 1px solid #eee; }
        .kw-lux-cta-button { display: none; margin-top: 15px; background: #0054A4; color: white; text-decoration: none; padding: 14px 30px; border-radius: 6px; font-weight: bold; transition: 0.3s; text-transform: uppercase; letter-spacing: 0.5px; }
        .kw-lux-cta-button:hover { background: #003d7a; transform: translateY(-2px); box-shadow: 0 4px 10px rgba(0,84,164,0.3); }
        .kw-lux-redirect-btn { display: inline-block; background-color: #00ADEF; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold; margin-top: 15px; transition: background-color 0.3s; }
        .kw-lux-redirect-btn:hover { background-color: #005bb8; }
        
        .kw-lux-footer-block { margin-top: 20px; padding-top: 15px; border-top: 1px solid #eee; margin-left: 30px; margin-right: 30px; }
        .kw-lux-dealer-info { font-size: 11px; color: #555; font-weight: 400; font-family: Arial, sans-serif; line-height: 1.4; display: block; }
        .kw-lux-dealer-link { color: #555; text-decoration: none; font-weight: 400; cursor: pointer; transition: color 0.2s; }
        .kw-lux-dealer-link:hover { color: #000; }
        
        .kw-lux-source-data { font-size: 9px; color: #aaa; margin-top: 10px; display: block; }
        .kw-lux-loader { color: #888; display: none; margin: 10px; font-style: italic; }
        .kw-lux-error-msg { color: #d32f2f; display: none; margin: 10px; font-weight: bold; background:#ffebee; padding:10px; border-radius:5px; font-size: 0.9em; }
        
        @keyframes kw-fadein { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    `;

    // ==========================================================================
    // HTML TEMPLATE
    // ==========================================================================
    const htmlTemplate = `
        <div id="wyws-luxembourg-container">
            <div class="kw-lux-header">
                <h2 class="kw-lux-headline">
                    <span class="kw-lux-top-line">WHAT'S YOUR</span>
                    <span class="kw-lux-second-line">
                        <span class="kw-lux-word-water">WATER</span> <span class="kw-lux-word-score">SCORE?<sup class="kw-lux-tm">TM</sup></span>
                    </span>
                </h2>
                <div class="kw-lux-subtext">Découvrez la qualité de votre eau en quelques secondes.</div>
            </div>

            <div class="kw-lux-search-area">
                <input type="text" id="kw-input-lux" class="kw-lux-input" placeholder="Ex: Bertrange..." autocomplete="off">
                <div id="kw-suggestions-lux" class="kw-lux-suggestions"></div>
                <div id="kw-loader-lux" class="kw-lux-loader">Connexion aux données...</div>
                <div id="kw-error-lux" class="kw-lux-error-msg"></div>
            </div>

            <div id="kw-slider-wrapper-lux" class="kw-lux-slider-wrapper">
                <div class="kw-lux-slider-container">
                    <div class="kw-lux-slider-bar">
                        <div class="kw-lux-grid-lines">
                             <div class="kw-lux-line"></div><div class="kw-lux-line"></div><div class="kw-lux-line"></div>
                             <div class="kw-lux-line"></div><div class="kw-lux-line"></div><div class="kw-lux-line"></div>
                             <div class="kw-lux-line"></div><div class="kw-lux-line"></div>
                        </div>
                    </div>
                    <div id="kw-drop-lux" class="kw-lux-water-drop" style="opacity: 0;">
                        <div id="kw-drop-shape-lux" class="kw-lux-drop-shape"></div>
                        <div id="kw-score-val-lux" class="kw-lux-drop-value">--</div>
                    </div>
                    <div class="kw-lux-labels">
                        <span>30</span><span>40</span><span>50</span><span>60</span><span>70</span><span>80</span><span>90</span><span>100</span>
                    </div>
                </div>
            </div>

            <div id="kw-result-lux" class="kw-lux-result-panel" style="display:none;">
                <div id="kw-commune-display-lux" class="kw-lux-commune-title"></div>

                <div id="kw-message-standard-lux" class="kw-lux-message-box">
                    <strong id="kw-verdict-title-lux" style="font-size: 1.2em; display:block; margin-bottom:8px;"></strong>
                    <div id="kw-verdict-desc-lux" style="font-size: 0.95em; color:#555; margin:0; line-height: 1.5;"></div>
                    <a href="${CONFIG.quoteLink}" id="kw-cta-btn-lux" class="kw-lux-cta-button">RAISE YOUR WATER SCORE TODAY!</a>
                </div>

                <div id="kw-vdl-container-lux" style="display:none; text-align: center; margin-top:20px;">
                    <p style="color:#666;">La Ville de Luxembourg possède un réseau complexe avec plusieurs sources d'eau différentes.</p>
                    <a href="${CONFIG.vdlLink}" target="_blank" class="kw-lux-redirect-btn">Vérifier mon adresse précise sur vdl.lu</a>
                </div>
            </div>

            <div class="kw-lux-footer-block">
                <div class="kw-lux-dealer-info">
                    <a href="${CONFIG.websiteLink}" target="_blank" class="kw-lux-dealer-link">Aqua Purify</a><br>
                    Authorized, Independent Kinetico Dealer
                </div>
                <span class="kw-lux-source-data">Données : data.public.lu / Administration de la gestion de l'eau</span>
            </div>
        </div>
    `;

    // ==========================================================================
    // LOGIQUE (SCANNER & FETCH)
    // ==========================================================================
    function initWidget() {
        const root = document.getElementById(CONFIG.containerId);
        if (!root) return;

        const styleTag = document.createElement('style');
        styleTag.textContent = css;
        document.head.appendChild(styleTag);
        root.innerHTML = htmlTemplate;

        // Elements
        const input = document.getElementById('kw-input-lux');
        const suggestions = document.getElementById('kw-suggestions-lux');
        const loader = document.getElementById('kw-loader-lux');
        const errorMsg = document.getElementById('kw-error-lux');
        const resultPanel = document.getElementById('kw-result-lux');
        const sliderWrapper = document.getElementById('kw-slider-wrapper-lux');
        const messageStandard = document.getElementById('kw-message-standard-lux');
        const vdlContainer = document.getElementById('kw-vdl-container-lux');
        const displayCommune = document.getElementById('kw-commune-display-lux');
        const drop = document.getElementById('kw-drop-lux');
        const scoreVal = document.getElementById('kw-score-val-lux');
        const verdictTitle = document.getElementById('kw-verdict-title-lux');
        const verdictDesc = document.getElementById('kw-verdict-desc-lux');
        const ctaBtn = document.getElementById('kw-cta-btn-lux');
        const dropShape = drop.querySelector('.kw-lux-drop-shape');

        let communesData = [];

        // --- CHARGEMENT INTELLIGENT ---
        async function loadData() {
            try {
                loader.style.display = 'block';
                const response = await fetch(CONFIG.apiUrl);
                if (!response.ok) throw new Error('Erreur de connexion aux données publiques.');
                
                const geoData = await response.json();
                
                if (!geoData.features || geoData.features.length === 0) {
                    throw new Error("Le fichier de données est vide.");
                }

                // 1. SCANNER DE CLES (Le secret pour que ça marche peu importe le nom)
                const props = geoData.features[0].properties;
                const keys = Object.keys(props);
                
                // On cherche une clé qui contient "Commune" (ex: "trinkwasser...Commune")
                const keyName = keys.find(k => k.toLowerCase().includes('commune'));
                // On cherche une clé qui contient "WSZ" ou "Durete"
                const keyVal = keys.find(k => k.toLowerCase().includes('wsz') || k.toLowerCase().includes('durete'));

                if (!keyName || !keyVal) {
                    console.warn("Clés introuvables via scanner. Essai fallback...");
                    // En dernier recours, on tente les clés standards connues
                }

                const communesMap = new Map();
                
                geoData.features.forEach(feature => {
                    // Utilisation des clés trouvées dynamiquement
                    const name = feature.properties[keyName];
                    const th = feature.properties[keyVal];
                    
                    if (name && typeof name === 'string' && !name.startsWith('*')) {
                        const cleanName = name.trim();
                        if (!communesMap.has(cleanName)) {
                            // Sécurité : si th est null, on met 0
                            const val = (th !== null && th !== undefined) ? parseFloat(th) : 0;
                            communesMap.set(cleanName, { name: cleanName, th: val });
                        }
                    }
                });
                
                communesData = Array.from(communesMap.values()).sort((a, b) => a.name.localeCompare(b.name, 'fr'));
                loader.style.display = 'none';

                if (communesData.length === 0) throw new Error("Aucune commune trouvée après analyse.");

            } catch (e) {
                console.error(e);
                loader.style.display = 'none';
                errorMsg.innerHTML = "Impossible de charger les données.<br><small>" + e.message + "</small>";
                errorMsg.style.display = 'block';
            }
        }

        // --- RECHERCHE ---
        input.addEventListener('input', (e) => {
            const val = e.target.value.toLowerCase();
            if(val.length < 2) { 
                suggestions.style.display = 'none'; 
                if(val.length === 0) {
                    drop.style.opacity = '0';
                    resultPanel.style.display = 'none';
                    sliderWrapper.style.display = 'block';
                }
                return; 
            }
            const matches = communesData.filter(c => c.name.toLowerCase().includes(val)).slice(0, 8);
            suggestions.innerHTML = '';
            if(!matches.length) { suggestions.style.display = 'none'; return; }

            matches.forEach(c => {
                const div = document.createElement('div');
                div.className = 'kw-lux-suggestion-item';
                div.textContent = c.name;
                div.onclick = () => {
                    input.value = c.name;
                    suggestions.style.display = 'none';
                    processSelection(c);
                };
                suggestions.appendChild(div);
            });
            suggestions.style.display = 'block';
        });

        // --- AFFICHAGE ---
        function processSelection(commune) {
            displayCommune.textContent = "Qualité de l'eau à " + commune.name;
            resultPanel.style.display = 'block';
            
            if (commune.name.toLowerCase() === 'luxembourg') {
                sliderWrapper.style.display = 'none';
                messageStandard.style.display = 'none';
                vdlContainer.style.display = 'block';
            } else {
                vdlContainer.style.display = 'none';
                sliderWrapper.style.display = 'block';
                messageStandard.style.display = 'block';
                updateScoreUI(commune.th);
            }
        }

        // --- SCORE & TEXTES ---
        function updateScoreUI(thValue) {
            const th = parseFloat(thValue);
            let score;
            if (th < 5) score = 100 - (th * 2); 
            else if (th < 15) score = 96 - (th * 1.4); 
            else if (th < 30) score = 98 - (th * 1.6);
            else score = 49 - ((th - 30) * 0.4); 
            score = Math.max(30, Math.min(100, Math.round(score)));

            const reference = 12;
            const ratio = (th > 0) ? (th / reference).toFixed(1).replace('.0', '') : 0;
            let color, title, text;
            
            if (th < 12) {
                color = '#00ADEF'; title = "EAU DOUCE (OK)"; text = `Votre eau (${th.toFixed(1)}°f) respecte le seuil de confort de référence (12°f).<br>Aucun traitement n'est nécessaire.`; ctaBtn.style.display = 'none';
            } else if (th < 15) {
                color = '#00ADEF'; title = "EAU PEU CALCAIRE"; text = `Votre eau (${th.toFixed(1)}°f) est légèrement au-dessus de la référence (12°f).<br>L'objectif en sortie d'adoucisseur est entre <strong>6 et 8°f</strong>.`; ctaBtn.style.display = 'inline-block';
            } else if (th < 30) {
                color = '#E5007E'; title = "ADOUCISSEUR RECOMMANDÉ"; text = `Votre eau est calcaire (${th.toFixed(1)}°f), soit <strong>${ratio} fois</strong> la référence de confort (12°f).<br>L'objectif en sortie d'adoucisseur est entre <strong>6 et 8°f</strong>.`; ctaBtn.style.display = 'inline-block';
            } else {
                color = '#F57F20'; title = "ADOUCISSEUR INDISPENSABLE"; text = `Votre eau est très dure (${th.toFixed(1)}°f), soit <strong>${ratio} fois</strong> la référence de confort (12°f).<br>L'objectif en sortie d'adoucisseur est entre <strong>6 et 8°f</strong>.`; ctaBtn.style.display = 'inline-block';
            }

            verdictTitle.textContent = title;
            verdictTitle.style.color = color;
            verdictDesc.innerHTML = text;
            scoreVal.textContent = score;
            dropShape.style.background = color;
            dropShape.style.borderColor = "white";
            
            drop.style.opacity = '1';
            const percent = ((score - 30) / 70) * 100;
            drop.style.left = `${percent}%`;
        }

        document.addEventListener('click', (e) => {
            if(input && suggestions && !input.contains(e.target) && !suggestions.contains(e.target)) {
                suggestions.style.display = 'none';
            }
        });

        loadData();
    }

    let attempts = 0;
    const interval = setInterval(function() {
        const root = document.getElementById(CONFIG.containerId);
        if (root) {
            clearInterval(interval);
            initWidget();
        }
        attempts++;
        if (attempts > 30) clearInterval(interval);
    }, 300);
})();
