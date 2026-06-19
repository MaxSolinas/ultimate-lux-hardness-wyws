(function() {
    const ORIGINAL_WIDGET_URL = 'https://cdn.jsdelivr.net/gh/MaxSolinas/ultimate-lux-hardness-wyws@ca80aae0ea34de3b175d77149e4925cbd6d2c630/widget.js';

    const visualOverrideCss = `
        #wyws-luxembourg-container .kw-lux-slider-wrapper {
            padding: 14px 20px 18px !important;
            margin-top: 10px !important;
            background: #FFFFFF !important;
            transition: opacity 0.3s !important;
        }

        #wyws-luxembourg-container .kw-lux-slider-container {
            position: relative !important;
            height: 100px !important;
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
            display: grid !important;
            grid-template-columns: repeat(8, 1fr) !important;
            border-radius: 6px !important;
            overflow: hidden !important;
            background: none !important;
            box-shadow: none !important;
        }

        #wyws-luxembourg-container .kw-lux-scale-segment {
            position: relative !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            color: #FFFFFF !important;
            font-size: 16px !important;
            font-weight: 900 !important;
            line-height: 1 !important;
            text-shadow: 0 1px 2px rgba(0,0,0,0.35) !important;
            font-family: 'Segoe UI', Arial, sans-serif !important;
        }

        #wyws-luxembourg-container .kw-lux-scale-segment:not(:last-child)::after {
            content: "" !important;
            position: absolute !important;
            top: 0 !important;
            right: -1px !important;
            width: 2px !important;
            height: 100% !important;
            background: #00384D !important;
            z-index: 2 !important;
        }

        #wyws-luxembourg-container .kw-lux-scale-30 { background: #F28A34 !important; }
        #wyws-luxembourg-container .kw-lux-scale-40 { background: #EB7547 !important; }
        #wyws-luxembourg-container .kw-lux-scale-50 { background: #E94D67 !important; }
        #wyws-luxembourg-container .kw-lux-scale-60 { background: #E22A86 !important; }
        #wyws-luxembourg-container .kw-lux-scale-70 { background: #C43A99 !important; }
        #wyws-luxembourg-container .kw-lux-scale-80 { background: #9557AE !important; }
        #wyws-luxembourg-container .kw-lux-scale-90 { background: #5C82BF !important; }
        #wyws-luxembourg-container .kw-lux-scale-100 { background: #3497C8 !important; }

        #wyws-luxembourg-container .kw-lux-grid-lines,
        #wyws-luxembourg-container .kw-lux-line,
        #wyws-luxembourg-container .kw-lux-labels {
            display: none !important;
        }

        #wyws-luxembourg-container .kw-lux-water-drop {
            position: absolute !important;
            top: auto !important;
            bottom: 52px !important;
            width: 26px !important;
            height: 34px !important;
            background: transparent !important;
            transform: translateX(-50%) !important;
            z-index: 10 !important;
            opacity: 0;
            transition: left 1.2s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s !important;
            filter: drop-shadow(0 2px 3px rgba(0,0,0,0.25)) !important;
        }

        #wyws-luxembourg-container .kw-lux-water-drop::before {
            content: "" !important;
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 26px !important;
            height: 26px !important;
            background: #2F96C8 !important;
            border-radius: 50% !important;
        }

        #wyws-luxembourg-container .kw-lux-water-drop::after {
            content: "" !important;
            position: absolute !important;
            top: 20px !important;
            left: 7px !important;
            width: 0 !important;
            height: 0 !important;
            border-left: 6px solid transparent !important;
            border-right: 6px solid transparent !important;
            border-top: 10px solid #2F96C8 !important;
        }

        #wyws-luxembourg-container .kw-lux-drop-shape,
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

    function makeSegment(value) {
        const segment = document.createElement('div');
        segment.className = 'kw-lux-scale-segment kw-lux-scale-' + value;
        segment.textContent = String(value);
        return segment;
    }

    function rebuildScale() {
        const root = document.getElementById('wyws-luxembourg-container');
        if (!root) return false;

        const bar = root.querySelector('.kw-lux-slider-bar');
        if (!bar) return false;

        if (!bar.dataset.waterScore1545Built) {
            while (bar.firstChild) bar.removeChild(bar.firstChild);
            [30, 40, 50, 60, 70, 80, 90, 100].forEach(function(value) {
                bar.appendChild(makeSegment(value));
            });
            bar.dataset.waterScore1545Built = 'true';
        }

        const labels = root.querySelector('.kw-lux-labels');
        if (labels) labels.style.display = 'none';

        const drop = root.querySelector('.kw-lux-water-drop');
        if (drop) {
            Array.prototype.forEach.call(drop.children, function(child) {
                child.style.display = 'none';
            });
        }

        injectVisualOverride();
        return true;
    }

    const scriptTag = document.createElement('script');
    scriptTag.src = ORIGINAL_WIDGET_URL;
    scriptTag.async = false;
    scriptTag.onload = function() {
        injectVisualOverride();
        rebuildScale();
        setTimeout(rebuildScale, 100);
        setTimeout(rebuildScale, 500);
        setTimeout(rebuildScale, 1000);
    };
    document.head.appendChild(scriptTag);
})();
