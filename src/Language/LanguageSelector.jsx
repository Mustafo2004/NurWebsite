import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const language = [
    { code: "ru", lang: "RU" },
    { code: "tj", lang: "TJ" },
]
const LanguageSelector = () => {
    const [Languages, setLanguages] = useState(false)

    const { i18n } = useTranslation()
    const changeLanguage = (lng, ln) => {
        i18n.changeLanguage(lng)
        setLanguages(ln)
    }

    return (
        <div className='lang'>
            {/* {language.map((lng)=>(
            <button key={lng.code}
            onClick={()=>changeLanguage(lng.code)}
            >
             {lng.lang}
            </button>

        ))} */}
            {Languages == true ? <button className='font-bold text-[#F4FCF8] text-[30px] '
                onClick={() => changeLanguage(language[0].code, false)}
            >
                {language[0].lang}
            </button> : <button className='font-bold text-[#F4FCF8] text-[30px] '
                onClick={() => changeLanguage(language[1].code, true)}
            >
                {language[1].lang}
            </button>}
        </div>
    )
}

export default LanguageSelector