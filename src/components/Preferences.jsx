import { useEffect, useId, useState } from 'react'
import styles from '../styles/Preferences.module.css'

function loadPref(key, fallback) {
  try { const v = localStorage.getItem(key); return v ?? fallback } catch { return fallback }
}

function savePref(key, value) {
  try { 
    localStorage.setItem(key, value) 
  } catch (error) {
    console.warn('Failed to save preference:', error)
  }
}

export default function Preferences() {
  const [open, setOpen] = useState(false)
  // Tema y colores
  const [theme, setTheme] = useState(loadPref('pref:theme', 'light'))
  const [contrast, setContrast] = useState(loadPref('pref:contrast', 'normal'))
  const [colorblind, setColorblind] = useState(loadPref('pref:colorblind', 'off'))
  // Tipografía
  const [fontFamily, setFontFamily] = useState(loadPref('pref:font', 'sans'))
  const [fontSize, setFontSize] = useState(loadPref('pref:fontsize', '18'))
  const [fontWeight, setFontWeight] = useState(loadPref('pref:fontweight', 'normal'))
  // Espaciado y densidad
  const [lineHeight, setLineHeight] = useState(loadPref('pref:lineheight', '1.6'))
  const [spacing, setSpacing] = useState(loadPref('pref:spacing', 'normal'))
  const [columnWidth, setColumnWidth] = useState(loadPref('pref:columnwidth', 'normal'))
  // Contenido visual
  const [showIcons, setShowIcons] = useState(loadPref('pref:icons', 'on'))
  const [animations, setAnimations] = useState(loadPref('pref:animations', 'on'))
  const [textOnly, setTextOnly] = useState(loadPref('pref:textonly', 'off'))
  // Interacción
  const [focusIndicators, setFocusIndicators] = useState(loadPref('pref:focus', 'on'))
  const [extendedTime, setExtendedTime] = useState(loadPref('pref:extendedtime', 'off'))
  const [sounds, setSounds] = useState(loadPref('pref:sounds', 'off'))
  // Lectura y foco
  const [highlightLine, setHighlightLine] = useState(loadPref('pref:highlightline', 'off'))
  const [minimalMode, setMinimalMode] = useState(loadPref('pref:minimal', 'off'))
  const [readAloud, setReadAloud] = useState(loadPref('pref:readaloud', 'off'))

  useEffect(() => {
    const root = document.documentElement
    // Aplicar tema
    root.setAttribute('data-theme', theme)
    // Aplicar tipografía
    root.setAttribute('data-font', fontFamily)
    // Aplicar espaciado
    root.setAttribute('data-spacing', spacing)
    // Aplicar otras preferencias
    root.setAttribute('data-contrast', contrast)
    root.setAttribute('data-animations', animations)
    root.setAttribute('data-minimal', minimalMode)
    root.setAttribute('data-colorblind', colorblind)
    
    // Aplicar tamaño de fuente directamente al body
    document.body.style.fontSize = `${fontSize}px`
    
    // Aplicar grosor de fuente
    if (fontWeight === 'light') {
      document.body.style.fontWeight = '300'
    } else if (fontWeight === 'bold') {
      document.body.style.fontWeight = '700'
    } else {
      document.body.style.fontWeight = '400'
    }
    
    // Aplicar interlineado
    root.style.setProperty('--line-height', lineHeight)
    
    // Guardar todas las preferencias
    const prefs = {
      theme, contrast, colorblind, fontFamily, fontSize, fontWeight,
      lineHeight, spacing, columnWidth, showIcons, animations, textOnly,
      focusIndicators, extendedTime, sounds, highlightLine, minimalMode, readAloud
    }
    Object.entries(prefs).forEach(([key, value]) => savePref(`pref:${key}`, value))
  }, [theme, contrast, colorblind, fontFamily, fontSize, fontWeight, lineHeight, spacing, columnWidth, showIcons, animations, textOnly, focusIndicators, extendedTime, sounds, highlightLine, minimalMode, readAloud])

  const id = useId()

  const categories = [
    {
      id: 'theme',
      title: 'Tema y colores',
      icon: '🎨',
      options: [
        { id: 'theme', label: 'Tema', type: 'select', value: theme, onChange: setTheme, options: [
          { value: 'light', label: 'Claro' },
          { value: 'dark', label: 'Oscuro' },
          { value: 'soft', label: 'Suave' }
        ]},
        { id: 'contrast', label: 'Contraste', type: 'select', value: contrast, onChange: setContrast, options: [
          { value: 'normal', label: 'Normal' },
          { value: 'high', label: 'Alto contraste' },
          { value: 'extreme', label: 'Máximo contraste' }
        ]},
        { id: 'colorblind', label: 'Modo daltónico', type: 'toggle', value: colorblind, onChange: setColorblind }
      ]
    },
    {
      id: 'typography',
      title: 'Tipografía',
      icon: '📝',
      options: [
        { id: 'fontFamily', label: 'Tipo de fuente', type: 'select', value: fontFamily, onChange: setFontFamily, options: [
          { value: 'sans', label: 'Sans serif' },
          { value: 'mono', label: 'Monoespaciada' },
          { value: 'serif', label: 'Serif' }
        ]},
        { id: 'fontSize', label: 'Tamaño de fuente', type: 'range', value: fontSize, onChange: setFontSize, min: '14', max: '24', step: '1' },
        { id: 'fontWeight', label: 'Grosor de fuente', type: 'select', value: fontWeight, onChange: setFontWeight, options: [
          { value: 'light', label: 'Ligero' },
          { value: 'normal', label: 'Normal' },
          { value: 'bold', label: 'Negrita' }
        ]}
      ]
    },
    {
      id: 'spacing',
      title: 'Espaciado y densidad',
      icon: '📏',
      options: [
        { id: 'lineHeight', label: 'Interlineado', type: 'range', value: lineHeight, onChange: setLineHeight, min: '1.2', max: '2.0', step: '0.1' },
        { id: 'spacing', label: 'Espaciado entre bloques', type: 'select', value: spacing, onChange: setSpacing, options: [
          { value: 'compact', label: 'Compacto' },
          { value: 'normal', label: 'Normal' },
          { value: 'relaxed', label: 'Relajado' }
        ]},
        { id: 'columnWidth', label: 'Ancho de columna', type: 'select', value: columnWidth, onChange: setColumnWidth, options: [
          { value: 'narrow', label: 'Estrecho' },
          { value: 'normal', label: 'Normal' },
          { value: 'wide', label: 'Ancho' }
        ]}
      ]
    },
    {
      id: 'visual',
      title: 'Contenido visual',
      icon: '👁️',
      options: [
        { id: 'showIcons', label: 'Mostrar iconos', type: 'toggle', value: showIcons, onChange: setShowIcons },
        { id: 'animations', label: 'Animaciones', type: 'toggle', value: animations, onChange: setAnimations },
        { id: 'textOnly', label: 'Solo texto', type: 'toggle', value: textOnly, onChange: setTextOnly }
      ]
    },
    {
      id: 'interaction',
      title: 'Interacción',
      icon: '🖱️',
      options: [
        { id: 'focusIndicators', label: 'Indicadores de foco', type: 'toggle', value: focusIndicators, onChange: setFocusIndicators },
        { id: 'extendedTime', label: 'Tiempo extendido', type: 'toggle', value: extendedTime, onChange: setExtendedTime },
        { id: 'sounds', label: 'Sonidos de alerta', type: 'toggle', value: sounds, onChange: setSounds }
      ]
    },
    {
      id: 'reading',
      title: 'Lectura y foco',
      icon: '📖',
      options: [
        { id: 'highlightLine', label: 'Resaltar línea actual', type: 'toggle', value: highlightLine, onChange: setHighlightLine },
        { id: 'minimalMode', label: 'Modo distraído mínimo', type: 'toggle', value: minimalMode, onChange: setMinimalMode },
        { id: 'readAloud', label: 'Lectura en voz alta', type: 'toggle', value: readAloud, onChange: setReadAloud }
      ]
    }
  ]

  return (
    <section aria-labelledby={`${id}-title`} className={styles.preferences}>
      <button
        type="button"
        className={styles.preferencesButton}
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        onClick={() => setOpen(v => !v)}
      >
        ⚙️ Preferencias
      </button>
      <h2 id={`${id}-title`} className="sr-only">Panel de preferencias de accesibilidad</h2>
      <div id={`${id}-panel`} role="region" aria-labelledby={`${id}-title`} hidden={!open} className={styles.preferencesPanel}>
        <div className={styles.preferencesGroup}>
          {categories.map(category => (
            <fieldset key={category.id} className={styles.prefCategory}>
              <legend className={styles.prefCategoryTitle}>
                <span className={styles.prefCategoryIcon} aria-hidden="true">{category.icon}</span>
                {category.title}
              </legend>
              <div className={styles.prefOptions}>
                {category.options.map(option => (
                  <div key={option.id} className={styles.prefOption}>
                    <label className={styles.prefOptionLabel}>
                      <span className={styles.prefOptionName}>{option.label}</span>
                      {option.type === 'toggle' && (
                        <input
                          type="checkbox"
                          checked={option.value === 'on'}
                          onChange={e => option.onChange(e.target.checked ? 'on' : 'off')}
                          className={styles.prefToggle}
                        />
                      )}
                      {option.type === 'select' && (
                        <select
                          value={option.value}
                          onChange={e => option.onChange(e.target.value)}
                          className={styles.prefSelect}
                        >
                          {option.options.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                      )}
                      {option.type === 'range' && (
                        <div className={styles.prefRangeContainer}>
                          <input
                            type="range"
                            min={option.min}
                            max={option.max}
                            step={option.step}
                            value={option.value}
                            onChange={e => option.onChange(e.target.value)}
                            className={styles.prefRange}
                          />
                          <span className={styles.prefRangeValue}>{option.value}</span>
                        </div>
                      )}
                    </label>
                  </div>
                ))}
              </div>
            </fieldset>
          ))}
        </div>
      </div>
    </section>
  )
}
