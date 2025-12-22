(function() {
    // ==========================================================================
    // CONFIGURATION
    // ==========================================================================
    const CONFIG = {
        containerId: 'wyws-luxembourg-widget',
        vdlLink: 'https://www.vdl.lu/fr/vivre/domicile-au-quotidien/verifier-la-qualite-de-leau-chez-soi#',
        quoteLink: '/durete-de-leau-au-luxembourg#Obtenez-votre-devis',
        websiteLink: 'https://www.aquapurify.eu'
    };

    // ==========================================================================
    // BASE DE DONNÉES ÉTENDUE (Communes + Localités)
    // ==========================================================================
    // Cette liste associe chaque village à la dureté de sa commune principale.
    const LUX_DATA_FULL = {
        // 1. Beaufort (33)
        "Beaufort": 33, "Dillingen": 33,
        // 2. Bech (31)
        "Bech": 31, "Altrier": 31, "Blumenthal": 31, "Geyershof": 31, "Graulinster": 31, "Hemstal": 31, "Hersberg": 31, "Rippig": 31, "Zittig": 31,
        // 3. Beckerich (19)
        "Beckerich": 19, "Elvange (Beckerich)": 19, "Hovelange": 19, "Huttange": 19, "Levelange": 19, "Noerdange": 19, "Oberpallen": 19, "Schweich": 19,
        // 4. Berdorf (33)
        "Berdorf": 33, "Bollendorf-Pont": 33, "Grundhof": 33, "Kalkesbach": 33, "Weilerbach": 33,
        // 5. Bertrange (26)
        "Bertrange": 26,
        // 6. Bettembourg (35)
        "Bettembourg": 35, "Abweiler": 35, "Fennange": 35, "Huncherange": 35, "Noertzange": 35,
        // 7. Bettendorf (21)
        "Bettendorf": 21, "Gilsdorf": 21, "Moestroff": 21,
        // 8. Betzdorf (30)
        "Betzdorf": 30, "Berg": 30, "Mensdorf": 30, "Olingen": 30, "Roodt-sur-Syre": 30,
        // 9. Bissen (20)
        "Bissen": 20,
        // 10. Biwer (29)
        "Biwer": 29, "Biwerbach": 29, "Boudler": 29, "Boudlerbach": 29, "Brouch (Biwer)": 29, "Hagelsdorf": 29, "Wecker": 29, "Weydig": 29,
        // 11. Boulaide (16)
        "Boulaide": 16, "Baschleiden": 16, "Surré": 16,
        // 12. Bourscheid (19)
        "Bourscheid": 19, "Goebelsmuehle": 19, "Kehmen": 19, "Lipperscheid": 19, "Michelau": 19, "Scheidel": 19, "Schlindermanderscheid": 19, "Welscheid": 19,
        // 13. Bous (31)
        "Bous": 31, "Assel": 31, "Erpeldange (Bous)": 31, "Rolling": 31,
        // 14. Clervaux (18)
        "Clervaux": 18, "Drauffelt": 18, "Eselborn": 18, "Fischbach (Clervaux)": 18, "Grindhausen": 18, "Heinerscheid": 18, "Hupperdange": 18, "Kalborn": 18, "Lieler": 18, "Marnach": 18, "Munshausen": 18, "Reuler": 18, "Roder": 18, "Siebenaler": 18, "Urspelt": 18, "Weicherdange": 18,
        // 15. Colmar-Berg (20)
        "Colmar-Berg": 20,
        // 16. Consdorf (34)
        "Consdorf": 34, "Breidweiler": 34, "Colbette": 34, "Marscherwald": 34, "Scheidgen": 34,
        // 17. Contern (26)
        "Contern": 26, "Medingen": 26, "Moutfort": 26, "Oetrange": 26,
        // 18. Dalheim (32)
        "Dalheim": 32, "Filsdorf": 32, "Welfrange": 32,
        // 19. Diekirch (20)
        "Diekirch": 20,
        // 20. Differdange (36)
        "Differdange": 36, "Lasauvage": 36, "Niederkorn": 36, "Oberkorn": 36,
        // 21. Dippach (33)
        "Dippach": 33, "Bettange-sur-Mess": 33, "Schouweiler": 33, "Sprinkange": 33,
        // 22. Dudelange (35)
        "Dudelange": 35,
        // 23. Echternach (30)
        "Echternach": 30,
        // 24. Ell (21)
        "Ell": 21, "Colpach-Bas": 21, "Colpach-Haut": 21, "Petit-Nobressart": 21, "Roodt (Ell)": 21,
        // 25. Erpeldange-sur-Sûre (20)
        "Erpeldange-sur-Sûre": 20, "Burden": 20, "Ingeldorf": 20,
        // 26. Esch-sur-Alzette (35)
        "Esch-sur-Alzette": 35,
        // 27. Esch-sur-Sûre (14)
        "Esch-sur-Sûre": 14, "Eschdorf": 14, "Heiderscheid": 14, "Heiderscheidergrund": 14, "Hierheck": 14, "Merscheid (Esch-sur-Sûre)": 14, "Ringel": 14, "Tadler": 14,
        // 28. Ettelbruck (20)
        "Ettelbruck": 20, "Warken": 20,
        // 29. Feulen (20)
        "Feulen": 20, "Niederfeulen": 20, "Oberfeulen": 20,
        // 30. Fischbach (20)
        "Fischbach": 20, "Angelsberg": 20, "Koedange": 20, "Schoos": 20, "Stuppicht": 20, "Weyer": 20,
        // 31. Flaxweiler (30)
        "Flaxweiler": 30, "Beyren": 30, "Gostingen": 30, "Niederdonven": 30, "Oberdonven": 30,
        // 32. Frisange (33)
        "Frisange": 33, "Aspelt": 33, "Hellange": 33,
        // 33. Garnich (32)
        "Garnich": 32, "Dahlem": 32, "Hivange": 32, "Kahler": 32,
        // 34. Goesdorf (19)
        "Goesdorf": 19, "Bockholtz (Goesdorf)": 19, "Buderscheid": 19, "Dahl": 19, "Dirbach": 19, "Masseler": 19, "Nocher": 19, "Nocher-Route": 19,
        // 35. Grevenmacher (33)
        "Grevenmacher": 33,
        // 36. Grosbous (20)
        "Grosbous": 20, "Dellen": 20,
        // 37. Heffingen (28)
        "Heffingen": 28, "Reuland": 28,
        // 38. Helperknapp (20)
        "Helperknapp": 20, "Boevange-sur-Attert": 20, "Ansembourg": 20, "Bill": 20, "Bour": 20, "Brouch (Helperknapp)": 20, "Buschdorf": 20, "Finsterthal": 20, "Grevenknapp": 20, "Hollenfels": 20, "Marienthal": 20, "Openthalt": 20, "Tuntange": 20,
        // 39. Hesperange (33)
        "Hesperange": 33, "Alzingen": 33, "Fentange": 33, "Howald": 33, "Itzig": 33,
        // 40. Habscht / Hobscheid (32)
        "Habscht": 32, "Hobscheid": 32, "Eischen": 32, "Greisch": 32, "Roodt-sur-Eisch": 32, "Septfontaines": 32,
        // 41. Junglinster (29)
        "Junglinster": 29, "Altlinster": 29, "Beidweiler": 29, "Bourglinster": 29, "Eisenborn": 29, "Eschweiler (Junglinster)": 29, "Godbrange": 29, "Gonderange": 29, "Imbringen": 29, "Rodenbourg": 29,
        // 42. Käerjeng (35)
        "Käerjeng": 35, "Bascharage": 35, "Clemency": 35, "Fingig": 35, "Hautcharage": 35, "Linger": 35,
        // 43. Kayl (35)
        "Kayl": 35, "Tétange": 35,
        // 44. Kehlen (32)
        "Kehlen": 32, "Dondelange": 32, "Keispelt": 32, "Meispelt": 32, "Nospelt": 32, "Olm": 32,
        // 45. Kiischpelt (19)
        "Kiischpelt": 19, "Kautenbach": 19, "Alscheid": 19, "Enscherange": 19, "Lellingen": 19, "Merkholtz": 19, "Pintsch": 19, "Wilwerwiltz": 19,
        // 46. Koerich (32)
        "Koerich": 32, "Goeblange": 32, "Goetzingen": 32, "Windhof": 32,
        // 47. Kopstal (32)
        "Kopstal": 32, "Bridel": 32,
        // 48. Lac de la Haute-Sûre (15)
        "Lac de la Haute-Sûre": 15, "Bavigne": 15, "Harlange": 15, "Kaundorf": 15, "Liefrange": 15, "Mecher": 15, "Nothum": 15, "Tarchamps": 15, "Watrange": 15,
        // 49. Larochette (28)
        "Larochette": 28, "Ernzen": 28,
        // 50. Lenningen (31)
        "Lenningen": 31, "Canach": 31,
        // 51. Leudelange (32)
        "Leudelange": 32,
        // 52. Lintgen (20)
        "Lintgen": 20, "Gosseldange": 20, "Prettingen": 20,
        // 53. Lorentzweiler (20)
        "Lorentzweiler": 20, "Blaschette": 20, "Bofferdange": 20, "Helmdange": 20, "Hunsdorf": 20,
        // 54. Luxembourg (-1 -> VDL)
        "Luxembourg": -1, "Luxembourg-Ville": -1, "Beggen": -1, "Belair": -1, "Bonnevoie": -1, "Cessange": -1, "Clausen": -1, "Dommeldange": -1, "Eich": -1, "Gare": -1, "Gasperich": -1, "Grund": -1, "Hamm": -1, "Hollerich": -1, "Kirchberg": -1, "Limpertsberg": -1, "Merl": -1, "Muhlenbach": -1, "Neudorf": -1, "Pfaffenthal": -1, "Rollingergrund": -1, "Weimerskirch": -1, "Cents": -1, "Pulvermuhl": -1,
        // 55. Mamer (32)
        "Mamer": 32, "Capellen": 32, "Holzem": 32,
        // 56. Manternach (30)
        "Manternach": 30, "Berbourg": 30, "Lellig": 30, "Munschecker": 30,
        // 57. Mersch (21)
        "Mersch": 21, "Beringen": 21, "Berschbach": 21, "Moesdorf": 21, "Pettingen": 21, "Reckange (Mersch)": 21, "Rollingen": 21, "Schoenfels": 21,
        // 58. Mertert (31)
        "Mertert": 31, "Wasserbillig": 31,
        // 59. Mertzig (19)
        "Mertzig": 19,
        // 60. Mondercange (34)
        "Mondercange": 34, "Bergem": 34, "Foetz": 34, "Pontpierre": 34,
        // 61. Mondorf-les-Bains (33)
        "Mondorf-les-Bains": 33, "Altwies": 33, "Ellange": 33,
        // 62. Niederanven (26)
        "Niederanven": 26, "Ernster": 26, "Hostert": 26, "Oberanven": 26, "Rameldange": 26, "Senningen": 26, "Senningerberg": 26, "Waldhof": 26,
        // 63. Nommern (28)
        "Nommern": 28, "Cruchten": 28, "Schrondweiler": 28,
        // 64. Parc Hosingen (19)
        "Parc Hosingen": 19, "Hosingen": 19, "Bockholtz (Hosingen)": 19, "Consthum": 19, "Dorscheid": 19, "Holzthum": 19, "Hoscheid": 19, "Hoscheid-Dickt": 19, "Neidhausen": 19, "Oberschlinder": 19, "Rodershausen": 19, "Unterschlinder": 19, "Wahlhausen": 19,
        // 65. Pétange (36)
        "Pétange": 36, "Lamadelaine": 36, "Rodange": 36,
        // 66. Préizerdaul (20)
        "Préizerdaul": 20, "Bettborn": 20, "Platen": 20, "Pratz": 20, "Reimberg": 20,
        // 67. Putscheid (19)
        "Putscheid": 19, "Bivels": 19, "Gralingen": 19, "Merscheid (Putscheid)": 19, "Nachtmanderscheid": 19, "Stolzembourg": 19, "Weiler (Putscheid)": 19,
        // 68. Rambrouch (20)
        "Rambrouch": 20, "Arsdorf": 20, "Bigonville": 20, "Bilsdorf": 20, "Eschette": 20, "Folschette": 20, "Haut-Martelange": 20, "Holtz": 20, "Hostert (Rambrouch)": 20, "Koetschette": 20, "Perlé": 20, "Rombach": 20, "Schwiedelbrouch": 20, "Wolwelange": 20,
        // 69. Reckange-sur-Mess (33)
        "Reckange-sur-Mess": 33, "Ehlange": 33, "Limpach": 33, "Pissange": 33, "Roedgen": 33, "Wickrange": 33,
        // 70. Redange-sur-Attert (20)
        "Redange-sur-Attert": 20, "Eltz": 20, "Lannen": 20, "Nagem": 20, "Niederpallen": 20, "Ospern": 20, "Reichlange": 20,
        // 71. Reisdorf (20)
        "Reisdorf": 20, "Bigelbach": 20, "Hoesdorf": 20, "Wallendorf-Pont": 20,
        // 72. Remich (12)
        "Remich": 12,
        // 73. Roeser (34)
        "Roeser": 34, "Berchem": 34, "Bivange": 34, "Crauthem": 34, "Kockelscheuer": 34, "Livange": 34, "Peppange": 34,
        // 74. Rosport-Mompach (30)
        "Rosport-Mompach": 30, "Rosport": 30, "Born": 30, "Dickweiler": 30, "Girst": 30, "Girsterklaus": 30, "Hinkel": 30, "Mompach": 30, "Moersdorf": 30, "Osweiler": 30, "Steinheim": 30,
        // 75. Rumelange (35)
        "Rumelange": 35,
        // 76. Saeul (20)
        "Saeul": 20, "Calmus": 20, "Ehner": 20, "Kapweiler": 20, "Schwebach": 20,
        // 77. Sandweiler (26)
        "Sandweiler": 26,
        // 78. Sanem (35)
        "Sanem": 35, "Belvaux": 35, "Ehlerange": 35, "Soleuvre": 35,
        // 79. Schengen (33)
        "Schengen": 33, "Bech-Kleinmacher": 33, "Burmerange": 33, "Elvange (Schengen)": 33, "Emerange": 33, "Remerschen": 33, "Schwebsange": 33, "Wellenstein": 33, "Wintrange": 33,
        // 80. Schieren (20)
        "Schieren": 20,
        // 81. Schifflange (35)
        "Schifflange": 35,
        // 82. Schuttrange (26)
        "Schuttrange": 26, "Munsbach": 26, "Neuhaeusgen": 26, "Schrassig": 26, "Uebersyren": 26,
        // 83. Stadtbredimus (32)
        "Stadtbredimus": 32, "Greiveldange": 32,
        // 84. Steinfort (32)
        "Steinfort": 32, "Grass": 32, "Hagen": 32, "Kleinbettingen": 32,
        // 85. Steinsel (20)
        "Steinsel": 20, "Heisdorf": 20, "Mullendorf": 20,
        // 86. Strassen (32)
        "Strassen": 32,
        // 87. Tandel (19)
        "Tandel": 19, "Bastendorf": 19, "Bettel": 19, "Brandenbourg": 19, "Fouhren": 19, "Landscheid": 19, "Longsdorf": 19, "Walsdorf": 19,
        // 88. Troisvierges (18)
        "Troisvierges": 18, "Basbellain": 18, "Biwisch": 18, "Drinklange": 18, "Goedange": 18, "Hautbellain": 18, "Huldange": 18, "Wilwerdange": 18,
        // 89. Useldange (20)
        "Useldange": 20, "Everlange": 20, "Rippweiler": 20, "Schandel": 20,
        // 90. Vallée de l'Ernz (30)
        "Vallée de l'Ernz": 30, "Medernach": 30, "Eppeldorf": 30, "Ermsdorf": 30, "Folkendange": 30, "Stegen": 30,
        // 91. Vianden (19)
        "Vianden": 19,
        // 92. Vichten (20)
        "Vichten": 20, "Michelbouch": 20,
        // 93. Wahl (20)
        "Wahl": 20, "Buschrodt": 20, "Grevels": 20, "Heispelt": 20, "Kuborn": 20, "Rindschleiden": 20,
        // 94. Waldbillig (31)
        "Waldbillig": 31, "Christnach": 31, "Freckeisen": 31, "Haller": 31,
        // 95. Waldbredimus (31)
        "Waldbredimus": 31, "Ersange": 31, "Roedt": 31, "Trintange": 31,
        // 96. Walferdange (22)
        "Walferdange": 22, "Bereldange": 22, "Helmsange": 22,
        // 97. Weiler-la-Tour (28)
        "Weiler-la-Tour": 28, "Hassel": 28, "Syren": 28,
        // 98. Weiswampach (18)
        "Weiswampach": 18, "Beiler": 18, "Binsfeld": 18, "Breidfeld": 18, "Holler": 18, "Leithum": 18,
        // 99. Wiltz (19)
        "Wiltz": 19, "Eschweiler (Wiltz)": 19, "Erpeldange (Wiltz)": 19, "Knaphoscheid": 19, "Roullingen": 19, "Selscheid": 19, "Weidingen": 19,
        // 100. Wincrange (19)
        "Wincrange": 19, "Asselborn": 19, "Boevange": 19, "Boxhorn": 19, "Brachtenbach": 19, "Deiffelt": 19, "Derenbach": 19, "Doennange": 19, "Hachiville": 19, "Hamiville": 19, "Hoffelt": 19, "Lullange": 19, "Niederwampach": 19, "Oberwampach": 19, "Rumlange": 19, "Sassel": 19, "Stockem": 19, "Troine": 19, "Troine-Route": 19,
        // 101. Winseler (19)
        "Winseler": 19, "Berlé": 19, "Doncols": 19, "Groumelscheid": 19, "Noertrange": 19, "Pommerloch": 19, "Schleif": 19, "Soller": 19,
        // 102. Wormeldange (32)
        "Wormeldange": 32, "Ahn": 32, "Dreiborn": 32, "Ehnen": 32, "Machtum": 32
    };

    // ==========================================================================
    // CSS ISOLÉ
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
                <input type="text" id="kw-input-lux" class="kw-lux-input" placeholder="Ex: Hovelange, Bertrange..." autocomplete="off">
                <div id="kw-suggestions-lux" class="kw-lux-suggestions"></div>
                <div id="kw-loader-lux" class="kw-lux-loader">Recherche...</div>
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

                <div id="kw-message-standard-lux" class="kw-lux-message-box" style="display:none;">
                    <strong id="kw-verdict-title-lux" style="font-size: 1.2em; display:block; margin-bottom:8px;"></strong>
                    <div id="kw-verdict-desc-lux" style="font-size: 0.95em; color:#555; margin:0; line-height: 1.5;"></div>
                    <a href="${CONFIG.quoteLink}" id="kw-cta-btn-lux" class="kw-lux-cta-button">AMÉLIOREZ VOTRE WATER SCORE AUJOURD'HUI !</a>
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
    // LOGIQUE
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
        const vdlContainer = document.getElementById('kw-vdl-container-lux');
        const displayCommune = document.getElementById('kw-commune-display-lux');
        const drop = document.getElementById('kw-drop-lux');
        const scoreVal = document.getElementById('kw-score-val-lux');
        const verdictTitle = document.getElementById('kw-verdict-title-lux');
        const verdictDesc = document.getElementById('kw-verdict-desc-lux');
        const ctaBtn = document.getElementById('kw-cta-btn-lux');
        const dropShape = drop.querySelector('.kw-lux-drop-shape');

        let communesData = [];

        // CHARGEMENT DEPUIS LA LISTE ÉTENDUE
        function loadData() {
            loader.style.display = 'block';
            communesData = Object.entries(LUX_DATA_FULL).map(([name, th]) => ({ name, th }))
                .sort((a, b) => a.name.localeCompare(b.name, 'fr'));
            loader.style.display = 'none';
        }

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

        // SÉLECTION
        function processSelection(commune) {
            displayCommune.textContent = "Qualité de l'eau à " + commune.name;
            resultPanel.style.display = 'block';
            
            if (commune.th === -1) {
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

        // CALCUL SCORE (Ratio 12°f)
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
