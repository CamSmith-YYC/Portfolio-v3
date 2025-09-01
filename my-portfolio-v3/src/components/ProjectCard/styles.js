// Style objects & constants

// Constants
export const cardConfig = {
  width: 345,
  height: 400,
  imageHeight: 180,
  maxTechIcons: 8,
};

export const scrollbarStyles = {
  '&::-webkit-scrollbar': {
    width: '6px',
  },
  '&::-webkit-scrollbar-track': {
    background: '#f1f1f1',
    borderRadius: '3px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#888',
    borderRadius: '3px',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    background: '#555',
  },
};

// Style Objects
export const flipContainer = {
  width: cardConfig.width,
  height: cardConfig.height,
  perspective: '1000px',
};

export const cardContainer = {
  position: 'relative',
  width: '100%',
  height: '100%',
  transformStyle: 'preserve-3d',
  transition: 'transform 0.6s',
  cursor: 'pointer',
};

export const flipCard = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  borderRadius: 3,
  boxShadow: 3,
  display: 'flex',
  flexDirection: 'column',
  backfaceVisibility: 'hidden',
  transition: 'all 0.3s ease-in-out',
};

export const sectionTitle = {
  fontWeight: 'bold',
  mb: 1,
  fontSize: '0.75rem'
};

export const techIcon = {
  width: 24,
  height: 24,
  cursor: 'pointer',
  '&:hover': {
    transform: 'scale(1.1)',
  },
  transition: 'transform 0.2s',
};

export const linkButton = {
  fontSize: '0.65rem',
  padding: '2px 6px',
  minWidth: 'auto',
};