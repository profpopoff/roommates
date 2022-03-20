import React from "react";
import './LanguageSelect.scss'

export default function LanguageSelect() {

   // * State that shows or hides language menu
   const [showLanguage, setShowLanguage] = React.useState(false)

   // * state that shows what language is chosen
   const [language, setLanguage] = React.useState('en')

   // * Function that toggles language menu state
   const toggleLanguageMenu = () => setShowLanguage(!showLanguage)

   // * Detects menu-list component (ref={ref})
   const ref = React.useRef(null);

   // * Detects click outside menu component
   React.useEffect(() => {
      const checkIfClickedOutside = e => {
         if (showLanguage && ref.current && !ref.current.contains(e.target)) {
            toggleLanguageMenu()
         }
      }
      document.addEventListener("mousedown", checkIfClickedOutside)
      return () => {
         document.removeEventListener("mousedown", checkIfClickedOutside)
      }
   }, [showLanguage])


   return (
      <div ref={ref}  className="language-select" data-visible={showLanguage}>
         <h3 className="language-select--name" onClick={toggleLanguageMenu}>{language}</h3>
         <ul className="language-select--list">
            <li onClick={() => {setLanguage('en'); toggleLanguageMenu()}}>en</li>
            <li onClick={() => {setLanguage('ru'); toggleLanguageMenu()}}>ru</li>
         </ul>
      </div>
   )
}