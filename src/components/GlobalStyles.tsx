

const GlobalStyles = () => (
  <style>
    {`
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Lato:wght@300;400;700&display=swap');
      
      html {
        scroll-behavior: smooth;
      }
      
      body {
        font-family: 'Lato', sans-serif;
        background-color: #F5F0E6; /* Cream */
        color: #5A642F; /* Verde Oliva */
        margin: 0;
        padding: 0;
      }

      .font-serif {
        font-family: 'Playfair Display', serif;
      }
    `}
  </style>
);

export default GlobalStyles;