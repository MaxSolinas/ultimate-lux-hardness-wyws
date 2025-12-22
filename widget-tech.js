(function() {
    // ==========================================================================
    // 1. CONFIGURATION
    // ==========================================================================
    const CONFIG = {
        containerId: 'wyws-tech-widget',
        apiUrl: 'https://download.data.public.lu/resources/durete-de-leau/20251211-020257/wasserharte.geojson'
    };

    // ==========================================================================
    // 2. DONNÉES DE RÉGLAGES (Notation Kinetico Exacte : A, A*, B...)
    // ==========================================================================
    
    // Premier Compact XP (PCXP)
    const SETTINGS_PCXP = [
        { max: 11, disc: "A", vol: 1420 },
        { max: 11.5, disc: "B", vol: 1328 },
        { max: 12.3, disc: "C", vol: 1235 },
        { max: 13.2, disc: "D", vol: 1143 },
        { max: 14.3, disc: "E", vol: 1051 },
        { max: 16, disc: "F", vol: 958 },
        { max: 17.1, disc: "G", vol: 866 },
        { max: 19.1, disc: "H", vol: 773 },
        { max: 21.5, disc: "I", vol: 681 },
        { max: 23, disc: "I*", vol: 635 }, // Notation *
        { max: 25, disc: "J", vol: 589 },
        { max: 27, disc: "J*", vol: 543 }, // Notation *
        { max: 29, disc: "K", vol: 496 },
        { max: 32, disc: "K*", vol: 450 }, // Notation *
        { max: 35, disc: "L", vol: 404 },
        { max: 39, disc: "L*", vol: 358 }, // Notation *
        { max: 45, disc: "M", vol: 312 },
        { max: 52, disc: "M*", vol: 266 }  // Notation *
    ];

    // Premier Plus XP (PPXP) - Réglage 0.56 kg
    const SETTINGS_PPXP = [
        { max: 21, disc: "A", vol: 1583 },
        { max: 22, disc: "B", vol: 1480 },
        { max: 24, disc: "C", vol: 1377 },
        { max: 26, disc: "D", vol: 1274 },
        { max: 28, disc: "E", vol: 1171 },
        { max: 30, disc: "F", vol: 1068 },
        { max: 34, disc: "G", vol: 965 },
        { max: 38, disc: "H", vol: 862 },
        { max: 43, disc: "I", vol: 759 },
        { max: 46, disc: "I*", vol: 708 }, // Notation *
        { max: 49, disc: "J", vol: 656 },
        { max: 53, disc: "J*", vol: 605 }, // Notation *
        { max: 58, disc: "K", vol: 553 },
        { max: 64, disc: "K*", vol: 502 }, // Notation *
        { max: 69, disc: "L", vol: 450 },
        { max: 77, disc: "L*", vol: 399 }, // Notation *
        { max: 88, disc: "M", vol: 347 },
        { max: 102, disc: "M*", vol: 224 } // Notation *
    ];

    // ==========================================================================
    // 3. DONNÉES VILLES (Base V50 Secure)
    // ==========================================================================
    const MASTER_DATA = {
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
        "Remich": { th: 12, localities: ["Remich"] },
        "Mondorf-les-Bains": { th: 33, localities: ["Mondorf-les-Bains", "Altwies", "Ellange"] },
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
    // 3. CSS ISOLÉ
    // ==========================================================================
    const css = `
        #wyws-tech-widget { font-family: 'Segoe UI', Arial, sans-serif; max-width: 500px; margin: 20px auto; background: #222; color: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.3); }
        .kw-tech-header { background: #E5007E; padding: 15px; text-align: center; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; }
        
        .kw-tech-body { padding: 20px; }
        
        .kw-tech-input-group { margin-bottom: 20px; position: relative; }
        .kw-tech-label { display: block; font-size: 0.85em; color: #aaa; margin-bottom: 5px; text-transform: uppercase; }
        .kw-tech-input, .kw-tech-select { width: 100%; padding: 12px; background: #333; border: 1px solid #444; color: #fff; border-radius: 4px; font-size: 16px; box-sizing: border-box; }
        .kw-tech-input:focus, .kw-tech-select:focus { border-color: #E5007E; outline: none; }
        
        /* Suggestions */
        .kw-tech-suggestions { position: absolute; top: 70px; left: 0; right: 0; background: #333; border: 1px solid #444; z-index: 100; max-height: 200px; overflow-y: auto; display: none; }
        .kw-tech-item { padding: 12px; cursor: pointer; border-bottom: 1px solid #444; }
        .kw-tech-item:hover { background: #444; }

        /* Result Box */
        .kw-tech-result-box { background: #333; border-radius: 6px; padding: 15px; margin-top: 20px; border: 1px solid #444; display: none; }
        .kw-tech-res-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; border-bottom: 1px solid #444; padding-bottom: 10px; }
        .kw-tech-th-big { font-size: 2.5em; font-weight: bold; color: #00ADEF; }
        .kw-tech-th-label { font-size: 0.9em; color: #aaa; text-align: right; }
        
        .kw-tech-settings { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .kw-tech-setting-item { background: #222; padding: 10px; border-radius: 4px; text-align: center; }
        .kw-tech-set-label { display: block; font-size: 0.8em; color: #888; margin-bottom: 5px; }
        .kw-tech-set-val { display: block; font-size: 1.4em; font-weight: bold; color: #fff; }
        .kw-tech-set-val-sm { font-size: 1em; color: #ccc; }

        .kw-tech-loader { color: #888; font-style: italic; font-size: 0.8em; margin-top: 5px; display: none; }
    `;

    // ==========================================================================
    // 4. HTML TEMPLATE
    // ==========================================================================
    const htmlTemplate = `
        <div id="wyws-tech-widget">
            <div class="kw-tech-header">Kinetico Tech Assist</div>
            <div class="kw-tech-body">
                
                <div class="kw-tech-input-group">
                    <label class="kw-tech-label">1. Localité / Commune</label>
                    <input type="text" id="kw-tech-search" class="kw-tech-input" placeholder="Rechercher..." autocomplete="off">
                    <div id="kw-tech-suggestions" class="kw-tech-suggestions"></div>
                    <div id="kw-tech-loader" class="kw-tech-loader">Mise à jour données...</div>
                </div>

                <div class="kw-tech-input-group">
                    <label class="kw-tech-label">2. Modèle Kinetico</label>
                    <select id="kw-tech-model" class="kw-tech-select">
                        <option value="" disabled selected>-- Choisir --</option>
                        <option value="PCXP">Premier Compact XP</option>
                        <option value="PPXP">Premier Plus XP</option>
                    </select>
                </div>

                <div id="kw-tech-result" class="kw-tech-result-box">
                    <div class="kw-tech-res-header">
                        <div class="kw-tech-th-big" id="kw-disp-th">--</div>
                        <div class="kw-tech-th-label">
                            Dureté<br>
                            <span id="kw-disp-city" style="color:#fff; font-weight:bold;">--</span>
                        </div>
                    </div>
                    
                    <div class="kw-tech-settings">
                        <div class="kw-tech-setting-item">
                            <span class="kw-tech-set-label">DISQUE / RÉGLAGE</span>
                            <span class="kw-tech-set-val" id="kw-res-disc" style="color:#E5007E;">--</span>
                        </div>
                        <div class="kw-tech-setting-item">
                            <span class="kw-tech-set-label">VOLUME (L)</span>
                            <span class="kw-tech-set-val" id="kw-res-vol">--</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    `;

    // ==========================================================================
    // 5. LOGIQUE
    // ==========================================================================
    function initWidget() {
        const root = document.getElementById(CONFIG.containerId);
        if (!root) return;
        
        const style = document.createElement('style');
        style.textContent = css;
        document.head.appendChild(style);
        root.innerHTML = htmlTemplate;

        // Elements
        const inputSearch = document.getElementById('kw-tech-search');
        const suggestions = document.getElementById('kw-tech-suggestions');
        const loader = document.getElementById('kw-tech-loader');
        const inputModel = document.getElementById('kw-tech-model');
        const resultBox = document.getElementById('kw-tech-result');
        
        const dispTH = document.getElementById('kw-disp-th');
        const dispCity = document.getElementById('kw-disp-city');
        const resDisc = document.getElementById('kw-res-disc');
        const resVol = document.getElementById('kw-res-vol');

        let searchIndex = [];
        let currentTH = 0;

        // --- DATA BUILD ---
        function buildSearchIndex() {
            searchIndex = [];
            Object.entries(MASTER_DATA).forEach(([commune, data]) => {
                if (data.city === "Luxembourg") {
                    searchIndex.push({ name: `${commune} (Luxembourg)`, search: `${commune.toLowerCase()} luxembourg`, th: data.th });
                    searchIndex.push({ name: `Luxembourg (${commune})`, search: `luxembourg ${commune.toLowerCase()}`, th: data.th });
                } else {
                    searchIndex.push({ name: commune, search: commune.toLowerCase(), th: data.th });
                    if (data.localities) {
                        data.localities.forEach(loc => {
                            if (loc.toLowerCase() !== commune.toLowerCase()) {
                                searchIndex.push({ name: `${loc} (${commune})`, search: loc.toLowerCase(), th: data.th });
                            }
                        });
                    }
                }
            });
            searchIndex.sort((a,b) => a.name.localeCompare(b.name));
        }

        async function loadData() {
            buildSearchIndex();
            try {
                const response = await fetch(CONFIG.apiUrl);
                if (!response.ok) return;
                const geoData = await response.json();
                if (!geoData.features) return;
                
                // Logic V50 Secure applied
                const props = geoData.features[0].properties;
                const keys = Object.keys(props);
                const keyName = keys.find(k => k.toLowerCase().includes('commune'));
                const keyVal = keys.find(k => k.toLowerCase().includes('wsz') || k.toLowerCase().includes('durete'));
                
                if(!keyName || !keyVal) return;
                const lookup = {};
                Object.keys(MASTER_DATA).forEach(k => lookup[k.toLowerCase().trim()] = k);

                let updates = 0;
                geoData.features.forEach(f => {
                    const n = f.properties[keyName];
                    const v = f.properties[keyVal];
                    if(n && typeof n === 'string') {
                        const clean = n.trim().toLowerCase();
                        const realKey = lookup[clean];
                        const val = parseFloat(v);
                        if(realKey && MASTER_DATA[realKey] && !isNaN(val) && val > 0.1) {
                            MASTER_DATA[realKey].th = Math.max(MASTER_DATA[realKey].th, val);
                            updates++;
                        }
                    }
                });
                if(updates > 0) buildSearchIndex();
            } catch(e) { console.warn(e); }
        }

        // --- UI LOGIC ---
        inputSearch.addEventListener('input', (e) => {
            const val = e.target.value.toLowerCase();
            if(val.length < 2) { suggestions.style.display = 'none'; return; }
            const matches = searchIndex.filter(i => i.search.includes(val)).slice(0, 10);
            suggestions.innerHTML = '';
            if(!matches.length) { suggestions.style.display = 'none'; return; }

            matches.forEach(item => {
                const div = document.createElement('div');
                div.className = 'kw-tech-item';
                div.textContent = item.name;
                div.onclick = () => {
                    inputSearch.value = item.name;
                    suggestions.style.display = 'none';
                    currentTH = item.th;
                    updateResult();
                };
                suggestions.appendChild(div);
            });
            suggestions.style.display = 'block';
        });

        function updateResult() {
            if(!currentTH) { resultBox.style.display = 'none'; return; }
            
            const model = inputModel.value;
            resultBox.style.display = 'block';
            
            // Display TH rounded
            const thRounded = Math.round(currentTH);
            dispTH.textContent = `${thRounded}°f`;
            dispCity.textContent = inputSearch.value;

            if(!model) {
                resDisc.textContent = "--";
                resVol.textContent = "--";
                return;
            }

            // FIND SETTING
            const settingsArray = (model === 'PCXP') ? SETTINGS_PCXP : SETTINGS_PPXP;
            
            // Find first setting where thRounded <= max
            const found = settingsArray.find(s => thRounded <= s.max);
            
            if(found) {
                resDisc.textContent = found.disc;
                resVol.textContent = found.vol;
            } else {
                resDisc.textContent = "Hors Chartes";
                resVol.textContent = "Contactez Support";
            }
        }

        inputModel.addEventListener('change', updateResult);

        document.addEventListener('click', (e) => {
            if(inputSearch && !inputSearch.contains(e.target) && !suggestions.contains(e.target)) {
                suggestions.style.display = 'none';
            }
        });

        loadData();
    }

    // Loader safe
    let attempts = 0;
    const interval = setInterval(() => {
        if(document.getElementById(CONFIG.containerId)) {
            clearInterval(interval);
            initWidget();
        }
        if(++attempts > 30) clearInterval(interval);
    }, 300);
})();
