(function() {
    // ==========================================================================
    // 1. CONFIGURATION REVENDEUR
    // ==========================================================================
    const CONFIG = {
        containerId: 'wyws-dealer-widget', // ID Unique pour éviter les conflits
        apiUrl: 'https://download.data.public.lu/resources/durete-de-leau/20251211-020257/wasserharte.geojson',
        
        // LIENS DE REDIRECTION (A personnaliser)
        linkParticulier: '/devis-particulier',      // Lien général devis
        linkCollectif: '/solutions-collectives',    // Lien Immeuble/Syndic
        linkPro: '/solutions-professionnelles',     // Lien Bureau/Commerce
        
        websiteLink: 'https://www.aquapurify.eu'
    };

    // ==========================================================================
    // 2. DONNÉES MAÎTRES (Base V41 - Quartiers + Pays)
    // ==========================================================================
    const MASTER_DATA = {
        // --- QUARTIERS VDL ---
        "Beggen": { th: 27.9, city: "Luxembourg" }, "Belair": { th: 28.8, city: "Luxembourg" },
        "Belair-Nord": { th: 28.8, city: "Luxembourg" }, "Bonnevoie-Nord": { th: 32.0, city: "Luxembourg" },
        "Verlorenkost": { th: 32.0, city: "Luxembourg" }, "Cents": { th: 27.4, city: "Luxembourg" },
        "Cessange": { th: 28.8, city: "Luxembourg" }, "Clausen": { th: 27.9, city: "Luxembourg" },
        "Dommeldange": { th: 27.9, city: "Luxembourg" }, "Eich": { th: 26.3, city: "Luxembourg" },
        "Gare": { th: 32.0, city: "Luxembourg" }, "Gasperich": { th: 23.1, city: "Luxembourg" },
        "Grund": { th: 27.4, city: "Luxembourg" }, "Hamm": { th: 27.4, city: "Luxembourg" },
        "Hollerich": { th: 31.9, city: "Luxembourg" }, "Kirchberg": { th: 27.4, city: "Luxembourg" },
        "Limpertsberg": { th: 26.3, city: "Luxembourg" }, "Merl": { th: 31.9, city: "Luxembourg" },
        "Muhlenbach": { th: 26.3, city: "Luxembourg" }, "Neudorf": { th: 27.4, city: "Luxembourg" },
        "Weimershof": { th: 27.4, city: "Luxembourg" }, "Pfaffenthal": { th: 27.9, city: "Luxembourg" },
        "Pulvermuhl": { th: 32.0, city: "Luxembourg" }, "Rollingergrund": { th: 28.8, city: "Luxembourg" },
        "Ville-Haute": { th: 28.8, city: "Luxembourg" }, "Weimerskirch": { th: 27.4, city: "Luxembourg" },

        // --- RESTE DU PAYS (Abrégé pour le chat - Le code complet V41 est inclus) ---
        "Beaufort": { th: 33, localities: ["Beaufort", "Dillingen"] },
        "Bech": { th: 31, localities: ["Bech", "Altrier", "Blumenthal", "Geyershof", "Graulinster", "Hemstal", "Hersberg", "Rippig", "Zittig"] },
        "Beckerich": { th: 19, localities: ["Beckerich", "Elvange", "Hovelange", "Huttange", "Levelange", "Noerdange", "Oberpallen", "Schweich"] },
        "Berdorf": { th: 33, localities: ["Berdorf", "Bollendorf-Pont", "Grundhof", "Kalkesbach", "Weilerbach"] },
        "Bertrange": { th: 26, localities: ["Bertrange"] },
        "Bettembourg": { th: 35, localities: ["Bettembourg", "Abweiler", "Fennange", "Huncherange", "Noertzange"] },
        "Bettendorf": { th: 21, localities: ["Bettendorf", "Gilsdorf", "Moestroff"] },
        "Betzdorf": { th: 30, localities: ["Betzdorf", "Berg", "Mensdorf", "Olingen", "Roodt-sur-Syre"] },
        "Bissen": { th: 20, localities: ["Bissen"] },
        "Biwer": { th: 29, localities: ["Biwer", "Biwerbach", "Boudler", "Boudlerbach", "Brouch", "Hagelsdorf", "Wecker", "Weydig"] },
        "Boulaide": { th: 16, localities: ["Boulaide", "Baschleiden", "Surré"] },
        "Bourscheid": { th: 19, localities: ["Bourscheid", "Goebelsmuehle", "Kehmen", "Lipperscheid", "Michelau", "Scheidel", "Schlindermanderscheid", "Welscheid"] },
        "Bous": { th: 31, localities: ["Bous", "Assel", "Erpeldange", "Rolling"] },
        "Clervaux": { th: 18, localities: ["Clervaux", "Drauffelt", "Eselborn", "Fischbach", "Grindhausen", "Heinerscheid", "Hupperdange", "Kalborn", "Lieler", "Marnach", "Munshausen", "Reuler", "Roder", "Siebenaler", "Urspelt", "Weicherdange"] },
        "Colmar-Berg": { th: 20, localities: ["Colmar-Berg"] },
        "Consdorf": { th: 34, localities: ["Consdorf", "Breidweiler", "Colbette", "Marscherwald", "Scheidgen"] },
        "Contern": { th: 26, localities: ["Contern", "Medingen", "Moutfort", "Oetrange"] },
        "Dalheim": { th: 32, localities: ["Dalheim", "Filsdorf", "Welfrange"] },
        "Diekirch": { th: 20, localities: ["Diekirch"] },
        "Differdange": { th: 36, localities: ["Differdange", "Lasauvage", "Niederkorn", "Oberkorn"] },
        "Dippach": { th: 33, localities: ["Dippach", "Bettange-sur-Mess", "Schouweiler", "Sprinkange"] },
        "Dudelange": { th: 35, localities: ["Dudelange"] },
        "Echternach": { th: 30, localities: ["Echternach"] },
        "Ell": { th: 21, localities: ["Ell", "Colpach-Bas", "Colpach-Haut", "Petit-Nobressart", "Roodt"] },
        "Erpeldange-sur-Sûre": { th: 20, localities: ["Erpeldange-sur-Sûre", "Burden", "Ingeldorf"] },
        "Esch-sur-Alzette": { th: 35, localities: ["Esch-sur-Alzette"] },
        "Esch-sur-Sûre": { th: 14, localities: ["Esch-sur-Sûre", "Eschdorf", "Heiderscheid", "Heiderscheidergrund", "Hierheck", "Merscheid", "Ringel", "Tadler"] },
        "Ettelbruck": { th: 20, localities: ["Ettelbruck", "Warken"] },
        "Feulen": { th: 20, localities: ["Niederfeulen", "Oberfeulen"] },
        "Fischbach": { th: 20, localities: ["Fischbach", "Angelsberg", "Koedange", "Schoos", "Stuppicht", "Weyer"] },
        "Flaxweiler": { th: 30, localities: ["Flaxweiler", "Beyren", "Gostingen", "Niederdonven", "Oberdonven"] },
        "Frisange": { th: 33, localities: ["Frisange", "Aspelt", "Hellange"] },
        "Garnich": { th: 32, localities: ["Garnich", "Dahlem", "Hivange", "Kahler"] },
        "Goesdorf": { th: 19, localities: ["Goesdorf", "Bockholtz", "Buderscheid", "Dahl", "Dirbach", "Masseler", "Nocher", "Nocher-Route"] },
        "Grevenmacher": { th: 33, localities: ["Grevenmacher"] },
        "Grosbous": { th: 20, localities: ["Grosbous", "Dellen"] },
        "Heffingen": { th: 28, localities: ["Heffingen", "Reuland"] },
        "Helperknapp": { th: 20, localities: ["Boevange-sur-Attert", "Ansembourg", "Bill", "Bour", "Brouch", "Buschdorf", "Finsterthal", "Grevenknapp", "Hollenfels", "Marienthal", "Openthalt", "Tuntange"] },
        "Hesperange": { th: 33, localities: ["Hesperange", "Alzingen", "Fentange", "Howald", "Itzig"] },
        "Habscht": { th: 32, localities: ["Hobscheid", "Eischen", "Greisch", "Roodt-sur-Eisch", "Septfontaines"] },
        "Junglinster": { th: 29, localities: ["Junglinster", "Altlinster", "Beidweiler", "Blumenthal", "Bourglinster", "Eisenborn", "Eschweiler", "Godbrange", "Gonderange", "Graulinster", "Imbringen", "Rodenbourg"] },
        "Käerjeng": { th: 35, localities: ["Bascharage", "Clemency", "Fingig", "Hautcharage", "Linger"] },
        "Kayl": { th: 35, localities: ["Kayl", "Tétange"] },
        "Kehlen": { th: 32, localities: ["Kehlen", "Dondelange", "Keispelt", "Meispelt", "Nospelt", "Olm"] },
        "Kiischpelt": { th: 19, localities: ["Kautenbach", "Alscheid", "Enscherange", "Lellingen", "Merkholtz", "Pintsch", "Wilwerwiltz"] },
        "Koerich": { th: 32, localities: ["Koerich", "Goeblange", "Goetzingen", "Windhof"] },
        "Kopstal": { th: 32, localities: ["Kopstal", "Bridel"] },
        "Lac de la Haute-Sûre": { th: 15, localities: ["Bavigne", "Harlange", "Kaundorf", "Liefrange", "Mecher", "Nothum", "Tarchamps", "Watrange"] },
        "Larochette": { th: 28, localities: ["Larochette", "Ernzen"] },
        "Lenningen": { th: 31, localities: ["Lenningen", "Canach"] },
        "Leudelange": { th: 32, localities: ["Leudelange"] },
        "Lintgen": { th: 20, localities: ["Lintgen", "Gosseldange", "Prettingen"] },
        "Lorentzweiler": { th: 20, localities: ["Lorentzweiler", "Blaschette", "Bofferdange", "Helmdange", "Hunsdorf"] },
        "Mamer": { th: 32, localities: ["Mamer", "Capellen", "Holzem"] },
        "Manternach": { th: 30, localities: ["Manternach", "Berbourg", "Lellig", "Munschecker"] },
        "Mersch": { th: 21, localities: ["Mersch", "Beringen", "Berschbach", "Moesdorf", "Pettingen", "Reckange", "Rollingen", "Schoenfels"] },
        "Mertert": { th: 31, localities: ["Mertert", "Wasserbillig"] },
        "Mertzig": { th: 19, localities: ["Mertzig"] },
        "Mondercange": { th: 34, localities: ["Mondercange", "Bergem", "Foetz", "Pontpierre"] },
        "Mondorf-les-Bains": { th: 33, localities: ["Mondorf-les-Bains", "Altwies", "Ellange"] },
        "Niederanven": { th: 26, localities: ["Niederanven", "Ernster", "Hostert", "Oberanven", "Rameldange", "Senningen", "Senningerberg", "Waldhof"] },
        "Nommern": { th: 28, localities: ["Nommern", "Cruchten", "Schrondweiler"] },
        "Parc Hosingen": { th: 19, localities: ["Hosingen", "Bockholtz", "Consthum", "Dorscheid", "Holzthum", "Hoscheid", "Hoscheid-Dickt", "Neidhausen", "Oberschlinder", "Rodershausen", "Unterschlinder", "Wahlhausen"] },
        "Pétange": { th: 36, localities: ["Pétange", "Lamadelaine", "Rodange"] },
        "Préizerdaul": { th: 20, localities: ["Bettborn", "Platen", "Pratz", "Reimberg"] },
        "Putscheid": { th: 19, localities: ["Putscheid", "Bivels", "Gralingen", "Merscheid", "Nachtmanderscheid", "Stolzembourg", "Weiler"] },
        "Rambrouch": { th: 20, localities: ["Rambrouch", "Arsdorf", "Bigonville", "Bilsdorf", "Eschette", "Folschette", "Haut-Martelange", "Holtz", "Hostert", "Koetschette", "Perlé", "Rombach", "Schwiedelbrouch", "Wolwelange"] },
        "Reckange-sur-Mess": { th: 33, localities: ["Reckange-sur-Mess", "Ehlange", "Limpach", "Pissange", "Roedgen", "Wickrange"] },
        "Redange-sur-Attert": { th: 20, localities: ["Redange-sur-Attert", "Eltz", "Lannen", "Nagem", "Niederpallen", "Ospern", "Reichlange"] },
        "Reisdorf": { th: 20, localities: ["Reisdorf", "Bigelbach", "Hoesdorf", "Wallendorf-Pont"] },
        "Remich": { th: 12, localities: ["Remich"] },
        "Roeser": { th: 34, localities: ["Roeser", "Berchem", "Bivange", "Crauthem", "Kockelscheuer", "Livange", "Peppange"] },
        "Rosport-Mompach": { th: 30, localities: ["Rosport", "Born", "Dickweiler", "Girst", "Girsterklaus", "Hinkel", "Mompach", "Moersdorf", "Osweiler", "Steinheim"] },
        "Rumelange": { th: 35, localities: ["Rumelange"] },
        "Saeul": { th: 20, localities: ["Saeul", "Calmus", "Ehner", "Kapweiler", "Schwebach"] },
        "Sandweiler": { th: 26, localities: ["Sandweiler"] },
        "Sanem": { th: 35, localities: ["Sanem", "Belvaux", "Ehlerange", "Soleuvre"] },
        "Schengen": { th: 33, localities: ["Schengen", "Bech-Kleinmacher", "Burmerange", "Elvange", "Emerange", "Remerschen", "Schwebsange", "Wellenstein", "Wintrange"] },
        "Schieren": { th: 20, localities: ["Schieren"] },
        "Schifflange": { th: 35, localities: ["Schifflange"] },
        "Schuttrange": { th: 26, localities: ["Schuttrange", "Munsbach", "Neuhaeusgen", "Schrassig", "Uebersyren"] },
        "Stadtbredimus": { th: 32, localities: ["Stadtbredimus", "Greiveldange"] },
        "Steinfort": { th: 32, localities: ["Steinfort", "Grass", "Hagen", "Kleinbettingen"] },
        "Steinsel": { th: 20, localities: ["Steinsel", "Heisdorf", "Mullendorf"] },
        "Strassen": { th: 32, localities: ["Strassen"] },
        "Tandel": { th: 19, localities: ["Tandel", "Bastendorf", "Bettel", "Brandenbourg", "Fouhren", "Landscheid", "Longsdorf", "Walsdorf"] },
        "Troisvierges": { th: 18, localities: ["Troisvierges", "Basbellain", "Biwisch", "Drinklange", "Goedange", "Hautbellain", "Huldange", "Wilwerdange"] },
        "Useldange": { th: 20, localities: ["Useldange", "Everlange", "Rippweiler", "Schandel"] },
        "Vallée de l'Ernz": { th: 30, localities: ["Medernach", "Eppeldorf", "Ermsdorf", "Folkendange", "Stegen"] },
        "Vianden": { th: 19, localities: ["Vianden"] },
        "Vichten": { th: 20, localities: ["Vichten", "Michelbouch"] },
        "Wahl": { th: 20, localities: ["Wahl", "Buschrodt", "Grevels", "Heispelt", "Kuborn", "Rindschleiden"] },
        "Waldbillig": { th: 31, localities: ["Waldbillig", "Christnach", "Freckeisen", "Haller"] },
        "Waldbredimus": { th: 31, localities: ["Waldbredimus", "Ersange", "Roedt", "Trintange"] },
        "Walferdange": { th: 22, localities: ["Walferdange", "Bereldange", "Helmsange"] },
        "Weiler-la-Tour": { th: 28, localities: ["Weiler-la-Tour", "Hassel", "Syren"] },
        "Weiswampach": { th: 18, localities: ["Weiswampach", "Beiler", "Binsfeld", "Breidfeld", "Holler", "Leithum"] },
        "Wiltz": { th: 19, localities: ["Wiltz", "Eschweiler", "Erpeldange", "Knaphoscheid", "Roullingen", "Selscheid", "Weidingen"] },
        "Wincrange": { th: 19, localities: ["Wincrange", "Asselborn", "Boevange", "Boxhorn", "Brachtenbach", "Deiffelt", "Derenbach", "Doennange", "Hachiville", "Hamiville", "Hoffelt", "Lullange", "Niederwampach", "Oberwampach", "Rumlange", "Sassel", "Stockem", "Troine", "Troine-Route"] },
        "Winseler": { th: 19, localities: ["Winseler", "Berlé", "Doncols", "Groumelscheid", "Noertrange", "Pommerloch", "Schleif", "Soller"] },
        "Wormeldange": { th: 32, localities: ["Wormeldange", "Ahn", "Dreiborn", "Ehnen", "Machtum"] }
    };

    // ==========================================================================
    // 3. CSS ISOLÉ (Namespace .kw-dealer-)
    // ==========================================================================
    const css = `
        #wyws-dealer-widget { font-family: 'Segoe UI', Arial, sans-serif; max-width: 650px; margin: 30px auto; background: #fff; border: 1px solid #e1e4e8; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); overflow: visible; text-align: center; position: relative; padding-bottom: 25px; }
        .kw-dealer-header { padding: 30px 20px 10px; border-radius: 12px 12px 0 0; background: #f8f9fa; border-bottom: 1px solid #eee; margin-bottom: 20px; }
        .kw-dealer-headline { text-transform: uppercase; line-height: 1.1; color: #0054A4; font-size: 1.8rem; margin: 0; font-weight: 800; }
        .kw-dealer-subtext { color: #666; margin-top: 5px; font-size: 0.95rem; }
        
        .kw-dealer-search-area { padding: 0 30px 15px; position: relative; }
        .kw-dealer-input { width: 100%; padding: 15px; border: 2px solid #ddd; border-radius: 8px; font-size: 16px; outline: none; transition: 0.3s; box-sizing: border-box; }
        .kw-dealer-input:focus { border-color: #0054A4; box-shadow: 0 0 0 3px rgba(0, 84, 164, 0.1); }
        
        .kw-dealer-suggestions { position: absolute; top: 65px; left: 30px; right: 30px; background: white; border: 1px solid #cce4f7; z-index: 9999; max-height: 250px; overflow-y: auto; box-shadow: 0 15px 30px rgba(0,0,0,0.15); display: none; border-radius: 8px; text-align: left; }
        .kw-dealer-suggestion-item { padding: 12px 15px; cursor: pointer; border-bottom: 1px solid #f0f0f0; }
        .kw-dealer-suggestion-item:hover { background: #f0f7ff; color: #0054A4; }
        .kw-dealer-locality-hint { font-size: 0.85em; color: #888; margin-left: 8px; font-style: italic; }

        .kw-dealer-result-panel { padding: 0 20px 10px; animation: kw-fadein 0.6s ease-out; }
        .kw-dealer-commune-title { font-size: 1.3rem; font-weight: bold; color: #333; margin: 10px 0; }
        .kw-dealer-th-display { font-size: 2.5rem; font-weight: 900; color: #00ADEF; margin: 10px 0; }
        .kw-dealer-th-unit { font-size: 1rem; color: #666; font-weight: 400; }

        .kw-dealer-step-2 { background: #f0f7ff; padding: 20px; border-radius: 8px; margin-top: 20px; border: 1px solid #cce4f7; text-align: left; }
        .kw-dealer-label { display: block; font-weight: bold; margin-bottom: 8px; color: #0054A4; }
        .kw-dealer-select { width: 100%; padding: 12px; border: 1px solid #0054A4; border-radius: 5px; font-size: 16px; background: white; cursor: pointer; }

        .kw-dealer-rec-box { background: #fff; border: 2px solid #E5007E; border-radius: 8px; padding: 20px; margin-top: 20px; text-align: center; box-shadow: 0 4px 15px rgba(229,0,126,0.1); }
        .kw-dealer-rec-title { display: block; text-transform: uppercase; font-size: 0.85em; color: #666; letter-spacing: 1px; margin-bottom: 5px; }
        .kw-dealer-product-name { display: block; font-size: 1.6rem; font-weight: 900; color: #E5007E; margin-bottom: 10px; font-family: 'Arial Black', sans-serif; }
        .kw-dealer-desc { color: #555; line-height: 1.5; font-size: 0.95em; margin-bottom: 15px; }
        .kw-dealer-btn { display: inline-block; background: #0054A4; color: white; text-decoration: none; padding: 12px 30px; border-radius: 50px; font-weight: bold; transition: 0.3s; }
        .kw-dealer-btn:hover { background: #003d7a; transform: translateY(-2px); }

        .kw-dealer-loader { color: #888; display: none; margin: 10px; font-style: italic; font-size: 0.9em; }
        @keyframes kw-fadein { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    `;

    // ==========================================================================
    // 3. HTML TEMPLATE
    // ==========================================================================
    const htmlTemplate = `
        <div id="wyws-dealer-widget">
            <div class="kw-dealer-header">
                <h2 class="kw-dealer-headline">OUTIL REVENDEUR</h2>
                <div class="kw-dealer-subtext">Diagnostic de dureté & Recommandation Kinetico</div>
            </div>

            <div class="kw-dealer-search-area">
                <input type="text" id="kw-dealer-input" class="kw-dealer-input" placeholder="Rechercher une localité..." autocomplete="off">
                <div id="kw-dealer-suggestions" class="kw-dealer-suggestions"></div>
                <div id="kw-dealer-loader" class="kw-dealer-loader">Mise à jour des données...</div>
            </div>

            <div id="kw-dealer-result" class="kw-dealer-result-panel" style="display:none;">
                <div id="kw-dealer-commune" class="kw-dealer-commune-title"></div>
                <div class="kw-dealer-th-display">
                    <span id="kw-dealer-val">--</span>
                    <span class="kw-dealer-th-unit">°f (Dureté)</span>
                </div>

                <div class="kw-dealer-step-2">
                    <label class="kw-dealer-label">Type de projet :</label>
                    <select id="kw-dealer-type" class="kw-dealer-select">
                        <option value="" disabled selected>-- Choisir --</option>
                        <option value="appt">Appartement</option>
                        <option value="maison">Maison Unifamiliale</option>
                        <option value="collectif">Immeuble Collectif (Syndic)</option>
                        <option value="pro">Bureau / Commerce / Horeca</option>
                    </select>
                </div>

                <div id="kw-dealer-rec" class="kw-dealer-rec-box" style="display:none;">
                    <span class="kw-dealer-rec-title">SOLUTION RECOMMANDÉE</span>
                    <span id="kw-dealer-prod" class="kw-dealer-product-name"></span>
                    <div id="kw-dealer-desc" class="kw-dealer-desc"></div>
                    <a href="#" id="kw-dealer-link" class="kw-dealer-btn" target="_blank">Accéder à l'offre</a>
                </div>
            </div>
        </div>
    `;

    // ==========================================================================
    // 4. LOGIQUE JS
    // ==========================================================================
    function initWidget() {
        const root = document.getElementById(CONFIG.containerId);
        if (!root) return;

        const styleTag = document.createElement('style');
        styleTag.textContent = css;
        document.head.appendChild(styleTag);
        root.innerHTML = htmlTemplate;

        // Elements
        const input = document.getElementById('kw-dealer-input');
        const suggestions = document.getElementById('kw-dealer-suggestions');
        const loader = document.getElementById('kw-dealer-loader');
        const resultPanel = document.getElementById('kw-dealer-result');
        const displayCommune = document.getElementById('kw-dealer-commune');
        const displayVal = document.getElementById('kw-dealer-val');
        const typeSelect = document.getElementById('kw-dealer-type');
        const recBox = document.getElementById('kw-dealer-rec');
        const prodName = document.getElementById('kw-dealer-prod');
        const prodDesc = document.getElementById('kw-dealer-desc');
        const linkBtn = document.getElementById('kw-dealer-link');

        let searchIndex = [];
        let currentTH = 0;

        // --- DATA LOADING (Même logique robuste que V41) ---
        function buildSearchIndex() {
            searchIndex = [];
            Object.entries(MASTER_DATA).forEach(([commune, data]) => {
                if (data.city === "Luxembourg") {
                    searchIndex.push({ displayName: `${commune} (Luxembourg)`, searchName: `${commune.toLowerCase()} luxembourg`, commune: commune, th: data.th, isLocality: true });
                    searchIndex.push({ displayName: `Luxembourg (${commune})`, searchName: `luxembourg ${commune.toLowerCase()}`, commune: commune, th: data.th, isLocality: true });
                } else {
                    searchIndex.push({ displayName: commune, searchName: commune.toLowerCase(), commune: commune, th: data.th, isLocality: false });
                    if (data.localities) {
                        data.localities.forEach(loc => {
                            if (loc.toLowerCase() !== commune.toLowerCase()) {
                                searchIndex.push({ displayName: loc, searchName: loc.toLowerCase(), commune: commune, th: data.th, isLocality: true });
                            }
                        });
                    }
                }
            });
            searchIndex.sort((a, b) => a.displayName.localeCompare(b.displayName, 'fr'));
        }

        async function loadData() {
            buildSearchIndex();
            try {
                const response = await fetch(CONFIG.apiUrl);
                if (!response.ok) return;
                const geoData = await response.json();
                if (!geoData.features) return;
                
                const props = geoData.features[0].properties;
                const keys = Object.keys(props);
                const keyName = keys.find(k => k.toLowerCase().includes('commune'));
                const keyVal = keys.find(k => k.toLowerCase().includes('wsz') || k.toLowerCase().includes('durete'));
                if (!keyName || !keyVal) return;

                const lookup = {};
                Object.keys(MASTER_DATA).forEach(k => lookup[k.toLowerCase().trim()] = k);
                let updates = 0;

                geoData.features.forEach(f => {
                    const n = f.properties[keyName];
                    const v = f.properties[keyVal];
                    if (n && typeof n === 'string') {
                        const clean = n.trim().toLowerCase();
                        const realKey = lookup[clean];
                        const val = parseFloat(v);
                        if (realKey && MASTER_DATA[realKey] && !isNaN(val)) {
                            MASTER_DATA[realKey].th = val;
                            updates++;
                        }
                    }
                });
                if (updates > 0) buildSearchIndex();
                loader.style.display = 'none';
            } catch (e) { console.warn(e); }
        }

        // --- SEARCH ENGINE ---
        input.addEventListener('input', (e) => {
            const val = e.target.value.toLowerCase();
            if (val.length < 2) { 
                suggestions.style.display = 'none'; 
                if (val.length === 0) { resultPanel.style.display = 'none'; typeSelect.value = ""; }
                return; 
            }
            const matches = searchIndex.filter(i => i.searchName.includes(val)).slice(0, 10);
            suggestions.innerHTML = '';
            if (!matches.length) { suggestions.style.display = 'none'; return; }

            matches.forEach(item => {
                const div = document.createElement('div');
                div.className = 'kw-dealer-suggestion-item';
                if (item.isLocality && !item.displayName.includes('(')) {
                    div.innerHTML = `${item.displayName} <span class="kw-dealer-locality-hint">(${item.commune})</span>`;
                } else {
                    div.textContent = item.displayName;
                }
                div.onclick = () => {
                    input.value = item.displayName;
                    suggestions.style.display = 'none';
                    processSelection(item);
                };
                suggestions.appendChild(div);
            });
            suggestions.style.display = 'block';
        });

        // --- SELECTION & LOGIC ---
        function processSelection(item) {
            currentTH = item.th;
            displayCommune.textContent = item.displayName;
            displayVal.textContent = currentTH.toFixed(1);
            
            // Reset Step 2
            typeSelect.value = "";
            recBox.style.display = 'none';
            resultPanel.style.display = 'block';
        }

        // --- LOGIQUE METIER (RECOMMANDATION) ---
        typeSelect.addEventListener('change', function() {
            const type = this.value;
            if(!type) return;

            let name = "";
            let desc = "";
            let url = CONFIG.linkParticulier; // Default fallback

            if (type === 'appt') {
                if (currentTH <= 40) {
                    name = "Kinetico Premier Compact XP";
                    desc = `Idéal pour appartement avec dureté modérée (< 40°f).<br>Design ultra-compact, s'installe partout.`;
                } else {
                    name = "Kinetico Premier Plus XP";
                    desc = `Recommandé car dureté élevée (> 40°f).<br>Volume de résine supérieur nécessaire pour protéger l'appartement.`;
                }
            } 
            else if (type === 'maison') {
                name = "Kinetico Premier Plus XP";
                desc = `La solution de référence pour maison unifamiliale.<br>Débit élevé, protection totale 24/24h.`;
            } 
            else if (type === 'collectif') {
                name = "Solution Collective / Syndic";
                desc = "Dimensionnement sur mesure requis pour immeuble.";
                url = CONFIG.linkCollectif;
            } 
            else if (type === 'pro') {
                name = "Gamme Pro / Horeca";
                desc = "Protection des équipements professionnels (Fours, Lave-vaisselle...).";
                url = CONFIG.linkPro;
            }

            prodName.textContent = name;
            prodDesc.innerHTML = desc;
            linkBtn.href = url;
            
            recBox.style.display = 'block';
            recBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });

        document.addEventListener('click', (e) => {
            if (input && suggestions && !input.contains(e.target) && !suggestions.contains(e.target)) {
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
