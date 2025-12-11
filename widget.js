(function() {
    // ==========================================================================
    // 1. DONNÉES LUXEMBOURG (102 Communes)
    // ==========================================================================
    const LUX_DATA = {
        "Beaufort": 33, "Bech": 31, "Beckerich": 19, "Berdorf": 33, "Bertrange": 26, 
        "Bettembourg": 35, "Bettendorf": 21, "Betzdorf": 30, "Bissen": 20, "Biwer": 29, 
        "Boulaide": 16, "Bourscheid": 19, "Bous": 31, "Clervaux": 18, "Colmar-Berg": 20, 
        "Consdorf": 34, "Contern": 26, "Dalheim": 32, "Diekirch": 20, "Differdange": 36, 
        "Dippach": 33, "Dudelange": 35, "Echternach": 30, "Ell": 21, "Erpeldange": 20, 
        "Esch-sur-Alzette": 35, "Esch-sur-Sûre": 14, "Ettelbruck": 20, "Feulen": 20, 
        "Fischbach": 20, "Flaxweiler": 30, "Frisange": 33, "Garnich": 32, "Goesdorf": 19, 
        "Grevenmacher": 33, "Grosbous": 20, "Habscht": 32, "Heffingen": 28, 
        "Helperknapp": 20, "Hesperange": 33, "Hobscheid": 32, "Junglinster": 29, 
        "Käerjeng": 35, "Kayl": 35, "Kehlen": 32, "Kiischpelt": 19, "Koerich": 32, 
        "Kopstal": 32, "Lac de la Haute-Sûre": 15, "Larochette": 28, "Lenningen": 31, 
        "Leudelange": 32, "Lintgen": 20, "Lorentzweiler": 20, "Luxembourg": -1, 
        "Mamer": 32, "Manternach": 30, "Mersch": 21, "Mertert": 31, "Mertzig": 19, 
        "Mondercange": 34, "Mondorf-les-Bains": 33, "Niederanven": 26, "Nommern": 28, 
        "Parc Hosingen": 19, "Petange": 36, "Preizerdaul": 20, "Putscheid": 19, 
        "Rambrouch": 20, "Reckange-sur-Mess": 33, "Redange": 20, "Reisdorf": 20, 
        "Remich": 12, "Roeser": 34, "Rosport-Mompach": 30, "Rumelange": 35, "Saeul": 20, 
        "Sandweiler": 26, "Sanem": 35, "Schengen": 33, "Schieren": 20, "Schifflange": 35, 
        "Schuttrange": 26, "Stadtbredimus": 32, "Steinfort": 32, "Steinsel": 20, 
        "Strassen": 32, "Tandel": 19, "Troisvierges": 18, "Useldange": 20, 
        "Vallée de l'Ernz": 30, "Vianden": 19, "Vichten": 20, "Wahl": 20, 
        "Waldbillig": 31, "Waldbredimus": 31, "Walferdange": 22, "Weiler-la-Tour": 28, 
        "Weiswampach": 18, "Wiltz": 19, "Wincrange": 19, "Winseler": 19, "Wormeldange": 32
    };

    const CONFIG = {
        containerId: 'wyws-luxembourg-widget',
        vdlLink: 'https://www.vdl.lu/fr/vivre/domicile-au-quotidien/verifier-la-qualite-de-leau-chez-soi#',
        quoteLink: '/durete-de-leau-au-luxembourg#Obtenez-votre-devis'
    };

    // ==========================================================================
    // 2. DESIGN (ISOLÉ AVEC PREFIXE -LUX)
    // ==========================================================================
    const css = `
        #wyws-luxembourg-container { font-family: 'Segoe UI', Arial, sans-serif; max-width: 650px; margin: 30px auto; background: #fff; border: 1px solid #e1e4e8; border-radius: 12px; box-shadow: 0 10px 40px rgba(0,0,0,0.08); overflow: visible; text-align: center; position: relative; padding-bottom: 25px; }
        .kw-lux-header { padding: 30px 20px 10px; border-radius: 12px 12px 0 0; }
        .kw-lux-headline { text-transform: uppercase; line-height: 1.1; color: #00ADEF; font-size: 2.4rem; margin: 0; }
        .kw-lux-top-line { font-family: 'Arial Black', sans-serif; font-weight: 900; display: block; letter-spacing: -1px; }
        .kw-lux-second-line { display: block; color: #0054A4; }
        .kw-lux-word-water { font-weight: 300; font-family: 'Segoe UI', sans-serif; } .kw-lux-word-score { font-family: 'Arial Black', sans-serif; font-weight: 900; letter-spacing: -1px; }
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
        .kw-lux-source-data { font-size: 9px; color: #aaa; margin-top: 10px; display: block; }
        .kw-lux-loader { color: #888; display: none; margin: 10px; font-style: italic; }
        
        @keyframes kw-fadein { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    `;

    // ==========================================================================
    // 3. TEMPLATE HTML (AVEC CLASSES ISOLÉES)
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
                <div id="kw-loader-lux" class="kw-lux-loader">Chargement...</div>
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
                    <p id="kw-verdict-desc-lux" style="font-size: 0.95em; color:#555; margin:0; line-height: 1.5;"></p>
                    <a href="${CONFIG.quoteLink}" id="kw-cta-btn-lux" class="kw-lux-cta-button">RAISE YOUR WATER SCORE TODAY!</a>
                </div>

                <div id="kw-vdl-container-lux" style="display:none; text-align: center; margin-top:20px;">
                    <p style="color:#666;">La Ville de Luxembourg possède un réseau complexe avec plusieurs sources d'eau différentes.</p>
                    <a href="${CONFIG.vdlLink}" target="_blank" class="kw-lux-redirect-btn">Vérifier mon adresse précise sur vdl.lu</a>
                </div>
            </div>

            <div class="kw-lux-footer-block">
                <div class="kw-lux-dealer-info">
                    Aqua Purify<br>Authorized, Independent Kinetico Dealer
                </div>
                <span class="kw-lux-source-data">Données : data.public.lu / Administration de la gestion de l'eau (màj 12/2025)</span>
            </div>
        </div>
    `;

    // ==========================================================================
    // 4. LOGIQUE (IDS Uniques)
    // ==========================================================================
    function initWidget() {
        const root = document.getElementById(CONFIG.containerId);
        if (!root) return;

        const styleTag = document.createElement('style');
        styleTag.textContent = css;
        document.head.appendChild(styleTag);
        root.innerHTML = htmlTemplate;

        // Elements (IDs sont tous suffixés -lux pour ne pas toucher le widget France)
        const input = document.getElementById('kw-input-lux');
        const suggestions = document.getElementById('kw-suggestions-lux');
        const loader = document.getElementById('kw-loader-lux');
        const resultPanel = document.getElementById('kw-result-lux');
        const sliderWrapper = document.getElementById('kw-slider-wrapper-lux');
        const messageStandard = document.getElementById('kw-message-standard-lux');
        const vdlContainer = document.getElementById('kw-vdl-container-lux');
        const displayCommune = document.getElementById('kw-commune-display-lux');
        const drop = document.getElementById('kw-drop-lux');
        const dropShape = document.getElementById('kw-drop-shape-lux');
        const scoreVal = document.getElementById('kw-score-val-lux');
        const verdictTitle = document.getElementById('kw-verdict-title-lux');
        const verdictDesc = document.getElementById('kw-verdict-desc-lux');
        const ctaBtn = document.getElementById('kw-cta-btn-lux');

        // Init Data
        loader.style.display = 'none';
        const communesList = Object.keys(LUX_DATA).sort();

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
                div.className = 'kw-lux-suggestion-item'; // Classe spécifique Lux
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

        function updateScoreUI(thValue) {
            const th = parseFloat(thValue);
            let score;

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
