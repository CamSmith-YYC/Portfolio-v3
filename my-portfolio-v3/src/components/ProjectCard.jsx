import { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Tooltip,
  Chip,
  Avatar,
} from "@mui/material";
import { Close as CloseIcon, MoreHoriz as MoreIcon } from "@mui/icons-material";

function ProjectCard({ title, blurb, image, link, description, technologies = [], links = [] }) {
    const [isFlipped, setIsFlipped] = useState(false);
    const [techDialogOpen, setTechDialogOpen] = useState(false);

    const handleCardClick = () => {
        setIsFlipped(!isFlipped);
    };

    const handleTechSectionClick = (e) => {
        e.stopPropagation();
        if (technologies.length > 3) {
            setTechDialogOpen(true);
        }
    };

    const handleCloseTechDialog = () => {
        setTechDialogOpen(false);
    };

    const displayedTechnologies = technologies.slice(0, 3);
    const hasMoreTechnologies = technologies.length > 3;

  return (
    <>
    <Box
      sx={{
        width: 345,
        height: 400,
        perspective: '1000px', // For 3D flip effect
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.6s',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          cursor: 'pointer',
        }}
        onClick={handleCardClick}
      >
        {/* Front Side */}
        <Card 
          sx={{ 
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: 3, 
            boxShadow: 3,
            display: 'flex',
            flexDirection: 'column',
            backfaceVisibility: 'hidden',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              transform: 'translateY(-8px)',
              boxShadow: 6,
              '& .MuiCardMedia-root': {
                transform: 'scale(1.05)',
              }
            }
          }}
        >
          {image && (
            <CardMedia
              component="img"
              height="180"
              image={image}
              alt={title}
              sx={{ 
                // flexShrink: 0, *can be used to prevent shrinking if needed*
                transition: 'transform 0.3s ease-in-out',
                objectFit: 'cover'
              }}
            />
          )}
          <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            <Typography gutterBottom variant="h6" component="div">
              {title}
            </Typography>
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 4,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {blurb}
            </Typography>
          </CardContent>
          <CardActions sx={{ flexShrink: 0 }}>
            {link && (
              <Button
                size="small"
                color="primary"
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()} // Prevent card flip when clicking button
              >
                View Project
              </Button>
            )}
            <Button
              size="small"
              color="secondary"
            >
              More Details
            </Button>
          </CardActions>
        </Card>

        {/* Back Side */}
        <Card 
          sx={{ 
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: 3, 
            boxShadow: 3,
            display: 'flex',
            flexDirection: 'column',
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              transform: 'rotateY(180deg) translateY(-8px)',
              boxShadow: 6,
            }
          }}
        >
          <CardContent 
            sx={{ 
              flexGrow: 1, 
              display: 'flex', 
              flexDirection: 'column',
              height: '100%',
              padding: 2,
              paddingBottom: 0, // Remove bottom padding to make room for sticky section
            }}
          >
            <Typography gutterBottom variant="h6" component="div" sx={{ flexShrink: 0 }}>
              {title} - Details
            </Typography>
            
            {/* Scrollable detailed description area (top 2/3) */}
            <Box
              sx={{
                flex: 1,
                overflow: 'auto',
                mb: 2,
                pr: 1,
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
              }}
            >
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{ lineHeight: 1.6 }}
              >
                {description || "No detailed description provided for this project."}
              </Typography>
            </Box>

            {/* Sticky Bottom Section (1/3 of card) */}
              <Box 
                sx={{ 
                  flexShrink: 0,
                  height: '33%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderTop: '1px solid #e0e0e0',
                  pt: 1,
                  px: 1,
                }}
              >
                {/* Technologies Section */}
                <Box 
                  sx={{ 
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    mb: 1,
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1, fontSize: '0.75rem' }}>
                    Technologies
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      cursor: hasMoreTechnologies ? 'pointer' : 'default',
                      '&:hover': hasMoreTechnologies ? { opacity: 0.8 } : {},
                    }}
                    onClick={handleTechSectionClick}
                  >
                    {displayedTechnologies.map((tech, index) => (
                      <Tooltip key={index} title={tech.name} arrow>
                        <Avatar
                          src={tech.icon}
                          alt={tech.name}
                          sx={{ 
                            width: 24, 
                            height: 24,
                            cursor: 'pointer',
                            '&:hover': {
                              transform: 'scale(1.1)',
                            },
                            transition: 'transform 0.2s',
                          }}
                        />
                      </Tooltip>
                    ))}
                    {hasMoreTechnologies && (
                      <Tooltip title={`+${technologies.length - 3} more`} arrow>
                        <Box
                          sx={{
                            width: 24,
                            height: 24,
                            borderRadius: '50%',
                            backgroundColor: '#f0f0f0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            '&:hover': {
                              backgroundColor: '#e0e0e0',
                            },
                          }}
                        >
                          <MoreIcon sx={{ fontSize: 14 }} />
                        </Box>
                      </Tooltip>
                    )}
                  </Box>
                </Box>

                {/* Links Section */}
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1, fontSize: '0.75rem' }}>
                    Links
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {links.map((linkItem, index) => (
                      <Button
                        key={index}
                        size="small"
                        variant="outlined"
                        href={linkItem.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        sx={{ 
                          fontSize: '0.65rem',
                          padding: '2px 6px',
                          minWidth: 'auto',
                        }}
                      >
                        {linkItem.label}
                      </Button>
                    ))}
                    {link && (
                      <Button
                        size="small"
                        variant="outlined"
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        sx={{ 
                          fontSize: '0.65rem',
                          padding: '2px 6px',
                          minWidth: 'auto',
                        }}
                      >
                        Demo
                      </Button>
                    )}
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Technologies Dialog */}
      <Dialog open={techDialogOpen} onClose={handleCloseTechDialog} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Technologies Used
          <IconButton onClick={handleCloseTechDialog} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, p: 1 }}>
            {technologies.map((tech, index) => (
              <Tooltip key={index} title={tech.name} arrow>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 1,
                    cursor: 'pointer',
                    p: 1,
                    borderRadius: 1,
                    '&:hover': {
                      backgroundColor: '#f5f5f5',
                    },
                  }}
                >
                  <Avatar
                    src={tech.icon}
                    alt={tech.name}
                    sx={{ 
                      width: 40, 
                      height: 40,
                      '&:hover': {
                        transform: 'scale(1.1)',
                      },
                      transition: 'transform 0.2s',
                    }}
                  />
                  <Typography variant="caption" textAlign="center">
                    {tech.name}
                  </Typography>
                </Box>
              </Tooltip>
            ))}
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ProjectCard;
