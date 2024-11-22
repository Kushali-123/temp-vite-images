import { useContext, useState, createContext, useEffect } from 'react'

const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const getInitialDarkMode = () => {
    const prefersDarkMode = window.matchMedia(
      '(prefers-color-scheme:dark)'
    ).matches
    console.log(prefersDarkMode)
    const storedDarkMode = localStorage.getItem('darkTheme')
    
    if(storedDarkMode === null){
        return prefersDarkMode
    }

    return storedDarkMode
  }

  const [isDarkTheme, setIsDarkTheme] = useState(getInitialDarkMode)
  const [searchTerm, setSearchTerm] = useState('dog')

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme
    setIsDarkTheme(newDarkTheme)
    localStorage.setItem('darkTheme', newDarkTheme)
  }

  useEffect(()=> {
    document.body.classList.toggle('dark-theme', isDarkTheme)
  }, [isDarkTheme])

  return (
    <AppContext.Provider
      value={{ isDarkTheme, toggleDarkTheme, searchTerm, setSearchTerm }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => useContext(AppContext)
