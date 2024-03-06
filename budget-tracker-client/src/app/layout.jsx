// Assurez-vous d'importer les polices correctement
import MenuContextProvider from 'lib/context/MenuContext.jsx';
import { lusitana,inter } from '../ui/style/fonts.js';
import '../ui/style/globals.css'
 

export const metadata = {
  title: 'budget tracker',
  description:
    'appli gestion budget'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${lusitana.className} ${inter.className} antialiased`}>
      <MenuContextProvider>
          {children}
      </MenuContextProvider>
      </body>
    </html>
  )
}
