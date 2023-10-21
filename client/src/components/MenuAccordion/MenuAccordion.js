import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MenuItem from "../MenuItem/MenuItem";
import { fetchMenuItemsByCategoryId } from "../../services/menuItemService";
// import "./MenuAccordion.css";

const MenuAccordion = ({ subCategoryData, expandedCategory }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    async function getMenuItems() {
      const menuItems = await fetchMenuItemsByCategoryId(subCategoryData.id);
      setMenuItems(menuItems);
    }
    getMenuItems();
  }, []);

  useEffect(() => {
    setExpanded(subCategoryData.id === expandedCategory);
  }, [expandedCategory]);

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  const styles = `.menu-accordion-title {
      color: #00704a;
      font-weight: 700;
    }
    .MuiAccordion-root {
      padding: 1vw 0;
      box-shadow: none;
      border-top: 1.5px solid orange;
    }
    .MuiAccordion-root:last-child {
      border-bottom: 1.5px solid orange;
    }
    .MuiAccordionSummary-expandIconWrapper {
      transition: none;
    }
    .expand-icon {
      color: #00704a;
      transition: transform 0.5s;
    }
    .expand-icon.expanded {
      transform: rotate(45deg);
    }
    .expand-icon.closed {
      transform: rotate(0deg);
    }
    
    /* Font size for phones */
    @media screen and (max-width: 450px) {
      .menu-accordion-title {
        font-size: 1.3rem; /* Adjust as needed */
      }
      .expand-icon {
        font-size: 2rem;
      }
    }
    
    /* Font size for tablets */
    @media screen and (min-width: 415px) and (max-width: 1000px) {
      .menu-accordion-title {
        font-size: 1.38rem; /* Adjust as needed */
      }
      .expand-icon {
        font-size: 2.1rem;
      }
    }
    
    /* Font size for laptops */
    @media screen and (min-width: 1000px) and (max-width: 1279px) {
      .menu-accordion-title {
        font-size: 1.5rem; /* Adjust as needed */
      }
      .expand-icon {
        font-size: 2.5rem;
      }
    }
    
    /* Font size for desktops (1280px and above) */
    @media screen and (min-width: 1280px) {
      .menu-accordion-title {
        font-size: 1.55rem; /* Adjust as needed */
      }
      .expand-icon {
        font-size: 2.8rem;
      }
    }
    `;

  return (
    <>
      <style>{styles}</style>
      <Accordion expanded={expanded}>
        <AccordionSummary
          expandIcon={
            expanded ? (
              <AddIcon className="expand-icon expanded" />
            ) : (
              <AddIcon className="expand-icon closed" />
            )
          }
          onClick={handleExpand}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          className="accordion-summary"
        >
          <Typography className="menu-accordion-title">
            {subCategoryData.subCategory}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {menuItems &&
              menuItems.map((menuItem, index) => (
                <MenuItem key={index} menuItemData={menuItem} />
              ))}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default MenuAccordion;
