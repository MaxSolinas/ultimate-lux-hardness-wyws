(function() {
    const ORIGINAL_WIDGET_URL = 'https://cdn.jsdelivr.net/gh/MaxSolinas/ultimate-lux-hardness-wyws@ca80aae0ea34de3b175d77149e4925cbd6d2c630/widget.js';

    const visualOverrideCss = `
        #wyws-luxembourg-container .kw-lux-slider-wrapper {
            padding: 26px 20px 22px !important;
            margin-top: 10px !important;
            background: #FFFFFF !important;
            transition: opacity 0.3s !important;
        }

        #wyws-luxembourg-container .kw-lux-slider-container {
            position: relative !important;
            height: 86px !important;
            margin: 0 auto !important;
            max-width: 600px !important;
        }

        #wyws-luxembourg-container .kw-lux-slider-bar {
            position: absolute !important;
            left: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
            top: auto !important;
            width: 100% !important;
            height: 55px !important;
            border-radius: 6px !important;
            overflow: hidden !important;
            background: linear-gradient(90deg,
                #F28A34 0%, #F28A34 12.5%,
                #EB7547 12.5%, #EB7547 25%,
                #E94D67 25%, #E94D67 37.5%,
                #E22A86 37.5%, #E22A86 50%,
                #C43A99 50%, #C43A99 62.5%,
                #9557AE 62.5%, #9557AE 75%,
                #5C82BF 75%, #5C82BF 87.5%,
                #3497C8 87.5%, #3497C8 100%
            ) !important;
            box-shadow: none !important;
        }

        #wyws-luxembourg-container .kw-lux-slider-bar::after {
            content: "" !important;
            position: absolute !important;
            inset: 0 !important;
            background: repeating-linear-gradient(90deg,
                transparent 0,
                transparent calc(12.5% - 1px),
                #00384D calc(12.5% - 1px),
                #00384D calc(12.5% + 1px),
                transparent calc(12.5% + 1px),
                transparent 12.5%
            ) !important;
            pointer-events: none !important;
            z-index: 2 !important;
        }

        #wyws-luxembourg-container .kw-lux-grid-lines,
        #wyws-luxembourg-container .kw-lux-line {
            display: none !important;
        }

        #wyws-luxembourg-container .kw-lux-labels {
            position: absolute !important;
            left: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
            height: 55px !important;
            display: flex !important;
            align-items: center !important;
            justify-content: space-between !important;
            margin: 0 !important;
            padding: 0 27px !important;
            box-sizing: border-box !important;
            color: #FFFFFF !important;
            font-size: 16px !important;
            font-weight: 900 !important;
            line-height: 1 !important;
            text-shadow: 0 1px 2px rgba(0,0,0,0.35) !important;
            pointer-events: none !important;
            z-index: 4 !important;
            font-family: 'Segoe UI', Arial, sans-serif !important;
        }

        #wyws-luxembourg-container .kw-lux-water-drop {
            position: absolute !important;
            top: auto !important;
            bottom: 49px !important;
            width: 26px !important;
            height: 26px !important;
            transform: translateX(-50%) !important;
            z-index: 10 !important;
            opacity: 0;
            transition: left 1.2s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s !important;
            filter: drop-shadow(0 2px 3px rgba(0,0,0,0.25)) !important;
        }

        #wyws-luxembourg-container .kw-lux-drop-shape {
            width: 26px !important;
            height: 26px !important;
            margin: 0 !important;
            background: #2F96C8 !important;
            border: 0 !important;
            border-radius: 50% 50% 50% 0 !important;
            transform: rotate(-45deg) !important;
            box-shadow: none !important;
            transition: none !important;
        }

        #wyws-luxembourg-container .kw-lux-drop-value {
            display: none !important;
        }
    `;

    function injectVisualOverride() {
        const oldStyle = document.getElementById('wyws-lux-1545-scale-override');
        if (oldStyle) oldStyle.remove();
        const styleTag = document.createElement('style');
        styleTag.id = 'wyws-lux-1545-scale-override';
        styleTag.textContent = visualOverrideCss;
        document.head.appendChild(styleTag);
    }

    const scriptTag = document.createElement('script');
    scriptTag.src = ORIGINAL_WIDGET_URL;
    scriptTag.async = false;
    scriptTag.onload = function() {
        injectVisualOverride();
        setTimeout(injectVisualOverride, 100);
        setTimeout(injectVisualOverride, 500);
    };
    document.head.appendChild(scriptTag);
})();
