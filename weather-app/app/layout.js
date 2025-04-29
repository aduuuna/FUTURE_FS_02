import './globals.css'
import Navbar from './components/Navbar'

export const metadata = {
  title: 'Weather App',
  description: 'Check weather conditions in cities around the world',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  )
}