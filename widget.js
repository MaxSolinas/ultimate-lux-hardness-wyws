(function() {
    // ==========================================================================
    // 1. CONFIGURATION (WIDGET PUBLIC AVEC ROI + RECOMMANDATION)
    // ==========================================================================
    const CONFIG = {
        containerId: 'wyws-luxembourg-widget',
        apiUrl: 'https://download.data.public.lu/resources/durete-de-leau/20251211-020257/wasserharte.geojson',
        quoteLink: 'https://www.aquapurify.lu/get-a-quote',
        websiteLink: 'https://www.aquapurify.lu',
        // Liens produits spécifiques
        productCompactXP: 'https://www.aquapurify.lu/shop/adoucisseurs-deau-11/adoucisseur-kinetico-premier-compact-xp-2008?attribute_values=62%2C58%2C52',
        productPlusXP: 'https://www.aquapurify.lu/shop/adoucisseurs-deau-11/adoucisseur-kinetico-premier-plus-xp-2010?attribute_values=52%2C58%2C62'
    };

    // ==========================================================================
    // 2. DONNÉES MAÎTRES (Synchronisées)
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
    // 3. CSS ISOLÉ (COULEURS CORRIGÉES)
    // ==========================================================================
    const css = `
        #wyws-luxembourg-container { font-family: 'Segoe UI', Arial, sans-serif; max-width: 650px; margin: 30px auto; background: #fff; border: 1px solid #e1e4e8; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); overflow: visible; text-align: center; position: relative; padding-bottom: 25px; }
        .kw-lux-header { padding: 30px 20px 10px; border-radius: 12px 12px 0 0; }
        .kw-lux-headline { text-transform: uppercase; line-height: 1.1; color: #298FC2; font-size: 2.4rem; margin: 0; }
        .kw-lux-top-line { font-family: 'Arial Black', sans-serif; font-weight: 900; display: block; letter-spacing: -1px; color: #298FC2; }
        .kw-lux-second-line { display: block; color: #003594; }
        .kw-lux-word-water { font-weight: 300; font-family: 'Segoe UI', sans-serif; } 
        .kw-lux-word-score { font-family: 'Arial Black', sans-serif; font-weight: 900; letter-spacing: -1px; }
        .kw-lux-tm { font-size: 0.3em; vertical-align: top; position: relative; top: 0.1em; font-weight: 400; margin-left: 2px; line-height: 1; font-family: Arial, sans-serif; }
        .kw-lux-subtext { color: #666; margin-top: 10px; font-size: 0.95rem; }
        .kw-lux-search-area { padding: 0 30px 15px; position: relative; }
        .kw-lux-input { width: 100%; padding: 15px; border: 2px solid #ddd; border-radius: 50px; font-size: 16px; outline: none; text-align: center; transition: 0.3s; box-sizing: border-box; }
        .kw-lux-input:focus { border-color: #003594; box-shadow: 0 0 0 3px rgba(0, 53, 148, 0.1); }
        .kw-lux-suggestions { position: absolute; top: 65px; left: 30px; right: 30px; background: white; border: 1px solid #cce4f7; z-index: 9999; max-height: 250px; overflow-y: auto; box-shadow: 0 15px 30px rgba(0,0,0,0.15); display: none; border-radius: 8px; }
        .kw-lux-suggestion-item { padding: 12px 15px; cursor: pointer; border-bottom: 1px solid #f0f0f0; text-align: left; }
        .kw-lux-suggestion-item:hover { background: #f0f7ff; color: #003594; }
        .kw-lux-locality-hint { font-size: 0.85em; color: #888; margin-left: 8px; font-style: italic; }
        .kw-lux-slider-wrapper { padding: 0 20px; transition: opacity 0.3s; margin-top: 10px; }
        .kw-lux-slider-container { position: relative; height: 60px; margin: 20px 10px; }
        .kw-lux-slider-bar { height: 40px; width: 100%; border-radius: 4px; background: linear-gradient(90deg, #F57F20 0%, #E6007E 50%, #298FC2 100%); position: relative; top: 10px; }
        .kw-lux-grid-lines { position: absolute; top: 10px; left: 0; width: 100%; height: 40px; display: flex; justify-content: space-between; pointer-events: none; }
        .kw-lux-line { width: 1px; background: rgba(255,255,255,0.4); height: 100%; }
        .kw-lux-water-drop { position: absolute; top: -15px; transform: translateX(-50%); width: 50px; height: 65px; transition: left 1.5s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.5s; z-index: 10; filter: drop-shadow(0 3px 5px rgba(0,0,0,0.2)); }
        .kw-lux-drop-shape { width: 42px; height: 42px; background: #298FC2; border-radius: 0 50% 50% 50%; transform: rotate(45deg); margin: 0 auto; border: 3px solid white; transition: background 1.5s; }
        .kw-lux-drop-value { position: absolute; top: 13px; left: 0; width: 100%; text-align: center; color: white; font-weight: 800; font-size: 15px; text-shadow: 0 1px 2px rgba(0,0,0,0.2); }
        .kw-lux-labels { display: flex; justify-content: space-between; margin-top: 15px; color: #999; font-size: 11px; font-weight: bold; padding: 0 2px; }
        .kw-lux-result-panel { padding: 0 20px 10px; animation: kw-fadein 0.6s ease-out; }
        .kw-lux-commune-title { font-size: 1.3rem; font-weight: bold; color: #003594; margin-top: 10px; }
        .kw-lux-message-box { background: #f8f9fa; padding: 20px; border-radius: 10px; margin-top: 25px; border: 1px solid #eee; }
        .kw-lux-cta-button { display: none; margin-top: 15px; background: #003594; color: white; text-decoration: none; padding: 14px 30px; border-radius: 6px; font-weight: bold; transition: 0.3s; text-transform: uppercase; letter-spacing: 0.5px; }
        .kw-lux-cta-button:hover { background: #002766; transform: translateY(-2px); box-shadow: 0 4px 10px rgba(0,53,148,0.3); }
        .kw-lux-footer-block { margin-top: 20px; padding-top: 15px; border-top: 1px solid #eee; margin-left: 30px; margin-right: 30px; }
        .kw-lux-dealer-info { font-size: 11px; color: #555; font-weight: 400; font-family: Arial, sans-serif; line-height: 1.4; display: block; }
        .kw-lux-dealer-link { color: #555; text-decoration: none; font-weight: 400; cursor: pointer; transition: color 0.2s; }
        .kw-lux-dealer-link:hover { color: #000; }
        .kw-lux-source-data { font-size: 9px; color: #aaa; margin-top: 10px; display: block; }
        .kw-lux-loader { color: #888; display: none; margin: 10px; font-style: italic; }
        
        /* SIMULATEUR ROI */
        .kw-sim-box { background: #fff; border: 2px solid #E6007E; border-radius: 10px; padding: 20px; margin-top: 20px; text-align: left; position: relative; overflow: hidden; display: none; animation: kw-fadein 0.5s ease-out; }
        .kw-sim-title { color: #E6007E; font-weight: 900; font-size: 1.3rem; text-transform: uppercase; margin-bottom: 15px; display: block; text-align: center; }
        .kw-sim-controls { background: #fff5f9; padding: 15px; border-radius: 8px; margin-bottom: 15px; }
        .kw-sim-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
        .kw-sim-label { font-weight: bold; color: #555; font-size: 0.95em; }
        .kw-sim-input { width: 60px; padding: 5px; border-radius: 4px; border: 1px solid #ccc; text-align: center; font-weight: bold; }
        .kw-sim-toggle { cursor: pointer; }
        .kw-sim-result-total { text-align: center; margin: 20px 0; }
        .kw-sim-total-val { font-size: 2.5rem; font-weight: 900; color: #003594; display: block; line-height: 1; }
        .kw-sim-total-sub { font-size: 0.9em; color: #666; text-transform: uppercase; letter-spacing: 1px; }
        .kw-sim-breakdown { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .kw-sim-item { background: #f8f9fa; padding: 10px; border-radius: 6px; text-align: center; border: 1px solid #eee; }
        .kw-sim-icon { font-size: 1.5em; display: block; margin-bottom: 5px; }
        .kw-sim-val { font-weight: 800; color: #333; }
        .kw-sim-desc { font-size: 0.75em; color: #777; display: block; }
        .kw-sim-plastic-badge { grid-column: span 2; background: #e8f5e9; color: #2e7d32; padding: 8px; border-radius: 20px; font-weight: bold; font-size: 0.85em; text-align: center; margin-top: 10px; }
        .kw-sim-aggravator { grid-column: span 2; background: #fff3cd; color: #856404; padding: 10px; font-size:0.8em; text-align:center; border-radius:6px; font-weight:bold; margin-bottom:15px; border:1px solid #ffeeba; }
        
        /* SÉLECTION TYPE D'HABITATION */
        .kw-habitat-select { background: #eef6fc; padding: 20px; border-radius: 8px; margin-top: 20px; border: 2px solid #cce4f7; text-align: left; display: none; }
        .kw-habitat-label { display: block; font-weight: bold; margin-bottom: 10px; color: #003594; font-size: 1.1em; }
        .kw-habitat-dropdown { width: 100%; padding: 12px; border: 2px solid #003594; border-radius: 5px; font-size: 16px; background: white; cursor: pointer; color: #003594; font-weight: 600; }

        /* RECOMMANDATION PRODUIT */
        .kw-rec-box { background: #fff; border: 3px solid #E6007E; border-radius: 12px; padding: 25px; margin-top: 25px; text-align: center; box-shadow: 0 6px 20px rgba(229,0,126,0.15); position: relative; overflow: hidden; display: none; }
        .kw-rec-box::before { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 5px; background: #E6007E; }
        .kw-rec-title { display: block; text-transform: uppercase; font-size: 0.9em; color: #E6007E; letter-spacing: 1px; margin-bottom: 10px; font-weight: 700; }
        .kw-product-name { display: block; font-size: 1.8rem; font-weight: 900; color: #003594; margin-bottom: 15px; font-family: 'Arial Black', sans-serif; }
        .kw-product-desc { color: #555; line-height: 1.5; font-size: 1em; margin-bottom: 20px; text-align: left; background: #f9f9f9; padding: 15px; border-radius: 8px; }
        .kw-rec-btn { display: inline-block; background: #E6007E; color: white; text-decoration: none; padding: 14px 35px; border-radius: 50px; font-weight: bold; transition: 0.3s; text-transform: uppercase; letter-spacing: 1px; box-shadow: 0 4px 10px rgba(229,0,126,0.3); }
        .kw-rec-btn:hover { background: #c4006a; transform: translateY(-2px); }
        .kw-rec-btn-secondary { display: inline-block; color: #003594; text-decoration: none; padding: 10px 20px; font-size: 0.9em; transition: 0.3s; border-bottom: 2px solid transparent; }
        .kw-rec-btn-secondary:hover { border-bottom-color: #003594; }
        
        @keyframes kw-fadein { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    `;

    // ==========================================================================
    // 4. HTML TEMPLATE
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
                <input type="text" id="kw-input-lux" class="kw-lux-input" placeholder="Ex: Beggen, Bertrange..." autocomplete="off">
                <div id="kw-suggestions-lux" class="kw-lux-suggestions"></div>
                <div id="kw-loader-lux" class="kw-lux-loader">Initialisation...</div>
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
                    
                    <button id="kw-btn-sim" style="background:#E6007E; color:white; border:none; padding:10px 20px; border-radius:5px; font-weight:bold; cursor:pointer; margin-top:15px; width:100%; display:none;">
                        CALCULEZ VOS ÉCONOMIES ANNUELLES
                    </button>
                </div>

                <div id="kw-sim-container" class="kw-sim-box">
                    <span class="kw-sim-title">Vos Pertes Annuelles</span>
                    
                    <div class="kw-sim-controls">
                        <div class="kw-sim-row">
                            <span class="kw-sim-label">Personnes au foyer :</span>
                            <input type="number" id="kw-sim-ppl" class="kw-sim-input" value="3" min="1" max="10">
                        </div>
                        <div class="kw-sim-row">
                            <span class="kw-sim-label">Eau en bouteille ?</span>
                            <input type="checkbox" id="kw-sim-bottle" class="kw-sim-toggle" checked>
                        </div>
                        <div style="font-size:0.7em; color:#888; margin-top:5px; font-style:italic;">
                            *Estimations basées sur moyennes nationales (Foyer 3 pers.)
                        </div>
                    </div>

                    <div id="kw-sim-alert" class="kw-sim-aggravator" style="display:none;"></div>

                    <div class="kw-sim-result-total">
                        <span class="kw-sim-total-val" id="kw-sim-total">-- €</span>
                        <span class="kw-sim-total-sub">Perdus chaque année</span>
                    </div>

                    <div class="kw-sim-breakdown">
                        <div class="kw-sim-item">
                            <span class="kw-sim-icon">🧴</span>
                            <span class="kw-sim-val" id="kw-sim-prod">-- €</span>
                            <span class="kw-sim-desc">Entretien & Hygiène</span>
                        </div>
                        <div class="kw-sim-item">
                            <span class="kw-sim-icon">⚡</span>
                            <span class="kw-sim-val" id="kw-sim-energy">-- €</span>
                            <span class="kw-sim-desc">Surconso. Énergie</span>
                        </div>
                        <div class="kw-sim-item">
                            <span class="kw-sim-icon">💧</span>
                            <span class="kw-sim-val" id="kw-sim-bottle-cost">-- €</span>
                            <span class="kw-sim-desc">Achat Bouteilles</span>
                        </div>
                        <div class="kw-sim-item">
                            <span class="kw-sim-icon">⚙️</span>
                            <span class="kw-sim-val" id="kw-sim-appliance">-- €</span>
                            <span class="kw-sim-desc">Usure Appareils</span>
                        </div>
                        
                        <div class="kw-sim-plastic-badge" id="kw-sim-plastic">
                            ♻️ 30 kg de déchets plastiques générés
                        </div>
                    </div>
                </div>

                <div id="kw-habitat-selection" class="kw-habitat-select">
                    <label class="kw-habitat-label">Quel est votre type d'habitation ?</label>
                    <select id="kw-habitat-type" class="kw-habitat-dropdown">
                        <option value="" disabled selected>-- Sélectionnez --</option>
                        <option value="appt">Appartement</option>
                        <option value="maison">Maison Unifamiliale</option>
                    </select>
                </div>

                <div id="kw-rec-container" class="kw-rec-box">
                    <span class="kw-rec-title">SOLUTION RECOMMANDÉE KINETICO</span>
                    <span id="kw-prod-name" class="kw-product-name"></span>
                    <div id="kw-prod-desc" class="kw-product-desc"></div>
                    <a href="#" id="kw-rec-link" class="kw-rec-btn">DÉCOUVRIR CE MODÈLE</a>
                    <div style="margin-top: 15px;">
                        <a href="${CONFIG.quoteLink}" class="kw-rec-btn-secondary">Ou demander un devis personnalisé</a>
                    </div>
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
    // 5. LOGIQUE JS
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
        const messageStandard = document.getElementById('kw-message-standard-lux');
        const displayCommune = document.getElementById('kw-commune-display-lux');
        const drop = document.getElementById('kw-drop-lux');
        const scoreVal = document.getElementById('kw-score-val-lux');
        const verdictTitle = document.getElementById('kw-verdict-title-lux');
        const verdictDesc = document.getElementById('kw-verdict-desc-lux');
        const btnSim = document.getElementById('kw-btn-sim');
        const simContainer = document.getElementById('kw-sim-container');
        const simAlert = document.getElementById('kw-sim-alert');
        const dropShape = drop.querySelector('.kw-lux-drop-shape');

        // Simulator Elements
        const inputPpl = document.getElementById('kw-sim-ppl');
        const inputBottle = document.getElementById('kw-sim-bottle');
        const outTotal = document.getElementById('kw-sim-total');
        const outProd = document.getElementById('kw-sim-prod');
        const outEnergy = document.getElementById('kw-sim-energy');
        const outBottle = document.getElementById('kw-sim-bottle-cost');
        const outAppliance = document.getElementById('kw-sim-appliance');
        const outPlastic = document.getElementById('kw-sim-plastic');

        // Habitat Selection
        const habitatSelection = document.getElementById('kw-habitat-selection');
        const habitatType = document.getElementById('kw-habitat-type');
        
        // Recommandation
        const recContainer = document.getElementById('kw-rec-container');
        const prodName = document.getElementById('kw-prod-name');
        const prodDesc = document.getElementById('kw-prod-desc');

        let searchIndex = [];
        let currentTH = 0;
        let currentScore = 0;

        // CONSTRUIRE L'INDEX (Format Luxembourg corrigé)
        function buildSearchIndex() {
            searchIndex = [];
            Object.entries(MASTER_DATA).forEach(([commune, data]) => {
                if (data.city === "Luxembourg") {
                    searchIndex.push({ 
                        displayName: `${commune} (Luxembourg)`, 
                        searchName: `${commune.toLowerCase()} luxembourg`, 
                        commune: commune, 
                        th: data.th, 
                        isLocality: true 
                    });
                } else {
                    searchIndex.push({ displayName: commune, searchName: commune.toLowerCase(), commune: commune, th: data.th, isLocality: false });
                    if (data.localities) {
                        data.localities.forEach(locality => {
                            if (locality.toLowerCase() !== commune.toLowerCase()) {
                                searchIndex.push({ displayName: locality, searchName: locality.toLowerCase(), commune: commune, th: data.th, isLocality: true });
                            }
                        });
                    }
                }
            });
            searchIndex.sort((a, b) => a.displayName.localeCompare(b.displayName, 'fr'));
        }

        // CHARGEMENT API (Optimisé)
        async function loadData() {
            loader.style.display = 'none';
            
            try {
                const response = await fetch(CONFIG.apiUrl);
                if (!response.ok) {
                    buildSearchIndex();
                    return;
                }
                
                const geoData = await response.json();
                if (!geoData.features || geoData.features.length === 0) {
                    buildSearchIndex();
                    return;
                }
                
                const props = geoData.features[0].properties;
                const keys = Object.keys(props);
                const keyName = keys.find(k => k.toLowerCase().includes('commune'));
                const keyVal = keys.find(k => k.toLowerCase().includes('wsz') || k.toLowerCase().includes('durete'));
                
                if (!keyName || !keyVal) {
                    buildSearchIndex();
                    return;
                }
                
                const lookup = {};
                Object.keys(MASTER_DATA).forEach(k => lookup[k.toLowerCase().trim()] = k);
                let updatesCount = 0;

                geoData.features.forEach(feature => {
                    const nameApi = feature.properties[keyName];
                    const thApi = feature.properties[keyVal];
                    if (nameApi && typeof nameApi === 'string') {
                        const cleanName = nameApi.trim().toLowerCase();
                        const newVal = parseFloat(thApi);
                        const realKey = lookup[cleanName];
                        if (realKey && MASTER_DATA[realKey] && !isNaN(newVal) && newVal > 0.1) {
                            MASTER_DATA[realKey].th = Math.max(MASTER_DATA[realKey].th, newVal);
                            updatesCount++;
                        }
                    }
                });
                
                if (updatesCount > 0) {
                    console.log(`Widget Public: ${updatesCount}/${Object.keys(MASTER_DATA).length} communes mises à jour via API.`);
                }
            } catch (e) {
                console.warn('Widget Public: API inaccessible, utilisation des données locales.');
            } finally {
                buildSearchIndex();
            }
        }

        // MOTEUR DE RECHERCHE
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
            const matches = searchIndex.filter(item => item.searchName.includes(val)).slice(0, 10);
            suggestions.innerHTML = '';
            if(!matches.length) { suggestions.style.display = 'none'; return; }

            matches.forEach(item => {
                const div = document.createElement('div');
                div.className = 'kw-lux-suggestion-item';
                
                if (item.isLocality && !item.displayName.includes('(')) {
                     div.innerHTML = `${item.displayName} <span class="kw-lux-locality-hint">(${item.commune})</span>`;
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

        function processSelection(item) {
            let titleText = `Qualité de l'eau à ${item.displayName}`;
            
            if(item.displayName.includes('(')) {
                 titleText = `Qualité de l'eau à ${item.displayName}`;
            } else if (item.isLocality) {
                 titleText = `Qualité de l'eau à ${item.displayName} (${item.commune})`;
            }
            
            displayCommune.textContent = titleText;
            currentTH = item.th;
            resultPanel.style.display = 'block';
            sliderWrapper.style.display = 'block';
            messageStandard.style.display = 'block';
            simContainer.style.display = 'none';
            habitatSelection.style.display = 'none';
            recContainer.style.display = 'none';
            habitatType.value = "";
            updateScoreUI(item.th);
        }

        // CALCUL SCORE (Couleurs corrigées)
        function updateScoreUI(thValue) {
            const th = parseFloat(thValue);
            let score;
            if (th < 5) score = 100 - (th * 2); 
            else if (th < 15) score = 96 - (th * 1.4); 
            else if (th < 30) score = 98 - (th * 1.6);
            else score = 49 - ((th - 30) * 0.4); 
            score = Math.max(30, Math.min(100, Math.round(score)));
            currentScore = score;

            const ratio = (th > 0) ? (th / 12).toFixed(1).replace('.0', '') : 0;
            let color, title, text;
            
            if (th < 15) {
                btnSim.style.display = 'none';
            } else {
                btnSim.style.display = 'block';
            }

            if (th < 12) {
                color = '#298FC2'; 
                title = "EAU DOUCE (OK)"; 
                text = `Votre eau (${th.toFixed(1)}°f) respecte le seuil de confort.`; 
            } else if (th < 15) {
                color = '#298FC2'; 
                title = "EAU PEU CALCAIRE"; 
                text = `Votre eau (${th.toFixed(1)}°f) est légèrement au-dessus de la référence.`; 
            } else if (th < 30) {
                color = '#E6007E'; 
                title = "ADOUCISSEUR RECOMMANDÉ"; 
                text = `Votre eau est calcaire (${th.toFixed(1)}°f), soit <strong>${ratio} fois</strong> la référence.`; 
            } else {
                color = '#E6007E'; 
                title = "ADOUCISSEUR INDISPENSABLE"; 
                text = `Votre eau est très dure (${th.toFixed(1)}°f), soit <strong>${ratio} fois</strong> la référence.`; 
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

        // SIMULATEUR ROI
        function updateSimulator() {
            const people = parseInt(inputPpl.value) || 3;
            const hasBottles = inputBottle.checked;

            let factor = 1;
            if(currentTH > 12) {
                factor = currentTH / 12;
            }

            const savingsProd = Math.round((people * 180 * 0.30) * factor);
            const savingsEnergy = Math.round((people * 40) * factor);
            const costBottles = hasBottles ? Math.round(people * 365 * 0.50) : 0;
            const savingsAppliance = Math.round(180 * factor);

            const total = savingsProd + savingsEnergy + costBottles + savingsAppliance;
            const plasticWeight = hasBottles ? Math.round(people * 10) : 0;

            if(factor > 1.2) {
                simAlert.style.display = 'block';
                simAlert.innerHTML = `⚠️ Dureté extrême (${currentTH.toFixed(1)}°f) : Vos pertes sont multipliées par <strong>${factor.toFixed(1)}x</strong> par rapport à une eau idéale.`;
            } else {
                simAlert.style.display = 'none';
            }

            outProd.textContent = savingsProd + " €";
            outEnergy.textContent = savingsEnergy + " €";
            outBottle.textContent = costBottles + " €";
            outAppliance.textContent = savingsAppliance + " €";
            outTotal.textContent = total + " €";
            
            if(hasBottles) {
                outPlastic.textContent = `♻️ ${plasticWeight} kg de déchets plastiques générés`;
                outPlastic.style.display = 'block';
            } else {
                outPlastic.style.display = 'none';
            }
        }

        btnSim.addEventListener('click', function() {
            simContainer.style.display = 'block';
            habitatSelection.style.display = 'block';
            updateSimulator();
            simContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });

        inputPpl.addEventListener('change', updateSimulator);
        inputBottle.addEventListener('change', updateSimulator);

        // SÉLECTION HABITAT ET RECOMMANDATION
        habitatType.addEventListener('change', function() {
            const type = this.value;
            if(!type) return;

            const targetScore = 92;
            const scoreGain = targetScore - currentScore;
            let name = "";
            let desc = "";
            let productLink = "";

            if (type === 'appt') {
                if (currentTH <= 40) {
                    name = "Kinetico Premier Compact XP";
                    productLink = CONFIG.productCompactXP;
                    desc = `<strong>Pourquoi ce modèle ?</strong><br>Idéal pour la dureté actuelle (${currentTH.toFixed(1)}°f) en appartement. Compact, silencieux et ultra-efficace. Parfait pour les espaces réduits.`;
                } else {
                    name = "Kinetico Premier Plus XP";
                    productLink = CONFIG.productPlusXP;
                    desc = `<strong>Pourquoi ce modèle ?</strong><br>Pour une dureté élevée (${currentTH.toFixed(1)}°f) en appartement, ce modèle bi-colonne offre une capacité supérieure et une eau douce en continu.`;
                }
            } else if (type === 'maison') {
                name = "Kinetico Premier Plus XP";
                productLink = CONFIG.productPlusXP;
                desc = `<strong>Pourquoi ce modèle ?</strong><br>La référence bi-colonne pour une protection totale de votre maison unifamiliale. Débit optimal et autonomie maximale pour toute la famille.`;
            }

            desc += `<br><br><strong style="color:#E6007E; font-size:1.1em;">Impact Water Score : +${scoreGain} pts</strong>`;
            desc += `<br>(Score final estimé avec adoucisseur : <strong>${targetScore}/100</strong>)`;
            desc += `<br><br><span style="font-size:0.9em; color:#555;">💡 <strong>Conseil :</strong> Avec un osmoseur K5 en complément, atteignez un score de <strong>99/100</strong> pour une eau parfaite en boisson.</span>`;

            prodName.textContent = name;
            prodDesc.innerHTML = desc;
            document.getElementById('kw-rec-link').href = productLink;
            recContainer.style.display = 'block';
            recContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });

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

