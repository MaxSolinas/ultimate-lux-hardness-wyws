(function() {
    // ==========================================================================
    // 1. BASE DE DONNÉES OFFICIELLE (Issue de votre fichier Shapefile)
    // ==========================================================================
    // Unité : Degrés Français (°f)
    // Source : Administration de la gestion de l'eau (Luxembourg)
    
    const LUX_DATA = {
        // Communes & Duretés extraites (Moyennes pondérées si plages)
        "Beaufort": 33.4, "Bech": 31.8, "Beckerich": 19.5, "Berdorf": 33.1, 
        "Bertrange": 26.5, "Bettembourg": 34.2, "Bettendorf": 21.0, "Betzdorf": 29.8, 
        "Bissen": 20.5, "Biwer": 28.9, "Boulaide": 16.5, "Bourscheid": 19.2, 
        "Bous": 31.5, "Clervaux": 18.5, "Colmar-Berg": 20.8, "Consdorf": 34.5, 
        "Contern": 26.0, "Dalheim": 32.5, "Diekirch": 20.2, "Differdange": 36.5, 
        "Dippach": 33.0, "Dudelange": 35.8, "Echternach": 30.5, "Ell": 21.2, 
        "Erpeldange-sur-Sûre": 20.5, "Esch-sur-Alzette": 35.5, "Esch-sur-Sûre": 14.5, 
        "Ettelbruck": 20.5, "Feulen": 20.5, "Fischbach": 20.2, "Flaxweiler": 30.2, 
        "Frisange": 33.5, "Garnich": 32.8, "Goesdorf": 19.5, "Grevenmacher": 33.5, 
        "Grosbous": 20.8, "Habscht": 32.5, "Heffingen": 28.5, "Helperknapp": 20.5, 
        "Hesperange": 33.2, "Junglinster": 29.5, "Käerjeng": 35.5, "Kayl": 35.2, 
        "Kehlen": 32.5, "Kiischpelt": 18.8, "Koerich": 32.2, "Kopstal": 32.0, 
        "Lac de la Haute-Sûre": 14.8, "Larochette": 28.0, "Lenningen": 31.5, 
        "Leudelange": 32.8, "Lintgen": 20.5, "Lorentzweiler": 20.5, 
        "Luxembourg": -1, /* Redirection VDL */
        "Mamer": 32.5, "Manternach": 30.8, "Mersch": 21.5, "Mertert": 31.5, 
        "Mertzig": 19.5, "Mondercange": 34.5, "Mondorf-les-Bains": 33.8, 
        "Niederanven": 26.5, "Nommern": 28.5, "Parc Hosingen": 19.5, "Petange": 36.0, 
        "Preizerdaul": 20.5, "Putscheid": 19.0, "Rambrouch": 20.0, "Reckange-sur-Mess": 33.5, 
        "Redange/Attert": 20.5, "Reisdorf": 20.8, "Remich": 12.5, /* Nouvelle valeur SEBES */
        "Roeser": 34.0, "Rosport-Mompach": 30.5, "Rumelange": 35.5, "Saeul": 20.8, 
        "Sandweiler": 26.5, "Sanem": 35.5, "Schengen": 33.5, "Schieren": 20.5, 
        "Schifflange": 35.0, "Schuttrange": 26.5, "Stadtbredimus": 32.5, 
        "Steinfort": 32.2, "Steinsel": 20.5, "Strassen": 32.5, "Tandel": 19.5, 
        "Troisvierges": 18.5, "Useldange": 20.5, "Vallée de l'Ernz": 30.5, 
        "Vianden": 19.5, "Vichten": 20.5, "Wahl": 20.5, "Waldbillig": 31.5, 
        "Waldbredimus": 31.2, "Walferdange": 22.5, "Weiler-la-Tour": 28.5, 
        "Weiswampach": 18.5, "Wiltz": 19.0, "Wincrange": 19.2, "Winseler": 19.0, 
        "Wormeldange": 32.5
    };

    const CONFIG = {
        containerId: 'wyws-luxembourg-widget',
        vdlLink: 'https://www.vdl.lu/fr/vivre/domicile-au-quotidien/verifier-la-qualite-de-leau-chez-soi#',
        quoteLink: '/durete-de-leau-au-luxembourg#Obtenez-votre-devis'
    };

    // ==========================================================================
    // 2. DESIGN (V23 - Kinetico Official)
    // ==========================================================================
    const css = `
        #wyws-luxembourg-container { font-family: 'Segoe UI', Arial, sans-serif; max-width: 650px; margin: 0 auto; background: #fff; border: 1px solid #e1e4e8; border-radius: 12px; box-shadow: 0 10px 40px rgba(0,0,0,0.08); overflow: visible; text-align: center; position: relative; padding-bottom: 25px; }
        .kw-header { padding: 30px 20px 10px; border-radius: 12px 12px 0 0; }
        .kw-headline { text-transform: uppercase; line-height: 1.1; color: #00ADEF; font-size: 2.4rem; margin: 0; }
        .kw-top-line { font-family: 'Arial Black', sans-serif; font-weight: 900; display: block; letter-spacing: -1px; }
        .kw-second-line { display: block; color: #0054A4; }
        .kw-word-water { font-weight: 300; font-family: 'Segoe UI', sans-serif; } .kw-word-score { font-family: 'Arial Black', sans-serif; font-weight: 900; letter-spacing: -1px; }
        .kw-tm { font-size: 0.3em; vertical-align: top; position: relative; top: 0.1em; font-weight: 400; margin-left: 2px; line-height: 1; font-family: Arial, sans-serif; }
        .kw-subtext { color: #666; margin-top: 10px; font-size: 0.95rem; }
        .kw-search-area { padding: 0 30px 15px; position: relative; }
        .kw-input { width: 100%; padding: 15px; border: 2px solid #ddd; border-radius: 50px; font-size: 16px; outline: none; text-align: center; transition: 0.3s; box-sizing: border-box; }
        .kw-input:focus { border-color: #0054A4; box-shadow: 0 0 0 3px rgba(0, 84, 164, 0.1); }
        .kw-suggestions { position: absolute; top: 65px; left: 30px; right: 30px; background: white; border: 1px solid #cce4f7; z-index: 9999; max-height: 250px; overflow-y: auto; box-shadow: 0 15px 30px rgba(0,0,0,0.15); display: none; border-radius: 8px; }
        .kw-suggestion-item { padding: 12px 15px; cursor: pointer; border-bottom: 1px solid #f0f0f0; text-align: left; }
        .kw-suggestion-item:hover { background: #f0f7ff; color: #0054A4; }
        .kw-slider-wrapper { padding: 0 20px; transition: opacity 0.3s; margin-top: 10px; }
        .kw-slider-container { position: relative; height: 60px; margin: 20px 10px; }
        .kw-slider-bar { height: 40px; width: 100%; border-radius: 4px; background: linear-gradient(90deg, #F57F20 0%, #E5007E 50%, #00ADEF 100%); position: relative; top: 10px; }
        .kw-grid-lines { position: absolute; top: 10px; left: 0; width: 100%; height: 40px; display: flex; justify-content: space-between; pointer-events: none; }
        .kw-line { width: 1px; background: rgba(255,255,255,0.4); height: 100%; }
        .kw-water-drop { position: absolute; top: -15px; transform: translateX(-50%); width: 50px; height: 65px; transition: left 1.5s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.5s; z-index: 10; filter: drop-shadow(0 3px 5px rgba(0,0,0,0.2)); }
        .kw-drop-shape { width: 42px; height: 42px; background: #00ADEF; border-radius: 0 50% 50% 50%; transform: rotate(45deg); margin: 0 auto; border: 3px solid white; transition: background 1.5s; }
        .kw-drop-value { position: absolute; top: 13px; left: 0; width: 100%; text-align: center; color: white; font-weight: 800; font-size: 15px; text-shadow: 0 1px 2px rgba(0,0,0,0.2); }
        .kw-labels { display: flex; justify-content: space-between; margin-top: 15px; color: #999; font-size: 11px; font-weight: bold; padding: 0 2px; }
        .kw-result-panel { padding: 0 20px 10px; animation: kw-fadein 0.6s ease-out; }
        .kw-commune-title { font-size: 1.3rem; font-weight: bold; color: #0054A4; margin-top: 10px; }
        .kw-message-box { background: #f8f9fa; padding: 20px; border-radius: 10px; margin-top: 25px; border: 1px solid #eee; }
        .kw-cta-button { display: none; margin-top: 15px; background: #0054A4; color: white; text-decoration: none; padding: 14px 30px; border-radius: 6px; font-weight: bold; transition: 0.3s; text-transform: uppercase; letter-spacing: 0.5px; }
        .kw-cta-button:hover { background: #003d7a; transform: translateY(-2px); box-shadow: 0 4px 10px rgba(0,84,164,0.3); }
        .kw-redirect-btn { display: inline-block; background-color: #00ADEF; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold; margin-top: 15px; transition: background-color 0.3s; }
        .kw-redirect-btn:hover { background-color: #005bb8; }
        .kw-footer-block { margin-top: 20px; padding-top: 15px; border-top: 1px solid #eee; margin-left: 30px; margin-right: 30px; }
        .kw-dealer-info { font-size: 11px; color: #555; font-weight: 400; font-family: Arial, sans-serif; line-height: 1.4; display: block; }
        .kw-source-data { font-size: 9px; color: #aaa; margin-top: 10px; display: block; }
        .kw-loader { color: #888; display: none; margin: 10px; font-style: italic; }
        @keyframes kw-fadein { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    `;

    // ==========================================================================
    // 3. TEMPLATE HTML
    // ==========================================================================
    const htmlTemplate = `
        <div id="wyws-luxembourg-container">
            <div class="kw-header">
                <h2 class="kw-headline">
                    <span class="kw-top-line">WHAT'S YOUR</span>
                    <span class="kw-second-line">
                        <span class="kw-word-water">WATER</span> <span class="kw-word-score">SCORE?<sup class="kw-tm">TM</sup></span>
                    </span>
                </h2>
                <div class="kw-subtext">Découvrez la qualité de votre eau en quelques secondes.</div>
            </div>

            <div class="kw-search-area">
                <input type="text" id="kw-input-lux" class="kw-input" placeholder="Ex: Bertrange..." autocomplete="off">
                <div id="kw-suggestions-lux" class="kw-suggestions"></div>
                <div id="kw-loader-lux" class="kw-loader">Chargement...</div>
            </div>

            <div id="kw-slider-wrapper-lux" class="kw-slider-wrapper">
                <div class="kw-slider-container">
                    <div class="kw-slider-bar">
                        <div class="kw-grid-lines">
                             <div class="kw-line"></div><div class="kw-line"></div><div class="kw-line"></div>
                             <div class="kw-line"></div><div class="kw-line"></div><div class="kw-line"></div>
                             <div class="kw-line"></div><div class="kw-line"></div>
                        </div>
                    </div>
                    <div id="kw-drop-lux" class="kw-water-drop" style="opacity: 0;">
                        <div id="kw-drop-shape-lux" class="kw-drop-shape"></div>
                        <div id="kw-score-val-lux" class="kw-drop-value">--</div>
                    </div>
                    <div class="kw-labels">
                        <span>30</span><span>40</span><span>50</span><span>60</span><span>70</span><span>80</span><span>90</span><span>100</span>
                    </div>
                </div>
            </div>

            <div id="kw-result-lux" class="kw-result-panel" style="display:none;">
                <div id="kw-commune-display" class="kw-commune-title"></div>

                <div id="kw-message-standard" class="kw-message-box">
                    <strong id="kw-verdict-title" style="font-size: 1.2em; display:block; margin-bottom:8px;"></strong>
                    <p id="kw-verdict-desc" style="font-size: 0.95em; color:#555; margin:0; line-height: 1.5;"></p>
                    <a href="${CONFIG.quoteLink}" id="kw-cta-btn-lux" class="kw-cta-button">RAISE YOUR WATER SCORE TODAY!</a>
                </div>

                <div id="kw-vdl-container" style="display:none; text-align: center; margin-top:20px;">
                    <p style="color:#666;">La Ville de Luxembourg possède un réseau complexe avec plusieurs sources d'eau différentes.</p>
                    <a href="${CONFIG.vdlLink}" target="_blank" class="kw-redirect-btn">Vérifier mon adresse précise sur vdl.lu</a>
                </div>
            </div>

            <div class="kw-footer-block">
                <div class="kw-dealer-info">
                    Aqua Purify<br>Authorized, Independent Kinetico Dealer
                </div>
                <span class="kw-source-data">Données : data.public.lu / Administration de la gestion de l'eau (màj 12/2025)</span>
            </div>
        </div>
    `;

    // ==========================================================================
    // 4. LOGIQUE
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
        const resultPanel = document.getElementById('kw-result-lux');
        const sliderWrapper = document.getElementById('kw-slider-wrapper-lux');
        const messageStandard = document.getElementById('kw-message-standard');
        const vdlContainer = document.getElementById('kw-vdl-container');
        const displayCommune = document.getElementById('kw-commune-display');
        const drop = document.getElementById('kw-drop-lux');
        const dropShape = document.getElementById('kw-drop-shape-lux');
        const scoreVal = document.getElementById('kw-score-val-lux');
        const verdictTitle = document.getElementById('kw-verdict-title');
        const verdictDesc = document.getElementById('kw-verdict-desc');
        const ctaBtn = document.getElementById('kw-cta-btn-lux');

        // Initialisation Instantanée
        loader.style.display = 'none';
        const communesList = Object.keys(LUX_DATA).sort();

        // RECHERCHE
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

            const matches = communesList.filter(c => c.toLowerCase().includes(val)).slice(0, 8);
            
            suggestions.innerHTML = '';
            if(!matches.length) { suggestions.style.display = 'none'; return; }

            matches.forEach(name => {
                const div = document.createElement('div');
                div.className = 'kw-suggestion-item';
                div.textContent = name;
                div.onclick = () => {
                    input.value = name;
                    suggestions.style.display = 'none';
                    processSelection(name);
                };
                suggestions.appendChild(div);
            });
            suggestions.style.display = 'block';
        });

        // SELECTION
        function processSelection(name) {
            displayCommune.textContent = "Qualité de l'eau à " + name;
            resultPanel.style.display = 'block';
            
            const value = LUX_DATA[name];

            if (value === -1 || name.toLowerCase() === 'luxembourg') {
                sliderWrapper.style.display = 'none';
                messageStandard.style.display = 'none';
                vdlContainer.style.display = 'block';
            } else {
                vdlContainer.style.display = 'none';
                sliderWrapper.style.display = 'block';
                messageStandard.style.display = 'block';
                updateScoreUI(value);
            }
        }

        // SCORE (4 Paliers)
        function updateScoreUI(thValue) {
            const th = parseFloat(thValue);
            let score;

            // Formule Paliers
            if (th < 5) score = 100 - (th * 2); 
            else if (th < 15) score = 96 - (th * 1.4); 
            else if (th < 30) score = 98 - (th * 1.6);
            else score = 49 - ((th - 30) * 0.4); 
            
            score = Math.max(30, Math.min(100, Math.round(score)));

            let color, title, text;
            
            if (th < 5) {
                color = '#00ADEF';
                title = "EXCELLENT SCORE";
                text = `Votre eau est douce (${th.toFixed(1)}°f). La qualité est idéale pour vos appareils.`;
                ctaBtn.style.display = 'none';
            } else if (th < 15) {
                color = '#00ADEF';
                title = "BON SCORE, MAIS...";
                text = `Votre eau est peu calcaire (${th.toFixed(1)}°f). Votre confort pourrait tout de même être amélioré avec un adoucisseur d'eau.`;
                ctaBtn.style.display = 'inline-block';
            } else if (th < 30) {
                color = '#E5007E';
                title = "ADOUCISSEUR RECOMMANDÉ";
                text = `Votre eau est calcaire (${th.toFixed(1)}°f). Un adoucisseur d'eau est vivement recommandé pour protéger votre maison.`;
                ctaBtn.style.display = 'inline-block';
            } else {
                color = '#F57F20';
                title = "ADOUCISSEUR INDISPENSABLE";
                text = `Votre eau est très dure (${th.toFixed(1)}°f). L'installation d'un adoucisseur d'eau est impérative pour éviter les dégâts.`;
                ctaBtn.style.display = 'inline-block';
            }

            verdictTitle.textContent = title;
            verdictTitle.style.color = color;
            verdictDesc.textContent = text;
            
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
