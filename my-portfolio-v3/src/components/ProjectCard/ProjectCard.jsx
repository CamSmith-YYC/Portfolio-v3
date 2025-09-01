import { useState, useMemo } from "react";
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
  Avatar,
} from "@mui/material";
import { Close as CloseIcon, MoreHoriz as MoreIcon } from "@mui/icons-material";
import { 
  flipContainer, 
  cardContainer, 
  flipCard, 
  scrollbarStyles,
  sectionTitle,
  techIcon,
  linkButton,
  cardConfig 
} from "./styles";
import { stopPropagation } from "../../utils/projects";

function ProjectCard({ title, blurb, image, link, description, technologies = [], links = [] }) {
    const [isFlipped, setIsFlipped] = useState(false);
    const [techDialogOpen, setTechDialogOpen] = useState(false);

    // Memoized technology data to prevent unnecessary recalculations
    const technologyData = useMemo(() => ({
      displayed: technologies.slice(0, cardConfig.maxTechIcons),
      hasMore: technologies.length > cardConfig.maxTechIcons,
      total: technologies.length,
    }), [technologies]);

    const handleCardClick = () => {
        setIsFlipped(!isFlipped);
    };

    const handleTechSectionClick = (e) => {
        e.stopPropagation();
        if (technologyData.hasMore) {
            setTechDialogOpen(true);
        }
    };

    const handleCloseTechDialog = () => {
        setTechDialogOpen(false);
    };

  // Dynamic transform calculation for hover effects
  const getHoverTransform = (side) => {
    const baseTransform = side === 'front' ? 'rotateY(0deg)' : 'rotateY(180deg)';
    const hoverTransform = `${baseTransform} translateY(-8px)`;
    
    if (side === 'front') {
      return isFlipped ? baseTransform : hoverTransform;
    }
    return isFlipped ? hoverTransform : baseTransform;
  };

  return (
    <>
      <Box
        sx={{
          ...flipContainer,
          '&:hover .front-card': {
            transform: getHoverTransform('front'),
            boxShadow: 6,
            '& .MuiCardMedia-root': {
              transform: 'scale(1.05)',
            }
          },
          '&:hover .back-card': {
            transform: getHoverTransform('back'),
            boxShadow: 6,
          }
        }}
      >
        {/* TODO The box shadow on the backside non-hover state looks weird. Fix to match front side look */}
        <Box
          sx={{
            ...cardContainer,
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
          onClick={handleCardClick}
        >
          {/* Front Side */}
          <Card className="front-card" sx={flipCard}>
            {image && (
              <CardMedia
                component="img"
                height={cardConfig.imageHeight}
                image={image}
                alt={title}
                sx={{ 
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
                  onClick={stopPropagation}
                >
                  View Project
                </Button>
              )}
              <Button size="small" color="secondary">
                More Details
              </Button>
            </CardActions>
          </Card>

          {/* Back Side */}
          <Card 
            className="back-card"
            sx={{ 
              ...flipCard,
              transform: 'rotateY(180deg)',
            }}
          >
            <CardContent 
              sx={{ 
                flexGrow: 1, 
                display: 'flex', 
                flexDirection: 'column',
                height: '100%',
                padding: 2,
                paddingBottom: 0,
              }}
            >
              <Typography gutterBottom variant="h6" component="div" sx={{ flexShrink: 0 }}>
                {title} - Details
              </Typography>
              
              {/* Scrollable Description */}
              <Box
                sx={{
                  flex: 1,
                  overflow: 'auto',
                  mb: 2,
                  pr: 1,
                  ...scrollbarStyles,
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

              {/* Bottom Section */}
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
                {/* Technologies */}
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', mb: 1 }}>
                  <Typography variant="body2" sx={sectionTitle}>
                    Technologies
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      cursor: technologyData.hasMore ? 'pointer' : 'default',
                      '&:hover': technologyData.hasMore ? { opacity: 0.8 } : {},
                    }}
                    onClick={handleTechSectionClick}
                  >
                    {technologyData.displayed.map((tech, index) => (
                      <Tooltip key={index} title={tech.name} arrow>
                        <Avatar src={tech.icon} alt={tech.name} sx={techIcon} />
                      </Tooltip>
                    ))}
                    {technologyData.hasMore && (
                      <Tooltip title={`+${technologyData.total - cardConfig.maxTechIcons} more`} arrow>
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
                            '&:hover': { backgroundColor: '#e0e0e0' },
                          }}
                        >
                          <MoreIcon sx={{ fontSize: 14 }} />
                        </Box>
                      </Tooltip>
                    )}
                  </Box>
                </Box>

                {/* Links */}
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="body2" sx={sectionTitle}>
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
                        onClick={stopPropagation}
                        sx={linkButton}
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
                        onClick={stopPropagation}
                        sx={linkButton}
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
                    '&:hover': { backgroundColor: '#f5f5f5' },
                  }}
                >
                  <Avatar
                    src={tech.icon}
                    alt={tech.name}
                    sx={{ 
                      width: 40, 
                      height: 40,
                      '&:hover': { transform: 'scale(1.1)' },
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