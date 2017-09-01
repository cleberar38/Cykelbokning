import LocalizedStrings from 'react-localization';

let default_lang = new LocalizedStrings({
		
 	en: {
         // HERE YOU SET THE LANGUAGE BASED ON THE ./components/lang_config.jsx
         // e.g. "it" for Italian, "en" to English - One can add the translation
         // on the lang_config file and set it here after.
         lang: "sv" 
 	}
});
 
export default default_lang;
