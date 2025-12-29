(function() {
    // ==========================================================================
    // 1. CONFIGURATION REVENDEUR
    // ==========================================================================
    const CONFIG = {
        containerId: 'wyws-dealer-widget',
        apiUrl: 'https://download.data.public.lu/resources/durete-de-leau/20251211-020257/wasserharte.geojson',
        
        // LIENS
        linkParticulier: '/devis-particulier',
        linkCollectif: '/solutions-collectives',
        linkPro: '/solutions-professionnelles',
        websiteLink: 'https://www.aquapurify.eu'
    };

    // ==========================================================================
    // 2. DONNÉES MAÎTRES (Base V41)
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
        #wyws-dealer-widget { font-family: 'Segoe UI', Arial, sans-serif; max-width: 650px; margin: 30px auto; background: #fff; border: 1px solid #e1e4e8; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); overflow: visible; text-align: center; position: relative; padding-bottom: 25px; }
        
        .kw-dealer-header { padding: 30px 20px 10px; border-radius: 12px 12px 0 0; background: #fff; }
        .kw-dealer-headline { text-transform: uppercase; line-height: 1.1; color: #00ADEF; font-size: 2.2rem; margin: 0; font-weight: 900; }
        .kw-dealer-top-line { display: block; color: #0054A4; font-size: 0.9em; letter-spacing: 1px; }
        .kw-dealer-subtext { color: #666; margin-top: 10px; font-size: 0.95rem; }

        .kw-dealer-search-area { padding: 0 30px 15px; position: relative; margin-top: 20px; }
        .kw-dealer-input { width: 100%; padding: 15px; border: 2px solid #ddd; border-radius: 50px; font-size: 16px; outline: none; text-align: center; transition: 0.3s; box-sizing: border-box; }
        .kw-dealer-input:focus { border-color: #0054A4; box-shadow: 0 0 0 3px rgba(0, 84, 164, 0.1); }
        .kw-dealer-suggestions { position: absolute; top: 65px; left: 30px; right: 30px; background: white; border: 1px solid #cce4f7; z-index: 9999; max-height: 250px; overflow-y: auto; box-shadow: 0 15px 30px rgba(0,0,0,0.15); display: none; border-radius: 8px; text-align: left; }
        .kw-dealer-suggestion-item { padding: 12px 15px; cursor: pointer; border-bottom: 1px solid #f0f0f0; }
        .kw-dealer-suggestion-item:hover { background: #f0f7ff; color: #0054A4; }
        .kw-dealer-locality-hint { font-size: 0.85em; color: #888; margin-left: 8px; font-style: italic; }

        .kw-dealer-result-panel { padding: 0 20px 10px; animation: kw-fadein 0.6s ease-out; }
        .kw-dealer-commune-title { font-size: 1.3rem; font-weight: bold; color: #0054A4; margin-top: 10px; }
        
        .kw-dealer-slider-wrapper { padding: 0 20px; transition: opacity 0.3s; margin-top: 10px; }
        .kw-dealer-slider-container { position: relative; height: 60px; margin: 20px 10px; }
        .kw-dealer-slider-bar { height: 40px; width: 100%; border-radius: 4px; background: linear-gradient(90deg, #F57F20 0%, #E5007E 50%, #00ADEF 100%); position: relative; top: 10px; }
        .kw-dealer-grid-lines { position: absolute; top: 10px; left: 0; width: 100%; height: 40px; display: flex; justify-content: space-between; pointer-events: none; }
        .kw-dealer-line { width: 1px; background: rgba(255,255,255,0.4); height: 100%; }
        .kw-dealer-water-drop { position: absolute; top: -15px; transform: translateX(-50%); width: 50px; height: 65px; transition: left 1.5s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.5s; z-index: 10; filter: drop-shadow(0 3px 5px rgba(0,0,0,0.2)); }
        .kw-dealer-drop-shape { width: 42px; height: 42px; background: #00ADEF; border-radius: 0 50% 50% 50%; transform: rotate(45deg); margin: 0 auto; border: 3px solid white; transition: background 1.5s; }
        .kw-dealer-drop-value { position: absolute; top: 13px; left: 0; width: 100%; text-align: center; color: white; font-weight: 800; font-size: 15px; text-shadow: 0 1px 2px rgba(0,0,0,0.2); }
        .kw-dealer-labels { display: flex; justify-content: space-between; margin-top: 15px; color: #999; font-size: 11px; font-weight: bold; padding: 0 2px; }
        .kw-dealer-message-box { background: #f8f9fa; padding: 20px; border-radius: 10px; margin-top: 25px; border: 1px solid #eee; text-align: center; }
        .kw-dealer-verdict-title { font-size: 1.2em; display:block; margin-bottom:8px; font-weight: bold; }
        .kw-dealer-verdict-desc { font-size: 0.95em; color:#555; margin:0; line-height: 1.5; }
        .kw-dealer-step-2 { background: #eef6fc; padding: 20px; border-radius: 8px; margin-top: 20px; border: 2px solid #cce4f7; text-align: left; }
        .kw-dealer-label { display: block; font-weight: bold; margin-bottom: 8px; color: #0054A4; font-size: 1.1em; }
        .kw-dealer-select { width: 100%; padding: 12px; border: 2px solid #0054A4; border-radius: 5px; font-size: 16px; background: white; cursor: pointer; color: #0054A4; font-weight: 600; }
        .kw-dealer-calc-form { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; margin-top: 10px; }
        .kw-dealer-calc-group { display: flex; flex-direction: column; }
        .kw-dealer-calc-label { font-size: 0.85em; color: #555; margin-bottom: 5px; font-weight: 600; }
        .kw-dealer-calc-input { padding: 10px; border: 1px solid #ccc; border-radius: 5px; font-size: 14px; }
        .kw-dealer-calc-btn { grid-column: span 3; background: #0054A4; color: white; border: none; padding: 12px; border-radius: 5px; font-weight: bold; cursor: pointer; margin-top: 10px; transition: 0.3s; }
        .kw-dealer-calc-btn:hover { background: #003d7a; }
        .kw-dealer-formula-display { background: #333; color: #eee; padding: 10px; border-radius: 5px; font-family: monospace; font-size: 0.85em; margin: 15px 0 5px; text-align: center; }
        .kw-dealer-calc-result { margin-top: 15px; padding: 15px; background: #fff; border: 1px solid #ddd; border-radius: 5px; text-align: center; }
        .kw-dealer-res-val { display: block; font-size: 1.2em; color: #0054A4; font-weight: bold; }
        .kw-dealer-rec-box { background: #fff; border: 3px solid #E5007E; border-radius: 12px; padding: 25px; margin-top: 25px; text-align: center; box-shadow: 0 6px 20px rgba(229,0,126,0.15); position: relative; overflow: hidden; }
        .kw-dealer-rec-box::before { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 5px; background: #E5007E; }
        .kw-dealer-rec-title { display: block; text-transform: uppercase; font-size: 0.9em; color: #E5007E; letter-spacing: 1px; margin-bottom: 10px; font-weight: 700; }
        .kw-dealer-product-name { display: block; font-size: 1.8rem; font-weight: 900; color: #0054A4; margin-bottom: 15px; font-family: 'Arial Black', sans-serif; }
        .kw-dealer-desc { color: #555; line-height: 1.5; font-size: 1em; margin-bottom: 20px; text-align: left; background: #f9f9f9; padding: 15px; border-radius: 8px; }
        .kw-dealer-btn { display: inline-block; background: #E5007E; color: white; text-decoration: none; padding: 14px 35px; border-radius: 50px; font-weight: bold; transition: 0.3s; text-transform: uppercase; letter-spacing: 1px; box-shadow: 0 4px 10px rgba(229,0,126,0.3); }
        .kw-dealer-btn:hover { background: #c4006a; transform: translateY(-2px); }
        .kw-dealer-footer-block { margin-top: 20px; padding-top: 15px; border-top: 1px solid #eee; margin-left: 30px; margin-right: 30px; }
        .kw-dealer-dealer-info { font-size: 11px; color: #555; font-weight: 400; font-family: Arial, sans-serif; line-height: 1.4; display: block; }
        .kw-dealer-dealer-link { color: #555; text-decoration: none; font-weight: 400; cursor: pointer; transition: color 0.2s; }
        .kw-dealer-dealer-link:hover { color: #000; }
        .kw-dealer-source-data { font-size: 9px; color: #aaa; margin-top: 10px; display: block; }
        .kw-dealer-loader { color: #888; display: none; margin: 10px; font-style: italic; }
        @keyframes kw-fadein { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    `;

    // ==========================================================================
    // 4. HTML TEMPLATE
    // ==========================================================================
    const htmlTemplate = `
        <div id="wyws-dealer-widget">
            <div class="kw-dealer-header">
                <h2 class="kw-dealer-headline">
                    <span class="kw-dealer-top-line">AMÉLIOREZ LE</span>
                    WATER SCORE DE VOS CLIENTS
                </h2>
                <div class="kw-dealer-subtext">Outil de diagnostic & recommandation Kinetico</div>
            </div>

            <div class="kw-dealer-search-area">
                <input type="text" id="kw-dealer-input" class="kw-dealer-input" placeholder="Localité du client (ex: Bertrange)..." autocomplete="off">
                <div id="kw-dealer-suggestions" class="kw-dealer-suggestions"></div>
                <div id="kw-dealer-loader" class="kw-dealer-loader">Initialisation...</div>
            </div>

            <div id="kw-dealer-result" class="kw-dealer-result-panel" style="display:none;">
                <div id="kw-dealer-commune" class="kw-dealer-commune-title"></div>

                <div class="kw-dealer-slider-wrapper">
                    <div class="kw-dealer-slider-container">
                        <div class="kw-dealer-slider-bar">
                            <div class="kw-dealer-grid-lines">
                                 <div class="kw-dealer-line"></div><div class="kw-dealer-line"></div><div class="kw-dealer-line"></div>
                                 <div class="kw-dealer-line"></div><div class="kw-dealer-line"></div><div class="kw-dealer-line"></div>
                                 <div class="kw-dealer-line"></div><div class="kw-dealer-line"></div>
                            </div>
                        </div>
                        <div id="kw-dealer-drop" class="kw-dealer-water-drop" style="opacity: 0;">
                            <div id="kw-dealer-drop-shape" class="kw-dealer-drop-shape"></div>
                            <div id="kw-dealer-score-val" class="kw-dealer-drop-value">--</div>
                        </div>
                        <div class="kw-dealer-labels">
                            <span>30</span><span>40</span><span>50</span><span>60</span><span>70</span><span>80</span><span>90</span><span>100</span>
                        </div>
                    </div>
                </div>

                <div id="kw-dealer-message" class="kw-dealer-message-box">
                    <strong id="kw-dealer-verdict-title" class="kw-dealer-verdict-title"></strong>
                    <div id="kw-dealer-verdict-desc" class="kw-dealer-verdict-desc"></div>
                </div>

                <div class="kw-dealer-step-2">
                    <label class="kw-dealer-label">Quel est le type de projet ?</label>
                    <select id="kw-dealer-type" class="kw-dealer-select">
                        <option value="" disabled selected>-- Sélectionnez --</option>
                        <option value="appt">Appartement</option>
                        <option value="maison">Maison Unifamiliale</option>
                        <option value="collectif">Immeuble Collectif (Syndic)</option>
                        <option value="pro">Bureau / Commerce / Horeca</option>
                    </select>

                    <div id="kw-dealer-collectif-form" style="display:none; margin-top:15px; border-top:1px solid #ccc; padding-top:10px;">
                        <div class="kw-dealer-formula-display">
                            Calcul selon DIN 1988-300<br>
                            Vs = a * (ΣVR)^b - c
                        </div>
                        <div class="kw-dealer-calc-form">
                            <div class="kw-dealer-calc-group">
                                <label class="kw-dealer-calc-label">Nb Apparts</label>
                                <input type="number" id="kw-calc-apts" class="kw-dealer-calc-input" min="1" placeholder="Ex: 10">
                            </div>
                            <div class="kw-dealer-calc-group">
                                <label class="kw-dealer-calc-label">Pers/Appt</label>
                                <input type="number" id="kw-calc-ppl" class="kw-dealer-calc-input" value="2.5" step="0.1">
                            </div>
                            <div class="kw-dealer-calc-group">
                                <label class="kw-dealer-calc-label">L/Pers/Jour</label>
                                <input type="number" id="kw-calc-vol" class="kw-dealer-calc-input" value="100">
                            </div>
                            <button id="kw-calc-btn" class="kw-dealer-calc-btn">CALCULER LE DÉBIT</button>
                        </div>
                        <div id="kw-calc-output" class="kw-dealer-calc-result" style="display:none;">
                            <div>Volume Journalier: <span id="kw-out-vol" class="kw-dealer-res-val">-- m3</span></div>
                            <div style="margin-top:5px;">Débit de Pointe (DIN): <span id="kw-out-flow" class="kw-dealer-res-val" style="color:#E5007E; font-size:1.4em;">-- m3/h</span></div>
                        </div>
                    </div>
                </div>

                <div id="kw-dealer-rec" class="kw-dealer-rec-box" style="display:none;">
                    <span class="kw-dealer-rec-title">SOLUTION RECOMMANDÉE KINETICO</span>
                    <span id="kw-dealer-prod" class="kw-dealer-product-name"></span>
                    <div id="kw-dealer-desc" class="kw-dealer-desc"></div>
                    <a href="#" id="kw-dealer-link" class="kw-dealer-btn" target="_blank">Accéder à l'offre</a>
                </div>
            </div>

             <div class="kw-dealer-footer-block">
                <div class="kw-dealer-dealer-info">
                    <a href="${CONFIG.websiteLink}" target="_blank" class="kw-dealer-dealer-link">Aqua Purify</a><br>
                    Authorized, Independent Kinetico Dealer
                </div>
                <span class="kw-dealer-source-data">Données : data.public.lu / Administration de la gestion de l'eau</span>
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

        const input = document.getElementById('kw-dealer-input');
        const suggestions = document.getElementById('kw-dealer-suggestions');
        const loader = document.getElementById('kw-dealer-loader');
        const resultPanel = document.getElementById('kw-dealer-result');
        const displayCommune = document.getElementById('kw-dealer-commune');
        const drop = document.getElementById('kw-dealer-drop');
        const scoreVal = document.getElementById('kw-dealer-score-val');
        const dropShape = document.getElementById('kw-dealer-drop-shape');
        const verdictTitle = document.getElementById('kw-dealer-verdict-title');
        const verdictDesc = document.getElementById('kw-dealer-verdict-desc');
        const typeSelect = document.getElementById('kw-dealer-type');
        const formCollectif = document.getElementById('kw-dealer-collectif-form');
        const btnCalc = document.getElementById('kw-calc-btn');
        const outCalc = document.getElementById('kw-calc-output');
        const recBox = document.getElementById('kw-dealer-rec');
        const prodName = document.getElementById('kw-dealer-prod');
        const prodDesc = document.getElementById('kw-dealer-desc');
        const linkBtn = document.getElementById('kw-dealer-link');

        let searchIndex = [];
        let currentTH = 0;
        let currentScore = 0;

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
                        if (realKey && MASTER_DATA[realKey] && !isNaN(val) && val > 0.1) {
                            MASTER_DATA[realKey].th = Math.max(MASTER_DATA[realKey].th, val);
                            updates++;
                        }
                    }
                });
                if (updates > 0) buildSearchIndex();
                loader.style.display = 'none';
            } catch (e) { console.warn(e); }
        }

        input.addEventListener('input', (e) => {
            const val = e.target.value.toLowerCase();
            if (val.length < 2) { 
                suggestions.style.display = 'none'; 
                if (val.length === 0) { 
                    resultPanel.style.display = 'none'; 
                    drop.style.opacity = '0';
                    typeSelect.value = ""; 
                }
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

        function processSelection(item) {
            currentTH = item.th;
            let titleText = item.displayName.includes('(') ? item.displayName : (item.isLocality ? `${item.displayName} (${item.commune})` : item.displayName);
            displayCommune.textContent = "Diagnostic pour " + titleText;
            updateScoreUI(currentTH);
            typeSelect.value = "";
            formCollectif.style.display = 'none';
            recBox.style.display = 'none';
            resultPanel.style.display = 'block';
        }

        function updateScoreUI(thValue) {
            const th = parseFloat(thValue);
            let score;
            if (th < 5) score = 100 - (th * 2); 
            else if (th < 15) score = 96 - (th * 1.4); 
            else if (th < 30) score = 98 - (th * 1.6);
            else score = 49 - ((th - 30) * 0.4); 
            score = Math.max(30, Math.min(100, Math.round(score)));
            currentScore = score; 

            const reference = 12;
            const ratio = (th > 0) ? (th / reference).toFixed(1).replace('.0', '') : 0;
            let color, title, text;
            
            if (th < 12) {
                color = '#00ADEF'; title = "EAU DOUCE (OK)"; text = `L'eau (${th.toFixed(1)}°f) respecte le seuil de confort (12°f). Pas de traitement nécessaire.`;
            } else if (th < 15) {
                color = '#00ADEF'; title = "EAU PEU CALCAIRE"; text = `L'eau (${th.toFixed(1)}°f) est légèrement au-dessus de la référence (12°f). Adoucisseur préventif utile.`;
            } else if (th < 30) {
                color = '#E5007E'; title = "ADOUCISSEUR RECOMMANDÉ"; text = `L'eau est calcaire (${th.toFixed(1)}°f), soit <strong>${ratio}x</strong> la référence (12°f). Protection nécessaire.`;
            } else {
                color = '#F57F20'; title = "ADOUCISSEUR INDISPENSABLE"; text = `L'eau est très dure (${th.toFixed(1)}°f), soit <strong>${ratio}x</strong> la référence (12°f). Protection critique.`;
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

        btnCalc.addEventListener('click', function() {
            const apts = parseFloat(document.getElementById('kw-calc-apts').value);
            const ppl = parseFloat(document.getElementById('kw-calc-ppl').value) || 2.5;
            const vol = parseFloat(document.getElementById('kw-calc-vol').value) || 100;

            if(!apts || apts < 1) { alert("Veuillez entrer un nombre d'appartements valide."); return; }

            const totalVolM3 = (apts * ppl * vol) / 1000;
            document.getElementById('kw-out-vol').textContent = totalVolM3.toFixed(2) + " m3";

            let peakFlowLS;
            if (apts <= 20) {
                peakFlowLS = 1.48 * Math.pow(apts, 0.19) - 0.94;
            } else {
                peakFlowLS = 1.7 * Math.pow(apts, 0.21) - 0.7;
            }
            if (apts < 1) peakFlowLS = apts; 

            const peakFlowM3H = peakFlowLS * 3.6;
            document.getElementById('kw-out-flow').textContent = peakFlowM3H.toFixed(2) + " m3/h";
            outCalc.style.display = 'block';

            let model = "";
            let desc = `Dimensionnement basé sur DIN 1988-300 pour ${apts} appartements.`;
            
            if (peakFlowM3H <= 3.4) model = "Kinetico S150 XP";
            else if (peakFlowM3H <= 4.0) model = "Kinetico S250 XP";
            else if (peakFlowM3H <= 4.3) model = "Kinetico S350";
            else if (peakFlowM3H <= 5.0) model = "Kinetico S550";
            else if (peakFlowM3H <= 6.4) model = "Kinetico CP213s OD";
            else if (peakFlowM3H <= 7.9) model = "Kinetico CP216s OD";
            else if (peakFlowM3H <= 12.7) model = "Kinetico CP413s OD";
            else if (peakFlowM3H <= 15.8) model = "Kinetico CP416s OD";
            else if (peakFlowM3H <= 19.0) model = "Kinetico CP613s OD";
            else if (peakFlowM3H <= 23.8) model = "Kinetico CP616s OD";
            else if (peakFlowM3H <= 25.4) model = "Kinetico CP813s OD";
            else if (peakFlowM3H <= 31.8) model = "Kinetico CP816s OD";
            else model = "Solution Sur Mesure (Débit > 32m3/h)";

            prodName.textContent = model;
            prodDesc.innerHTML = desc;
            linkBtn.href = CONFIG.linkCollectif;
            recBox.style.display = 'block';
            recBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });

        typeSelect.addEventListener('change', function() {
            const type = this.value;
            formCollectif.style.display = 'none';
            outCalc.style.display = 'none';
            recBox.style.display = 'none';

            if(!type) return;

            if (type === 'collectif') {
                formCollectif.style.display = 'block';
                return;
            }

            let name = "";
            let desc = "";
            let url = CONFIG.linkParticulier;
            const targetScore = 92; 
            const scoreGain = targetScore - currentScore;

            if (type === 'appt') {
                name = (currentTH <= 40) ? "Kinetico Premier Compact XP" : "Kinetico Premier Plus XP";
                desc = `<strong>Pourquoi ?</strong> Idéal pour la dureté actuelle (${currentTH.toFixed(1)}°f) en appartement.`;
            } else if (type === 'maison') {
                name = "Kinetico Premier Plus XP";
                desc = `<strong>Pourquoi ?</strong> La référence bi-colonne pour une protection totale d'une maison unifamiliale.`;
            } else if (type === 'pro') {
                name = "Gamme Pro / Horeca";
                desc = "Protection spécifique des équipements professionnels.";
                url = CONFIG.linkPro;
            }

            if (type === 'appt' || type === 'maison') {
                 desc += `<br><br><strong style="color:#E5007E; font-size:1.1em;">Impact Water Score : +${scoreGain} pts</strong>`;
                 desc += `<br>(Score final estimé avec adoucisseur : <strong>${targetScore}/100</strong>)`;
                 desc += `<br><span style="font-size:0.9em; color:#555;">💡 Avec osmoseur K5 en complément : Score <strong>99/100</strong>.</span>`;
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
